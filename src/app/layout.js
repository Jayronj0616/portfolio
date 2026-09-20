import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { portfolioData } from "@/data/portfolioData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Runs before first paint and owns the scroll reveals end to end: it adds
// the .js class that hides them and the observer that brings them back.
// Inline and self-contained on purpose -- if it never runs, nothing is
// hidden and the page renders without animation. Nothing here depends on
// the app bundle, so a bundle that fails to load cannot blank the page.
const REVEAL_BOOTSTRAP =
  "(function(){var d=document.documentElement;d.classList.add(\"js\");function init(){var els=document.querySelectorAll(\".reveal\");if(!(\"IntersectionObserver\" in window)){for(var i=0;i<els.length;i++){els[i].setAttribute(\"data-revealed\",\"\");}return;}var io=new IntersectionObserver(function(entries){for(var i=0;i<entries.length;i++){var e=entries[i];if(e.isIntersecting){e.target.setAttribute(\"data-revealed\",\"\");io.unobserve(e.target);}}},{rootMargin:\"-80px\"});for(var j=0;j<els.length;j++){io.observe(els[j]);}}if(document.readyState===\"loading\"){document.addEventListener(\"DOMContentLoaded\",init);}else{init();}})();";

const { about } = portfolioData;

export const metadata = {
  title: `${about.name} — ${about.role}`,
  description: about.bio,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
