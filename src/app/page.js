import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    // min-h rather than a fixed height, so the page scrolls instead of clipping
    // if the content ever outgrows the screen. svh is the viewport measured with
    // the browser bars shown, i.e. the part that is always visible.
    <div className="relative flex min-h-[calc(100svh-2rem)] w-full flex-col justify-end text-center">
      {/* Optical center: 40% from the top reads as centered, 50% reads too low */}
      <h1 className="absolute inset-x-0 top-[40%] -translate-y-1/2 text-6xl font-champ">
        Ask your date
      </h1>
      {/* In normal flow, and kept clear of the bottom edge so a floating browser
          bar (Arc Search, Safari) cannot sit on top of the links. */}
      <div className="flex flex-col items-center gap-4 pb-[calc(env(safe-area-inset-bottom)+2rem)]">
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
