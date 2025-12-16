"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Calendar, Briefcase } from "lucide-react";
import { SlideIn } from "@/components/animations/SlideIn";

const journey = [
  {
    year: "2025",
    title: "Building My Own Systems",
    description:
      "Started building advanced projects like a full personal portfolio system, client portals, and SaaS-style ideas, aiming to combine engineering, design, and structure into one cohesive workflow.",
    icon: Rocket,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    year: "2024",
    title: "Real Projects & Real Responsibility",
    description:
      "Worked on multiple client and personal projects, learning how real-world development works: deadlines, requirements, and problem-solving under pressure.",
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    year: "2023",
    title: "Falling in Love with Frontend",
    description:
      "Discovered React and modern frontend development. Began building real projects instead of small demos, focusing on clean UI and user experience.",
    icon: Briefcase,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    year: "2022",
    title: "First Steps into Programming",
    description:
      "Started learning the basics of programming and web development out of curiosity, exploring HTML, CSS, and simple JavaScript concepts.",
    icon: Calendar,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="py-20 sm:py-28 bg-secondary/30 overflow-hidden"
      ref={containerRef}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SlideIn direction="up">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm mb-4">
              <Rocket className="h-4 w-4 text-primary" />
              My Journey
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The Path So Far
            </h2>
            <p className="mt-4 text-muted-foreground">
              A timeline of my growth as a developer
            </p>
          </div>
        </SlideIn>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-accent to-primary"
              style={{ height: "100%", scaleY, transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-12">
            {journey.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center md:justify-between ${
                    isEven ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[45%] ${
                      isEven ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-lg relative group"
                    >
                      <div
                        className={`absolute top-6 ${
                          isEven
                            ? "right-0 translate-x-1/2 md:-right-3 md:translate-x-0"
                            : "-left-3"
                        } w-6 h-6 bg-card border-t border-r border-border transform rotate-45 hidden md:block group-hover:border-primary/50 transition-colors`}
                      />

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${item.bg} ${item.color}`}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center h-8 w-8 rounded-full border-4 border-background bg-primary shadow-lg z-10 md:h-10 md:w-10">
                    <Icon className="h-3 w-3 text-primary-foreground md:h-4 md:w-4" />
                  </div>

                  {/* Empty Space for Grid */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
