"use client";

import { useCursorify } from "@cursorify/react";

export function CustomCursor() {
  const { style } = useCursorify();
  const isHovering = style === "pointer" || style === "text";

  return (
    <div
      style={{
        width: isHovering ? "40px" : "32px",
        height: isHovering ? "40px" : "32px",
        borderRadius: "50%",
        backgroundColor: isHovering ? "transparent" : "white",
        border: isHovering ? "2px solid white" : "none",
        boxShadow: isHovering ? "0 0 12px rgba(255,255,255,0.4)" : "none",
        transition:
          "width 0.15s, height 0.15s, background-color 0.15s, border 0.15s",
      }}
    />
  );
}
