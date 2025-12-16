"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, Heart, Rocket } from "lucide-react";
import { SlideIn } from "@/components/animations/SlideIn";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
import Image from "next/image";

export function BrandStory() {
  return (
    <section className="py-12 sm:py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Content */}
          <SlideIn direction="right">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm mb-6">
                <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                <span className="font-medium">My Story</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Passion meets purpose
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I started my journey in tech at a young age, driven by pure curiosity and a desire to understand how things work behind the screen. 											
                  What began as simple experiments quickly turned into a passion for building real, usable products that people actually enjoy using.
                </p>
                <p>
                  Over time, I specialized in front-end development, focusing on React and modern web technologies. I learned that great software isn’t 
                  just about code — it’s about performance, clarity, and crafting experiences that feel smooth, fast, and intentional.
                </p>
                <p>
                  Today, I’m continuously evolving as an engineer, working on real-world projects, collaborating with clients, and building systems—not 
                  just websites. I believe that age is not a limitation, but a competitive advantage when paired with discipline, learning, and 
                  consistency.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="text-center p-4 rounded-xl bg-background border border-border"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 mb-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium">Innovative</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="text-center p-4 rounded-xl bg-background border border-border"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 mb-2">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-sm font-medium">Passionate</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="text-center p-4 rounded-xl bg-background border border-border"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 mb-2">
                    <Rocket className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium">Fast</div>
                </motion.div>
              </div>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Read more about my journey →
                </Link>
              </div>
            </div>
          </SlideIn>

          {/* Image */}
          <ParallaxSection offset={30}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-2xl">
                <Image
                  src="/workspace.jpeg"
                  alt="Workspace"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                className="absolute -bottom-6 -right-6 rounded-xl border border-border bg-card/90 backdrop-blur-sm p-4 shadow-xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground">Dedication</div>
              </motion.div>
            </motion.div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  );
}
