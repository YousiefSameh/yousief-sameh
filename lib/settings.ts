import { createClient } from "@/lib/supabase/server";
import { SiteSettings } from "@/lib/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient(); // Fixed await
  const { data } = await supabase.from("site_settings").select("*");

  const defaultSettings: SiteSettings = {
    hero_headline: "",
    hero_subtext: "",
    about_intro: "",
    contact_email: "",
    contact_whatsapp: "",
    github_url: "",
    linkedin_url: "",
    twitter_url: "",
  };

  if (!data) return defaultSettings;

  const settingsMap: Record<string, string> = {};
  data.forEach((item) => {
    settingsMap[item.key] = item.value || "";
  });

  return {
    hero_headline: settingsMap.hero_headline || defaultSettings.hero_headline,
    hero_subtext: settingsMap.hero_subtext || defaultSettings.hero_subtext,
    about_intro: settingsMap.about_intro || defaultSettings.about_intro,
    contact_email: settingsMap.contact_email || defaultSettings.contact_email,
    contact_whatsapp:
      settingsMap.contact_whatsapp || defaultSettings.contact_whatsapp,
    github_url: settingsMap.github_url || defaultSettings.github_url,
    linkedin_url: settingsMap.linkedin_url || defaultSettings.linkedin_url,
    twitter_url: settingsMap.twitter_url || defaultSettings.twitter_url,
  };
}
