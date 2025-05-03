"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import axios from "axios";

export default function LinkGenerator() {
  const [form, setForm] = useState({
    senderName: "",
    senderPhone: "",
    dateName: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const whatsappUrl = "https://wa.me/14157386102?text=Join%20coach%20polo";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const phone = parsePhoneNumberFromString(form.senderPhone, "FR");
      const formattedPhone = phone
        ? phone.number.replace("+", "")
        : form.senderPhone;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/generate-link`,
        {
          ...form,
          senderPhone: formattedPhone,
        }
      );

      setResult(res.data);
    } catch (error) {
      console.error("Erreur lors de la génération :", error);
      alert(error.response?.data?.message || "Erreur lors de la génération");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.linkUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md">
      <h1 className="font-champ text-6xl font-semibold text-center mb-4">
        Generate your link
      </h1>{" "}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-primary p-6 rounded-xl "
      >
        <Input
          type="text"
          name="senderName"
          placeholder="Your name"
          value={form.senderName}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="senderPhone"
          placeholder="Phone number"
          value={form.senderPhone}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="dateName"
          placeholder="Date name"
          value={form.dateName}
          onChange={handleChange}
          required
        />

        <Button variant="fancy" type="submit" className="w-full font-champ ">
          {loading ? "Creating your link..." : "Validate"}
        </Button>
      </form>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-accent hover:decoration-primary"
      >
        Active What&apos;s app notifications
      </a>
      {result && (
        <div className="mt-6 text-center max-w-md mx-auto break-words">
          <Button variant="fancy" onClick={() => handleCopy()}>
            {isCopied ? "Link copied" : "Copy the link"}{" "}
          </Button>
        </div>
      )}
    </div>
  );
}
