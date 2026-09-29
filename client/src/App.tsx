import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
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
import securityImage from './assets/images/altercode_security_vault_1790513598077.jpg';
import logoImage from './assets/images/altercodelogo.png';
import googlePlayImage from './assets/images/googleplay-badge.png';
import appStoreImage from './assets/images/appstore-comingsoon.png';
import { FlatText } from './components/FlatText';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ai.altercode';
const GITHUB_URL = 'https://github.com/ramzesktaplah/Altercode';
const APP_STORE_URL = 'https://www.apple.com/app-store/';

function scrollToId(id: string, updateUrl = true) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (updateUrl && typeof window !== 'undefined') {
    const routeMap: Record<string, string> = {
      playground: '/demo',
      features: '/capabilities',
      architecture: '/architecture',
      security: '/security',
      top: '/',
    };
    const path = routeMap[id] || `/#${id}`;
    window.history.pushState({}, '', path);
  }
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
      <a className="store-badge" href={APP_STORE_URL} target="_blank" rel="noreferrer" aria-label="Visit the App Store">
        <img src={appStoreImage} alt="Available on the App Store soon" />
      </a>
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
            <Reveal delay={80} className="w-full">
              <h1 className="sr-only">Code that moves at your speed.</h1>
              <FlatText
                text={"Code that moves at your speed."}
                font={{ fontSize: 64, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.95, textAlign: "center" }}
                ink="#f4f6f1"
                reach={5}
                lift={4}
                drift={3}
                style={{ maxWidth: 860, margin: '0 auto' }}
              />
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
          </div>
        </div>
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
            <h2 className="sr-only">Your best ideas don’t wait for a desk.</h2>
            <FlatText
              text={"Your best ideas don’t wait for a desk."}
              font={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.96, textAlign: "left" }}
              ink="#eaf0e9"
              reach={5}
              lift={4}
              drift={3}
              style={{ maxWidth: 560 }}
            />
          </Reveal>
          <Reveal delay={100}>
            <p>
              Paste a snippet. Ask a sharper question. Keep moving. AlterCode makes serious development work feel natural on a phone, with an interface designed for thumb-speed thinking.
            </p>
            <button className="text-link text-link--light" onClick={() => scrollToId('features')}>Explore capabilities <ArrowRight size={17} /></button>
          </Reveal>
        </div>

        <Reveal className="playground__window" delay={100}>
          <div className="playground__chrome">
            <div className="window-dots"><i /><i /><i /></div>
            <div className="window-title"><Play size={14} fill="currentColor" /> altercode / product </div>
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
            <h2 className="sr-only">Small screen. Serious leverage.</h2>
            <FlatText
              text={"Small screen.\nSerious leverage."}
              font={{ fontSize: 54, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.95, textAlign: "left" }}
              ink="#0c1013"
              reach={5}
              lift={4}
              drift={3}
              style={{ maxWidth: 580 }}
            />
          </Reveal>
          <Reveal delay={100} className="section-intro__aside">
            <p>
              There is no “mobile version” of the experience. AlterCode is built around the way developers actually think: in fragments, in bursts, and in the five minutes between everything else.
            </p>
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
            <h2 className="sr-only">One clean path from thought to output.</h2>
            <FlatText
              text={"One clean path\nfrom thought\nto output."}
              font={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.95, textAlign: "left" }}
              ink="#f2f6ef"
              reach={5}
              lift={4}
              drift={3}
              style={{ maxWidth: 440 }}
            />
            <p className="architecture__lede">
              Every request travels through a focused pipeline: your device, the edge, the right model, and back again. No clutter in between.
            </p>
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
            <h2 className="sr-only">Privacy is a product feature.</h2>
            <FlatText
              text={"Privacy is a product feature."}
              font={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.96, textAlign: "left" }}
              ink="#0c1013"
              reach={5}
              lift={4}
              drift={3}
              style={{ maxWidth: 400 }}
            />
            <p>
              AlterCode treats your code like it belongs to you. Your history is encrypted before it touches local storage, and the cloud only sees the request needed to answer the question in front of you.
            </p>
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
          <div className="download__copy">
            <h2 className="sr-only">Make the next good thing.</h2>
            <FlatText
              text={"Make the next\ngood thing."}
              font={{ fontSize: 62, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.92, textAlign: "center" }}
              ink="#f5f7f1"
              reach={5}
              lift={4}
              drift={3}
              style={{ maxWidth: 620, margin: '0 auto' }}
            />
            <p>
              Keep your best thinking close. AlterCode is free to start on Android.
            </p>
          </div>
          <div className="download__action"><StoreBadges /><span>Mobile devices <i /> Free to start</span></div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <a className="wordmark" href="/#top"><BrandMark /><span>altercode</span></a>
        <span className="footer__meta">Made by Ramzes</span>
        <div className="footer__links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="/sitemap">Sitemap</a>
        </div>
        <span className="footer__legal">© 2026 AlterCode</span>
      </div>
    </footer>
  );
}

function PolicyPage({ type }: { type: 'privacy' | 'terms' }) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(type);
  const isPrivacy = activeTab === 'privacy';

  const setTab = (nextTab: 'privacy' | 'terms') => {
    setActiveTab(nextTab);
    window.history.pushState({}, '', nextTab === 'privacy' ? '/privacy-policy' : '/terms');
  };

  return (
    <div className="policy-page">
      <header className="policy-page__nav">
        <a className="wordmark" href="/#top"><BrandMark /><span>altercode</span></a>
        <a className="text-link" href="/#top"><ArrowLeft size={17} /> Back to home</a>
      </header>
      <main className="policy-page__content">
        <div className="policy-page__tabs">
          <button
            type="button"
            className={`policy-page__tab ${isPrivacy ? 'policy-page__tab--active' : ''}`}
            onClick={() => setTab('privacy')}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            className={`policy-page__tab ${!isPrivacy ? 'policy-page__tab--active' : ''}`}
            onClick={() => setTab('terms')}
          >
            Terms &amp; Conditions
          </button>
        </div>

        <h1>{isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}</h1>
        <p className="policy-page__updated">Last updated: August 14, 2026</p>

        {isPrivacy ? (
          <>
            <p>
              This Privacy Policy applies to the <strong>AlterCode</strong> mobile application operated by <strong>[AlterCode.DevTeam]</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
            </p>

            <h2>1. Information We Collect</h2>
            <ul>
              <li>
                <strong>Local Device Storage:</strong> Code snippets and history are saved directly on your mobile device using on-device SQLite. We do not store or transmit your saved snippets to external databases owned by us.
              </li>
              <li>
                <strong>Code Processing:</strong> Code pasted for conversion is processed in real-time using secure proxy connections to AI inference models and is not permanently retained.
              </li>
              <li>
                <strong>Ad Analytics (Google AdMob):</strong> We use Google AdMob to serve advertisements. AdMob may collect device identifiers (Advertising ID / IDFA), IP address, and app interaction data for ad serving and fraud prevention.
              </li>
            </ul>

            <h2>2. How We Use Information</h2>
            <p>
              We use collected data solely to execute AI code transformations and display rewarded advertisements to keep the app free to use.
            </p>

            <h2>3. Third-Party Services</h2>
            <p>
              Our app integrates trusted third-party providers:
            </p>
            <ul>
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Google AdMob &amp; Services
                </a>
              </li>
            </ul>

            <h2>4. Security</h2>
            <p>
              All network data in transit between your device and our proxy backend is encrypted using standard TLS/HTTPS encryption protocols.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have any questions regarding this policy, please contact us at: <a href="mailto:altercodeapp@cookscopeai.com">altercodeapp@cookscopeai.com</a>
            </p>
          </>
        ) : (
          <>
            <p>
              By downloading or using <strong>AlterCode</strong>, these terms will automatically apply to you.
            </p>

            <h2>1. AI Output &amp; Accuracy Disclaimer</h2>
            <p>
              Code transformations and explanations are generated automatically by artificial intelligence models. While we aim for high accuracy, AI output may contain bugs or security oversights. You are responsible for reviewing and testing all code before using it in production systems.
            </p>

            <h2>2. Rewarded Advertisements</h2>
            <p>
              Free usage of AI features may require completing rewarded video advertisements. Bypassing or attempting to automate ad interactions is strictly prohibited.
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              You retain full ownership of any code snippets you submit and the resulting converted code generated for you.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              We are not liable for any indirect, incidental, or consequential damages resulting from errors in converted code or temporary app service downtime.
            </p>

            <h2>5. Contact</h2>
            <p>
              For inquiries regarding these Terms, contact us at: <a href="mailto:altercodeapp@cookscopeai.com">altercodeapp@cookscopeai.com</a>
            </p>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function SitemapPage() {
  return (
    <div className="policy-page">
      <header className="policy-page__nav">
        <a className="wordmark" href="/#top"><BrandMark /><span>altercode</span></a>
        <a className="text-link" href="/#top"><ArrowLeft size={17} /> Back to home</a>
      </header>
      <main className="policy-page__content">
        <h1>Sitemap</h1>
        <p className="policy-page__updated">Complete directory of pages, features, and resources</p>

        <p>
          Explore all sections and public pages of AlterCode, the AI-powered developer tool and code assistant for devices.
        </p>

        <div className="sitemap-action-bar">
          <a className="text-link" href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
            View XML Sitemap <ArrowUpRight size={15} />
          </a>
          <a className="text-link" href="/robots.txt" target="_blank" rel="noopener noreferrer">
            View robots.txt <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="sitemap-grid">
          <div className="sitemap-card">
            <h3><span>01</span> Overview &amp; Demo</h3>
            <ul>
              <li>
                <a href="/">Home (Top) <span className="badge">1.0</span></a>
              </li>
              <li>
                <a href="/demo">Product Demo &amp; Video <span className="badge">0.9</span></a>
              </li>
            </ul>
          </div>

          <div className="sitemap-card">
            <h3><span>02</span> Platform Features</h3>
            <ul>
              <li>
                <a href="/capabilities">Capabilities &amp; 12+ Languages <span className="badge">0.8</span></a>
              </li>
              <li>
                <a href="/architecture">Under the Hood Architecture <span className="badge">0.8</span></a>
              </li>
              <li>
                <a href="/security">On-Device Security &amp; Vault <span className="badge">0.8</span></a>
              </li>
            </ul>
          </div>

          <div className="sitemap-card">
            <h3><span>03</span> Legal &amp; Compliance</h3>
            <ul>
              <li>
                <a href="/privacy-policy">Privacy Policy <span className="badge">0.6</span></a>
              </li>
              <li>
                <a href="/terms">Terms &amp; Conditions <span className="badge">0.6</span></a>
              </li>
            </ul>
          </div>

          <div className="sitemap-card">
            <h3><span>04</span> External Channels</h3>
            <ul>
              <li>
                <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
                  Google Play Store <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                  GitHub Repository <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const pathname = window.location.pathname;

  useEffect(() => {
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const routeToId: Record<string, string> = {
      demo: 'playground',
      playground: 'playground',
      capabilities: 'features',
      features: 'features',
      architecture: 'architecture',
      security: 'security',
    };

    const titles: Record<string, string> = {
      demo: 'AlterCode – Interactive Product Demo & Mobile Experience',
      playground: 'AlterCode – Interactive Product Demo & Mobile Experience',
      capabilities: 'AlterCode – Capabilities & 12+ Language Conversion',
      features: 'AlterCode – Capabilities & 12+ Language Conversion',
      architecture: 'AlterCode – High-Speed Edge Architecture & Dual Engine',
      security: 'AlterCode – On-Device AES-256 Security & Encrypted Vault',
      sitemap: 'AlterCode – Sitemap & Directory',
    };

    const targetId = routeToId[rawPath];
    if (targetId) {
      if (titles[rawPath]) {
        document.title = titles[rawPath];
      }
      const timer = setTimeout(() => {
        scrollToId(targetId, false);
      }, 150);
      return () => clearTimeout(timer);
    } else if (titles[rawPath]) {
      document.title = titles[rawPath];
    }
  }, []);

  if (pathname === '/privacy-policy') return <PolicyPage type="privacy" />;
  if (pathname === '/terms') return <PolicyPage type="terms" />;
  if (pathname === '/sitemap') return <SitemapPage />;
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero />
        <SignalStrip />
        <Playground />
        <Features />
        <Architecture />
        <Security />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
