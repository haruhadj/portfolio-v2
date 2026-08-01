import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Full-stack developer building type-safe web apps and tuned systems. Next.js, Hono, Drizzle, PostgreSQL, agentic AI workflows.";

export const metadata: Metadata = {
  // Absolute base for og:image and friends — required for link previews.
  // Must include the basePath: metadataBase does not inherit it, so a bare
  // origin here resolves og:image to /opengraph-image (404) instead of
  // /portfolio/opengraph-image.
  metadataBase: new URL("https://haruhadj.org/portfolio"),
  title: "Michael Fernandez — full-stack developer",
  description: DESCRIPTION,
  authors: [{ name: "Michael Fernandez", url: "https://github.com/haruhadj" }],
  creator: "Michael Fernandez",
  openGraph: {
    type: "website",
    url: "https://haruhadj.org/portfolio",
    siteName: "Michael Fernandez",
    title: "Michael Fernandez — full-stack developer",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Fernandez — full-stack developer",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plexSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* apply persisted light theme before first paint; dark is default */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
