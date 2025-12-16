"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";
import { SiteSettings } from "@/lib/types";

export function ContactSocials({ settings }: { settings: SiteSettings }) {
  const socialLinks = [
    {
      name: "Email",
      value: settings.contact_email || "Contact me via email",
      href: `mailto:${settings.contact_email}`,
      icon: Mail,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      name: "WhatsApp",
      value: settings.contact_whatsapp || "Chat on WhatsApp",
      href: `https://wa.me/${settings.contact_whatsapp?.replace(
        /[^0-9]/g,
        ""
      )}`,
      icon: MessageSquare, // Need to import MessageSquare or Phone
      color: "bg-green-500/10 text-green-500",
    },
    {
      name: "LinkedIn",
      value: "yousiefsameh",
      href: settings.linkedin_url,
      icon: Linkedin,
      color: "bg-blue-700/10 text-blue-700",
    },
    {
      name: "GitHub",
      value: "yousiefsameh",
      href: settings.github_url,
      icon: Github,
      color: "bg-zinc-800/10 text-zinc-800 dark:text-zinc-200",
    }
  ];
  return (
    <div className="space-y-8">
      {/* Location & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="font-semibold">Location</span>
          </div>
          <p className="text-sm text-muted-foreground ml-11">Egypt (Remote)</p>
        </div>
        <div className="p-4 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Clock className="w-5 h-5" />
            </div>
            <span className="font-semibold">Timezone</span>
          </div>
          <p className="text-sm text-muted-foreground ml-11">GMT+2 (Cairo)</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="grid gap-4">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-md hover:scale-[1.02]"
          >
            <div
              className={`p-3 rounded-xl ${link.color} transition-colors group-hover:bg-primary group-hover:text-primary-foreground`}
            >
              <link.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold text-foreground">{link.name}</div>
              <div className="text-sm text-muted-foreground">{link.value}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
