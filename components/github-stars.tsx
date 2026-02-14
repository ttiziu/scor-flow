"use client";

import { useEffect, useState } from "react";
import { Github, Star } from "lucide-react";

const GITHUB_REPO = "https://github.com/ttiziu/scor-flow";
const GITHUB_API = "https://api.github.com/repos/ttiziu/scor-flow";

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(GITHUB_API)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <a
      href={GITHUB_REPO}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
      aria-label="Repositorio en GitHub"
    >
      <Github className="size-4 shrink-0" />
      {stars !== null && (
        <span className="flex items-center gap-1">
          <Star className="size-3.5 fill-current" />
          {stars}
        </span>
      )}
    </a>
  );
}
