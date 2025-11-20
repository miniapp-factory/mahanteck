"use client";

import { useState } from "react";
import QuizResult from "./quiz-result";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

interface Question {
  text: string;
  options: { text: string; animal: Animal }[];
}

const questions: Question[] = [
  {
    text: "What’s your favorite way to spend a weekend?",
    options: [
      { text: "Reading a book in a cozy corner", animal: "cat" },
      { text: "Playing fetch with friends", animal: "dog" },
      { text: "Exploring a new trail", animal: "fox" },
      { text: "Napping in a sunny spot", animal: "hamster" },
      { text: "Riding a horse through fields", animal: "horse" },
    ],
  },
  {
    text: "How do you handle stress?",
    options: [
      { text: "Curl up and relax", animal: "cat" },
      { text: "Go for a run", animal: "dog" },
      { text: "Find a quiet corner", animal: "fox" },
      { text: "Take a short nap", animal: "hamster" },
      { text: "Take a deep breath and stay calm", animal: "horse" },
    ],
  },
  {
    text: "What’s your favorite snack?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Carrots", animal: "horse" },
    ],
  },
  {
    text: "Which of these describes your personality?",
    options: [
      { text: "Independent and curious", animal: "cat" },
      { text: "Friendly and loyal", animal: "dog" },
      { text: "Smart and quick", animal: "fox" },
      { text: "Energetic and playful", animal: "hamster" },
      { text: "Strong and steady", animal: "horse" },
    ],
  },
  {
    text: "What’s your ideal vacation?",
    options: [
      { text: "A quiet cabin in the woods", animal: "cat" },
      { text: "A beach with lots of people", animal: "dog" },
      { text: "A mountain hike", animal: "fox" },
      { text: "A city with lots of cafes", animal: "hamster" },
      { text: "A ranch with open fields", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Animal[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (animal: Animal) => {
    setAnswers((prev) => [...prev, animal]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return <QuizResult answers={answers} />;
  }

  const question = questions[current];
  const shuffledOptions = shuffleArray(question.options);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
