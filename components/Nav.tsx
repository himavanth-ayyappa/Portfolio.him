import Link from "next/link";
import { profile } from "@/data/profile";

const items = [
  { label: "WORK", href: "/#work" },
  { label: "PROJECTS", href: "/#projects" },
  { label: "LAB", href: "/#lab" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <Link
          href="/"
          className="font-mono text-[10px] tracking-wider text-fog hover:text-paper"
        >
          {profile.location.toUpperCase()} {"\u00b7"}{" "}
          <span className="text-acid">{"\u25cf"} {profile.status.toUpperCase()}</span>
        </Link>
        <nav className="flex items-center gap-3 font-mono text-[10px] tracking-wider sm:gap-5">
          {items.map((it) => (
            <Link
              key={it.label}
              href={it.href}
              className="text-fog transition-colors hover:text-paper"
            >
              {it.label}
            </Link>
          ))}
          <a
            href={profile.resumeFile}
            download
            className="text-acid hover:underline"
          >
            RESUME {"\u2193"}
          </a>
        </nav>
      </div>
    </header>
  );
}
