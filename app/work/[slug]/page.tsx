import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { ContactSection } from "@/components/Sections";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  return { title: p ? `${p.title} \u2014 Himavanth Ayyappa` : "Case study" };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p || !p.caseStudy) notFound();
  const cs = p.caseStudy!;
  return (
    <main>
      <Nav />
      <article className="mx-auto max-w-3xl px-5 py-12">
        <Link
          href="/#projects"
          className="font-mono text-[10px] tracking-wider text-dim hover:text-acid"
        >
          {"\u2190"} ALL PROJECTS
        </Link>
        <Reveal>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
              {p.title}
            </h1>
            {p.badge && (
              <span className="border border-[#3a3a20] px-2 py-0.5 font-mono text-[9px] tracking-wider text-acid">
                {p.badge.toUpperCase()}
              </span>
            )}
          </div>
          <p className="mt-2 font-mono text-[10px] tracking-wider text-dim">
            {p.period} {"\u00b7"} {p.tools.join(" \u00b7 ").toUpperCase()}
          </p>
        </Reveal>

        <Reveal>
          <section className="mt-9 border-l-2 border-acid pl-4">
            <h2 className="font-mono text-[10px] tracking-wider text-acid">
              THE PROBLEM
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-fog">
              {cs.problem}
            </p>
          </section>
        </Reveal>

        {cs.sections.map((s, i) => (
          <Reveal key={s.heading}>
            <section className="mt-8">
              <h2 className="font-mono text-[10px] tracking-wider text-dim">
                {String(i + 1).padStart(2, "0")} {"\u2014"}{" "}
                {s.heading.toUpperCase()}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-fog">
                {s.body}
              </p>
            </section>
          </Reveal>
        ))}

        <Reveal>
          <section className="mt-9 border border-line p-5">
            <h2 className="font-mono text-[10px] tracking-wider text-acid">
              RESULTS
            </h2>
            <ul className="mt-3 space-y-2">
              {cs.results.map((r) => (
                <li
                  key={r}
                  className="flex gap-2.5 text-[13px] leading-relaxed text-paper"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 bg-acid" />
                  {r}
                </li>
              ))}
            </ul>
            {p.links && (
              <div className="mt-4 flex gap-3">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10px] tracking-wider text-fog hover:text-acid"
                  >
                    {l.label.toUpperCase()} {"\u2197"}
                  </a>
                ))}
              </div>
            )}
          </section>
        </Reveal>
      </article>
      <div className="border-t border-line">
        <ContactSection />
      </div>
    </main>
  );
}
