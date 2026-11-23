import Image from "next/image";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { offices } from "@/content/site";
import { cn } from "@/lib/cn";

/** Five-pointed star as an SVG polygon `points` string. */
function star(cx: number, cy: number, R: number, r: number) {
  return Array.from({ length: 10 }, (_, i) => {
    const a = ((-90 + i * 36) * Math.PI) / 180;
    const rad = i % 2 === 0 ? R : r;
    return `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

/** National flags for the two offices (drawn as SVG so they look the same on every OS — emoji flags don't render on Windows). */
function Flag({ code }: { code: string }) {
  const common = "h-[1.05rem] w-[1.55rem] shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(18,21,29,0.14)]";
  if (code === "PK") {
    return (
      <svg viewBox="0 0 60 40" role="img" aria-label="Flag of Pakistan" className={common}>
        <rect width="60" height="40" fill="#01411C" />
        <rect width="15" height="40" fill="#fff" />
        {/* crescent: a white disc with a green disc cut out of it, opening up and to the right */}
        <circle cx="37.5" cy="20" r="11" fill="#fff" />
        <circle cx="41" cy="17" r="9.4" fill="#01411C" />
        <polygon points={star(44.5, 14.2, 4.2, 1.7)} fill="#fff" />
      </svg>
    );
  }
  // United Arab Emirates
  return (
    <svg viewBox="0 0 60 40" role="img" aria-label="Flag of the United Arab Emirates" className={common}>
      <rect width="60" height="40" fill="#fff" />
      <rect width="60" height="13.4" fill="#00732F" />
      <rect y="26.6" width="60" height="13.4" fill="#000" />
      <rect width="15" height="40" fill="#EF3340" />
    </svg>
  );
}

/** Where each office sits inside its 1024×512 map mosaic (pixels), so the map can be centred on it. */
const MAP_POINT: Record<string, { x: number; y: number }> = {
  Lahore: { x: 279, y: 125 },
  Dubai: { x: 326, y: 167 },
};


/** The two offices from the original website as cards: faded OpenStreetMap backdrop, flag, address, call and directions. */
export function OfficeCards({ className }: { className?: string }) {
  return (
        <ul data-cx="cards" className={cn("mx-auto grid max-w-4xl gap-4 md:grid-cols-2", className)}>
          {offices.map((o) => (
            <li
              key={o.city}
              data-cx="card"
              className="group overflow-hidden rounded-[22px] bg-white shadow-[0_30px_60px_-34px_rgba(18,21,29,0.3)] ring-1 ring-ink/5 transition-shadow duration-500 ease-[var(--ease-expo)] hover:shadow-[0_36px_70px_-32px_rgba(18,21,29,0.38)]"
            >
              {/* Faded street map of the office's neighbourhood (OpenStreetMap), centred on the office */}
              <div className="relative h-40 overflow-hidden bg-paper-2 sm:h-44">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    maskImage: "linear-gradient(to bottom, #000 25%, transparent 96%)",
                    WebkitMaskImage: "linear-gradient(to bottom, #000 25%, transparent 96%)",
                  }}
                >
                  <Image
                    src={`/images/maps/${o.city.toLowerCase()}.webp`}
                    alt=""
                    width={1024}
                    height={512}
                    sizes="1024px"
                    className="absolute max-w-none opacity-80 transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
                    style={{ left: `calc(50% - ${MAP_POINT[o.city].x}px)`, top: `calc(50% - ${MAP_POINT[o.city].y}px)`, width: 1024, height: 512 }}
                  />
                </div>
                {/* the office itself */}
                <span aria-hidden className="absolute left-1/2 top-1/2 grid size-4 -translate-x-1/2 -translate-y-1/2 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-signal/40 [animation-duration:2.6s] motion-reduce:hidden" />
                  <span className="relative size-2.5 rounded-full bg-signal ring-2 ring-white" />
                </span>
                <span className="label-mono absolute left-5 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 py-1 pl-1.5 pr-3 text-ink/70 ring-1 ring-ink/5 backdrop-blur-sm sm:left-6">
                  <Flag code={o.code} />
                  {o.country} · {o.code}
                </span>
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-1.5 right-3 text-[0.62rem] tracking-wide text-ink/45 hover:text-ink/70"
                >
                  © OpenStreetMap contributors
                </a>
              </div>

              <div className="relative px-6 pb-6 sm:px-8 sm:pb-8">
                {/* location pin sits right above the city name, overlapping the map edge */}
                <span className="-mt-7 mb-5 grid size-14 place-items-center rounded-full bg-gradient-to-br from-ink-3 to-ink text-paper shadow-[0_18px_30px_-12px_rgba(18,21,29,0.6),inset_0_1px_0_rgba(255,255,255,0.14)] ring-4 ring-white transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1">
                  <MapPin aria-hidden className="size-6" strokeWidth={1.5} />
                </span>
                <h3 className="font-title text-[clamp(1.9rem,3vw,2.6rem)]">{o.city}</h3>
                <address className="mt-3 text-[1.02rem] not-italic leading-snug text-stone">
                  {o.lines.slice(0, 2).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  <a href={o.phone.href} className="btn btn-dark !h-11 !gap-2.5 !px-4 text-sm hover:!bg-signal">
                    <Phone aria-hidden className="size-4" strokeWidth={1.75} />
                    {o.phone.display}
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline !h-11 !gap-2 !px-4 text-sm hover:!text-signal-strong hover:!shadow-[inset_0_0_0_1.5px_var(--color-signal)]"
                  >
                    Directions
                    <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
                    <span className="sr-only"> to the {o.city} office (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
  );
}
