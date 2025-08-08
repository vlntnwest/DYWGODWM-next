"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

export default function LinkGenerator() {
  const [form, setForm] = useState({
    senderName: "",
    senderMail: "",
    dateName: "",
  });
  const [newLocation, setNewLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleAddLocation = () => {
    const trimmed = newLocation.trim();
    if (trimmed !== "" && !locations.includes(trimmed)) {
      setLocations([...locations, trimmed]);
      setNewLocation("");
    }
  };

  const handleLocationKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLocation();
    }
  };

  const handleRemoveLocation = (locationToRemove) => {
    setLocations(locations.filter((loc) => loc !== locationToRemove));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/generate-link`,
        {
          ...form,
          locations,
        }
      );

      setResult(res.data);
      if (res.data) {
        setResult(res.data);
        setForm({ senderName: "", senderMail: "", dateName: "" });
        setNewLocation("");
        setLocations([]);
      }
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
          type="email"
          name="senderMail"
          placeholder="Email adress"
          value={form.senderMail}
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
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Add a location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyDown={handleLocationKeyDown}
          />
          <Button
            type="button"
            variant="fancy"
            onClick={handleAddLocation}
            className="whitespace-nowrap cursor-pointer"
          >
            + Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => (
            <div
              key={loc}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-accent border border-accent"
            >
              <span>{loc}</span>
              <button
                type="button"
                onClick={() => handleRemoveLocation(loc)}
                className="text-accent hover:text-accent focus:outline-none cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <Button
          variant="fancy"
          type="submit"
          className="w-full font-champ cursor-pointer"
        >
          {loading ? "Creating your link..." : "Validate"}
        </Button>
      </form>
      {result && (
        <div className="mt-6 text-center max-w-md mx-auto break-words">
          <Button
            variant="fancy"
            className="cursor-pointer"
            onClick={() => handleCopy()}
          >
            {isCopied ? "Link copied" : "Copy the link"}{" "}
          </Button>
        </div>
      )}
    </div>
  );
}
