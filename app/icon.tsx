import { ImageResponse } from "next/og";

// Görsel boyutu (Tarayıcı sekmeleri için standart 32x32)
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      // Sitedeki o yuvarlak "KO" tasarımının aynısını buraya CSS ile çiziyoruz
      <div
        style={{
          fontSize: 12,
          background: "#352f44",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#dbd8e3",
          borderRadius: "50%",
          fontWeight: 900,
          border: "2px solid #352f44",
          fontFamily: "sans-serif",
          letterSpacing: "-0.5px",
        }}
      >
        KO
      </div>
    ),
    {
      ...size,
    }
  );
}