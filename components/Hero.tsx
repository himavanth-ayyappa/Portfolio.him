import NodeField from "./NodeField";
import Scramble from "./Scramble";
import { metrics, profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="relative mx-auto max-w-5xl overflow-hidden px-5 pb-10 pt-16 sm:pt-24">
        <NodeField />
        <div className="pointer-events-none relative">
          <h1 className="font-display text-[15vw] font-semibold leading-[0.95] tracking-tight text-paper sm:text-7xl md:text-8xl">
            <Scramble text="HIMAVANTH" />
            <br />
            <Scramble text="AYYAPPA" delay={250} />
            <span className="text-acid">*</span>
          </h1>
          <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <p className="max-w-md text-sm leading-relaxed text-fog">
              <span className="text-acid">*</span>
              {profile.tagline}
            </p>
            <p className="font-mono text-[10px] tracking-wider text-dim sm:text-right">
              {profile.coords}
              <br />
              SCROLL {"\u2193"}
            </p>
          </div>
        </div>
        <div className="pointer-events-auto relative mt-9 flex flex-wrap gap-2.5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="border border-line px-4 py-2 font-mono text-[11px] text-fog transition-colors hover:border-acid hover:text-acid"
          >
            GITHUB {"\u2197"}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="border border-line px-4 py-2 font-mono text-[11px] text-fog transition-colors hover:border-acid hover:text-acid"
          >
            LINKEDIN {"\u2197"}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="border border-acid bg-acid px-4 py-2 font-mono text-[11px] font-medium text-ink transition-opacity hover:opacity-85"
          >
            EMAIL ME
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {metrics.map((m) => (
          <div key={m.label} className="px-5 py-5">
            <p className="font-display text-2xl font-semibold text-paper">
              {m.value}
              <span className="text-acid">{m.unit}</span>
            </p>
            <p className="mt-1 text-[11px] text-fog">{m.label}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
