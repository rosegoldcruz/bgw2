// app/page.tsx
"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const qs = (v: string) => (typeof v === "string" ? v.trim() : v)

const DoorQuizModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [view, setView] = useState("prompt") // prompt | quiz | result
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const firstInteractiveRef = useRef<HTMLButtonElement | null>(null)

  const quiz = useMemo(
    () => [
      {
        id: "entryType",
        title: "What are you shopping for?",
        options: [
          { value: "front", label: "Front Entry Door" },
          { value: "interior", label: "Interior Door" },
          { value: "slab", label: "Slab / No Glass" },
          { value: "double", label: "Double Doors" },
        ],
      },
      {
        id: "material",
        title: "Preferred material?",
        options: [
          { value: "wood", label: "Wood" },
          { value: "fiberglass", label: "Fiberglass" },
          { value: "iron", label: "Iron" },
          { value: "unsure", label: "Not sure" },
        ],
      },
      {
        id: "vibe",
        title: "What style fits you best?",
        options: [
          { value: "modern", label: "Modern / Minimal" },
          { value: "classic", label: "Classic / Traditional" },
          { value: "ornate", label: "Ornate / Statement" },
          { value: "rustic", label: "Rustic / Warm" },
        ],
      },
      {
        id: "budget",
        title: "Pick your target budget range",
        options: [
          { value: "value", label: "Value" },
          { value: "mid", label: "Mid-range" },
          { value: "premium", label: "Premium" },
          { value: "flex", label: "Flexible" },
        ],
      },
    ],
    [],
  )

  const result = useMemo(() => {
    const material = answers.material
    const vibe = answers.vibe
    const entryType = answers.entryType

    const cat =
      material === "wood"
        ? "wood"
        : material === "iron"
        ? "iron"
        : material === "fiberglass"
        ? "fiberglass"
        : vibe === "ornate"
        ? "iron"
        : vibe === "classic"
        ? "wood"
        : "fiberglass"

    const anchor =
      cat === "iron"
        ? "iron"
        : cat === "wood"
        ? "wood"
        : cat === "fiberglass"
        ? "fiberglass"
        : "all"

    const headline =
      cat === "iron"
        ? "Iron Doors"
        : cat === "wood"
        ? "Wood Doors"
        : "Fiberglass Doors"

    const sub =
      entryType === "double"
        ? "Double-door options are your highest impact win."
        : entryType === "slab"
        ? "Slab styles will keep things clean and modern."
        : entryType === "interior"
        ? "Interior picks can still look premium without overbuilding."
        : "Entry doors are where curb appeal gets decided."

    return {
      category: cat,
      anchor,
      headline,
      sub,
      ctaHref: `/shop#${anchor}`,
    }
  }, [answers])

  useEffect(() => {
    if (!isOpen) {
      setView("prompt")
      setStep(0)
      setAnswers({})
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        firstInteractiveRef.current?.focus?.()
      }, 50)
      return () => clearTimeout(t)
    }
  }, [isOpen, view, step])

  const containerVariants = {
    hidden: { opacity: 0, rotate: 40, scale: 0.5 },
    visible: {
      opacity: 1,
      rotate: [40, -10, 5, -2, 0],
      scale: [0.5, 1.1, 0.9, 1.03, 1],
      transition: { duration: 1, type: "spring", stiffness: 1000, damping: 30 },
    },
    exit: {
      opacity: 0,
      rotate: 40,
      scale: 0.5,
      transition: { duration: 0.5, type: "spring", stiffness: 500, damping: 30 },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.55 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  const current = quiz[step]
  const progress = Math.round(((step + (view === "quiz" ? 1 : 0)) / quiz.length) * 100)

  const setAnswer = (qid: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }))
  }

  const next = () => {
    if (view !== "quiz") return
    if (!answers[current.id]) return
    if (step < quiz.length - 1) setStep((s) => s + 1)
    else setView("result")
  }

  const back = () => {
    if (view === "result") {
      setView("quiz")
      setStep(quiz.length - 1)
      return
    }
    if (view === "quiz") {
      if (step === 0) setView("prompt")
      else setStep((s) => s - 1)
    }
  }

  const resetQuiz = () => {
    setView("quiz")
    setStep(0)
    setAnswers({})
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            role="dialog"
            aria-modal="true"
            aria-label="Door quiz"
          >
            <div
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-24 bg-gradient-to-b from-emerald-200 to-transparent" />

              <div className="flex items-center justify-between px-5 -mt-10">
                <button
                  className="text-slate-700 text-sm font-semibold hover:text-slate-900"
                  onClick={back}
                >
                  {view === "prompt" ? "" : "Back"}
                </button>

                <div className="w-16 h-16 bg-emerald-100 rotate-45 flex items-center justify-center rounded-2xl">
                  <span className="text-emerald-600 text-4xl -rotate-45">
                    {view === "result" ? "✓" : "?"}
                  </span>
                </div>

                <button
                  className="text-slate-700 text-sm font-semibold hover:text-slate-900"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>

              {view !== "prompt" && (
                <div className="px-6 mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>
                      {view === "quiz" ? `Question ${step + 1} of ${quiz.length}` : "Results"}
                    </span>
                    <span>{view === "quiz" ? `${progress}%` : ""}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{
                        width:
                          view === "quiz"
                            ? `${Math.round(((step + 1) / quiz.length) * 100)}%`
                            : "100%",
                      }}
                    />
                  </div>
                </div>
              )}

              {view === "prompt" && (
                <>
                  <h2 className="text-slate-900 text-2xl font-bold text-center mt-6 px-6">
                    Find Your Perfect Door
                  </h2>

                  <p className="text-gray-500 text-center px-6 mt-2 mb-6">
                    Take our 30-second quiz and we’ll route you straight to the right section.
                  </p>

                  <div className="px-6 pb-6 space-y-3">
                    <button
                      ref={firstInteractiveRef}
                      onClick={() => setView("quiz")}
                      className="w-full h-14 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
                    >
                      Take The Quiz
                    </button>

                    <button
                      onClick={onClose}
                      className="w-full h-14 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </>
              )}

              {view === "quiz" && (
                <>
                  <h2 className="text-slate-900 text-xl font-bold text-center mt-5 px-6">
                    {qs(current.title)}
                  </h2>

                  <div className="px-6 mt-4 space-y-3">
                    {current.options.map((opt, idx) => {
                      const selected = answers[current.id] === opt.value
                      return (
                        <button
                          key={opt.value}
                          ref={idx === 0 ? firstInteractiveRef : null}
                          onClick={() => setAnswer(current.id, opt.value)}
                          className={[
                            "w-full text-left px-4 py-4 rounded-xl border font-semibold transition",
                            selected
                              ? "border-emerald-500 bg-emerald-50 text-slate-900"
                              : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50",
                          ].join(" ")}
                        >
                          {qs(opt.label)}
                        </button>
                      )
                    })}
                  </div>

                  <div className="px-6 py-6 flex items-center gap-3">
                    <button
                      onClick={onClose}
                      className="flex-1 h-12 rounded-xl bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300"
                    >
                      Close
                    </button>

                    <button
                      onClick={next}
                      disabled={!answers[current.id]}
                      className={[
                        "flex-1 h-12 rounded-xl font-semibold",
                        answers[current.id]
                          ? "bg-emerald-600 text-white hover:bg-emerald-500"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed",
                      ].join(" ")}
                    >
                      {step === quiz.length - 1 ? "Finish" : "Next"}
                    </button>
                  </div>
                </>
              )}

              {view === "result" && (
                <>
                  <h2 className="text-slate-900 text-2xl font-bold text-center mt-6 px-6">
                    Your Match: {result.headline}
                  </h2>

                  <p className="text-gray-500 text-center px-6 mt-2">{result.sub}</p>

                  <div className="px-6 mt-6 space-y-3 pb-6">
                    <a
                      href={result.ctaHref}
                      className="block w-full h-14 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 flex items-center justify-center"
                    >
                      View Matches
                    </a>

                    <button
                      onClick={resetQuiz}
                      className="w-full h-14 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
                    >
                      Retake Quiz
                    </button>

                    <button
                      onClick={onClose}
                      className="w-full h-14 rounded-xl bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const firedRef = useRef(false)

  useEffect(() => {
    const seen = sessionStorage.getItem("doorQuizSeen") === "true"
    if (seen) {
      firedRef.current = true
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !firedRef.current) {
          setModalOpen(true)
          firedRef.current = true
          sessionStorage.setItem("doorQuizSeen", "true")
        }
      },
      { threshold: 0.2 },
    )

    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <section
        ref={heroRef}
        className="h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black"
      >
        <div className="max-w-3xl px-6 text-center">
          <h1 className="text-5xl font-bold">Elevated Doors For Modern Spaces</h1>
          <p className="text-white/70 mt-4">
            Scroll past the hero and the door quiz notification will pop automatically.
          </p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center">
        <p className="text-xl">Featured Collection</p>
      </section>

      <section className="h-screen flex items-center justify-center">
        <p className="text-xl">Door Catalog</p>
      </section>

      <DoorQuizModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
