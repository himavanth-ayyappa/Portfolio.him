import Reveal from "./Reveal";

export function SectionShell({
  id,
  code,
  label,
  meta,
  children,
}: {
  id?: string;
  code: string;
  label: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-b border-line">
      <Reveal>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-2 px-5 py-7 sm:grid-cols-[90px_1fr_110px] sm:gap-0">
          <div className="font-mono text-[11px] leading-relaxed">
            <span className="text-acid">{code}</span>
            <br />
            <span className="text-dim">{label}</span>
          </div>
          <div className="min-w-0">{children}</div>
          <div className="hidden text-right font-mono text-[10px] leading-relaxed text-dim sm:block">
            {meta}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
