"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[300px] w-[800px] rounded-full bg-primary/5 blur-3xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600"></span>
              </span>
              Available for new projects
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance"
            >
              Building{" "}
              <span className="relative inline-block">
                <span className="gradient-text bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  high-quality
                </span>
              </span>{" "}
              web experiences
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed text-pretty mx-auto lg:mx-0"
            >
              A young, ambitious engineer turning complex problems into elegant
              solutions. Specializing in React, Next.js, and full-stack
              development with a focus on performance and user experience.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="gap-2 btn-shimmer group shadow-lg"
                >
                  <Link href="/projects">
                    View Projects
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="gap-2 bg-transparent"
                >
                  <Link href="/contact">
                    <Download className="h-4 w-4" />
                    Hire Me
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8"
            >
              <div className="group">
                <motion.div
                  className="text-3xl font-bold text-foreground"
                  whileHover={{ scale: 1.1, color: "var(--primary)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  3+
                </motion.div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="group">
                <motion.div
                  className="text-3xl font-bold text-foreground"
                  whileHover={{ scale: 1.1, color: "var(--primary)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  20+
                </motion.div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </div>
              <div className="group">
                <motion.div
                  className="text-3xl font-bold text-foreground"
                  whileHover={{ scale: 1.1, color: "var(--primary)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  100%
                </motion.div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Client Satisfaction
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main image */}
              <motion.div
                className="relative aspect-square overflow-hidden rounded-3xl bg-muted shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/MyPhoto.jpg"
                  alt="Yousief Sameh"
                  width={500}
                  height={500}
                  priority
                  className="h-full w-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
              </motion.div>

              {/* Floating cards */}
              <motion.div
                className="absolute -left-4 top-1/4 rounded-xl border border-border bg-card/80 backdrop-blur-sm p-3 shadow-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold">Full-Stack</div>
                    <div className="text-muted-foreground">Developer</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-1/4 rounded-xl border border-border bg-card/80 backdrop-blur-sm p-3 shadow-lg"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                    <span className="text-lg">🚀</span>
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold">Fast Delivery</div>
                    <div className="text-muted-foreground">Quality Code</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
