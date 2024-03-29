"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { Replica, Message } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit, MessagesSquare, MoreVertical, Sparkles, Trash } from "lucide-react";
import { BotAvatar } from "@/components/bot-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface ChatHeaderProps {
  replica: Replica & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export const ChatHeader = ({ replica, }: ChatHeaderProps) => {
  const router = useRouter()
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/replica/${replica.id}`);
      toast({
        description: "Success."
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong."
      })
    }
  }

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => router.push("/")} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={replica.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{replica.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessagesSquare className="w-3 h-3 mr-1" />
              {replica._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by {replica.userName}
          </p>
          <p className="text-xs font-medium text-pink-500">
            *Ask me anything! If you ask me an unfamiliar topic, I may need sometime to respond.
            I have to fire up my own computer (powered a hamster wheel) to research answers...
            Please no math questions!

            *Please be patient with me as the backend is deployed on free and base-tier infrastructure that will have a cold start upon initial requests.
          </p>
        </div>
      </div>
      {user?.id === replica.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/replica/${replica.id}`)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div >
  )
}
