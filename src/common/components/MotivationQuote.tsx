import { useEffect, useState } from "react";
import { LS_KEYS } from "../../storage/localStorage.keys";

export const MotivationQuote = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEYS.DAILY_QUOTE);
    if (!raw) return;

    const parsed = JSON.parse(raw);
    setQuote(parsed.quote);
    setAuthor(parsed.author);
  }, []);

  if (!quote) return null;

  return (
    <div
      className="
        mb-4
        rounded-2xl
        px-5 py-4
        backdrop-blur-md
        bg-gradient-to-br from-white/15 to-white/5
        border border-white/20
        shadow-sm
      "
    >
      <p className="text-sm text-gray-100 italic leading-relaxed">“{quote}”</p>

      {author && (
        <p className="mt-2 text-xs text-gray-400 text-right">— {author}</p>
      )}
    </div>
  );
};
