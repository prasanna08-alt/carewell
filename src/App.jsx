import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";
import { Bottle, Box, Product, Logo, Awning, Sprites, ShelfArt } from "./Art";

gsap.registerPlugin(ScrollTrigger);

const C = { cyan: "#35f0ff", mag: "#ff3d8b", amber: "#ffb02e", violet: "#8b5cff", lime: "#9dff4a" };
const NEON = Object.values(C);

/* ---------- data (sample content: edit freely) ---------- */
const TABLETS = [
  { n: "Paracetamol 500 mg", use: "Fever, headache, mild pain", pack: "15 tablets", price: "₹30", d: "A gentle everyday pain and fever reliever. Check the label for the daily limit.", c: C.cyan },
  { n: "Ibuprofen 400 mg", use: "Body ache, period pain, swelling", pack: "15 tablets", price: "₹45", d: "Works on pain and inflammation. Best taken after food.", c: C.mag },
  { n: "Cetirizine 10 mg", use: "Sneezing, runny nose, itchy eyes", pack: "10 tablets", price: "₹25", d: "Taken once a day. Can cause drowsiness in some people.", c: C.violet },
  { n: "Antacid chewable", use: "Heartburn, sour stomach", pack: "12 tablets", price: "₹35", d: "Neutralises stomach acid within minutes. Chew well before swallowing.", c: C.lime },
  { n: "Vitamin C 500 mg", use: "Daily immune support", pack: "20 tablets", price: "₹120", d: "A daily supplement. It supports your diet; it does not cure colds.", c: C.amber },
  { n: "Vitamin D3 1000 IU", use: "Bone and muscle health", pack: "30 tablets", price: "₹150", d: "Best with a meal that has some fat. The right dose depends on your blood level.", c: C.amber },
];

const SHELVES = [
  { t: "Pain relief", c: C.cyan, list: ["Paracetamol 500 mg", "Ibuprofen 400 mg", "Aspirin 75 mg"], d: "Fast relief for headaches, body aches and fever. Our pharmacist can match the tablet to your pain." },
  { t: "Allergy", c: C.mag, list: ["Cetirizine 10 mg", "Levocetirizine 5 mg", "Loratadine 10 mg"], d: "Antihistamines for sneezing, itching and watery eyes, with notes on which ones cause drowsiness." },
  { t: "Digestion", c: C.lime, list: ["Antacid chewable", "Simethicone chewable", "Probiotic capsule"], d: "Calm heartburn, gas and bloating. Chewables work in minutes; capsules build up over days." },
  { t: "Vitamins", c: C.amber, list: ["Vitamin C 500 mg", "Vitamin D3 1000 IU", "B-complex", "Zinc 50 mg"], d: "Daily supplements in tablet, chewable and softgel form. Ask which ones suit your diet." },
  { t: "Cold and flu", c: C.violet, list: ["Cold-flu combo tablet", "Zinc lozenge", "Vitamin C 500 mg"], d: "Combination tablets and lozenges for blocked nose, sore throat and body ache." },
];

const GLASS = [
  { t: "Vitamin C", s: "Orange chewable, 500 mg", p: "₹120", kind: "bottle", b: "#ff9a1f" },
  { t: "Zinc", s: "Daily tablet strip, 50 mg", p: "₹95", kind: "strip", b: "#35f0ff" },
  { t: "Vitamin D3", s: "Tablet pack, 1000 IU", p: "₹150", kind: "box", b: "#8b5cff" },
];

/* ---------- small pieces ---------- */
function Pill({ size = 40, a = "#fff", b = C.cyan, round = false }) {
  return <div className={"pill" + (round ? " round" : "")} style={{ "--s": size + "px", "--a": a, "--b": b }} />;
}

function Shelf({ z, idx }) {
  return (
    <div className="shelf abs3d" style={{ transform: `translate(-50%,-50%) translateZ(${z}px)`, "--c": NEON[idx % 5] }}>
      <ShelfArt idx={idx} />
    </div>
  );
}

/* ---------- 1. fly-in hero ---------- */
function Hero() {
  const root = useRef();
  const bits = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const r = (n) => { const x = Math.sin(i * 97.1 + n * 13.7) * 10000; return x - Math.floor(x); };
        return {
          x: (r(1) > 0.5 ? 1 : -1) * (300 + r(2) * 650), y: (r(3) - 0.5) * 700, z: -150 - r(4) * 2600,
          size: 26 + r(5) * 34, col: NEON[Math.floor(r(6) * 5)], round: r(7) > 0.7, delay: -r(8) * 9,
        };
      }),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ".fly", start: "top top", end: "+=5000", scrub: 1, pin: true, anticipatePin: 1 },
        });
        tl.to(".world", { z: 2800, rotationZ: 5, duration: 10 }, 0)
          .to(".hero-copy", { opacity: 0, y: -50, duration: 1.2 }, 0)
          .to(".door", { rotationY: -105, transformPerspective: 600, duration: 2.4, ease: "power2.out" }, 0.4)
          .to(".doorway", { scale: 1.15, duration: 2.4 }, 0.4)
          .to(".facade", { opacity: 0, duration: 1.4 }, 2.1)
          .fromTo(".end3d", { opacity: 0 }, { opacity: 1, duration: 1 }, 7.6)
          .to(".flash", { opacity: 1, duration: 1.2 }, 8.8);

        const rx = gsap.quickTo(".world", "rotationX", { duration: 0.8, ease: "power3" });
        const ry = gsap.quickTo(".world", "rotationY", { duration: 0.8, ease: "power3" });
        const move = (e) => {
          ry((e.clientX / innerWidth - 0.5) * 8);
          rx(-(e.clientY / innerHeight - 0.5) * 5);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="fly" ref={root} id="top">
      <div className="scene">
        <div className="rig">
          <div className="world">
            <div className="facade abs3d">
              <div className="sign"><Logo size={48} /><b>Carewell Pharmacy</b></div>
              <div className="win l"><Awning /><ShelfArt idx={1} w={560} h={420} rows={2} /></div>
              <div className="win r"><Awning /><ShelfArt idx={3} w={560} h={420} rows={2} /></div>
              <div className="doorway" />
              <div className="door"><span /></div>
              <div className="open-sign">Open</div>
            </div>
            {[-300, -800, -1300, -1800].map((z, i) => <Shelf key={z} z={z} idx={i} />)}
            {bits.map((b, i) => (
              <div key={i} className="abs3d" style={{ transform: `translate3d(${b.x}px,${b.y}px,${b.z}px)` }}>
                <div className="tumble" style={{ animationDelay: b.delay + "s" }}>
                  {b.round ? <div style={{ width: b.size * 1.5 }}><Bottle c={b.col} label="Rx" /></div> : <Pill size={b.size} a="#fff" b={b.col} />}
                </div>
              </div>
            ))}
            <div className="end3d abs3d" style={{ transform: "translate(-50%,-50%) translateZ(-2800px)" }}>
              <h2>Step inside</h2>
              <p>Aisles of tablets, vitamins and everyday care.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-copy">
        <h1>Your pharmacy, one scroll away</h1>
        <p>Scroll to walk in</p>
        <span className="line" />
      </div>
      <div className="flash" />
    </section>
  );
}

/* ---------- 2. table + description ---------- */
function TableSection() {
  const root = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tintro > *", { y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".tintro", start: "top 80%" } });
      gsap.from("tbody tr", {
        opacity: 0, rotationX: -75, y: 50, transformOrigin: "50% 0%", transformPerspective: 900, stagger: 0.18, ease: "none",
        scrollTrigger: { trigger: "table", start: "top 85%", end: "center 55%", scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="sec light" id="tablets" ref={root}>
      <div className="wrap tgrid">
        <div className="tintro">
          <h2>Everyday tablets, explained</h2>
          <p>What each tablet is for, how it comes, and what it costs, in plain words. Our pharmacists are at the counter if you want to talk it through.</p>
          <p className="note">Sample information and prices. Always read the label and ask a pharmacist before starting a new medicine.</p>
        </div>
        <div className="twrap">
          <table>
            <thead><tr><th>Tablet</th><th>Helps with</th><th>Pack</th><th>Price</th><th>About</th></tr></thead>
            <tbody>
              {TABLETS.map((t, i) => (
                <tr key={t.n}>
                  <td><span className="tname"><Product kind={["box", "bottle", "strip"][i % 3]} c={t.c} label="Rx" className="thumb" />{t.n}</span></td>
                  <td>{t.use}</td><td>{t.pack}</td><td className="price">{t.price}</td><td className="about">{t.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------- marquee ---------- */
function Marquee() {
  const el = useRef();
  useEffect(() => {
    let sk;
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-14, 14, self.getVelocity() / -250);
        sk && sk.kill();
        sk = gsap.timeline().to(el.current, { skewX: v, duration: 0.2 }).to(el.current, { skewX: 0, duration: 0.9, ease: "elastic.out(1,.5)" });
      },
    });
    return () => st.kill();
  }, []);
  const words = ["Paracetamol", "Vitamin C", "Cetirizine", "Zinc", "Ibuprofen", "Vitamin D3", "Antacid", "B-complex"];
  return (
    <div className="marquee"><div className="mq" ref={el}>
      {[...words, ...words, ...words, ...words].map((w, i) => <span key={i}>{w}<Pill size={14} b={NEON[i % 5]} round /></span>)}
    </div></div>
  );
}

/* ---------- 3. expanding neon cards ---------- */
function NeonCards() {
  const [on, setOn] = useState(0);
  const wrap = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ncard", { y: 140, opacity: 0, rotationX: -35, transformPerspective: 900, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: wrap.current, start: "top 80%" } });
    }, wrap);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    wrap.current.querySelectorAll(".ncard").forEach((c, i) => {
      gsap.to(c, { flexGrow: i === on ? 5 : 1, duration: 0.8, ease: "power3.inOut", overwrite: "auto" });
      gsap.to(c.querySelector(".nbody"), { opacity: i === on ? 1 : 0, duration: 0.4, delay: i === on ? 0.35 : 0, overwrite: "auto" });
    });
  }, [on]);
  return (
    <section className="sec dark" id="shelves">
      <div className="wrap">
        <h2>Shelves that light up</h2>
        <p className="lead">Hover or tap a shelf to open it.</p>
        <div className="neon" ref={wrap}>
          {SHELVES.map((s, i) => (
            <div key={s.t} className={"ncard" + (on === i ? " on" : "")} style={{ "--c": s.c }} tabIndex={0} role="button" aria-expanded={on === i}
              onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)}>
              <div className="vt">{s.t}</div>
              <div className="nbody">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>
                <div className="bigpill"><Bottle c={s.c} label={s.t} className="art bottle" /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. 3D tilt + parallax + glass ---------- */
function TiltCard({ item }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      ry(x * 24); rx(-y * 24);
      el.style.setProperty("--gx", (x + 0.5) * 100 + "%"); el.style.setProperty("--gy", (y + 0.5) * 100 + "%");
    };
    const leave = () => { rx(0); ry(0); };
    el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);
  return (
    <div className="tc" ref={ref}>
      <div className="gbg" />
      <div className="glare" />
      <div className="pop"><div className="bob"><Product kind={item.kind} c={item.b} label={item.t} /></div></div>
      <h3>{item.t}</h3>
      <p>{item.s}</p>
      <span className="badge">{item.p}</span>
    </div>
  );
}

function GlassSection() {
  const root = useRef();
  const floats = [
    { l: "6%", t: "12%", s: 70, b: C.mag, sp: -60 }, { l: "88%", t: "8%", s: 100, b: C.cyan, sp: -120 },
    { l: "80%", t: "62%", s: 60, b: C.amber, sp: -40, r: 1 }, { l: "4%", t: "70%", s: 110, b: C.violet, sp: -140 },
    { l: "46%", t: "4%", s: 44, b: C.lime, sp: -30, r: 1 }, { l: "58%", t: "88%", s: 80, b: C.cyan, sp: -90 },
  ];
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fl").forEach((f) => {
        gsap.to(f, { y: parseFloat(f.dataset.sp), ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
      const movers = gsap.utils.toArray(".fl .dp").map((d) => ({
        x: gsap.quickTo(d, "x", { duration: 1, ease: "power3" }), y: gsap.quickTo(d, "y", { duration: 1, ease: "power3" }), k: parseFloat(d.dataset.k),
      }));
      const move = (e) => movers.forEach((m) => { m.x((e.clientX / innerWidth - 0.5) * m.k); m.y((e.clientY / innerHeight - 0.5) * m.k); });
      root.current.addEventListener("mousemove", move);
      gsap.from(".tc", { y: 120, rotationX: 40, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".tilts", start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="sec glass" id="glass" ref={root}>
      {floats.map((f, i) => (
        <div key={i} className="fl" data-sp={f.sp} style={{ left: f.l, top: f.t }}>
          <div className="dp" data-k={60 + i * 25}><div className="bob"><Pill size={f.s} b={f.b} round={!!f.r} /></div></div>
        </div>
      ))}
      <div className="wrap">
        <h2>Tablets you can almost touch</h2>
        <p className="lead">Move your cursor across a card. Everything behind the glass drifts at its own speed.</p>
        <div className="tilts">{GLASS.map((g) => <TiltCard key={g.t} item={g} />)}</div>
      </div>
    </section>
  );
}

/* ---------- CTA + page shell ---------- */
function Cta() {
  const root = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".cta-pill", { rotation: 360, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: 1 } });
      gsap.from(".cta h2", { scale: 0.6, opacity: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 40%", scrub: 1 } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="cta" ref={root} id="order">
      <div className="cta-pill"><Box c={C.mag} label="Carewell" className="art box" /></div>
      <h2>Ready before you reach the counter</h2>
      <p>Send your prescription and pick up in minutes, or have it delivered.</p>
      <button className="btn">Order medicines</button>
      <footer>Carewell Pharmacy. Sample landing page. Information is not medical advice.</footer>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const t = gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
    return () => { t.scrollTrigger && t.scrollTrigger.kill(); t.kill(); };
  }, []);
  return (
    <>
      <Sprites />
      <div className="progress" />
      <nav className="nav">
        <a href="#top" className="brand"><Logo size={30} />Carewell</a>
        <div><a href="#tablets">Tablets</a><a href="#shelves">Shelves</a><a href="#glass">Featured</a><a href="#order">Order</a></div>
      </nav>
      <Hero />
      <TableSection />
      <Marquee />
      <NeonCards />
      <GlassSection />
      <Cta />
    </>
  );
}
