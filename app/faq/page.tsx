import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { siteConfig } from "@/lib/config"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Questions fréquentes (FAQ)",
  description: "Trouvez les réponses à toutes vos questions sur nos services de débarras en Île-de-France.",
}

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">Questions Fréquentes</h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {siteConfig.faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-pretty text-muted-foreground">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold">Vous ne trouvez pas votre réponse ?</h2>
            <p className="mb-6 text-muted-foreground">Notre équipe est là pour répondre à toutes vos questions</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Nous contacter</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>Appelez-nous</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
