import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

import { ReplicaForm } from "./components/replica-form";

interface ReplicaIdPageProps {
  params: {
    replicaId: string;
  };
};

const ReplicaIdPage = async ({
  params
}: ReplicaIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const validSubscription = await checkSubscription();

  if (!validSubscription) {
    return redirect("/");
  }

  const replica = await prismadb.replica.findUnique({
    where: {
      id: params.replicaId,
      userId,
    }
  });

  const categories = await prismadb.category.findMany();

  return (
    <ReplicaForm initialData={replica} categories={categories} />
  );
}

export default ReplicaIdPage;
