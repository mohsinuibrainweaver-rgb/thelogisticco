import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/content/services";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[90svh] flex-col items-center justify-center pb-20 pt-36 text-center lg:pt-48">
      <Reveal immediate delay={0.1} as="p" className="label-mono text-signal-strong">
        Error 404 · Cargo not found
      </Reveal>
      <MaskLines
        as="h1"
        immediate
        delay={0.2}
        lines={["Off the", <span key="r" className="text-signal">route.</span>]}
        className="font-title mt-6 text-[clamp(3.4rem,10vw,9rem)] leading-[0.95]"
      />
      <Reveal immediate delay={0.55} as="p" className="mx-auto mt-6 max-w-lg text-[1.1rem] leading-relaxed text-stone">
        The page you’re looking for has moved or no longer exists. Try one of our services instead.
      </Reveal>
      <Reveal immediate delay={0.65} as="ul" className="mt-8 flex flex-wrap justify-center gap-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={s.href} className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-ink/75 ring-1 ring-ink/10 transition-colors hover:text-ink hover:ring-ink/30">
              {s.name}
            </Link>
          </li>
        ))}
      </Reveal>
      <Reveal immediate delay={0.75} className="mt-10">
        <ButtonLink href="/">Back to home</ButtonLink>
      </Reveal>
    </section>
  );
}
