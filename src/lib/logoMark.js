// The "Hook" J, drawn on a 64-unit grid so it scales to any icon size.
// `radius` is in the same grid units; 0 gives the full-bleed square iOS wants.
export function HookMark({ size, radius = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx={radius} fill="#4f46e5" />
      <path
        d="M42 15V37a12 12 0 0 1-24 0"
        fill="none"
        stroke="#ffffff"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="21" cy="16" r="5" fill="#c4b5fd" />
    </svg>
  );
}
