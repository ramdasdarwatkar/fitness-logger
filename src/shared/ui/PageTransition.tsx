import type { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="
        animate-in
        fade-in
        slide-in-from-right-2
        duration-200
      "
    >
      {children}
    </div>
  );
};

export default PageTransition;
