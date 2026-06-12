import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="font-mono text-[11px] tracking-wider text-dim">
        404 — ROUTE NOT FOUND
      </p>
      <Link href="/" className="font-mono text-[11px] text-acid hover:underline">
        RETURN HOME →
      </Link>
    </main>
  );
}
