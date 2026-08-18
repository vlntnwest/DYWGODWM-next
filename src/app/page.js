import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    /* mb-[20dvh] remonte le bloc : le centre optique tombe à 40% de la hauteur */
    <div className="text-center space-y-8 flex flex-col items-center mb-[20dvh]">
      <h1 className="text-6xl font-champ">Ask your date</h1>
      <div className="flex flex-col items-center gap-4">
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
