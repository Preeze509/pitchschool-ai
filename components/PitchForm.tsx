"use client";

import { useState } from "react";

export default function PitchForm() {
  const [form, setForm] = useState({
    intro: "",
    problem: "",
    solution: "",
    target: "",
    advantage: "",
  });

  const [result, setResult] = useState<any>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePitch = () => {
    return `
Mwen se ${form.intro}.
Pwoblèm mwen rezoud se ${form.problem}.
Solisyon mwen se ${form.solution}.
Kliyan mwen se ${form.target}.
Sa ki fè mwen espesyal se ${form.advantage}.
    `;
  };

  const handleSubmit = async () => {
    const pitch = generatePitch();

    const res = await fetch("/api/score", {
      method: "POST",
      body: JSON.stringify({ pitch }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-4 space-y-3">
      <input name="intro" placeholder="Mwen se..." onChange={handleChange} className="border p-2 w-full"/>
      <input name="problem" placeholder="Pwoblèm..." onChange={handleChange} className="border p-2 w-full"/>
      <input name="solution" placeholder="Solisyon..." onChange={handleChange} className="border p-2 w-full"/>
      <input name="target" placeholder="Kliyan..." onChange={handleChange} className="border p-2 w-full"/>
      <input name="advantage" placeholder="Avantaj..." onChange={handleChange} className="border p-2 w-full"/>

      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2">
        Evalye Pitch
      </button>

      {result && (
        <div className="mt-4 border p-3">
          <p>Clarity: {result.clarity}/10</p>
          <p>Structure: {result.structure}/10</p>
          <p>Confidence: {result.confidence}/10</p>

          <p className="mt-2"><b>Feedback:</b> {result.feedback}</p>
          <p className="mt-2"><b>Amelyorasyon:</b> {result.improved}</p>
        </div>
      )}
    </div>
  );
}