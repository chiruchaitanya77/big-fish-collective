import Link from "@/components/site-link";

export function BrandMark({ inverse = false, large = false }: { inverse?: boolean; large?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Big Fish Collective home"
      className={`inline-flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 ${inverse ? "text-white mix-blend-screen" : "text-ink mix-blend-multiply"}`}
    >
      <img
        src="/big-fish-collective-logo.png"
        alt="Big Fish Collective"
        width={1418}
        height={2048}
        className={`block w-auto object-contain grayscale ${large ? "h-40" : "h-20"} ${inverse ? "invert" : ""}`}
      />
    </Link>
  );
}
