"use client";

import { motion } from "framer-motion";
import { MapPin, BookOpen, Download, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import Image from "next/image";
import Link from "next/link";

interface AboutHeroProps {
  introText?: string;
}

export function AboutHero({ introText }: AboutHeroProps) {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted relative z-10">
              <Image
                src="/MyPhoto.jpg"
                alt="Yousief Sameh"
                width={600}
                height={750}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-0"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-0"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 z-20 rounded-xl border border-border bg-card/90 backdrop-blur-sm p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Based in Egypt</div>
                  <div className="text-xs text-muted-foreground">
                    Available Worldwide
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm mb-6">
                <BookOpen className="h-4 w-4 text-primary" />
                About Me
              </div>
            </FadeIn>

            <SlideIn direction="up" delay={0.1}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Hi, I'm <span className="gradient-text">Yousief Sameh</span>
              </h1>
            </SlideIn>

            <SlideIn direction="up" delay={0.2}>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {introText || (
                  <>
                    <p>
                      I’m Yousief Sameh, a front-end engineer specialized in building modern web applications using React and Next.js. I enjoy turning 
                      complex ideas into clear, elegant interfaces that balance performance with visual clarity.
                    </p>
                    <p>
                      What drives me is continuous growth — technically and personally. I’m always learning, refining my process, and pushing my limits 
                      to deliver work that feels professional, reliable, and thoughtfully engineered.
                    </p>
                  </>
                )}
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    size: "lg",
                    className: "gap-2 btn-shimmer",
                  })}
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </Link>
                <Link
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "gap-2",
                  })}
                  href="/contact"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}
