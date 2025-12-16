"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/animations/SlideIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import type { Service } from "@/lib/types";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  // Safe icon resolver
  const getIcon = (iconName: string = "Code") => {
    // @ts-ignore - Dynamic access to Lucide icons
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.Code;
  };

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <SlideIn direction="up">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Services I Offer
            </h2>
            <p className="mt-4 text-muted-foreground">
              From concept to deployment, I help bring your ideas to life
            </p>
          </div>
        </SlideIn>

        {/* Services Grid */}
        <StaggerChildren className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const IconComponent = getIcon(service.icon_name);
            return (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className="group relative h-full rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-2xl"
                >
                  {/* Gradient Glow on Hover */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 transition-opacity group-hover:opacity-100 blur-xl" />

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                    >
                      <IconComponent className="h-6 w-6" strokeWidth={2} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {service.short_description}
                    </p>

                    <Link href="/contact" className="inline-flex">
                      <motion.div
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
                        whileHover={{ x: 4 }}
                      >
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        {/* CTA */}
        <SlideIn direction="up" delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Need something custom?</p>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                Let's discuss your project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}
