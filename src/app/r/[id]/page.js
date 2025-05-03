"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DateTimePicker24h } from "@/components/ui/datePicker";
import { useParams } from "next/navigation";
import axios from "axios";
import LocationRadioGroup from "@/components/LocationRadioGroup";

export default function DateGame() {
  const params = useParams();
  const [step, setStep] = useState("home");
  const [myDate, setMyDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const noBtnRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const noButton = noBtnRef.current;
    if (!noButton) return;

    const moveButton = () => {
      const x = Math.floor(
        Math.random() * (window.innerWidth - noButton.offsetWidth - 10)
      );
      const y = Math.floor(
        Math.random() * (window.innerHeight - noButton.offsetHeight)
      );
      noButton.style.position = "absolute";
      noButton.style.left = `${x}px`;
      noButton.style.top = `${y}px`;
    };

    noButton.onclick = () => {
      if (window.innerWidth < 700) {
        noButton.style.display = "none";
        titleRef.current.textContent = "You mean yes?";
      }
    };

    if (window.innerWidth >= 700) {
      noButton.onmouseover = moveButton;
    }
  }, [step]);

  const handleValidate = async () => {
    setIsLoading(true);
    if (!myDate || !selectedOption) {
      alert("Please select a date and a location");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/appointment/${params.id}`,
        {
          date: myDate,
          location: selectedOption,
        }
      );
      if (response.status === 201) {
        setStep("congrats");
      }
      console.log("Appointment created:", response.data);
    } catch (error) {
      console.error("Error validating:", error);
    }
    setIsLoading(false);
  };

  const renderHome = () => (
    <div className="text-center space-y-4 flex flex-col items-center">
      <h1 className="text-6xl font-champ font-bold" ref={titleRef}>
        Do you want to go on a date with me?
      </h1>
      <div className="flex justify-center">
        <Image
          src="/img/love_gif.webp"
          alt="Cute animated illustration"
          width={300}
          height={300}
        />
      </div>
      <div className=" mt-4 flex gap-4 flex-col max-w-70 min-h-[120px] ">
        <Button
          variant="fancy"
          className="w-70"
          onClick={() => setStep("select")}
        >
          Yes
        </Button>
        <Button variant="fancy" className="w-70" id="noButton" ref={noBtnRef}>
          No
        </Button>
      </div>
    </div>
  );

  const renderSelect = () => (
    <div className="flex flex-col items-center justify-between text-center h-screen pt-20 pb-15">
      <div>
        <h1 className="text-6xl font-champ ">Select a date</h1>
        <div className="mt-4 flex gap-2 flex-col items-center py-6">
          <DateTimePicker24h onChange={(date) => setMyDate(date)} />
          <LocationRadioGroup
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
          />
        </div>
      </div>
      <Button
        variant="fancy"
        className="w-72 font-champ"
        onClick={() => handleValidate()}
      >
        {isLoading ? "Sending" : "Validate"}
      </Button>
    </div>
  );

  const renderCongrats = () => (
    <div className="text-center space-y-4">
      <h1 className="text-6xl font-champ">
        Congrats, you earned a special time with me
      </h1>
      <div className="flex justify-center">
        <Image src="/img/yes_gif.webp" alt="" width={300} height={300} />
      </div>
    </div>
  );

  return (
    <div className=" min-h-screen max-w-screen flex items-center justify-center">
      {step === "home"
        ? renderHome()
        : step === "congrats"
        ? renderCongrats()
        : step === "select"
        ? renderSelect()
        : null}
    </div>
  );
}
