"use client";

import { useCursorify } from "@cursorify/react";
import GlassSurface from "../GlassSurface";

export function GlassCursor() {
  const { style } = useCursorify();
  const isHovering = style === "pointer" || style === "text";

  return (
    <GlassSurface
      //   displace={0.5}
      //   distortionScale={80}
      //   redOffset={0}
      //   greenOffset={10}
      //   blueOffset={20}
      //   brightness={50}
      //   opacity={0.93}
      //   mixBlendMode="difference"
      width={isHovering ? 60 : 32}
      height={isHovering ? 60 : 32}
      borderRadius={50}
      className="my-custom-class"
      style={{
        transition:
          "width 0.15s, height 0.15s, background-color 0.15s, border 0.15s",
      }}
    />
  );
}
