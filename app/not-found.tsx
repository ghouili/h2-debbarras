// import type { Metadata } from "next";
// import Link from "next/link";
// import { ArrowRight, Home, Phone } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { PageContainer } from "@/components/layout/page-container";
// import { Section } from "@/components/layout/section";
// import { designTokens } from "@/lib/design-tokens";
// import { siteConfig } from "@/lib/config";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
 
// export const metadata: Metadata = {
//   title: "404 — Page introuvable | Débarras Auréa",
//   robots: { index: false, follow: true },
// };

// export default function NotFound() {
//   const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

//   return (
//     <main className="min-h-screen">
//       {/* Keep top padding because header is fixed */}
//       <Section className="h-full ">
//         <div className="relative overflow-hidden bg-linear-to-br from-primary-50 via-background to-primary-100/60">
//           {/* Decorative blobs */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/12 blur-3xl"
//           />
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
//           />

//           {/* <PageContainer className="py-10 sm:py-12"> */}
//           <PageContainer className="py-10 sm:py-12">
//             <Card className="border-border/60 bg-white/85 backdrop-blur-sm shadow-2xl shadow-black/10">
//               <CardContent className="p-4 sm:p-6 md:p-8">
//                 <div className="grid gap-8 md:grid-cols-2 md:items-center">
//                   {/* LEFT */}
//                   <div className="space-y-4">
//                     <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-semibold text-primary">
//                       <span className="opacity-90">404</span>
//                       <span className="h-1 w-1 rounded-full bg-primary/50" />
//                       <span className="opacity-90">Page introuvable</span>
//                     </div>

//                     <h1
//                       className={cn(
//                         designTokens.typography.h1,
//                         // clamp-like sizing for 320px → desktop
//                         "text-balance text-[clamp(1.6rem,6vw,2.6rem)] leading-tight",
//                       )}
//                     >
//                       Oups… cette page a disparu
//                     </h1>

//                     <p
//                       className={cn(
//                         designTokens.typography.lead,
//                         "text-pretty text-sm sm:text-base text-muted-foreground",
//                       )}
//                     >
//                       La page que vous cherchez n’existe pas (ou a été
//                       déplacée). Pas de souci : on vous remet sur la bonne
//                       route.
//                     </p>

//                     <p className="text-xs text-muted-foreground">
//                       Débarras et déménagement • Devis gratuit • Intervention
//                       24 à 48 h • Île-de-France
//                     </p>

//                     {/* CTAs */}
//                     <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center">
//                       <Button
//                         size="lg"
//                         className={cn(
//                           designTokens.button.primary,
//                           "h-11 w-full sm:w-auto px-4 sm:px-5",
//                         )}
//                         asChild
//                       >
//                         <Link href="/devis">
//                           Demander un devis
//                           <ArrowRight
//                             className="ml-2 h-4 w-4"
//                             aria-hidden="true"
//                           />
//                         </Link>
//                       </Button>

//                       <Button
//                         size="lg"
//                         variant="outline"
//                         className={cn(
//                           designTokens.button.secondary,
//                           "h-11 w-full sm:w-auto px-4 sm:px-5",
//                         )}
//                         asChild
//                       >
//                         <Link href="/">
//                           Accueil
//                           <Home className="ml-2 h-4 w-4" aria-hidden="true" />
//                         </Link>
//                       </Button>
//                     </div>

//                     {/* Quick links */}
//                     <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
//                       <Link
//                         href="/services"
//                         className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
//                       >
//                         Voir nos services
//                       </Link>
//                       <span className="text-muted-foreground">•</span>
//                       <Link
//                         href="/zones"
//                         className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
//                       >
//                         Zones d’intervention
//                       </Link>
//                       <span className="text-muted-foreground">•</span>
//                       <Link
//                         href="/contact"
//                         className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
//                       >
//                         Contact
//                       </Link>
//                     </div>

//                     {/* Help card */}
//                     <div className="rounded-2xl border border-border/60 bg-background/70 p-3 sm:p-4">
//                       <p className="text-xs text-muted-foreground">
//                         Besoin d’aide rapide ?
//                       </p>
//                       <a
//                         href={phoneHref}
//                         className="mt-2 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
//                       >
//                         <Phone className="h-4 w-4" aria-hidden="true" />
//                         Appeler maintenant
//                       </a>
//                     </div>
//                   </div>

//                   <div className="border ">
//                     <Image
//                     className="  w-[80vw] h-auto"
//                       src="/not-found-img.png"
//                       alt="Description"
//                       width={420}
//                       height={300}
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </PageContainer>
//         </div>
//       </Section>
//     </main>
//   );
// }


import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";
import { designTokens } from "@/lib/design-tokens";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "404 — Page introuvable | Débarras Auréa",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

  return (
    <main className="min-h-screen w-full">
      <div className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-primary-50 via-background to-primary-100/60">
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />

        {/* Center content vertically and remove “dead” space */}
        <PageContainer className="flex min-h-screen items-center py-0">
          <Card className="w-full border-border/60 bg-white/85 backdrop-blur-sm shadow-2xl shadow-black/10">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                {/* LEFT */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-semibold text-primary">
                    <span className="opacity-90">404</span>
                    <span className="h-1 w-1 rounded-full bg-primary/50" />
                    <span className="opacity-90">Page introuvable</span>
                  </div>

                  <h1
                    className={cn(
                      designTokens.typography.h1,
                      "text-balance text-[clamp(1.6rem,6vw,2.8rem)] leading-tight",
                    )}
                  >
                    Oups… cette page a disparu
                  </h1>

                  <p
                    className={cn(
                      designTokens.typography.lead,
                      "text-pretty text-sm sm:text-base text-muted-foreground",
                    )}
                  >
                    La page que vous cherchez n’existe pas (ou a été déplacée).
                    Pas de souci : on vous remet sur la bonne route.
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Débarras & déménagement • Devis gratuit • Intervention 24–48h • Île-de-France
                  </p>

                  {/* CTAs */}
                  <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center">
                    <Button
                      size="lg"
                      className={cn(
                        designTokens.button.primary,
                        "h-11 w-full sm:w-auto px-4 sm:px-5",
                      )}
                      asChild
                    >
                      <Link href="/devis">
                        Demander un devis
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className={cn(
                        designTokens.button.secondary,
                        "h-11 w-full sm:w-auto px-4 sm:px-5",
                      )}
                      asChild
                    >
                      <Link href="/">
                        Accueil
                        <Home className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>

                  {/* Quick links */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                    <Link
                      href="/services"
                      className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      Voir nos services
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link
                      href="/zones"
                      className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      Zones d’intervention
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link
                      href="/contact"
                      className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      Contact
                    </Link>
                  </div>

                  {/* Help card */}
                  <div className="rounded-2xl border border-border/60 bg-background/70 p-3 sm:p-4">
                    <p className="text-xs text-muted-foreground">Besoin d’aide rapide ?</p>
                    <a
                      href={phoneHref}
                      className="mt-2 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Appeler maintenant
                    </a>
                  </div>
                </div>

                {/* RIGHT (illustration) */}
                <div className="hidden md:flex items-center justify-center md:justify-end">
                  <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-border/60 bg-white/60 p-3 sm:p-4">
                    <Image
                      src="/not-found-img.png"
                      alt="Illustration Débarras Auréa : camion et cartons"
                      width={520}
                      height={390}
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 520px"
                      className="h-auto w-full object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </PageContainer>
      </div>
    </main>
  );
}
