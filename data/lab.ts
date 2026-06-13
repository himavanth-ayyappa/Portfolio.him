export type LabEntry = {
  name: string;
  blurb: string;
  href?: string;
  tag: string; // build method: no-code / low-code / vibe-coded
  badge?: string; // category: prototype / mini-project / poc / experiment
};

// Manual entries for vibe-coded / no-code / low-code builds that
// don't live on GitHub. Edit freely \u2014 these merge with the
// auto-synced GitHub repos in the Lab section.

export const labManual: LabEntry[] = [
  {
    name: "Kochi-metro-ops",
    blurb: "The KMRL Fleet Induction Intelligence ---This was a quick prototype built to demonstrate an AI-driven decision-support dashboard designed to optimize Kochi Metro's daily train scheduling. It automates fleet availability by tracking maintenance job cards, cleaning slots, mileage limits, and advertising exposure to prevent scheduling bottlenecks.",
    href: "https://opskochimetroin.vercel.app/",
    tag: "low-code",
    badge: "prototype"
  },
  
];
// Category badge for auto-synced GitHub repos. Key = exact repo name,
// value = badge label (e.g. "prototype", "mini-project", "poc",
// "experiment"). Repos not listed here render without a badge.
export const labBadges: Record<string, string> = {
  // "exact-repo-name": "prototype",
};

// Repos to hide from the auto-synced Lab grid (exact repo names).
export const labExclude: string[] = [ "port_LLM","Portfolio.him","SIH---Forecasting_Future_Water_Requirements___-ML-","_SIH---Forecasting_Future_Storage_Capacities_In_Reservoir","Face_ExpressionTracker---Dyslexic","offline--LLM-assistant"];


export const education = [
  {
    title: "B.Tech CSD \u2014 Keshav Memorial Institute of Technology",
    detail: "Computer Science & Data Science \u00b7 CGPA 8.55",
    period: "2023\u201427",
  },
  {
    title: "BSc in Data Science \u2014 IIT Madras",
    detail: "Online  \u00b7 CGPA 8",
    period: "2023\u2014 present",
    // credentialUrl: "", // paste credential link here when ready
  },
  {
    title: "Intermediate (MPC) \u2014 Narayana Junior College",
    detail: "Board of Intermediate Education, Telangana \u00b7 93%",
    period: "2021\u201423",
  },
];
