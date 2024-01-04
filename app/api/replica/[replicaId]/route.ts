import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

export async function PATCH(
  req: Request,
  { params }: { params: { replicaId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.replicaId) {
      return new NextResponse("Replica ID required", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 });
    }

    const replica = await prismadb.replica.update({
      where: {
        id: params.replicaId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(replica);
  } catch (error) {
    console.log("[REPLICA_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { replicaId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const replica = await prismadb.replica.delete({
      where: {
        userId,
        id: params.replicaId,
      },
    });

    return NextResponse.json(replica);
  } catch (error) {
    console.log("[REPLICA_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
