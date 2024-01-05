"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

export const ProModal = () => {
  const proModal = useProModal();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">
            Create Character Replicas
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Coming in
            <span className="text-pink-500 mx-1 font-medium">V1 Relase</span>
            of aiReplica.xyz
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between">
          <p className="text-sm">
            This feature is temporarily disabled due to recent increase in OpenAi&#39;s token pricing.
            You will be able to <span className="text-sm font-bold">create replicas of any characters</span> for free after
            we establish a proper pricing model for the infrastructure stack on our end.
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-bold">
            Also coming in V1:
          </p>
        </div>
        <ul className="list-disc pl-8">
          <li>
            <p className="text-sm">
              Replica text-to-voice
            </p>
          </li>
          <li>
            <p className="text-sm">
              Image generation
            </p>
          </li>
        </ul>

        <div className="flex justify-between">
          <p className="text-sm">
            For now, please enjoy the awesome characters that are currently hanging out in aiReplica. They shall keep you company. =)
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
