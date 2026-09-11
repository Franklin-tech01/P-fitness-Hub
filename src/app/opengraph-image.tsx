import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Embedded as a local file (rather than fetched from Unsplash) so link-
// preview crawlers (WhatsApp, Twitter, etc.) never depend on an external
// network fetch succeeding within their tight timeout.
const heroImageBase64 = readFileSync(
  join(process.cwd(), "public/images/og-hero.jpg")
).toString("base64");
const HERO_IMAGE = `data:image/jpeg;base64,${heroImageBase64}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0a0a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.55 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(0deg, #0a0a0a 15%, rgba(10,10,10,0.65) 55%, rgba(10,10,10,0.35) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#0a0a0a",
                border: "2px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 7v10M4 9v6M18 7v10M20 9v6M6 12h12"
                  stroke="#e11d2e"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>
              P FITNESS <span style={{ color: "#3b6ff0", marginLeft: 8 }}>HUB</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#fff",
              letterSpacing: -1,
            }}
          >
            TRAIN. SWEAT.&nbsp;<span style={{ color: "#3b6ff0" }}>GROW.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 28,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 820,
            }}
          >
            Flexible memberships, expert-led classes and a gym built for every stage of your fitness journey.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
