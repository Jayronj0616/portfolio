import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { portfolioData } from "@/data/portfolioData";
import { getSiteUrl } from "@/lib/siteUrl";

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
//
// The script itself only ever runs once per full document load, but the
// App Router swaps pages without reloading the document (every next/link,
// e.g. Home -> /projects -> Back to home). The `.js` class stays on <html>
// while the new page's `.reveal` nodes are brand new, so a one-shot
// querySelectorAll left them hidden forever -- a blank page until the
// visitor hit reload. The MutationObserver below keeps watching for
// `.reveal` nodes added after load and hands them to the same observer.
const REVEAL_BOOTSTRAP = [
  "(function(){",
  'var d=document.documentElement;d.classList.add("js");',
  "var io=null;",
  'function show(el){el.setAttribute("data-revealed","");}',
  "function watch(root){",
  "var els=[];",
  'if(root.nodeType===1&&root.classList.contains("reveal")){els.push(root);}',
  'var found=root.querySelectorAll(".reveal");',
  "for(var i=0;i<found.length;i++){els.push(found[i]);}",
  "for(var j=0;j<els.length;j++){",
  'if(els[j].hasAttribute("data-revealed")){continue;}',
  "if(io){io.observe(els[j]);}else{show(els[j]);}",
  "}",
  "}",
  "function init(){",
  'if("IntersectionObserver" in window){',
  "io=new IntersectionObserver(function(entries){",
  "for(var i=0;i<entries.length;i++){var e=entries[i];",
  "if(e.isIntersecting){show(e.target);io.unobserve(e.target);}}",
  '},{rootMargin:"-80px"});',
  "}",
  "watch(document);",
  'if("MutationObserver" in window){',
  "new MutationObserver(function(muts){",
  "for(var i=0;i<muts.length;i++){var added=muts[i].addedNodes;",
  "for(var j=0;j<added.length;j++){if(added[j].nodeType===1){watch(added[j]);}}}",
  "}).observe(d,{childList:true,subtree:true});",
  "}",
  "}",
  'if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",init);}else{init();}',
  "})();",
].join("");

const { about } = portfolioData;

const siteUrl = getSiteUrl();
const title = `${about.name} — ${about.role}`;

export const metadata = {
  ...(siteUrl && { metadataBase: new URL(siteUrl) }),
  title,
  description: about.bio,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${about.name} — Portfolio`,
    title,
    description: about.bio,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description: about.bio },
};

// Structured data for search engines. Only facts already published on the
// page: no invented employer, location or contact details.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: about.name,
  jobTitle: about.role,
  description: about.bio,
  ...(siteUrl && { url: siteUrl }),
  sameAs: [about.socials.github, about.socials.linkedin].filter(Boolean),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
