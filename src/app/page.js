import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative h-[calc(100dvh-2rem)] w-full text-center">
      {/* Titre calé sur le centre optique : 40% de la hauteur, soit 60% depuis le bas */}
      <h1 className="absolute inset-x-0 top-[40%] -translate-y-1/2 text-6xl font-champ">
        Ask your date
      </h1>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4">
        <Link
          href="/generate"
          className={cn(buttonVariants({ variant: "fancy" }), "font-champ")}
        >
          Generate your link
        </Link>
        <Link
          href="/how-it-works"
          className="underline underline-offset-4 hover:opacity-80"
        >
          How it works
        </Link>
      </div>
    </div>
  );
}
