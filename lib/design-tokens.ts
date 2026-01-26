// Design tokens for consistent styling across the site
export const designTokens = {
  spacing: {
    section: {
      sm: "py-12 md:py-16",
      md: "py-16 md:py-20 lg:py-24",
      lg: "py-20 md:py-28 lg:py-32",
    },
    container: {
      sm: "px-4 sm:px-6",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
    },
  },
  radius: {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    full: "rounded-full",
  },
  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg shadow-black/5",
    xl: "shadow-xl shadow-black/10",
    "2xl": "shadow-2xl shadow-black/10",
    glow: "shadow-lg shadow-primary/25",
  },
  button: {
    // Primary CTA with gradient: Royal → Ocean → Sky
    primary:
      "bg-gradient-to-r from-primary-600 via-primary-400 to-primary-300 text-primary-foreground hover:from-primary-700 hover:via-primary-500 hover:to-primary-400 shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5",
    // Solid primary (Royal Blue)
    primarySolid:
      "bg-primary text-primary-foreground hover:bg-primary-700 shadow-md shadow-primary/20 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
    secondary: "border-2 border-primary/25 hover:border-primary/50 hover:bg-primary-50 transition-all duration-200",
    sizes: {
      sm: "h-9 px-4 text-sm",
      md: "h-10 px-5 text-sm",
      lg: "h-11 px-6 text-sm",
      xl: "h-12 px-8 text-base",
    },
  },
  card: {
    default: "bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200",
    hover: "hover:border-primary/30 hover:-translate-y-1",
    interactive: "cursor-pointer hover:shadow-lg hover:shadow-primary/15",
  },
  gradient: {
    // New Palette: Royal Blue (#134BF2) → Ocean (#0C87F2) → Sky (#1BA0F2)
    primary: "bg-gradient-to-r from-primary-600 via-primary-400 to-primary-300",
    subtle: "bg-gradient-to-br from-primary-50 via-background to-primary-100",
    hero: "bg-gradient-to-br from-primary-50 via-background to-primary-100/50",
    cta: "bg-gradient-to-r from-primary-600 via-primary-400 to-primary-300",
    // Text gradient utility
    text: "bg-gradient-to-r from-primary-600 via-primary-400 to-primary-300 bg-clip-text text-transparent",
  },
  noise: {
    light:
      "relative before:absolute before:inset-0 before:bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03' /%3E%3C/svg%3E\")] before:pointer-events-none before:opacity-50",
  },
  typography: {
    h1: "font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight",
    h2: "font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
    h3: "font-heading text-xl sm:text-2xl font-bold tracking-tight",
    h4: "font-heading text-lg sm:text-xl lg:text-2xl font-semibold",
    lead: "text-base sm:text-lg text-muted-foreground",
    body: "text-[15px] sm:text-base leading-relaxed",
  },
} as const
