"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Palette,
  Rocket,
  Zap,
  Brain,
  Star,
} from "lucide-react";
import { SlideIn } from "@/components/animations/SlideIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";

const skills = [
  {
    category: "Frontend Development",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend Development",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    items: ["Node.js", "PostgreSQL", "Supabase", "API Design"],
  },
  {
    category: "UI/UX Design",
    icon: Palette,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    items: ["Figma", "Responsive Design", "Animations", "User Research"],
  },
  {
    category: "DevOps & Tools",
    icon: Rocket,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    items: ["Git", "Docker", "Vercel", "CI/CD"],
  },
];

const learning = [
  "Three.js",
  "WebGL",
  "Framer Motion",
  "Advanced TypeScript",
  "System Design",
];

export function SkillsSection() {
  return (
    <section className="py-12 sm:py-20 bg-secondary/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <SlideIn direction="up">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-medium">Skills & Expertise</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The tools I use to build
            </h2>
            <p className="mt-4 text-muted-foreground">
              Constantly evolving my skillset to deliver cutting-edge solutions
            </p>
          </div>
        </SlideIn>

        {/* Skills Grid */}
        <StaggerChildren
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.1}
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <StaggerItem key={skill.category}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group relative h-full rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-xl"
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-5"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, var(--primary), var(--accent))`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className={`relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${skill.bgColor} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon
                      className={`h-6 w-6 text-primary`}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Category */}
                  <h3 className="relative text-lg font-semibold mb-4">
                    {skill.category}
                  </h3>

                  {/* Skills List */}
                  <ul className="relative space-y-2">
                    {skill.items.map((item) => (
                      <motion.li
                        key={item}
                        className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground"
                        whileHover={{ x: 4 }}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        {/* Currently Learning Card */}
        <SlideIn direction="up" delay={0.4}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="mt-8 rounded-2xl border border-dashed border-border bg-gradient-to-br from-card/50 to-secondary/30 p-6 backdrop-blur-sm transition-all duration-700 hover:border-primary/50 hover:shadow-lg"
          >
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Currently Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Expanding my knowledge
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {learning.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className="group relative rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 text-sm font-medium text-foreground border border-border/50 transition-all duration-300 hover:shadow-lg hover:border-primary/30 cursor-default"
                  >
                    <Star className="absolute -right-1 -top-1 h-3 w-3 text-yellow-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </SlideIn>
      </div>
    </section>
  );
}
