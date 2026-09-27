import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowDownRight,
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
  Terminal,
  X,
  Zap,
} from 'lucide-react';
import mobileHeroImage from './assets/images/altercode_mobile_hero_1790513583351.jpg';
import securityImage from './assets/images/altercode_security_vault_1790513598077.jpg';

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
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-mark__slash">/</span>
      <span className="brand-mark__dot" />
    </span>
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
          <span className="status-dot" /> Android-native AI tooling <span className="eyebrow-divider">/</span> alter 2.8 is live
        </div>

        <div className="hero__grid">
          <div className="hero__copy">
            <Reveal delay={80}>
              <h1>Code that <em>moves</em> at your speed.</h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="hero__lede">
                AlterCode brings a fast, private AI code assistant to the device already in your pocket. Refactor, translate, debug, and ship without breaking your flow.
              </p>
            </Reveal>
            <Reveal delay={220} className="hero__actions">
              <a className="button button--lime button--large" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
                <Play size={17} fill="currentColor" /> Get it on Google Play <ArrowRight size={17} />
              </a>
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

function Playground() {
  const [activeTask, setActiveTask] = useState('Refactor');
  const tasks = ['Refactor', 'Explain', 'Translate'];
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
            <div className="window-title"><Terminal size={14} /> altercode / workspace</div>
            <span className="window-live"><span className="status-dot status-dot--lime" /> live</span>
          </div>
          <div className="playground__body">
            <div className="playground__sidebar">
              <span className="sidebar-label">TASK</span>
              {tasks.map((task, index) => (
                <button key={task} className={activeTask === task ? 'is-active' : ''} onClick={() => setActiveTask(task)}>
                  <span>0{index + 1}</span>{task}
                </button>
              ))}
              <div className="sidebar-bottom"><span className="status-dot status-dot--lime" /> AI engine ready</div>
            </div>
            <div className="playground__editor">
              <div className="editor-meta"><span>Kotlin · MainViewModel.kt</span><span>12 lines</span></div>
              <pre><code><span className="code-muted">01</span> <span className="code-purple">suspend fun</span> <span className="code-blue">loadWorkspace</span>() {'{'}{`\n`}<span className="code-muted">02</span>   <span className="code-purple">val</span> result = <span className="code-blue">repository</span>.fetch() {`\n`}<span className="code-muted">03</span>   <span className="code-purple">if</span> (result.isFailure) {'{'}{`\n`}<span className="code-muted">04</span>     <span className="code-blue">emit</span>(UiState.Error(result.exceptionOrNull())){`\n`}<span className="code-muted">05</span>   {'}'} <span className="code-purple">else</span> {'{'}{`\n`}<span className="code-muted">06</span>     <span className="code-blue">emit</span>(UiState.Success(result.getOrThrow())){`\n`}<span className="code-muted">07</span>   {'}'}{`\n`}<span className="code-muted">08</span> {'}'}</code></pre>
              <div className="editor-response">
                <div className="response-heading"><Sparkles size={15} /> AlterCode / {activeTask} mode <span>just now</span></div>
                <p>{activeTask === 'Refactor' ? 'Collapse the error branch into a sealed result and keep the coroutine readable.' : activeTask === 'Explain' ? 'This function loads the workspace and emits a UI-safe state for each result.' : 'Convert this Kotlin coroutine pattern to an idiomatic TypeScript async function.'}</p>
              </div>
            </div>
          </div>
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
          <div className="download__action"><a className="button button--lime button--large" href={PLAY_STORE_URL} target="_blank" rel="noreferrer"><Play size={17} fill="currentColor" /> Download on Google Play <ArrowUpRight size={17} /></a><span>Android 8.0+ <i /> Free to start</span></div>
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
  return <footer className="footer"><div className="shell footer__inner"><a className="wordmark" href="#top"><BrandMark /><span>altercode</span></a><span className="footer__meta">Native AI tooling for Android developers.</span><div className="footer__links"><a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><a href={PLAY_STORE_URL} target="_blank" rel="noreferrer"><Download size={15} /> Google Play</a></div><span className="footer__legal">© 2025 AlterCode</span></div></footer>;
}

export default function App() {
  return <div className="site-shell"><Navbar /><main><Hero /><SignalStrip /><Playground /><Features /><Architecture /><Security /><DownloadSection /><Faq /></main><Footer /></div>;
}
