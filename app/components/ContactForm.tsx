"use client";

import { useState } from "react";

export default function ContactForm({
  contactEmail,
}: {
  contactEmail: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Message from ${name || "website visitor"}`,
    );
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#222222] border border-[#333] rounded-lg px-5 py-6 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-white/50 text-xs uppercase tracking-wide">
          Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#2C2C2C] border border-[#444] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-white/50 text-xs uppercase tracking-wide">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#2C2C2C] border border-[#444] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-white/50 text-xs uppercase tracking-wide">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-[#2C2C2C] border border-[#444] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
          placeholder="How can we help you?"
        />
      </div>

      <button
        type="submit"
        className="mt-2 py-3 rounded-lg text-black font-semibold text-sm sm:text-base bg-amber-400 hover:bg-amber-300 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
