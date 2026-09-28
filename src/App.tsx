import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Download,
  Github,
  GitBranch,
  LockKeyhole,
  Menu,
  Play,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import mobileHeroImage from './assets/images/altercode_mobile_hero_1790513583351.jpg';
import securityImage from './assets/images/altercode_security_vault_1790513598077.jpg';
import logoImage from './assets/images/altercodelogo.png';
import googlePlayImage from './assets/images/googleplay-badge.png';
import appStoreImage from './assets/images/appstore-coming-soon.png';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ai.altercode';
const GITHUB_URL = 'https://github.com/ramzesktaplah/Altercode';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;
  return (
    <div ref={ref} style={style} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function BrandMark() {
  return (
    <img className="brand-logo" src={logoImage} alt="" aria-hidden="true" />
  );
}

function StoreBadges() {
  return (
    <div className="store-badges" aria-label="Download options">
      <a className="store-badge" href={PLAY_STORE_URL} target="_blank" rel="noreferrer" aria-label="Get AlterCode on Google Play">
        <img src={googlePlayImage} alt="Get it on Google Play" />
      </a>
      <span className="store-badge store-badge--disabled" aria-label="AlterCode coming soon to the App Store">
        <img src={appStoreImage} alt="Coming soon on the App Store" />
      </span>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Demo', 'playground'],
    ['Capabilities', 'features'],
    ['Architecture', 'architecture'],
    ['Security', 'security'],
  ];

  return (
    <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <div className="shell site-nav__inner">
        <a className="wordmark" href="#top" aria-label="AlterCode home">
          <BrandMark />
          <span>altercode</span>
        </a>

        <nav className="site-nav__links" aria-label="Primary navigation">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => scrollToId(id)}>{label}</button>
          ))}
        </nav>

        <div className="site-nav__actions">
          <a className="nav-github" href={GITHUB_URL} target="_blank" rel="noreferrer">
            <Github size={15} /> <span>GitHub</span>
          </a>
          <a className="button button--small button--lime" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
            <Download size={15} /> Get the app
          </a>
          <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        {links.map(([label, id]) => (
          <button key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }}>{label}</button>
        ))}
        <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Get the app <ArrowUpRight size={16} /></a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero section-pad">
      <div className="hero__orb hero__orb--one" />
      <div className="hero__orb hero__orb--two" />
      <div className="shell">
        <div className="hero__eyebrow reveal is-visible">
          <span className="status-dot" /> alter 2.8 is live
        </div>

        <div className="hero__grid">
          <div className="hero__copy">
            <Reveal delay={80}>
              <h1>Code that <em>moves</em> at your speed.</h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="hero__lede">
                AlterCode brings a fast, public AI code converter to the devices already in your pocket. Refactor, translate, debug, and ship without breaking your flow.
              </p>
            </Reveal>
            <Reveal delay={220} className="hero__actions">
              <StoreBadges />
              <button className="text-link" onClick={() => scrollToId('playground')}>See it in action <ArrowDownRight size={17} /></button>
            </Reveal>
            <Reveal delay={290}>
              <div className="hero__proof">
                <div className="proof-avatars" aria-hidden="true"><span>AK</span><span>JS</span><span>+</span></div>
                <span>Built for developers who think in motion.</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={170} className="hero__visual-wrap">
            <div className="hero__visual">
              <div className="visual-grid" />
              <div className="visual-label visual-label--top"><span className="status-dot status-dot--lime" /> Local-first runtime</div>
              <div className="visual-label visual-label--side">01 <span /> 04</div>
              <div className="hero__image-frame">
                <img src={mobileHeroImage} alt="AlterCode running on an Android phone" />
                <div className="hero__image-shade" />
                <div className="hero__image-caption">
                  <span>ALTERCODE / ANDROID</span>
                  <strong>Build from anywhere.</strong>
                </div>
              </div>
              <div className="floating-stat floating-stat--top"><Zap size={14} /> <strong>140ms</strong><span>average response</span></div>
              <div className="floating-stat floating-stat--bottom"><LockKeyhole size={14} /> <strong>Encrypted</strong><span>by default</span></div>
            </div>
          </Reveal>
        </div>

        <button className="scroll-cue" onClick={() => scrollToId('signal')} aria-label="Scroll to discover more">
          <span>Scroll to explore</span><ArrowDownRight size={17} />
        </button>
      </div>
    </section>
  );
}

function SignalStrip() {
  const items = ['GROQ + GEMINI', 'SQLCIPHER LOCAL VAULT', 'ZERO-CORS EDGE', '12+ LANGUAGES', 'JETPACK COMPOSE', 'ANDROID NATIVE'];
  return (
    <section id="signal" className="signal-strip" aria-label="AlterCode capabilities">
      <div className="signal-strip__track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}><i /> {item}</span>
        ))}
      </div>
    </section>
  );
}

function ProductVideo() {
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasLoaded = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasLoaded.current) {
            hasLoaded.current = true;
            setShouldLoad(true);
          } else {
            iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
          }
        } else if (hasLoaded.current) {
          iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className="playground__video">
      {shouldLoad && (
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/XgNR9ligu6c?si=RTsR0bpuptJVywxo&autoplay=1&mute=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1"
          title="AlterCode product video"
          frameBorder="0"
          allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </div>
  );
}

function Playground() {
  return (
    <section id="playground" className="playground section-pad section-dark">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <Reveal>
            <div className="kicker"><span>01</span> The pocket-sized advantage</div>
            <h2>Your best ideas don’t wait for a desk.</h2>
          </Reveal>
          <Reveal delay={100}>
            <p>Paste a snippet. Ask a sharper question. Keep moving. AlterCode makes serious development work feel natural on a phone, with an interface designed for thumb-speed thinking.</p>
            <button className="text-link text-link--light" onClick={() => scrollToId('features')}>Explore capabilities <ArrowRight size={17} /></button>
          </Reveal>
        </div>

        <Reveal className="playground__window" delay={100}>
          <div className="playground__chrome">
            <div className="window-dots"><i /><i /><i /></div>
            <div className="window-title"><Play size={14} fill="currentColor" /> altercode / product tour</div>
            <span className="window-live"><span className="status-dot status-dot--lime" /> watch now</span>
          </div>
          <ProductVideo />
        </Reveal>
      </div>
    </section>
  );
}

function Features() {
  const cards = [
    { number: '02', icon: GitBranch, title: 'Translate without losing the plot.', body: 'Move between Kotlin, Python, TypeScript, Rust, Go, Swift, and more while keeping the idioms that make each language feel right.', tags: ['12+ languages', 'Idiomatic output'], className: 'feature-card--wide' },
    { number: '03', icon: LockKeyhole, title: 'Your code stays yours.', body: 'History lives in an encrypted local vault backed by Android Keystore. No plaintext cloud archive. No silent sync.', tags: ['AES-256', 'SQLCipher'], className: 'feature-card--tall' },
    { number: '04', icon: Cpu, title: 'The right engine, every time.', body: 'A dual-engine route picks the best model for the task: fast Groq inference for debugging, Gemini depth for conversion and refactors.', tags: ['Groq', 'Gemini'], className: 'feature-card--dark' },
    { number: '05', icon: ShieldCheck, title: 'Fast by design.', body: 'Native Android UI, edge-routed requests, and a zero-CORS architecture keep the distance between question and answer short.', tags: ['~140ms', 'Zero-CORS'], className: 'feature-card--accent' },
  ];
  return (
    <section id="features" className="features section-pad">
      <div className="shell">
        <div className="section-intro">
          <Reveal>
            <div className="kicker"><span>02</span> What makes it different</div>
            <h2>Small screen.<br /><em>Serious leverage.</em></h2>
          </Reveal>
          <Reveal delay={100} className="section-intro__aside">
            <p>There is no “mobile version” of the experience. AlterCode is built around the way developers actually think: in fragments, in bursts, and in the five minutes between everything else.</p>
          </Reveal>
        </div>

        <div className="feature-grid">
          {cards.map(({ number, icon: Icon, title, body, tags, className }, index) => (
            <Reveal key={number} delay={index * 70} className={`feature-card ${className}`}>
              <div className="feature-card__top"><span className="card-number">{number}</span><Icon size={21} strokeWidth={1.7} /></div>
              <div className="feature-card__content"><h3>{title}</h3><p>{body}</p></div>
              <div className="feature-card__tags">{tags.map((tag) => <span key={tag}><Check size={13} /> {tag}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section id="architecture" className="architecture section-pad section-ink">
      <div className="shell">
        <div className="architecture__grid">
          <Reveal>
            <div className="kicker kicker--light"><span>03</span> Under the hood</div>
            <h2>One clean path<br />from <em>thought</em><br />to output.</h2>
            <p className="architecture__lede">Every request travels through a focused pipeline: your device, the edge, the right model, and back again. No clutter in between.</p>
            <a className="text-link text-link--light" href={GITHUB_URL} target="_blank" rel="noreferrer">Read the source <Github size={17} /></a>
          </Reveal>
          <Reveal className="architecture__diagram" delay={120}>
            <div className="diagram-line" />
            {[
              { number: '01', title: 'Your device', body: 'Native Compose interface', icon: SmartphoneGlyph },
              { number: '02', title: 'Edge route', body: 'Fingerprint + quota guard', icon: Zap },
              { number: '03', title: 'Best-fit engine', body: 'Groq or Gemini, dynamically', icon: Cpu },
              { number: '04', title: 'Clear answer', body: 'Back to your pocket in ~140ms', icon: Sparkles },
            ].map(({ number, title, body, icon: Icon }) => (
              <div className="diagram-step" key={number}><div className="diagram-step__index">{number}</div><div className="diagram-step__icon"><Icon size={17} /></div><div><strong>{title}</strong><span>{body}</span></div></div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SmartphoneGlyph() {
  return <Code2 size={17} />;
}

function Security() {
  return (
    <section id="security" className="security section-pad">
      <div className="shell">
        <div className="security__card">
          <div className="security__image"><img src={securityImage} alt="Secure AlterCode vault interface" /><div className="security__image-overlay" /></div>
          <Reveal className="security__copy" delay={120}>
            <div className="kicker"><span>04</span> A quieter kind of safe</div>
            <h2>Privacy is a product feature.</h2>
            <p>AlterCode treats your code like it belongs to you. Your history is encrypted before it touches local storage, and the cloud only sees the request needed to answer the question in front of you.</p>
            <div className="security__list"><span><Check size={15} /> AES-256 encrypted SQLite</span><span><Check size={15} /> Android Keystore backed keys</span><span><Check size={15} /> No cloud history sync</span></div>
            <span className="security__note"><LockKeyhole size={14} /> Protected on-device by default</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section className="download section-pad">
      <div className="shell">
        <Reveal className="download__panel">
          <div className="download__glow" />
          <div className="download__copy"><div className="kicker kicker--light"><span>05</span> Ready when you are</div><h2>Make the next<br /><em>good thing.</em></h2><p>Keep your best thinking close. AlterCode is free to start on Android.</p></div>
          <div className="download__action"><StoreBadges /><span>Mobile devices <i /> Free to start</span></div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const questions = [
    ['Is AlterCode only for Android?', 'Yes. AlterCode is intentionally Android-native so the experience can stay fast, focused, and close to the hardware.'],
    ['What models power the assistant?', 'AlterCode dynamically routes requests between Groq and Gemini depending on the job. Fast debugging gets the fast path; deep conversions get the model with more room to think.'],
    ['Does my code get stored in the cloud?', 'No cloud history is kept. Your local history is encrypted with SQLCipher and protected by Android Keystore-backed keys.'],
    ['Which languages can I translate?', 'AlterCode supports Kotlin, Python, TypeScript, Rust, Go, Swift, C++, Java, C#, PHP, and more.'],
  ];
  return (
    <section id="faq" className="faq section-pad">
      <div className="shell faq__grid">
        <Reveal><div className="kicker"><span>06</span> Good questions</div><h2>Before you<br /><em>get building.</em></h2><p>Still curious? The app is open-source, so you can always look closer.</p><a className="text-link" href={GITHUB_URL} target="_blank" rel="noreferrer">Visit GitHub <ArrowUpRight size={17} /></a></Reveal>
        <Reveal delay={100} className="faq__list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="footer"><div className="shell footer__inner"><a className="wordmark" href="/#top"><BrandMark /><span>altercode</span></a><span className="footer__meta">Native AI tooling for Android developers.</span><div className="footer__links"><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms &amp; Conditions</a></div><span className="footer__legal">© 2025 AlterCode</span></div></footer>;
}

function PolicyPage({ type }: { type: 'privacy' | 'terms' }) {
  const isPrivacy = type === 'privacy';
  return <div className="policy-page"><header className="policy-page__nav"><a className="wordmark" href="/#top"><BrandMark /><span>altercode</span></a><a className="text-link" href="/#top"><ArrowLeft size={17} /> Back to home</a></header><main className="policy-page__content"><div className="kicker"><span>{isPrivacy ? '01' : '02'}</span> AlterCode legal</div><h1>{isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}</h1><p className="policy-page__updated">Last updated: September 27, 2026</p>{isPrivacy ? <><h2>What we collect</h2><p>AlterCode is designed to keep your development workflow private. We collect only the information needed to provide the app, improve reliability, and respond to support requests.</p><h2>Code and local history</h2><p>Your code history is stored locally on your device and protected with Android Keystore-backed encryption. We do not sell your code or maintain a cloud archive of your local history.</p><h2>AI requests</h2><p>When you ask AlterCode for an explanation, translation, or refactor, the request is sent to the selected AI service through our edge routing layer so we can return an answer. Requests are protected in transit and are not used to identify you.</p><h2>Contact</h2><p>Questions about privacy can be directed to the AlterCode team through the project repository.</p></> : <><h2>Using AlterCode</h2><p>AlterCode is provided as a development aid. You are responsible for reviewing generated output, testing changes, and confirming that code is safe and appropriate for your project.</p><h2>Your responsibilities</h2><p>Do not use AlterCode to upload code or content you are not authorized to share. You agree not to abuse, reverse engineer, or disrupt the service or its supporting infrastructure.</p><h2>Availability and changes</h2><p>Features may change as AlterCode evolves. We may update these terms when the service, app, or applicable requirements change. Continued use after an update means you accept the revised terms.</p><h2>Contact</h2><p>For questions about these terms, contact the AlterCode team through the project repository.</p></>}</main><Footer /></div>;
}

export default function App() {
  if (window.location.pathname === '/privacy-policy') return <PolicyPage type="privacy" />;
  if (window.location.pathname === '/terms') return <PolicyPage type="terms" />;
  return <div className="site-shell"><Navbar /><main><Hero /><SignalStrip /><Playground /><Features /><Architecture /><Security /><DownloadSection /><Faq /></main><Footer /></div>;
}
