"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function VerifiedPage() {
  const { id } = useParams();
  const [isCopied, setIsCopied] = useState(false);

  const linkUrl = `${process.env.NEXT_PUBLIC_URL}/r/${id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(linkUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-md px-4">
      <h1 className="font-champ text-5xl font-semibold mb-4">
        Email verified!
      </h1>
      <p className="text-lg mb-6">
        Your link is now active. Share it with your date!
      </p>
      <Button
        variant="fancy"
        className="cursor-pointer"
        onClick={handleCopy}
      >
        {isCopied ? "Link copied!" : "Copy the link"}
      </Button>
    </div>
  );
}
