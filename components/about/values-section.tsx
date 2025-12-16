"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, Heart, Users } from "lucide-react";
import { SlideIn } from "@/components/animations/SlideIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";

const values = [
  {
    icon: Target,
    title: "Discipline Over Talent",
    description:
      "I believe consistent effort and deliberate practice beat natural ability. Every day is an opportunity to improve.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "Technology evolves fast. I dedicate time daily to learning new concepts, tools, and best practices.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Heart,
    title: "Quality First",
    description:
      "I don't cut corners. Every project gets my full attention to detail, from code quality to user experience.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Users,
    title: "Clear Communication",
    description:
      "Great projects are built on great communication. I keep clients informed and involved throughout.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

export function ValuesSection() {
  return (
    <section className="py-20 sm:py-28 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SlideIn direction="up">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm mb-4">
              <Heart className="h-4 w-4 text-primary" />
              Values
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What I Stand For
            </h2>
            <p className="mt-4 text-muted-foreground">
              The principles that guide my work and interactions
            </p>
          </div>
        </SlideIn>

        <StaggerChildren className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <StaggerItem key={value.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-xl group"
                >
                  <div
                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${value.bg} transition-transform group-hover:scale-110`}
                  >
                    <Icon className={`h-6 w-6 ${value.color}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
