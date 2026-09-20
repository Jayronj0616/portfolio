import Reveal from "@/components/Reveal";

// The hero sits above the fold, so the observer marks it revealed on its
// first pass and this reads as an on-load animation rather than a scroll
// one. Kept as its own component so the hero can carry a longer travel
// than the sections below it.
export default function HeroReveal({ children, delay = 0, className }) {
  return (
    <Reveal delay={delay} className={className} y={20}>
      {children}
    </Reveal>
  );
}
