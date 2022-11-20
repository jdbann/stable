import React from "react";
import { useEffect } from "react";
import { fraunces, inter } from "../../lib/fonts";

export function WrappedRoot({ children }: { children: React.ReactElement }) {
  useEffect(() => {
    document
      .querySelector("body")
      .classList.add(fraunces.variable, inter.variable);

    return () => {
      document
        .querySelector("body")
        .classList.remove(fraunces.variable, inter.variable);
    };
  });

  return children;
}
