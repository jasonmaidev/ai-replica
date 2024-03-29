"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { ModeToggle } from "@/components/mode-toggle";

const font = Montserrat({ weight: "800", subsets: ["latin"] });
interface NavbarProps {
  isPro: boolean;
}

export const Navbar = ({
  isPro
}: NavbarProps) => {

  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <MobileSidebar isPro={isPro} />
        <div className="flex flex-row items-center gap-1">
          <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-slate-500", font.className)}>
            ai
          </h1>
          <Link href="/">
            <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-teal-300 text-transparent bg-clip-text", font.className)}>
              Replica
            </h1>
          </Link>
          <span className="hidden md:block text-sm border ml-1 p-0.5 px-4 rounded-full text-slate-400 border-slate-400">Beta</span>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Link href="https://jasonmai.dev/" target="_blank">
          <span className="hidden md:block text-xs">
            Built with 💛 by JasonMai.dev
          </span>
        </Link>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}