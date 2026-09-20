// Server component. The reveal is driven entirely by the inline bootstrap
// in layout.js -- no client JavaScript, no framer-motion, and no hidden
// initial state in the server HTML. See the `.reveal` rules in globals.css
// for why the visible state is the default.
export default function Reveal({ children, delay = 0, className, y = 16 }) {
  const style = {};
  if (delay) style["--reveal-delay"] = `${delay}s`;
  if (y !== 16) style["--reveal-y"] = `${y}px`;

  return (
    <div
      className={className ? `reveal ${className}` : "reveal"}
      style={Object.keys(style).length ? style : undefined}
    >
      {children}
    </div>
  );
}
