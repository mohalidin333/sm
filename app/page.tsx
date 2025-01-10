"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { LoaderCircle } from "lucide-react";

// Function to get the user's IP address using ipify
const getUserIP = async () => {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
};

export default function Main() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSend, setIsSend] = useState(false);

  // Function to handle email input change
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    document.querySelector(".cat")?.classList.toggle("active");
  }

  // Function to handle email form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      setError("Please enter a valid email.");
      return;
    }

    setIsSend(true);

    try {
    

      // Get the user's IP address
      const ipAddress = await getUserIP();

      // Check if the IP address already exists in the 'emails' table
      const { data, error: checkError } = await supabase
        .from("emails")
        .select("*")
        .eq("ip_address", ipAddress);

      if (checkError) {
        throw checkError;
      }

      // If the data exists, it means the user with this IP has already submitted an email
      if (data.length > 0) {
        setError("You have already submitted your email from this IP address.");
        return;
      }

      // Insert the new email and IP address into the 'emails' table
      const { error: insertError } = await supabase
        .from("emails")
        .insert([{ email, ip_address: ipAddress }]);

      if (insertError) {
        throw insertError;
      }

      // Clear the email input after submission
    
      setEmail("");
      setError(null);
      alert("Email submitted successfully!");
    } catch (err) {
      setError("Error submitting email.");

      console.error(err);
    }finally {
      setIsSend(false); // Hide the loading icon
    }
  }

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>Boost Productivity and Eye Health | Early Access</title>
        <meta
          name="description"
          content="Maximize your productivity and enhance your eye health with our innovative solution. Join the waitlist for early access!"
        />
        <meta
          name="keywords"
          content="productivity, eye health, wellness, early access"
        />
        <meta name="author" content="Mohalidin" />
        <meta
          property="og:title"
          content="Boost Productivity and Eye Health | Early Access"
        />
        <meta
          property="og:description"
          content="Unlock your potential with our solution for productivity and eye health. Join our waitlist today!"
        />
      </Head>

      {/* Main Content */}
      <main className="py-[10rem] px-4 flex justify-center bg-[#FFFAEC] h-screen overflow-y-auto">
        <div className="flex flex-col gap-4">
          <h1 className="leading-[1.2] sm:text-[3rem] text-[2.5rem]">
            A Solution for <br />
            <span className="text-orange-500">Productivity</span> and{" "}
            <span className="text-orange-500">Eye Health.</span>
          </h1>
          <p className="sm:text-xl text-gray-800">
            Unlock your potential by maximizing your productivity, and enhancing
            your eye health.
          </p>

          <form
            className="gap-4 my-8 flex flex-col items-start"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Enter your email to get early access</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border border-orange-800 focus:outline-none p-2 rounded-md sm:w-[400px] w-full"
              />
              <Image
                src="/cat.png"
                alt="arrow-right"
                width={100}
                height={100}
                className="cat absolute bottom-0 right-0"
              />
            </div>
            <button
              type="submit"
              className={`${isSend && "bg-orange-500/40 pointer-events-none"} hover:shadow-[0_0_10px_#F9766A] border border-orange-800 bg-orange-500/90 py-2 px-4 text-white rounded-md flex gap-2 items-center`}
            >
              Join Waitlist{" "}
              {isSend && <LoaderCircle className="animate-spin" size={20} />}
            </button>
          </form>

          {/* Display error if any */}
          <div>{error && <p>Error: {error}</p>}</div>

          <p>Made with ❤️ by Mohalidin</p>
        </div>
      </main>
    </>
  );
}
