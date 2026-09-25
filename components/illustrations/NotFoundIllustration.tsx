export function NotFoundIllustration() {
  return (
    <svg
      viewBox="0 0 320 220"
      aria-hidden="true"
      className="h-44 w-full max-w-sm text-primary"
      role="img"
    >
      <rect
        x="30"
        y="78"
        width="140"
        height="90"
        rx="14"
        className="fill-primary/10"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M46 78h108l-16-26H62L46 78z"
        className="fill-background"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="66" cy="176" r="12" className="fill-background" stroke="currentColor" strokeWidth="2" />
      <circle cx="150" cy="176" r="12" className="fill-background" stroke="currentColor" strokeWidth="2" />

      <rect
        x="196"
        y="94"
        width="86"
        height="58"
        rx="12"
        className="fill-primary/5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M206 94h66l-10-18h-46l-10 18z"
        className="fill-background"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M200 46h78m-22-18 22 18-22 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="motion-safe:animate-pulse"
      />
      <path
        d="M236 164l14-14 14 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="288" cy="84" r="4" className="fill-primary/30 motion-safe:animate-pulse" />
      <circle cx="300" cy="74" r="3" className="fill-primary/20 motion-safe:animate-pulse" />
    </svg>
  );
}