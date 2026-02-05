"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const QUIZ_STEPS = [
  {
    id: "style",
    title: "Which vibe fits your home?",
    options: [
      { label: "Modern & minimal", value: "modern" },
      { label: "Classic & timeless", value: "classic" },
      { label: "Ornate & dramatic", value: "ornate" },
    ],
  },
  {
    id: "material",
    title: "Preferred material",
    options: [
      { label: "Iron", value: "iron" },
      { label: "Wood", value: "wood" },
      { label: "Fiberglass", value: "fiberglass" },
      { label: "Slab", value: "slab" },
    ],
  },
  {
    id: "glass",
    title: "Glass preference",
    options: [
      { label: "More glass", value: "glass" },
      { label: "Balanced", value: "balanced" },
      { label: "Minimal glass", value: "solid" },
    ],
  },
  {
    id: "size",
    title: "Door size",
    options: [
      { label: "Single", value: "single" },
      { label: "Double", value: "double" },
      { label: "Not sure", value: "either" },
    ],
  },
];

const STYLE_KEYWORDS = {
  modern: ["Modern", "Axis", "Echo", "Victory", "Slab", "Contemporary", "Nova"],
  classic: ["Heritage", "Estate", "Manor", "Classic", "Brookside", "Huntington"],
  ornate: ["Cathedral", "Filigree", "Aurelia", "Oculus", "Scroll", "Grande"],
};

const GLASS_KEYWORDS = {
  glass: ["Glass", "Lite", "Oval", "Oculus", "Cathedral", "Filigree", "Twin", "Cross"],
  balanced: ["Panel", "Estate", "Manor", "Heritage"],
  solid: ["Slab", "Solid", "Panel"],
};

function scoreProduct(product, answers) {
  let score = 0;
  const name = `${product.name} ${product.description || ""}`;

  if (answers.material && product.category === answers.material) score += 4;

  if (answers.style) {
    const keywords = STYLE_KEYWORDS[answers.style] || [];
    if (keywords.some((keyword) => name.includes(keyword))) score += 2;
  }

  if (answers.glass) {
    const keywords = GLASS_KEYWORDS[answers.glass] || [];
    if (keywords.some((keyword) => name.includes(keyword))) score += 1;
  }

  if (answers.size && answers.size !== "either") {
    const isDouble = name.includes("Double") || name.includes("Twin") || name.includes("72");
    if (answers.size === "double" && isDouble) score += 1;
    if (answers.size === "single" && !isDouble) score += 1;
  }

  return score;
}

export function DoorQuizModal({ onSelectDoor }) {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentStep = QUIZ_STEPS[stepIndex];
  const isComplete = stepIndex >= QUIZ_STEPS.length;

  const recommendations = useMemo(() => {
    if (!isComplete) return [];
    const scored = products
      .filter((product) => ["iron", "wood", "fiberglass", "slab"].includes(product.category))
      .map((product) => ({ product, score: scoreProduct(product, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((entry) => entry.product);
    return scored;
  }, [answers, isComplete]);

  const reset = () => {
    setStepIndex(0);
    setAnswers({});
  };

  const handleSelect = (product) => {
    onSelectDoor?.({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
    });
    setOpen(false);
    reset();
  };

  const handleOption = (value) => {
    setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
  };

  const nextStep = () => {
    if (!answers[currentStep.id]) return;
    setStepIndex((prev) => prev + 1);
  };

  const backStep = () => {
    setStepIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) reset(); }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800">
          Help me choose
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-neutral-950 text-white border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-white">Find your door style</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Answer a few quick questions. We’ll recommend three doors.
          </DialogDescription>
        </DialogHeader>

        {!isComplete ? (
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-2">
                Step {stepIndex + 1} of {QUIZ_STEPS.length}
              </p>
              <h3 className="text-lg font-medium">{currentStep.title}</h3>
            </div>
            <div className="grid gap-3">
              {currentStep.options.map((option) => {
                const isSelected = answers[currentStep.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleOption(option.value)}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? "border-amber-400 bg-amber-400/10 text-white"
                        : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-600"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="border-neutral-700 text-white hover:bg-neutral-800"
                onClick={backStep}
                disabled={stepIndex === 0}
              >
                Back
              </Button>
              <Button
                className="bg-white text-neutral-950 hover:bg-neutral-100"
                onClick={nextStep}
                disabled={!answers[currentStep.id]}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400">Recommendations</p>
              <button className="text-xs text-neutral-400 hover:text-neutral-200" onClick={reset}>
                Retake quiz
              </button>
            </div>
            <div className="grid gap-3">
              {recommendations.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3"
                >
                  <div className="relative h-20 w-16 rounded-lg overflow-hidden border border-neutral-800">
                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-neutral-400">{product.category}</p>
                  </div>
                  <Button className="bg-white text-neutral-950 hover:bg-neutral-100" onClick={() => handleSelect(product)}>
                    Select
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
