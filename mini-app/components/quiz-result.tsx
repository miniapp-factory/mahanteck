"use client";

import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

interface QuizResultProps {
  answers: string[];
}

const animalImages: Record<string, string> = {
  cat: "/cat.png",
  dog: "/dog.png",
  fox: "/fox.png",
  hamster: "/hamster.png",
  horse: "/horse.png",
};

export default function QuizResult({ answers }: QuizResultProps) {
  const score: Record<string, number> = {
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  };

  answers.forEach((a) => {
    score[a] = (score[a] ?? 0) + 1;
  });

  const bestAnimal = Object.entries(score).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0] as keyof typeof animalImages;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">You are most like a {bestAnimal}!</h2>
      <img
        src={animalImages[bestAnimal]}
        alt={bestAnimal}
        width={512}
        height={512}
        className="rounded"
      />
      <Share text={`I am most like a ${bestAnimal}! ${url}`} />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
        onClick={() => {
          window.location.reload();
        }}
      >
        Retake Quiz
      </button>
    </div>
  );
}
