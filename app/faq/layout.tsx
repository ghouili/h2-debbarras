import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";
import { JsonLd } from "@/components/seo/json-ld";

const faqQuestions = siteConfig.faqs.flatMap((category) => category.questions);

export const metadata: Metadata = {
  title: `FAQ debarras et demenagement | ${siteConfig.name}`,
  description:
    "Questions frequentes sur nos services de debarras et demenagement en Ile-de-France. Trouvez des reponses rapides et claires.",
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
  openGraph: {
    title: `FAQ debarras et demenagement | ${siteConfig.name}`,
    description:
      "Questions frequentes sur nos services de debarras et demenagement en Ile-de-France.",
    url: `${siteConfig.url}/faq`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FaqLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd type="faq" data={{ questions: faqQuestions }} />
      {children}
    </>
  );
}
