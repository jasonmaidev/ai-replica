import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { ChatClient } from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  }
}

const ChatIdPage = async ({
  params
}: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const replica = await prismadb.replica.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        }
      }
    }
  });


  if (!replica) {
    return redirect("/");
  }

  return (
    <ChatClient replica={replica} />
  );
}

export default ChatIdPage;
