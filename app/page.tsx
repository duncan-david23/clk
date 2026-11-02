"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/*  SUITE APPS ARRAY                                                   */
/* ------------------------------------------------------------------ */
const SUITE_APPS = [
  {
    id: "pos",
    name: "Claukk",
    highlight: "POS",
    status: "live",
    featured: true,
    inOrbit: true,
    description:
      "The point of sale, inventory and sales system for modern retail. Scan, sell, get paid by cash or mobile money, and print the receipt.",
    features: [
      "Fast POS with real product photos",
      "Camera and USB barcode scanning",
      "Inventory that watches itself",
      "Cash, Paystack and mobile money, even split",
      "Print-ready receipts and live reports",
    ],
    screenshot: "/pos_image.png",
    screenshotAlt: "ClaukkPOS till view showing product grid and current sale",
    href: "#",
  },
  {
    id: "books",
    name: "Claukk",
    highlight: "Books",
    status: "coming-soon",
    inOrbit: true,
    description: "Simple accounting that reads your sales straight from ClaukkPOS.",
    iconPaths: ["M5 4h14v16H5zM9 8h6M9 12h6M9 16h3"],
    screenshot: "/screens/claukkbooks.png",
    screenshotAlt: "ClaukkBooks accounting dashboard",
    href: "#",
  },
  {
    id: "invoice",
    name: "Claukk",
    highlight: "Invoice",
    status: "coming-soon",
    inOrbit: true,
    description: "Professional invoices and payment reminders for your customers.",
    iconPaths: ["M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"],
    screenshot: "/screens/claukkinvoice.png",
    screenshotAlt: "ClaukkInvoice invoice editor",
    href: "#",
  },
  {
    id: "pay",
    name: "Claukk",
    highlight: "Pay",
    status: "coming-soon",
    inOrbit: true,
    description:
      "Collect payments anywhere and see every transaction in one place.",
    iconPaths: ["M2 5h20v14H2zM2 10h20"],
    screenshot: "/screens/claukkpay.png",
    screenshotAlt: "ClaukkPay transactions dashboard",
    href: "#",
  },
  {
    id: "people",
    name: "Claukk",
    highlight: "People",
    status: "coming-soon",
    inOrbit: true,
    description: "Staff, schedules and payroll for growing teams.",
    iconPaths: ["M12 8a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6"],
    screenshot: "/screens/claukkpeople.png",
    screenshotAlt: "ClaukkPeople staff and schedules view",
    href: "#",
  },
  {
    id: "crm",
    name: "Claukk",
    highlight: "CRM",
    status: "coming-soon",
    inOrbit: true,
    description:
      "Know your customers and bring them back, with purchase history built in.",
    iconPaths: ["M9 8a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2 20c0-4 3-6 7-6s7 2 7 6M17 5a3 3 0 010 6"],
    screenshot: "/screens/claukkcrm.png",
    screenshotAlt: "ClaukkCRM customer list and purchase history",
    href: "#",
  },
];

const featuredApp = SUITE_APPS.find((a) => a.featured);
const orbitApps = SUITE_APPS.filter((a) => a.inOrbit);
const gridApps = SUITE_APPS.filter((a) => !a.featured);

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */
function Logo({ className = "" }) {
  return (
    <span className={`logo ${className}`}>
      Claukk<span className="lm-dot">.</span>
    </span>
  );
}

function AppName({ app, className = "" }) {
  return (
    <span className={`logo ${className}`}>
      {app.name}
      <span className="lm">{app.highlight}</span>
    </span>
  );
}

function Icon({ paths }) {
  return (
    <svg viewBox="0 0 24 24" className="icon">
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className={`rv ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/*  BLANK PLACEHOLDER                                                  */
/* ------------------------------------------------------------------ */
function Placeholder() {
  return (
    <div className="placeholder" aria-hidden>
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="12" width="48" height="40" rx="3" />
        <circle cx="22" cy="26" r="4" />
        <path d="M8 46l14-12 10 8 10-10 14 14" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SHARED SCREENSHOT FRAME                                            */
/* ------------------------------------------------------------------ */
function AppShot({ app, variant = "small" }) {
  const [broken, setBroken] = useState(!app.screenshot);

  return (
    <div className={`shot ${variant}`}>
      <div className="mt"><i /><i /><i /></div>
      {broken ? (
        <Placeholder />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={app.screenshot}
          alt={app.screenshotAlt || `${app.name}${app.highlight} screenshot`}
          loading="lazy"
          onError={() => setBroken(true)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MOCK POS UI                                                        */
/* ------------------------------------------------------------------ */
function MockPOS({ tickerRef }) {
  return (
    <div className="mini" aria-hidden>
      <div className="mt"><i /><i /><i /></div>
      <div className="mb">
        <div className="ms">
          <b>ClaukkPOS</b>
          <div>Dashboard</div>
          <div className="a">POS</div>
          <div>Products</div>
          <div>Sales</div>
        </div>
        <div className="mg">
          {["Coca-Cola", "Bread", "Meat Pie", "Water", "Biscuits", "Charger"].map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>
        <div className="mc" ref={tickerRef}>
          Current Sale
          <span>Bread ×1</span>
          <span>Meat Pie ×1</span>
          <span>Coca-Cola ×2</span>
          <b>GHS 43.00</b>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */
function Nav() {
  const links = [
    ["#structure", "How it fits"],
    ["#suite", "ClaukkSuite"],
    ["#pos", "ClaukkPOS"],
    ["#about", "About"],
  ];
  return (
    <nav className="nav">
      <div className="w nav-inner">
        <a href="#" aria-label="Claukk home">
          <Logo className="logo-lg" />
        </a>
        <div className="links">
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <a href="#suite" className="btn btn-p nav-cta">Explore the suite</a>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  ECOSYSTEM ORBIT                                                    */
/* ------------------------------------------------------------------ */
function Ecosystem() {
  const svgRef = useRef(null);
  const orbitRef = useRef(null);
  const pulseRef = useRef(null);
  const livePulseRefs = useRef([]);
  const counterRefs = useRef([]);

  const CX = 300;
  const CY = 300;
  const R = 195;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        orbitRef.current,
        { rotation: 0, svgOrigin: `${CX} ${CY}` },
        {
          rotation: 360,
          svgOrigin: `${CX} ${CY}`,
          duration: 90,
          repeat: -1,
          ease: "none",
        }
      );

      counterRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { rotation: 0, svgOrigin: "0 0" },
          { rotation: -360, svgOrigin: "0 0", duration: 90, repeat: -1, ease: "none" }
        );
      });

      if (pulseRef.current) {
        gsap.fromTo(
          pulseRef.current,
          { attr: { r: 64 }, opacity: 0.7 },
          { attr: { r: 118 }, opacity: 0, duration: 3.2, repeat: -1, ease: "power1.out" }
        );
      }

      livePulseRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { attr: { r: 46 }, opacity: 0.6 },
          { attr: { r: 62 }, opacity: 0, duration: 2.4, repeat: -1, ease: "power1.out" }
        );
      });

      gsap.to(".fl", { strokeDashoffset: -24, duration: 1.6, repeat: -1, ease: "none" });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="eco"
      viewBox="0 0 600 600"
      role="img"
      aria-label="ClaukkSuite hub with ClaukkPOS and upcoming tools orbiting"
    >
      <defs>
        <radialGradient id="cg">
          <stop offset="0" stopColor="#1fae7a" stopOpacity=".35" />
          <stop offset="1" stopColor="#1fae7a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CX} cy={CY} r="250" fill="url(#cg)" />
      <circle cx={CX} cy={CY} r="130" fill="none" stroke="rgba(243,245,242,.12)" strokeDasharray="4 8" />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(243,245,242,.1)" />

      <circle ref={pulseRef} cx={CX} cy={CY} r="64" fill="none" stroke="#3fe0a6" />

      <g ref={orbitRef} transform={`translate(${CX} ${CY})`}>
        {orbitApps.map((app, i) => {
          const step = 360 / orbitApps.length;
          const a = ((i * step - 90) * Math.PI) / 180;
          const x = R * Math.cos(a);
          const y = R * Math.sin(a);
          const live = app.status === "live";
          return (
            <g key={app.id}>
              <line
                className="fl"
                x1="0"
                y1="0"
                x2={x.toFixed(1)}
                y2={y.toFixed(1)}
                stroke={live ? "#3fe0a6" : "rgba(243,245,242,.22)"}
                strokeWidth="1.5"
              />
              <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                <g ref={(el) => { counterRefs.current[i] = el; }}>
                  <circle
                    r={live ? 44 : 36}
                    fill={live ? "#3fe0a6" : "#0a0e0c"}
                    stroke={live ? "#3fe0a6" : "rgba(243,245,242,.3)"}
                    strokeWidth="1.5"
                  />
                  {live && (
                    <circle
                      ref={(el) => { livePulseRefs.current[i] = el; }}
                      r="54"
                      fill="none"
                      stroke="#3fe0a6"
                      opacity=".4"
                    />
                  )}
                  <text
                    y={live ? 6 : 5}
                    textAnchor="middle"
                    fontSize={live ? 17 : 13}
                    fontWeight={800}
                    fontFamily="Manrope, sans-serif"
                    fill={live ? "#050706" : "#8b968f"}
                  >
                    {app.highlight || app.name}
                  </text>
                </g>
              </g>
            </g>
          );
        })}
      </g>

      <circle cx={CX} cy={CY} r="64" fill="#0c3626" stroke="#3fe0a6" strokeWidth="2" />
      <text x={CX} y={CY - 4} textAnchor="middle" fill="#f3f5f2" fontSize="19" fontFamily="Manrope,sans-serif" fontWeight={800}>Claukk</text>
      <text x={CX} y={CY + 20} textAnchor="middle" fill="#3fe0a6" fontSize="19" fontFamily="Manrope,sans-serif" fontWeight={800}>Suite</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".badge", { autoAlpha: 0, y: 20, duration: 0.6 })
        .from(".hero h1", { autoAlpha: 0, y: 30, duration: 0.7 }, "-=0.3")
        .from(".lead", { autoAlpha: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".hero .cta .btn", { autoAlpha: 0, y: 20, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".eco", { autoAlpha: 0, scale: 0.9, duration: 1 }, "-=0.8");

      gsap.to(".hero-glow", {
        opacity: 0.5, scale: 1.15, duration: 3.5,
        yoyo: true, repeat: -1, ease: "sine.inOut",
      });
      gsap.to(".dot", {
        duration: 2, repeat: -1, ease: "power1.out",
        keyframes: [
          { boxShadow: "0 0 0 0 rgba(63,224,166,.6)", duration: 0 },
          { boxShadow: "0 0 0 9px rgba(63,224,166,0)", duration: 2 },
        ],
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={ref} className="hero">
      <div className="hero-grid" aria-hidden />
      <div className="hero-glow" aria-hidden />
      <div className="w hero-inner">
        <div>
          <span className="badge"><i className="dot" />Introducing ClaukkSuite</span>
          <h1>Tools that run your <span className="em">whole business.</span></h1>
          <p className="lead">
            Claukk builds ClaukkSuite, a connected set of business tools that
            work as one. It starts with ClaukkPOS, the point of sale for modern
            retail.
          </p>
          <div className="cta">
            <a href="#suite" className="btn btn-p">Explore ClaukkSuite →</a>
            <a href="#pos" className="btn">See ClaukkPOS</a>
          </div>
        </div>
        <Ecosystem />
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HIERARCHY                                                          */
/* ------------------------------------------------------------------ */
function Hierarchy() {
  const cards = [
    {
      dark: true,
      small: "THE COMPANY",
      title: (<>Claukk<span className="lm">.</span></>),
      body: "The team and the technology behind everything we build.",
    },
    {
      small: "THE BUSINESS TOOLS",
      title: (<>Claukk<span className="lm">Suite</span></>),
      body: "A connected family of tools for running and growing a business.",
    },
    {
      small: "THE PRODUCTS",
      title: (<>Claukk<span className="lm">POS</span> &amp; more</>),
      body: "Each tool does one job well, and works with the rest.",
    },
  ];

  return (
    <section id="structure" className="section">
      <div className="w">
        <Reveal>
          <span className="eye">How it fits together</span>
          <h2>One company. One suite. Many tools.</h2>
          <p className="sub">
            A simple structure, so you always know where a product lives and how
            it connects.
          </p>
        </Reveal>
        <Reveal className="hier">
          {cards.flatMap((c, i, arr) => {
            const card = (
              <div key={`c-${i}`} className={`hc${c.dark ? " dk" : ""}`}>
                <small>{c.small}</small>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            );
            if (i < arr.length - 1) {
              return [card, <div key={`a-${i}`} className="ar">→</div>];
            }
            return [card];
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURED CARD                                                      */
/* ------------------------------------------------------------------ */
function FeaturedCard({ app }) {
  const miniRef = useRef(null);
  const tickerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = tickerRef.current?.querySelectorAll("span");
      if (lines) {
        gsap.fromTo(
          lines,
          { autoAlpha: 0, x: 12 },
          {
            autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.6,
            repeat: -1, repeatDelay: 2.4, ease: "power2.out",
          }
        );
      }
    }, miniRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id={app.id} className="pc big">
      <div>
        <span className="tag on">LIVE NOW</span>
        <h3><AppName app={app} /></h3>
        <p>{app.description}</p>
        <div className="cta">
          <a href={app.href || "#"} className="btn btn-p">Open ClaukkPOS →</a>
          <a href="#spot" className="btn btn-white">What's inside</a>
        </div>
      </div>
      <div className="mini" ref={miniRef}>
        {app.screenshot ? (
          <AppShot app={app} variant="large" />
        ) : (
          <MockPOS tickerRef={tickerRef} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SMALL CARD                                                         */
/* ------------------------------------------------------------------ */
function SuiteCard({ app }) {
  return (
    <div className="pc soon">
      <span className="tag">COMING SOON</span>
      <div className="thumb">
        <AppShot app={app} variant="thumb" />
      </div>
      <h3><AppName app={app} /></h3>
      <p>{app.description}</p>
      <a href={app.href || "#"} className="lnk">Join the waitlist →</a>
    </div>
  );
}

function SuiteSection() {
  return (
    <section id="suite" className="section section-tight">
      <div className="w">
        <Reveal>
          <span className="eye">ClaukkSuite</span>
          <h2>Every tool your business runs on.</h2>
          <p className="sub">
            ClaukkPOS is live today. More tools are on the way, designed to
            share the same account and data.
          </p>
        </Reveal>
        <Reveal className="pg">
          {featuredApp && <FeaturedCard app={featuredApp} />}
          {gridApps.map((app) => (
            <SuiteCard key={app.id} app={app} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HOW IT WORKS                                                       */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const cols = [
    ["01", "One account", "Sign in once and move between every ClaukkSuite tool."],
    ["02", "Shared data", "Products, customers and sales flow between tools automatically."],
    ["03", "One standard", "The same fast, clean design and the same support, across the suite."],
  ];
  const flow = ["ClaukkPOS", "ClaukkBooks", "ClaukkInvoice"];
  const flowRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".fl2", { backgroundPosition: "14px 0", duration: 0.8, repeat: -1, ease: "none" });
      gsap.to(".ar", { x: 5, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }, flowRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section dark" ref={flowRef}>
      <div className="w">
        <Reveal>
          <span className="eye">Built to work together</span>
          <h2>Do it once. It shows up everywhere.</h2>
          <p className="sub">
            Tools in ClaukkSuite share one account and one source of truth, so
            you stop re-typing the same thing.
          </p>
        </Reveal>
        <Reveal className="cols">
          {cols.map(([n, h, p]) => (
            <div key={n} className="col">
              <b>{n}</b><h3>{h}</h3><p>{p}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="flow">
          {flow.flatMap((label, i) => {
            const node = (
              <div key={`n-${i}`} className={`fn${i === 0 ? " on" : ""}`}>{label}</div>
            );
            if (i < flow.length - 1) return [node, <div key={`f-${i}`} className="fl2" />];
            return [node];
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WHAT'S INSIDE                                                      */
/* ------------------------------------------------------------------ */
function SpotSection() {
  const features = featuredApp?.features || [];
  return (
    <section id="spot" className="section">
      <div className="w fs">
        <Reveal>
          <span className="eye">Inside ClaukkPOS</span>
          <h2>Built for the till, tuned for the owner.</h2>
          <ul className="ft">
            {features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <a href="#" className="btn btn-p">Open ClaukkPOS →</a>
        </Reveal>
        <Reveal>
          <p className="q">
            We build the tools we wished <span className="em">every business</span> had:{" "}
            <span className="em">fast</span>, clear and ready to work together.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <section id="about" className="section section-tight">
      <Reveal className="w">
        <span className="eye">About Claukk</span>
        <h2>Software for the way modern businesses really work.</h2>
        <p className="sub">
          Claukk is a technology company building simple, reliable business
          tools. ClaukkSuite is our way of making them work as one, so owners
          spend less time managing software and more time running their
          business.
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FINAL CTA                                                          */
/* ------------------------------------------------------------------ */
function FinalCta() {
  return (
    <section className="section fin">
      <Reveal className="w">
        <span className="eye">Start with ClaukkPOS</span>
        <h2>Open your till in minutes.</h2>
        <p className="sub">
          Join the suite today and be first in line when the next tool launches.
        </p>
        <div className="cta center">
          <a href="#" className="btn btn-p">Open ClaukkPOS →</a>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="footer">
      <div className="w">
        <div className="fg">
          <div>
            <Logo className="logo-lg footer-logo" />
            <p>Tools that run your whole business.</p>
          </div>
          <div>
            <h4>Claukk</h4>
            <a href="#about">About</a>
            <a href="#">Contact</a>
            <a href="#">Careers</a>
          </div>
          <div>
            <h4>ClaukkSuite</h4>
            <a href="#suite">Overview</a>
            <a href="#pos">ClaukkPOS</a>
            <a href="#suite">Coming soon</a>
          </div>
        </div>
        <div className="cp">
          <span>© {new Date().getFullYear()} Claukk. All rights reserved.</span>
          <span>ClaukkSuite is a product family by Claukk.</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <>
      <style jsx global>{`
        :root{
          --bg:#050706;--panel:#0a0e0c;--gr:#121613;--white:#f3f5f2;
          --gray:#8b968f;--dim:#5c6560;--em:#1fae7a;--emb:#3fe0a6;
          --emd:#0c3626;--line:rgba(243,245,242,.09);--lk:rgba(5,7,6,.1);
        }
        *,*::before,*::after{box-sizing:border-box}
        html{scroll-behavior:smooth;scroll-padding-top:72px}
        body{margin:0;background:var(--white);color:var(--bg);font:16px/1.6 var(--font-geist-sans,Manrope),system-ui,sans-serif;overflow-x:hidden}
        a{color:inherit;text-decoration:none}
        :focus-visible{outline:2px solid var(--emb);outline-offset:3px}

        /* ---- primitives ---- */
        .w{max-width:1180px;margin:0 auto;padding:0 24px}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 26px;border-radius:10px;font-weight:700;border:1px solid var(--line);color:var(--white);transition:.2s;background:transparent;cursor:pointer}
        .btn:hover{transform:translateY(-2px);border-color:var(--emb)}
        .btn-p{background:var(--emb);color:var(--bg);border-color:var(--emb);font-weight:800}
        .btn-p:hover{background:var(--em);border-color:var(--em);box-shadow:0 8px 30px rgba(63,224,166,.25)}
        .btn-white{color:var(--white)}
        .logo{font-weight:800;letter-spacing:-.03em}
        .lm,.lm-dot{color:var(--em)}
        .eye{display:block;color:var(--em);font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase}
        .em{color:var(--em)}
        .icon{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
        section{padding:96px 0}
        .section-tight{padding-top:0}
        h2{font-size:clamp(30px,4vw,46px);line-height:1.1;letter-spacing:-.03em;margin:10px 0 14px;font-weight:800;max-width:720px}
        .sub{color:var(--dim);font-size:18px;max-width:620px;margin:0}
        .dark{background:var(--bg);color:var(--white)}
        .dark .sub{color:var(--gray)}
        .cta{display:flex;gap:12px;flex-wrap:wrap}
        .cta.center{justify-content:center}

        /* ---- reveal ---- */
        .rv{visibility:hidden}

        /* ---- nav ---- */
        .nav{position:sticky;top:0;z-index:30;background:var(--bg);color:var(--white);border-bottom:1px solid var(--line)}
        .nav-inner{display:flex;align-items:center;gap:32px;height:66px}
        .logo-lg{font-size:24px}
        .links{display:flex;gap:28px;flex:1;color:var(--gray);font-weight:600;font-size:14px}
        .links a:hover{color:var(--white)}
        .nav-cta{padding:9px 18px;font-size:14px;margin-left:auto}
        @media(min-width:768px){.nav-cta{margin-left:0}}

        /* ---- hero ---- */
        .hero{background:var(--bg);color:var(--white);position:relative;overflow:hidden;padding:72px 0 88px}
        .hero-grid{position:absolute;inset:0;background:repeating-linear-gradient(90deg,var(--line) 0 1px,transparent 1px 80px),repeating-linear-gradient(0deg,var(--line) 0 1px,transparent 1px 80px);-webkit-mask-image:radial-gradient(ellipse at 70% 40%,#000,transparent 72%);mask-image:radial-gradient(ellipse at 70% 40%,#000,transparent 72%);pointer-events:none}
        .hero-glow{position:absolute;right:-200px;top:-100px;width:900px;height:900px;background:radial-gradient(closest-side,rgba(31,174,122,.26),transparent);pointer-events:none;opacity:.7}
        .hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1.05fr 1fr;gap:40px;align-items:center}
        .badge{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line);background:var(--panel);border-radius:99px;padding:6px 14px;font-size:13px;color:var(--gray)}
        .dot{width:8px;height:8px;border-radius:50%;background:var(--emb)}
        .hero h1{font-size:clamp(40px,5.6vw,68px);line-height:1.04;letter-spacing:-.035em;margin:22px 0 20px;font-weight:800}
        .lead{color:var(--gray);font-size:19px;max-width:520px;margin:0 0 30px}
        .eco{width:100%;max-width:560px;margin:0 auto;display:block;overflow:visible;padding:24px}

        /* ---- hierarchy ---- */
        .hier{display:grid;grid-template-columns:1fr 40px 1fr 40px 1fr;align-items:stretch;gap:0;margin-top:48px}
        .hc{border:1px solid var(--lk);border-radius:16px;padding:28px;transition:.25s;background:var(--white)}
        .hc:hover{transform:translateY(-4px);border-color:var(--em);box-shadow:0 18px 40px rgba(5,7,6,.08)}
        .hc small{color:var(--dim);font-weight:700;font-size:12px;letter-spacing:.06em}
        .hc h3{font-size:26px;letter-spacing:-.03em;margin:6px 0 8px}
        .hc p{margin:0;color:var(--dim);font-size:15px}
        .hc.dk{background:var(--bg);color:var(--white);border-color:var(--bg)}
        .hc.dk p,.hc.dk small{color:var(--gray)}
        .ar{display:grid;place-items:center;color:var(--em);font-size:24px}

        /* ---- suite cards ---- */
        .pg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
        .pc{border:1px solid var(--lk);border-radius:16px;padding:26px;position:relative;transition:.25s;background:var(--white);display:flex;flex-direction:column}
        .pc:hover{transform:translateY(-4px);border-color:var(--em)}
        .pc .ic{width:46px;height:46px;border-radius:12px;background:var(--bg);color:var(--emb);display:grid;place-items:center;margin-bottom:16px}
        .pc h3{margin:16px 0 6px;font-size:20px;letter-spacing:-.02em}
        .pc p{margin:0 0 18px;color:var(--dim);font-size:15px;flex:1}
        .tag{position:absolute;top:22px;right:22px;z-index:2;font-size:11px;font-weight:800;padding:3px 10px;border-radius:99px;background:rgba(5,7,6,.06);color:var(--dim)}
        .tag.on{background:var(--emd);color:var(--emb)}
        .pc.soon{opacity:.92}
        .lnk{font-weight:700;color:var(--em);font-size:14px}
        .pc.big{grid-column:span 3;background:var(--bg);color:var(--white);border-color:var(--bg);display:grid;grid-template-columns:1fr 1.15fr;gap:40px;padding:40px;align-items:center;overflow:hidden}
        .pc.big h3{margin-top:0}
        .pc.big p{color:var(--gray);flex:none;margin-bottom:22px;font-size:17px}
        .pc.big h3{font-size:34px}
        .pc.big .tag{position:static;display:inline-block;margin-bottom:14px}

        /* ---- shared screenshot frame ---- */
        .mini{background:var(--white);border-radius:12px;border:1px solid rgba(243,245,242,.14);overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.45);transform:perspective(1200px) rotateY(-9deg) rotateX(3deg);transition:.5s}
        .pc.big:hover .mini{transform:perspective(1200px) rotateY(-3deg) rotateX(1deg)}

        .shot{display:flex;flex-direction:column;background:var(--panel)}
        .shot img{display:block;width:100%;height:auto;object-fit:cover;object-position:top center}

        .shot.large{height:100%}
        .shot.large img{height:100%;min-height:320px}

        .thumb{width:100%;aspect-ratio:16/10;border-radius:12px;overflow:hidden;background:var(--bg);margin-bottom:4px;border:1px solid var(--lk)}
        .thumb .shot{border:none;height:100%;background:transparent}
        .thumb .shot .mt{display:none}
        .thumb .shot img{height:100%;width:100%;object-fit:cover;object-position:top center}

        /* ---- blank placeholder ---- */
        .placeholder{display:flex;align-items:center;justify-content:center;width:100%;height:100%;min-height:220px;background:var(--gr);color:rgba(243,245,242,.28)}
        .placeholder svg{width:56px;height:56px}
        .thumb .placeholder{min-height:0}

        /* ---- mock POS ---- */
        .mt{display:flex;gap:5px;padding:9px 12px;background:var(--panel)}
        .mt i{width:8px;height:8px;border-radius:50%;background:#3a423d}
        .mb{display:grid;grid-template-columns:90px 1fr 120px;height:230px;color:var(--bg)}
        .ms{background:var(--bg);padding:12px 8px;font-size:10px;color:var(--gray)}
        .ms b{display:block;color:var(--white);font-size:12px;padding:0 6px 8px}
        .ms div{padding:5px 8px;border-radius:5px}
        .ms .a{background:var(--emd);color:var(--emb)}
        .mg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px}
        .mg div{border:1px solid var(--lk);border-radius:8px;padding:6px;font-size:9px;font-weight:700}
        .mg div:before{content:"";display:block;height:34px;border-radius:5px;background:var(--emd);margin-bottom:5px}
        .mc{background:var(--bg);color:var(--white);margin:10px;border-radius:8px;padding:10px;font-size:9px}
        .mc b{color:var(--emb);font-size:14px;display:block;margin-top:14px}
        .mc span{display:block;padding:3px 0;border-top:1px solid var(--line)}

        /* ---- how it works ---- */
        .cols{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
        .col{border:1px solid var(--line);border-radius:16px;padding:28px;background:var(--panel)}
        .col b{display:block;color:var(--emb);font-size:40px;letter-spacing:-.04em;line-height:1;margin-bottom:12px}
        .col h3{margin:0 0 6px}
        .col p{margin:0;color:var(--gray);font-size:15px}
        .flow{display:flex;align-items:center;justify-content:center;gap:0;margin-top:56px;flex-wrap:wrap}
        .fn{border:1px solid var(--line);background:var(--panel);border-radius:12px;padding:14px 22px;font-weight:800}
        .fn.on{border-color:var(--emb);color:var(--emb)}
        .fl2{width:80px;height:2px;background:repeating-linear-gradient(90deg,var(--emb) 0 6px,transparent 6px 14px);background-size:14px 2px}

        /* ---- whats inside ---- */
        .fs{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
        .ft{list-style:none;padding:0;margin:26px 0 30px}
        .ft li{padding:10px 0 10px 32px;position:relative;border-bottom:1px solid var(--lk);font-weight:600}
        .ft li:before{content:"✓";position:absolute;left:0;color:var(--em);font-weight:800}
        .q{font-size:clamp(26px,3.4vw,40px);line-height:1.25;letter-spacing:-.025em;font-weight:700;max-width:860px;margin:0}

        /* ---- final cta ---- */
        .fin{text-align:center;background:var(--bg);color:var(--white);position:relative;overflow:hidden}
        .fin h2{margin:10px auto 14px;color:var(--white)}
        .fin .sub{margin:0 auto 30px;color:var(--gray)}

        /* ---- footer ---- */
        .footer{background:var(--bg);color:var(--dim);border-top:1px solid var(--line);padding:56px 0 28px;font-size:14px}
        .fg{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:32px}
        .footer h4{color:var(--white);margin:0 0 12px;font-size:14px}
        .footer a{display:block;padding:3px 0}
        .footer a:hover{color:var(--emb)}
        .footer-logo{color:var(--white)}
        .footer p{max-width:260px}
        .cp{margin-top:40px;padding-top:20px;border-top:1px solid var(--line);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px}

        /* ---- svg dashed line base ---- */
        .fl{stroke-dasharray:3 9}

        /* ---- responsive ---- */
        @media(max-width:900px){
          .hero-inner,.fs,.pc.big{grid-template-columns:1fr}
          .pg,.cols{grid-template-columns:1fr}
          .pc.big{grid-column:auto;padding:26px}
          .hier{grid-template-columns:1fr}
          .ar{transform:rotate(90deg);padding:10px 0}
          .links{display:none}
          .nav-inner{justify-content:space-between}
          .fg{grid-template-columns:1fr 1fr}
          section{padding:64px 0}
          .hero{padding:48px 0 56px}
        }
        @media(prefers-reduced-motion:reduce){
          *,*::before,*::after{transition:none!important}
          .rv{visibility:visible}
        }
      `}</style>

      <Nav />
      <Hero />
      <Hierarchy />
      <SuiteSection />
      <HowItWorks />
      <SpotSection />
      <About />
      <FinalCta />
      <Footer />
    </>
  );
}