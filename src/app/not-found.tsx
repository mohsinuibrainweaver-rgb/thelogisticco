import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/services";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[90svh] flex-col justify-center pb-20 pt-36 lg:pt-48">
      <p className="label-mono text-stone">(Error 404 — Cargo not found)</p>
      <h1 className="font-display text-mega mt-6">
        Off the <span className="text-signal">route.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg text-stone">The page you&rsquo;re looking for has moved or no longer exists. Try one of our services instead.</p>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={s.href} className="link-line font-medium">
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </section>
  );
}
