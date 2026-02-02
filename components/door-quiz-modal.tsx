"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

type QuizAnswers = Record<string, string>

const SESSION_KEY = "doorQuizModalSeen"

export function DoorQuizModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})

  const steps = useMemo(
    () => [
      {
        id: "doorType",
        title: "What type of door are you looking for?",
        options: ["Iron", "Wood", "Fiberglass"],
      },
      {
        id: "doorSize",
        title: "Single or Double Door?",
        options: ["Single", "Double"],
      },
      {
        id: "installLocation",
        title: "Where will this door be installed?",
        options: ["Front Entry", "Back Entry", "Interior"],
      },
      {
        id: "priceEstimate",
        title: "Do you want a price estimate?",
        options: ["Yes", "No"],
      },
    ],
    [],
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    const seen = sessionStorage.getItem(SESSION_KEY) === "true"
    if (seen) return

    let triggered = false
    const openOnce = () => {
      if (triggered) return
      triggered = true
      setIsOpen(true)
      sessionStorage.setItem(SESSION_KEY, "true")
    }

    const hero = document.querySelector("main section")
    const observer = hero
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) openOnce()
          },
          { threshold: 0.2 },
        )
      : null

    if (hero && observer) observer.observe(hero)

    const onScroll = () => {
      const pageTrigger = document.documentElement.scrollHeight * 0.4
      if (window.scrollY >= pageTrigger) openOnce()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      observer?.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const close = () => {
    setIsOpen(false)
    sessionStorage.setItem(SESSION_KEY, "true")
    setStep(0)
    setAnswers({})
  }

  const isFormStep = step === steps.length
  const current = steps[step]

  const setAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const next = () => {
    if (isFormStep) return
    if (!answers[current.id]) return
    setStep((s) => Math.min(s + 1, steps.length))
  }

  const back = () => {
    setStep((s) => Math.max(s - 1, 0))
  }

  const submit = () => {
    if (!answers.name || !answers.email || !answers.phone) return
    console.log("Door quiz submission", answers)
    close()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <div
              className="w-full max-w-lg rounded-2xl bg-white text-slate-900 shadow-2xl relative"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-900"
                aria-label="Close"
              >
                ×
              </button>

              <div className="px-6 py-8">
                {!isFormStep && (
                  <>
                    <h2 className="text-xl font-semibold mb-6">{current.title}</h2>
                    <div className="space-y-3">
                      {current.options.map((option) => {
                        const selected = answers[current.id] === option
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setAnswer(current.id, option)}
                            className={[
                              "w-full text-left px-4 py-3 rounded-xl border transition",
                              selected
                                ? "border-slate-900 bg-slate-900 text-white"
                                : "border-slate-200 bg-white text-slate-900 hover:border-slate-300",
                            ].join(" ")}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={back}
                        disabled={step === 0}
                        className={[
                          "h-11 px-4 rounded-xl border font-medium",
                          step === 0
                            ? "border-slate-200 text-slate-300 cursor-not-allowed"
                            : "border-slate-200 text-slate-700 hover:border-slate-300",
                        ].join(" ")}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        disabled={!answers[current.id]}
                        className={[
                          "ml-auto h-11 px-6 rounded-xl font-semibold",
                          answers[current.id]
                            ? "bg-slate-900 text-white hover:bg-slate-800"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed",
                        ].join(" ")}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {isFormStep && (
                  <>
                    <h2 className="text-xl font-semibold mb-6">Contact Details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <input
                          type="text"
                          value={answers.name || ""}
                          onChange={(event) => setAnswer("name", event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <input
                          type="email"
                          value={answers.email || ""}
                          onChange={(event) => setAnswer("email", event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Phone</label>
                        <input
                          type="tel"
                          value={answers.phone || ""}
                          onChange={(event) => setAnswer("phone", event.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={back}
                        className="h-11 px-4 rounded-xl border border-slate-200 text-slate-700 hover:border-slate-300"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={submit}
                        disabled={!answers.name || !answers.email || !answers.phone}
                        className={[
                          "ml-auto h-11 px-6 rounded-xl font-semibold",
                          answers.name && answers.email && answers.phone
                            ? "bg-slate-900 text-white hover:bg-slate-800"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed",
                        ].join(" ")}
                      >
                        View Matching Doors
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
