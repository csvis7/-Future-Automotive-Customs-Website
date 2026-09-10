import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const workshopImages = [
  {
    src: 'https://images.jazelc.com/uploads/futureautomotivegroup-m2en/IMG_6379-1024x768.webp',
    alt: 'Custom vehicle inside the Future Automotive workshop',
  },
  {
    src: 'https://images.jazelc.com/uploads/futureautomotivegroup-m2en/IMG_6382-1.webp',
    alt: 'Close-up of a finished vehicle detail',
  },
  {
    src: 'https://images.jazelc.com/uploads/futureautomotivegroup-m2en/IMG_6381.webp',
    alt: 'Automotive installation work in progress',
  },
  {
    src: 'https://images.jazelc.com/uploads/futureautomotivegroup-m2en/IMG_6380.webp',
    alt: 'Custom truck detail from the workshop',
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    document.title = 'Future Automotive Customs — Finish with intent';
    const description = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    description.setAttribute('name', 'description');
    description.setAttribute('content', 'Future Automotive Customs is a specialist workshop for custom builds, detailing, lighting and finish work.');
    document.head.appendChild(description);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    revealRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const reveal = (className = '') => (node: HTMLElement | null) => {
    if (node && !revealRefs.current.includes(node)) revealRefs.current.push(node);
    if (node && className) node.className += ` ${className}`;
  };

  const jump = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!data.get('name') || !data.get('email') || !data.get('message')) {
      setFormError('Add your name, email and a few words about the car.');
      return;
    }
    setFormError('');
    setSubmitted(true);
    form.reset();
  };

  return (
    <div className="site-shell noise">
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#top" className="brand" data-testid="link-brand" onClick={() => jump('top')}>
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">Future<br /><span>Automotive</span> Customs</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#work" data-testid="link-work" onClick={() => jump('work')}>The work</a>
            <a href="#method" data-testid="link-method" onClick={() => jump('method')}>Method</a>
            <a href="#feed" data-testid="link-feed" onClick={() => jump('feed')}>Live feed</a>
            <a href="#contact" data-testid="link-contact" onClick={() => jump('contact')}>Contact</a>
          </nav>
          <button className="nav-cta" data-testid="button-header-enquiry" onClick={() => jump('contact')}>Start a build <ArrowRight size={14} /></button>
          <button className="menu-button" data-testid="button-mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            <a href="#work" data-testid="mobile-link-work" onClick={() => jump('work')}>The work</a>
            <a href="#method" data-testid="mobile-link-method" onClick={() => jump('method')}>Method</a>
            <a href="#feed" data-testid="mobile-link-feed" onClick={() => jump('feed')}>Live feed</a>
            <a href="#contact" data-testid="mobile-link-contact" onClick={() => jump('contact')}>Start a conversation</a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy reveal" ref={reveal()}>
              <div className="hero-kicker eyebrow"><span className="signal" /> Specialist automotive studio</div>
              <h1>Make it<br /><em>yours.</em></h1>
              <p className="hero-lede">Custom work for people who notice the last millimetre. Detailing, lighting, wraps and finish — considered as one complete machine.</p>
              <div className="hero-actions">
                <button className="button-acid" data-testid="button-hero-enquiry" onClick={() => jump('contact')}>Tell us about the car <ArrowDownRight size={14} /></button>
                <a href="https://www.instagram.com/future_automotive_customs/" target="_blank" rel="noreferrer" className="text-link" data-testid="link-hero-instagram">See the live work <Instagram size={15} /></a>
              </div>
            </div>
            <div className="hero-visual reveal delay-2" ref={reveal()}>
              <div className="hero-stamp">FAC / material study / 001</div>
              <div className="material-frame">
                <img src={workshopImages[0].src} alt={workshopImages[0].alt} data-testid="img-workshop-hero" />
                <div className="visual-label"><span>Finish is a discipline</span><span>Spec / 01</span></div>
              </div>
            </div>
          </div>
          <div className="hero-scroll eyebrow"><span /> Scroll to inspect</div>
        </section>

        <section className="manifesto">
          <div className="manifesto-grid">
            <h2 className="reveal" ref={reveal()}>Not louder.<br />Just <i>right.</i></h2>
            <div className="manifesto-copy reveal delay-2" ref={reveal()}>
              <strong>Our point of view</strong>
              <p>There is a difference between adding parts and building a car with a point of view. We work in the gap between factory intent and personal obsession.</p>
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-inner">
            <div className="section-head reveal" ref={reveal()}>
              <div>
                <div className="eyebrow">01 / What we do</div>
                <h2 className="section-title">The details are<br /><span className="accent">the build.</span></h2>
              </div>
              <p className="section-intro">One workshop. The full visual language of your car, from first sketch to final wipe-down.</p>
            </div>
            <div className="service-grid">
              <article className="service-card featured reveal" ref={reveal()}>
                <div className="service-number eyebrow"><span>01</span><Sparkles className="service-icon" size={19} /></div>
                <div><h3>Finish correction<br />& protection</h3><p>Paint correction, ceramic protection and the kind of detailing that makes a panel read like glass under hard light.</p></div>
                <span className="service-tag">Surface / clarity / longevity</span>
              </article>
              <article className="service-card reveal delay-1" ref={reveal()}>
                <div className="service-number eyebrow"><span>02</span><ShieldCheck className="service-icon" size={18} /></div>
                <div><h3>Wraps<br />& colour</h3><p>Precise coverage, sharp edges and colour choices that belong on the car.</p></div>
                <span className="service-tag">Film / tone / protection</span>
              </article>
              <article className="service-card reveal delay-2" ref={reveal()}>
                <div className="service-number eyebrow"><span>03</span><Zap className="service-icon" size={18} /></div>
                <div><h3>Lighting<br />& detail</h3><p>Lighting signatures and small interventions that change the whole presence.</p></div>
                <span className="service-tag">Presence / function / night</span>
              </article>
              <article className="service-card reveal delay-1" ref={reveal()}>
                <div className="service-number eyebrow"><span>04</span><MessageCircle className="service-icon" size={18} /></div>
                <div><h3>Custom<br />consultation</h3><p>A clear route from rough idea to an honest, workable scope of build.</p></div>
                <span className="service-tag">Brief / source / deliver</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section process" id="method">
          <div className="section-inner">
            <div className="process-grid">
              <div className="reveal" ref={reveal()}>
                <div className="eyebrow">02 / The method</div>
                <h2 className="section-title">No shortcuts<br /><span className="accent">in the light.</span></h2>
                <p className="process-lead">You get one point of contact, a clean scope and a workshop standard that stays high when the car is off camera.</p>
              </div>
              <div className="steps reveal delay-2" ref={reveal()}>
                <div className="step"><span className="step-num">01</span><div><h3>Look at the car</h3><p>We start with the vehicle in front of us — its lines, paint, use and what you actually want from it.</p></div><ChevronDown className="step-arrow" size={16} /></div>
                <div className="step"><span className="step-num">02</span><div><h3>Build the brief</h3><p>We strip away the noise, set a direction and map the work in a sequence that makes sense.</p></div><ChevronDown className="step-arrow" size={16} /></div>
                <div className="step"><span className="step-num">03</span><div><h3>Make it exact</h3><p>Every install, edge and reflection gets checked before the keys come back to you.</p></div><ChevronDown className="step-arrow" size={16} /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section feed-section" id="feed">
          <div className="section-inner">
            <div className="section-head feed-head reveal" ref={reveal()}>
              <div><div className="eyebrow">03 / Live from the workshop</div><h2 className="section-title">The real work<br /><span className="accent">lives here.</span></h2></div>
              <a href="https://www.instagram.com/future_automotive_customs/" target="_blank" rel="noreferrer" className="ig-profile" data-testid="link-instagram-profile"><Instagram size={17} /> @future_automotive_customs <ArrowRight size={14} /></a>
            </div>
            <div className="feed-strip reveal delay-1" ref={reveal()}>
              {['SURFACE / 01', 'LIGHT / 02', 'LINE / 03', 'FINISH / 04'].map((label, index) => (
                <a href="https://www.instagram.com/future_automotive_customs/" target="_blank" rel="noreferrer" className="feed-tile" key={label} data-testid={`link-instagram-tile-${index + 1}`}>
                  <div className="feed-art">
                    <img src={workshopImages[index].src} alt={workshopImages[index].alt} loading="lazy" />
                  </div>
                  <div className="feed-tile-label"><span>{label}</span><ArrowUpRight size={13} /></div>
                </a>
              ))}
            </div>
            <div className="feed-caption">This is a live-style window into the work. For current builds, finished cars and workshop updates, visit the source.</div>
            <div className="numbers reveal delay-2" ref={reveal()}>
              <div className="number"><strong>01</strong><span>point of contact</span></div>
              <div className="number"><strong>04</strong><span>core disciplines</span></div>
              <div className="number"><strong>0</strong><span>off-the-shelf attitudes</span></div>
              <div className="number"><strong>∞</strong><span>ways to get it right</span></div>
            </div>
          </div>
        </section>

        <section className="section enquiry" id="contact">
          <div className="section-inner">
            <div className="enquiry-grid">
              <div className="enquiry-lead reveal" ref={reveal()}>
                <div className="eyebrow">04 / Start a conversation</div>
                <h2 className="section-title">Bring us<br /><span className="accent">the car.</span></h2>
                <p>Tell us what you drive, what you are seeing and what you want to change. No hard sell. Just a useful first conversation.</p>
                <div className="contact-details">
                  <a className="contact-detail" href="https://www.instagram.com/future_automotive_customs/" target="_blank" rel="noreferrer" data-testid="link-instagram-enquiry"><Instagram size={16} /> DM @future_automotive_customs</a>
                  <span className="contact-detail"><MapPin size={16} /> Workshop visits by arrangement</span>
                </div>
              </div>
              <div className="reveal delay-2" ref={reveal()}>
                {submitted ? (
                  <div className="form-success" data-testid="status-enquiry-success"><Check size={19} color="#dfe639" /><strong>Message received.</strong><p>We’ll look over the details and come back to you with a useful next step.</p></div>
                ) : (
                  <form className="enquiry-form" onSubmit={submitEnquiry} noValidate>
                    <div className="field-row">
                      <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" placeholder="First and last" data-testid="input-name" /></div>
                      <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" data-testid="input-email" /></div>
                    </div>
                    <div className="field"><label htmlFor="vehicle">The vehicle</label><input id="vehicle" name="vehicle" placeholder="Year / make / model" data-testid="input-vehicle" /></div>
                    <div className="field"><label htmlFor="message">What are you thinking?</label><textarea id="message" name="message" placeholder="A sentence or two is enough to start." data-testid="input-message" /></div>
                    {formError && <p className="form-note" role="alert" data-testid="status-form-error">{formError}</p>}
                    <div className="form-footer"><span className="form-note">By sending this, you’re asking for a conversation — not a quote generated by a form.</span><button className="button-acid" type="submit" data-testid="button-submit-enquiry">Send enquiry <ArrowRight size={14} /></button></div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <small>© {new Date().getFullYear()} Future Automotive Customs / Built with intent</small>
          <div className="footer-links"><a href="https://www.instagram.com/future_automotive_customs/" target="_blank" rel="noreferrer" data-testid="link-footer-instagram">Instagram</a><a href="#contact" data-testid="link-footer-contact" onClick={() => jump('contact')}>Enquiries</a></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
