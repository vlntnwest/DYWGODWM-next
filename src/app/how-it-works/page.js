import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "How it works",
  description: "Ask your date in 4 steps.",
};

const steps = [
  {
    title: "Create your link",
    description:
      "Tell us your name, your email address and your date's name, then add the spots you'd like to suggest.",
  },
  {
    title: "Verify your email",
    description:
      "We send you an email right away. Click the link inside to activate your invitation — it stays inactive until you do.",
  },
  {
    title: "Share it with your date",
    description:
      "Copy your link and send it however you like. They land on a page asking the only question that matters.",
  },
  {
    title: "Get the answer",
    description:
      "Once they say yes, they pick a spot, a day and a time. You receive the details by email — all that's left is showing up.",
  },
];

export default function HowItWorks() {
  return (
    <div className="w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto py-8">
      <h1 className="font-champ text-5xl text-center mb-10">How it works</h1>
      <ol className="space-y-8">
        {steps.map((step, index) => (
          <li key={step.title} className="flex items-start gap-4 text-left">
            <span className="font-champ shrink-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent text-xl">
              {index + 1}
            </span>
            <div>
              <h2 className="font-champ text-2xl">{step.title}</h2>
              <p className="mt-1 text-base">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex flex-col items-center gap-4">
        <Link
          href="/generate"
          className={cn(buttonVariants({ variant: "fancy" }), "font-champ")}
        >
          Generate your link
        </Link>
        <Link href="/" className="underline underline-offset-4 hover:opacity-80">
          Back to home
        </Link>
      </div>
    </div>
  );
}
