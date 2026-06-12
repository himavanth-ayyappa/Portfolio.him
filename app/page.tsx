import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SkillGraph from "@/components/SkillGraph";
import Reveal from "@/components/Reveal";
import {
  WorkSection,
  ProjectsSection,
  LabSection,
  EducationSection,
  RecognitionStrip,
  ContactSection,
} from "@/components/Sections";
import { fetchRepos } from "@/lib/github";
import { profile } from "@/data/profile";

export default async function Home() {
  const repos = await fetchRepos(profile.githubUser);
  return (
    <main>
      <Nav />
      <Hero />
      <WorkSection />
      <ProjectsSection />
      <LabSection repos={repos} />
      <section id="skills" className="scroll-mt-16 border-b border-line">
        <Reveal>
          <div className="mx-auto max-w-5xl px-5 py-7">
            <div className="flex items-baseline justify-between font-mono text-[11px]">
              <p>
                <span className="text-acid">05</span>{" "}
                <span className="text-dim">SKILL GRAPH</span>
              </p>
              <p className="text-[10px] text-dim">
                HOVER TO TRACE {"\u00b7"} DRAG TO REARRANGE
              </p>
            </div>
            <SkillGraph />
          </div>
        </Reveal>
      </section>
      <EducationSection />
      <RecognitionStrip />
      <ContactSection />
    </main>
  );
}
