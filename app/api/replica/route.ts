import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!user || !user.id /* || !user.firstName */) {
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

    const replica = await prismadb.replica.create({
      data: {
        categoryId,
        userId: user.id,
        userName: "placeholder",
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(replica);
  } catch (error) {
    console.log("[REPLICA_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
