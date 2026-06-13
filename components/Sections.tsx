import Link from "next/link";
import { SectionShell } from "./SectionShell";
import { experience, profile, recognition } from "@/data/profile";
import { projects } from "@/data/projects";
import { education, labManual, labBadges, LabEntry } from "@/data/lab";
import type { Repo } from "@/lib/github";

export function WorkSection() {
  return (
    <SectionShell id="work" code="01" label="WORK" meta={experience[0].period}>
      {experience.map((e) => (
        <div key={e.org}>
          <h2 className="font-display text-lg font-medium text-paper">
            {e.org}
          </h2>
          <p className="mt-0.5 font-mono text-[11px] text-acid">{e.role}</p>
          <ul className="mt-3 space-y-2">
            {e.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-[13px] leading-relaxed text-fog">
                <span className="mt-[7px] h-1 w-1 shrink-0 bg-acid" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </SectionShell>
  );
}

export function ProjectsSection() {
  return (
    <SectionShell id="projects" code="02" label="PROJECTS" meta="2024—26">
      <div className="divide-y divide-line">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="row-hover group -mx-3 block px-3 py-4 first:pt-0 last:pb-0"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="font-display text-base font-medium text-paper group-hover:text-acid">
                {p.title}
              </h3>
              {p.badge && (
                <span className="border border-[#3a3a20] px-2 py-0.5 font-mono text-[9px] tracking-wider text-acid">
                  {p.badge.toUpperCase()}
                </span>
              )}
              <span className="ml-auto hidden font-mono text-[10px] text-dim sm:inline">
                {p.period}
              </span>
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-fog">
              {p.oneLiner}
            </p>
            <p className="mt-2 font-mono text-[10px] text-dim">
              {p.tools.join(" \u00b7 ")}{" "}
              <span className="text-acid opacity-0 transition-opacity group-hover:opacity-100">
                {" \u2014 case study \u2192"}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}

export function LabSection({ repos }: { repos: Repo[] }) {
  const manual: LabEntry[] = labManual;
  return (
    <SectionShell id="lab" code="03" label="LAB" meta="ONGOING">
      <p className="text-[12px] text-fog">
        Vibe-coded, no-code/low-code and mini builds.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
        {manual.map((m) => (
          <a
            key={m.name}
            href={m.href || profile.github}
            target="_blank"
            rel="noreferrer"
            className="group border border-line p-3.5 transition-colors hover:border-acid"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-[12px] text-paper group-hover:text-acid">
                {m.name}
              </p>
              {m.badge && (
                <span className="border border-[#3a3a20] px-1.5 py-0.5 font-mono text-[8px] tracking-wider text-acid">
                  {m.badge.toUpperCase()}
                </span>
              )}
            </div>
            <p className="mt-1 line-clamp-2 text-[11px] text-fog">{m.blurb}</p>
            <p className="mt-2 font-mono text-[9px] tracking-wider text-dim">
              {m.tag.toUpperCase()}
            </p>
          </a>
        ))}
        {repos.map((r) => (
          <a
            key={r.name}
            href={r.html_url}
            target="_blank"
            rel="noreferrer"
            className="group border border-line p-3.5 transition-colors hover:border-acid"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-[12px] text-paper group-hover:text-acid">
                {r.name}
              </p>
              {labBadges[r.name] && (
                <span className="border border-[#3a3a20] px-1.5 py-0.5 font-mono text-[8px] tracking-wider text-acid">
                  {labBadges[r.name].toUpperCase()}
                </span>
              )}
            </div>
            <p className="mt-1 line-clamp-2 text-[11px] text-fog">
              {r.description || "No description yet."}
            </p>
            <p className="mt-2 font-mono text-[9px] tracking-wider text-dim">
              {(r.language || "code").toUpperCase()}
              {r.stargazers_count > 0 && ` \u00b7 \u2605 ${r.stargazers_count}`}
            </p>
          </a>
        ))}
      </div>
      {repos.length === 0 && (
        <p className="mt-3 font-mono text-[10px] text-dim">
          {/* GITHUB SYNC UNAVAILABLE AT BUILD TIME {"\u2014"} SHOWING MANUAL
          ENTRIES ONLY */}
        </p>
      )}
    </SectionShell>
  );
}

export function EducationSection() {
  return (
    <SectionShell id="education" code="04" label="EDU" meta="2021—27">
      <div className="space-y-3.5">
        {education.map((e) => (
          <div key={e.title}>
            <p className="font-display text-[14px] font-medium text-paper">
              {e.title}
            </p>
            <p className="font-mono text-[10px] text-dim">
              {e.detail} {"\u00b7"} {e.period}
              {"credentialUrl" in e &&
                (e.credentialUrl ? (
                  <>
                    {" \u00b7 "}
                    <a
                      // href={e.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-acid hover:underline"
                    >
                      CREDENTIAL {"\u2197"}
                    </a>
                  </>
                ) : (
                  <span> {"\u00b7"} CREDENTIAL LINK PENDING</span>
                ))}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function RecognitionStrip() {
  return (
    <div className="border-b border-line">
      <div className="mx-auto flex max-w-5xl flex-col justify-between gap-1 px-5 py-3 font-mono text-[10px] tracking-wider sm:flex-row">
        <span className="text-dim">RECOGNITION</span>
        <span className="text-fog">
          {recognition.map((r) => r.toUpperCase()).join(" \u00b7 ")}
        </span>
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <footer id="contact" className="scroll-mt-16">
      <div className="mx-auto flex max-w-5xl flex-col justify-between gap-4 px-5 py-9 sm:flex-row sm:items-center">
        <p className="font-display text-2xl font-medium text-paper">
          Let{"'"}s build something<span className="text-acid">_</span>
        </p>
        <div className="flex gap-5 font-mono text-[10px] tracking-wider text-fog">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-acid"
          >
            GITHUB {"\u2197"}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-acid"
          >
            LINKEDIN {"\u2197"}
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-acid">
            EMAIL {"\u2197"}
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-5xl px-5 py-3 font-mono text-[9px] tracking-wider text-dim">
          {"\u00a9"} {new Date().getFullYear()} {profile.fullName.toUpperCase()}
          {" \u00b7 BUILT WITH NEXT.JS \u00b7 HYDERABAD, IN"}
        </p>
      </div>
    </footer>
  );
}
