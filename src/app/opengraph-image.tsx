import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ON/OFF — Đồ lót & đồ mặc nhà cao cấp Việt Nam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontFamily: "serif",
            color: "#FAF8F5",
            letterSpacing: "0.1em",
          }}
        >
          ON/OFF
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#A0998F",
            letterSpacing: "0.2em",
          }}
        >
          ĐỒ LÓT & ĐỒ MẶC NHÀ CAO CẤP
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#6B6560",
            marginTop: "16px",
          }}
        >
          onoff.vn
        </div>
      </div>
    ),
    { ...size }
  );
}
