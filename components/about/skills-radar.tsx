"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Palette, Server, Globe } from "lucide-react";
import { SlideIn } from "@/components/animations/SlideIn";

const skillsData = [
  { subject: "Frontend", A: 95, fullMark: 100 },
  { subject: "Backend", A: 85, fullMark: 100 },
  { subject: "UI/UX", A: 80, fullMark: 100 },
  { subject: "DevOps", A: 70, fullMark: 100 },
  { subject: "Database", A: 85, fullMark: 100 },
  { subject: "Architecture", A: 75, fullMark: 100 },
];

const specialties = [
  {
    title: "React & Next.js",
    description:
      "Building fast, optimized applications with modern React patterns.",
    icon: Code2,
    color: "text-cyan-500",
  },
  {
    title: "Full-Stack System",
    description:
      "End-to-end type safety from database schema to frontend components.",
    icon: Server,
    color: "text-purple-500",
  },
  {
    title: "Database Design",
    description:
      "Scalable data modeling with PostgreSQL and optimized queries.",
    icon: Database,
    color: "text-blue-500",
  },
  {
    title: "Web Performance",
    description: "Core Web Vitals optimization and bundle size reduction.",
    icon: Globe,
    color: "text-green-500",
  },
  {
    title: "Responsive UI",
    description: "Pixel-perfect implementation across all device sizes.",
    icon: Layout,
    color: "text-pink-500",
  },
  {
    title: "Design Systems",
    description: "Creating consistent, reusable component libraries.",
    icon: Palette,
    color: "text-orange-500",
  },
];

export function SkillsRadar() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[400px] flex items-center justify-center relative bg-secondary/20 rounded-3xl p-4 order-2 lg:order-1"
          >
            {/* Chart needs to be client-side rendered only to avoid hydration issues */}
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                <PolarGrid opacity={0.3} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} opacity={0} />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="var(--primary)"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                  }}
                  itemStyle={{ color: "var(--primary)" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Specialties Text */}
          <div className="order-1 lg:order-2">
            <SlideIn direction="up">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm mb-6">
                <Code2 className="h-4 w-4 text-primary" />
                Technical Expertise
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                A toolkit aimed at quality and speed
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I believe in using the right tool for the job. While my core
                stack is React-based, I'm constantly exploring new technologies
                to build better, faster, and more scalable applications.
              </p>
            </SlideIn>

            <div className="grid sm:grid-cols-2 gap-6">
              {specialties.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors"
                  >
                    <div
                      className={`shrink-0 h-10 w-10 rounded-lg bg-background flex items-center justify-center border border-border ${item.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
