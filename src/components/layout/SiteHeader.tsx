"use client";

import Link from "next/link";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { gsap } from "@/components/motion/gsap";
import { contact, offices } from "@/content/site";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/our-services/", dropdown: true },
  { label: "Industries", href: "/specialized-industries/" },
  { label: "FAQ", href: "/our-faqs/" },
  { label: "Contact", href: "/contact/" },
] as const;

/**
 * Always-visible site header: a slim contact strip (desktop) above a light navigation bar
 * with the original TLC logo, every primary link in view, a Services dropdown and a quote CTA.
 * On small screens the links collapse into a drop-down panel. The header never hides on scroll.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const svcRef = useRef<HTMLLIElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const openedByHover = useRef(false);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setSvcOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href) || (href === "/our-services/" && services.some((s) => pathname?.startsWith(s.href))));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile panel animation.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !mobileOpen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(panel, { height: 0 }, { height: "auto", duration: 0.6, ease: "expo.out" });
    gsap.fromTo(panel.querySelectorAll("[data-m-item]"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.035, ease: "expo.out" });
  }, [mobileOpen]);

  // Escape / click-outside close any open menu.
  useEffect(() => {
    if (!mobileOpen && !svcOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) toggleRef.current?.focus();
      setMobileOpen(false);
      setSvcOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (svcOpen && svcRef.current && !svcRef.current.contains(t)) setSvcOpen(false);
      if (mobileOpen && headerRef.current && !headerRef.current.contains(t)) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [mobileOpen, svcOpen]);

  const openSvc = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (!svcOpen) openedByHover.current = true;
    setSvcOpen(true);
  };
  // If hover already opened the menu, the first click pins it open instead of toggling it shut.
  const toggleSvc = () => {
    if (svcOpen && openedByHover.current) {
      openedByHover.current = false;
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      return;
    }
    openedByHover.current = false;
    setSvcOpen((v) => !v);
  };
  const closeSvcSoon = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !openedByHover.current) return;
    closeTimer.current = window.setTimeout(() => setSvcOpen(false), 140);
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      {/* Contact strip (desktop) */}
      <div className="hidden bg-ink text-paper/80 lg:block">
        <div className="shell flex h-9 items-center justify-between text-[0.8rem]">
          <p className="label-mono text-paper/70">Freight forwarding · Customs clearance · Logistics</p>
          <ul className="flex items-center gap-6">
            {offices.map((o) => (
              <li key={o.city}>
                <a href={o.phone.href} className="flex items-center gap-1.5 transition-colors hover:text-paper">
                  <Phone aria-hidden className="size-3.5" strokeWidth={1.75} />
                  <span>
                    {o.city} {o.phone.display}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 transition-colors hover:text-paper">
                <Mail aria-hidden className="size-3.5" strokeWidth={1.75} />
                <span>{contact.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b bg-paper/95 backdrop-blur-xl transition-[box-shadow,border-color] duration-500",
          scrolled ? "border-line shadow-[0_8px_30px_-18px_rgba(18,21,29,0.35)]" : "border-line/70",
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label="The Logistic Company — home" className="shrink-0 rounded-[4px]">
            <Logo priority className="h-12 lg:h-14" />
          </Link>

          {/* Desktop navigation — all links visible */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) =>
                "dropdown" in l && l.dropdown ? (
                  <li key={l.href} ref={svcRef} className="relative" onPointerEnter={openSvc} onPointerLeave={closeSvcSoon}>
                    <div className="flex items-center">
                      <Link
                        href={l.href}
                        aria-current={isActive(l.href) ? "page" : undefined}
                        className={cn("relative rounded-[5px] py-2 pl-3 pr-1 text-[0.95rem] font-medium transition-colors hover:text-ink", isActive(l.href) ? "text-ink" : "text-ink/75")}
                      >
                        {l.label}
                        {isActive(l.href) && <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-signal" />}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={svcOpen}
                        aria-controls="services-menu"
                        aria-label="Show services"
                        onClick={toggleSvc}
                        className="grid size-7 place-items-center rounded-[4px] text-ink/70 hover:bg-ink/5 hover:text-ink"
                      >
                        <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-300", svcOpen && "rotate-180")} />
                      </button>
                    </div>
                    <div
                      id="services-menu"
                      hidden={!svcOpen}
                      className="absolute left-1/2 top-full w-[30rem] -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-[8px] bg-white p-2 shadow-[0_24px_60px_-20px_rgba(18,21,29,0.35)] ring-1 ring-ink/10">
                        <ul>
                          {services.map((s) => (
                            <li key={s.slug}>
                              <Link href={s.href} className="group flex items-start gap-4 rounded-[6px] p-3 transition-colors hover:bg-paper">
                                <span className="label-mono pt-1 text-stone">{s.index}</span>
                                <span className="flex-1">
                                  <span className="block font-medium text-ink">{s.name}</span>
                                  <span className="block text-sm text-stone">{s.short}</span>
                                </span>
                                <ArrowUpRight aria-hidden className="mt-1 size-4 text-ink/40 transition-all duration-300 group-hover:rotate-45 group-hover:text-ink" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href="/our-services/" className="mt-1 flex items-center justify-between rounded-[6px] bg-ink px-4 py-3 text-sm font-medium text-paper hover:bg-ink-3">
                          All services <ArrowUpRight aria-hidden className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={cn("relative block rounded-[5px] px-3 py-2 text-[0.95rem] font-medium transition-colors hover:text-ink", isActive(l.href) ? "text-ink" : "text-ink/75")}
                    >
                      {l.label}
                      {isActive(l.href) && <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-signal" />}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 items-center gap-2 rounded-full bg-whatsapp px-4 text-sm font-medium text-white shadow-[0_10px_22px_-12px_rgba(37,211,102,0.9)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-px hover:bg-[#1ebe5a] xl:flex"
            >
              <WhatsAppGlyph className="size-[1.2rem] text-white" />
              WhatsApp
            </a>
            <Link href="/contact/" className="btn btn-dark h-11 !pl-4 text-sm">
              <span className="hidden sm:inline">Get a quote</span>
              <span className="sm:hidden">Quote</span>
              <span className="btn-icon !size-8" aria-hidden>
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-[6px] ring-1 ring-ink/15 transition-colors hover:bg-ink/5 lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-transform duration-300", mobileOpen && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute left-0 top-[5px] h-[1.5px] w-full bg-ink transition-opacity duration-200", mobileOpen && "opacity-0")} />
                <span className={cn("absolute bottom-0 left-0 h-[1.5px] w-full bg-ink transition-transform duration-300", mobileOpen && "-translate-y-[5.5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div id="mobile-menu" ref={panelRef} hidden={!mobileOpen} className="overflow-hidden border-t border-line lg:hidden">
          <nav aria-label="Mobile" className="shell max-h-[calc(100svh-4.5rem)] overflow-y-auto pb-6 pt-2">
            <ul>
              {links.map((l) => (
                <li key={l.href} data-m-item="" className="border-b border-line">
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4 text-xl font-medium tracking-tight"
                  >
                    <span className="flex items-center gap-3">
                      {isActive(l.href) && <span aria-hidden className="size-2 rounded-full bg-signal" />}
                      {l.label}
                    </span>
                    <ArrowUpRight aria-hidden className="size-5 text-ink/40" />
                  </Link>
                  {"dropdown" in l && l.dropdown && (
                    <ul className="-mt-1 mb-3 grid gap-1 pl-5">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link href={s.href} className="block py-1.5 text-stone hover:text-ink">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div data-m-item="" className="mt-5 grid gap-2 text-sm text-stone">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2">
                <Mail aria-hidden className="size-4" /> {contact.email}
              </a>
              {offices.map((o) => (
                <a key={o.city} href={o.phone.href} className="flex items-center gap-2">
                  <Phone aria-hidden className="size-4" /> {o.city} · {o.phone.display}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
