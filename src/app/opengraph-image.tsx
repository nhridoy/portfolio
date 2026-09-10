import { ImageResponse } from "next/og";
export const alt = "Nahidujjaman Hridoy | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#111",
        color: "#f5f2eb",
        width: "100%",
        height: "100%",
        padding: 72,
      }}
    >
      <div style={{ fontSize: 28 }}>NAHIDUJJAMAN HRIDOY</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          lineHeight: 1.1,
        }}
      >
        <span>Thoughtfully designed.</span>
        <span style={{ color: "#aaa" }}>Precisely built.</span>
      </div>
      <div style={{ fontSize: 26 }}>
        Software Engineer · React / Next.js / Django / AWS
      </div>
    </div>,
    size,
  );
}
