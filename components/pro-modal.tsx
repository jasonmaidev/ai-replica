"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
        <DialogHeader className="space-y-4 ">
          <DialogTitle className="text-center text-slate-800">
            Replica Creation
          </DialogTitle>
          <DialogDescription className="text-center space-y-2 text-slate-800">
            Coming soon in
            <span className="text-pink-500 mx-1 font-medium">V1 Release</span>
            of ai Replica!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between text-slate-800">
          <p className="text-sm">
            Feature is temporarily disabled due to recent increase in OpenAi&#39;s token pricing.
            You will be able to <span className="text-sm font-bold">create replicas of any characters</span> for free after we
            establish a proper cost model for the infrastructure stack on our end.
          </p>
        </div>
        <div className="flex justify-between text-slate-800">
          <p className="text-sm font-bold">
            Also coming in V1:
          </p>
        </div>
        <ul className="list-disc pl-8 text-slate-800">
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
      </DialogContent>
    </Dialog>
  );
};