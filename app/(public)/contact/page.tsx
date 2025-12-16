import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactSocials } from "@/components/contact/contact-socials";
import { FadeIn } from "@/components/animations/FadeIn";

import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contact | Yousief Sameh",
  description:
    "Get in touch to discuss your project. Let's build something amazing together.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <MainLayout>
      <section className="pb-20 sm:pb-28 min-h-screen">
        <ContactHero />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Socials Column */}
            <div className="lg:col-span-5 lg:order-2 space-y-8">
              <FadeIn delay={0.2}>
                <div className="sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Connect with me</h2>
                  <ContactSocials settings={settings} />

                  {/* FAQ Mini Section */}
                  <div className="mt-12 p-6 rounded-2xl bg-secondary/30 border border-border">
                    <h3 className="font-semibold mb-2">
                      Looking for a quick chat?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The fastest way to reach me for urgent matters is via
                      WhatsApp or a direct DM on Twitter.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 lg:order-1">
              <FadeIn delay={0.2}>
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl shadow-primary/5">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Send a Message</h2>
                    <p className="text-muted-foreground mt-2">
                      Tell me about your project, timeline, and budget. I'll get
                      back to you with a proposal.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
