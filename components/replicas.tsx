import Image from "next/image"
import Link from "next/link"
import { Replica } from "@prisma/client"
import { MessagesSquare } from "lucide-react"

import { Card, CardFooter, CardHeader } from "@/components/ui/card"

interface ReplicasProps {
  data: (Replica & {
    _count: {
      messages: number
    },
  })[];
}

export const Replicas = ({ data }: ReplicasProps) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image
            fill
            className="grayscale rounded-md opacity-80"
            alt="Empty"
            src="/homermissing.webp"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          No replicas found.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
      {data.map((item) => (
        <Card key={item.name} className="rounded-3xl cursor-pointer border border-slate-400 hover:border-teal-400 hover:border-4 transition bg-transparent">
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image
                  src={item.src}
                  fill
                  className="rounded-xl object-cover"
                  alt="Character"
                />
              </div>
              <p className="font-bold">
                {item.name}
              </p>
              <p className="text-xs">
                {item.description}
              </p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
              <p className="lowercase">@{item.userName}</p>
              <div className="flex items-center">
                <MessagesSquare className="w-3 h-3 mr-1" />
                {item._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}