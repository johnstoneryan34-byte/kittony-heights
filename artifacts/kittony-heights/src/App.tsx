import { useEffect, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Coffee, ExternalLink, Instagram, MapPin, Menu, MessageCircle, Phone, Play, Plus, Star, Sun, Wifi, Wind, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const photos = [
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkXT9gl_V1jpmQDd5p4mSzUu2Y2snGKCiJOGKy0qKgu3T_r37FUiNgFNsbmKnI41ahwgBO7RrEASZL4woT9dR2V0cAWR8kUvaWk1sIUXZEqzfiawWJyXBe01YqSGVh_Gm7SMpc_=w1600-h1100-k-no',
    alt: 'Kittony Heights exterior in the highland light',
    label: 'The arrival',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm5zPQlVHjsM97F6p7H8vJLVpur7v3XqBsednJOBNRntbp2D75xaILx8Kmlzc7ywjtVdELC5dJ9q7pW-A_s-o5045i1QZHqUlF7pWhhbUmVRTPThh9_gD4bIiZGH0TSpW1_ZplpJg=w1400-h1000-k-no',
    alt: 'A warm, modern guest room',
    label: 'The rooms',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm9xO710yi4Szdnve4aNxd3roGXt3YbfvnsdNiVCTS6HsDcO_zKeH4r15Lc2P3ahyrL5eP7uNBwjeJIr76WoOG6F8sX-3JPJsR8Wms1DDI0-GILFV1F1uejTyXopZBvmFxRW2lQ=w1400-h1000-k-no',
    alt: 'The rooftop lounge at sunset',
    label: 'The rooftop',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWli9AxPQUf1p_aHvNutbeUt_QOo6zVaPYHEggmMv5zoSCfgj76CZ7mQmmxNbo2B-FPSr0PBa51IYkViJoG7go5CW-3RuwHTdR7sgH4HQk4Dbv2rotYdhMiXurj6S3crf6l4Xw=w1400-h1000-k-no',
    alt: 'A quiet corner for coffee',
    label: 'The pause',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWliyeZC53evsfyCfz5vN216SDb_IfSkjjNzIp5Vk-7eDh8rSRf0JrXGYRQ426VDkdX3YhhTXkiSx17vTmhlVK1VKkUWwV46U_Tp81224zO3LH4aAT_Pg8Bwm4FpxP-MzafCNNmWuQ=w1400-h1000-k-no',
    alt: 'The hotel terrace overlooking Kitale',
    label: 'The terrace',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmC1CQPpkI-Hv5VnIlSOCghvAz1MwgMd2gG5MVhZU3sZb7ZuyFRmsvl3pnPm_E6qh-D7v7sD38_Vy8DEHoI0ZSlchI7HSYh69ddWZKf1gLYHkpqO2kUCPe8ut4w1ABYgPUPf-7f=w1400-h1000-k-no',
    alt: 'Details from Kittony Heights',
    label: 'The details',
  },
];

const navItems = [
  { label: 'Stay', href: '#stay' },
  { label: 'Gather', href: '#gather' },
  { label: 'Good to know', href: '#know' },
  { label: 'Find us', href: '#find-us' },
];

function scrollToId(id: string, closeMenu?: () => void) {
  closeMenu?.();
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

function Header({ onBook }: { onBook: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="absolute left-0 right-0 top-0 z-30 text-[#f7f1e7]">
      <div className="container-wide flex h-[82px] items-center justify-between border-b border-white/20">
        <a href="#top" className="flex items-center gap-3" data-testid="link-home">
          <span className="flex h-10 w-10 items-center justify-center border border-[#d99b58] text-[17px] font-semibold serif">K</span>
          <span className="leading-none">
            <strong className="block text-[13px] font-semibold tracking-[.22em]">KITTONY</strong>
            <small className="mt-1 block text-[8px] uppercase tracking-[.4em] text-white/65">Heights / Kitale</small>
          </span>
        </a>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link" data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <a href="tel:+254790282828" className="flex items-center gap-2 text-[11px] tracking-[.08em] text-white/75" data-testid="link-phone-header"><Phone size={13} /> +254 790 282 828</a>
          <button onClick={onBook} className="outline-button" data-testid="button-book-header">Check availability</button>
        </div>
        <button onClick={() => setMenuOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center border border-white/25 md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
          {menuOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-panel absolute left-4 right-4 top-[92px] border border-white/20 bg-[#203036] p-5 shadow-2xl md:hidden">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-4 text-xs uppercase tracking-[.18em] text-white/80" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</a>
            ))}
          </nav>
          <button onClick={() => { setMenuOpen(false); onBook(); }} className="solid-button mt-5 w-full" data-testid="button-book-mobile">Check availability</button>
        </div>
      )}
    </header>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="hero-content relative isolate min-h-[720px] overflow-hidden bg-[#203036] text-[#f7f1e7]">
      <img className="hero-image absolute inset-0 -z-20 h-full w-full object-cover object-center" src={photos[0].src} alt={photos[0].alt} />
      <div className="hero-vignette absolute inset-0 -z-10" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-30" />
      <Header onBook={onBook} />
      <div className="container-wide flex min-h-[720px] items-end pb-16 pt-32 md:items-center md:pb-20">
        <div className="max-w-[760px]">
          <p className="eyebrow reveal text-[#e4b06e]">A considered stay in Kenya&apos;s highlands</p>
          <h1 className="reveal delay-1 mt-5 max-w-[750px] text-[clamp(3.7rem,9vw,8.6rem)] leading-[.86] tracking-[-.055em] serif">Arrive<br /><em className="font-normal text-[#e7b26f]">above</em><br />the ordinary.</h1>
          <div className="reveal delay-2 mt-8 flex max-w-[520px] flex-col items-start gap-6 md:flex-row md:items-center">
            <p className="max-w-[330px] text-sm leading-7 text-white/72">A warm, modern hotel on Moi Avenue, made for slow mornings, open skies, and the kind of welcome that remembers your name.</p>
            <button onClick={onBook} className="solid-button flex items-center gap-3" data-testid="button-book-hero">Plan your stay <ArrowDownRight size={15} /></button>
          </div>
        </div>
        <div className="absolute bottom-8 right-6 hidden items-center gap-3 md:flex">
          <span className="h-px w-16 bg-white/40" />
          <span className="eyebrow text-white/60">01 / 06 &nbsp; Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="bg-[#f7f1e7] py-24 md:py-36">
      <div className="container-wide grid items-center gap-14 md:grid-cols-[.85fr_1.15fr] md:gap-24">
        <div className="relative min-h-[480px]">
          <div className="image-frame absolute left-0 top-9 h-[375px] w-[80%] md:h-[445px]">
            <img src={photos[1].src} alt={photos[1].alt} loading="lazy" />
          </div>
          <div className="absolute bottom-0 right-0 flex h-40 w-40 flex-col justify-between bg-[#d99b58] p-5 text-[#203036] md:h-48 md:w-48">
            <Sun size={22} strokeWidth={1.25} />
            <p className="text-[11px] uppercase leading-5 tracking-[.12em]">1° 01&apos; N<br />35° 00&apos; E</p>
            <span className="eyebrow">Kitale / Kenya</span>
          </div>
        </div>
        <div>
          <p className="eyebrow text-[#a34f35]">The Kittony feeling</p>
          <h2 className="mt-5 max-w-[630px] text-[clamp(2.7rem,5vw,5.3rem)] leading-[.95] tracking-[-.045em] serif">A softer pace,<br /><em className="font-normal text-[#a34f35]">a higher point of view.</em></h2>
          <p className="mt-8 max-w-[540px] text-[15px] leading-8 text-[#536064]">Kitale has a way of making room for you. Wide skies, cool evenings, red earth underfoot. Kittony Heights takes that generous spirit and brings it upstairs — with considered rooms, unfussy food, and service that knows when to step in.</p>
          <div className="mt-10 flex items-center gap-4">
            <span className="h-px w-14 bg-[#a34f35]" />
            <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-[#a34f35]">Take your time here</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoomsSection() {
  const rooms = [
    { name: 'The Terrace Room', detail: 'Light, quiet & open to the morning', price: 'From KSh 9,500', image: photos[1].src },
    { name: 'The Heights Suite', detail: 'Room to exhale, with a view west', price: 'From KSh 14,000', image: photos[4].src },
    { name: 'The Kitale Twin', detail: 'A generous landing for two', price: 'From KSh 11,500', image: photos[5].src },
  ];
  return (
    <section id="stay" className="bg-[#e7ddcc] py-24 md:py-32">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-[#496d61]">Stay a while</p>
            <h2 className="mt-4 max-w-[630px] text-[clamp(2.8rem,6vw,6rem)] leading-[.9] tracking-[-.05em] serif">Rooms that<br /><em className="font-normal text-[#496d61]">let in the light.</em></h2>
          </div>
          <p className="max-w-[300px] text-sm leading-6 text-[#536064] md:pb-2">Natural textures, strong showers, good beds. The essentials, elevated — and no unnecessary fuss.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {rooms.map((room, index) => (
            <article key={room.name} className={`room-card bg-[#f7f1e7] ${index === 1 ? 'md:translate-y-10' : ''}`} data-testid={`card-room-${index}`}>
              <button onClick={() => scrollToId('#booking')} className="block w-full text-left" data-testid={`button-room-${index}`}>
                <div className="image-frame relative h-[340px]">
                  <img src={room.image} alt={`${room.name} at Kittony Heights`} loading="lazy" />
                  <span className="absolute left-4 top-4 bg-[#f7f1e7] px-3 py-2 text-[9px] uppercase tracking-[.16em] text-[#203036]">0{index + 1}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl tracking-[-.03em] serif">{room.name}</h3>
                  <p className="mt-2 text-xs text-[#667277]">{room.detail}</p>
                  <div className="mt-7 flex items-center justify-between border-t border-[#203036]/15 pt-4">
                    <span className="mono text-[10px] uppercase tracking-[.08em] text-[#a34f35]">{room.price}</span>
                    <ArrowRight className="room-arrow text-[#496d61]" size={18} />
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
        <div className="mt-20 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-[#496d61]/50" />
          <span className="eyebrow text-[#496d61]">Every room includes breakfast, Wi-Fi & the view</span>
          <span className="h-px w-10 bg-[#496d61]/50" />
        </div>
      </div>
    </section>
  );
}

function GatherSection({ openGallery }: { openGallery: (index: number) => void }) {
  return (
    <section id="gather" className="bg-[#203036] py-24 text-[#f7f1e7] md:py-32">
      <div className="container-wide">
        <div className="grid items-end gap-14 md:grid-cols-[.8fr_1.2fr] md:gap-20">
          <div>
            <p className="eyebrow text-[#d99b58]">Gather above the town</p>
            <h2 className="mt-5 text-[clamp(3rem,6vw,6.4rem)] leading-[.87] tracking-[-.055em] serif">Golden hour<br /><em className="font-normal text-[#d99b58]">has a table.</em></h2>
            <p className="mt-8 max-w-[410px] text-sm leading-7 text-white/62">At the top of the building, the day stretches out. Order a cold Tusker, a pot of Kenyan tea, or a plate to share and watch Kitale turn amber.</p>
            <button onClick={() => openGallery(2)} className="mt-9 flex items-center gap-3 text-[11px] uppercase tracking-[.15em] text-[#d99b58]" data-testid="button-view-rooftop">View rooftop <ArrowRight size={16} /></button>
          </div>
          <div className="grid grid-cols-[1.35fr_.75fr] gap-3">
            <button onClick={() => openGallery(2)} className="image-frame group relative h-[420px] text-left md:h-[540px]" data-testid="button-gallery-rooftop">
              <img src={photos[2].src} alt={photos[2].alt} loading="lazy" />
              <span className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] uppercase tracking-[.15em] text-white"><Play size={13} fill="currentColor" /> Open gallery</span>
            </button>
            <div className="flex flex-col gap-3">
              <button onClick={() => openGallery(4)} className="image-frame h-[205px] text-left md:h-[263px]" data-testid="button-gallery-terrace"><img src={photos[4].src} alt={photos[4].alt} loading="lazy" /></button>
              <div className="flex flex-1 flex-col justify-between border border-white/20 p-5">
                <Coffee size={21} strokeWidth={1.2} className="text-[#d99b58]" />
                <p className="text-[13px] leading-6 text-white/74">Breakfast from 06:30.<br />Rooftop drinks until late.</p>
                <span className="eyebrow text-white/45">The rooftop / Level 5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 grid gap-8 border-t border-white/20 pt-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            ['06:30—10:00', 'Breakfast, made local'],
            ['12:00—22:00', 'All-day dining'],
            ['16:30—19:00', 'The golden hour'],
            ['Every day', 'Open to hotel guests'],
          ].map(([time, label]) => (
            <div key={time} className="amenity-line pt-4">
              <span className="mono text-[10px] text-[#d99b58]">{time}</span>
              <p className="mt-2 text-xs text-white/68">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KnowSection() {
  const amenities = [
    ['01', 'Fast Wi-Fi', 'For when the work follows you up the hill.', <Wifi size={20} strokeWidth={1.2} />],
    ['02', 'Warm showers', 'Water pressure worth writing home about.', <Wind size={20} strokeWidth={1.2} />],
    ['03', 'Breakfast included', 'Fresh fruit, eggs, mandazi and proper coffee.', <Coffee size={20} strokeWidth={1.2} />],
    ['04', 'A thoughtful team', 'Local knowledge, offered before you ask.', <Star size={20} strokeWidth={1.2} />],
  ] as const;
  return (
    <section id="know" className="bg-[#496d61] py-24 text-[#f7f1e7] md:py-32">
      <div className="container-wide grid gap-16 md:grid-cols-[.85fr_1.15fr] md:gap-24">
        <div>
          <p className="eyebrow text-[#d9ae72]">Good to know</p>
          <h2 className="mt-5 max-w-[430px] text-[clamp(2.8rem,5vw,5.2rem)] leading-[.92] tracking-[-.05em] serif">Small things.<br /><em className="font-normal text-[#d9ae72]">Done properly.</em></h2>
          <p className="mt-8 max-w-[360px] text-sm leading-7 text-white/70">The details should disappear into the feeling of the stay. We&apos;ve thought through the things that make a difference.</p>
        </div>
        <div>
          {amenities.map(([number, title, description, icon]) => (
            <div key={number} className="amenity-line grid grid-cols-[45px_40px_1fr] items-center gap-3 py-6 md:grid-cols-[55px_46px_1fr]">
              <span className="mono text-[10px] text-[#d9ae72]">{number}</span>
              <span className="text-[#d9ae72]">{icon}</span>
              <div>
                <h3 className="text-lg serif">{title}</h3>
                <p className="mt-1 text-xs text-white/60">{description}</p>
              </div>
            </div>
          ))}
          <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[.15em] text-[#d9ae72]"><Clock3 size={15} /> Check-in from 14:00 / Check-out by 11:00</div>
        </div>
      </div>
    </section>
  );
}

function StoriesSection() {
  return (
    <section className="bg-[#f7f1e7] py-24 md:py-32">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-[#a34f35]">Notes from the house</p>
            <h2 className="mt-5 text-[clamp(2.8rem,5vw,5.5rem)] leading-[.9] tracking-[-.05em] serif">Leave lighter.</h2>
          </div>
          <div className="hidden items-center gap-2 text-[#a34f35] md:flex"><Star size={13} fill="currentColor" /><span className="mono text-[10px]">4.8 / 5 guest rating</span></div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-[1.1fr_.9fr]">
          <blockquote className="flex min-h-[360px] flex-col justify-between bg-[#d99b58] p-7 md:min-h-[430px] md:p-12">
            <span className="serif text-6xl leading-none text-[#823c2a]">“</span>
            <p className="max-w-[620px] text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.07] tracking-[-.035em] text-[#203036] serif">The rooftop at dusk, the kindest staff, and a room that felt like a deep breath after a long road.</p>
            <footer className="mt-8 flex items-center justify-between border-t border-[#203036]/25 pt-4">
              <span className="text-[11px] font-semibold uppercase tracking-[.13em] text-[#203036]">Miriam / Nairobi</span>
              <span className="mono text-[9px] text-[#203036]/65">Stayed Feb 2024</span>
            </footer>
          </blockquote>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <div className="bg-[#e7ddcc] p-7 md:p-9">
              <div className="flex gap-1 text-[#a34f35]"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div>
              <p className="mt-7 text-lg leading-7 text-[#203036] serif">“A genuinely restful base for exploring the region. The breakfast is a reason to wake up early.”</p>
              <p className="mt-7 text-[10px] uppercase tracking-[.14em] text-[#667277]">David / Kampala</p>
            </div>
            <div className="bg-[#203036] p-7 text-[#f7f1e7] md:p-9">
              <span className="eyebrow text-[#d99b58]">A little local knowledge</span>
              <p className="mt-6 text-lg leading-7 text-white/80 serif">Ask us about Saiwa Swamp at first light. It&apos;s 25 minutes away, and worth every one.</p>
              <a href="#find-us" className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[.15em] text-[#d99b58]" data-testid="link-local-guide">See the neighbourhood <ArrowRight size={15} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section id="find-us" className="bg-[#e7ddcc] py-24 md:py-32">
      <div className="container-wide grid gap-14 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-24">
        <div>
          <p className="eyebrow text-[#496d61]">Find your way here</p>
          <h2 className="mt-5 max-w-[500px] text-[clamp(2.8rem,5vw,5rem)] leading-[.92] tracking-[-.05em] serif">At the heart<br />of <em className="font-normal text-[#a34f35]">Kitale.</em></h2>
          <p className="mt-8 max-w-[420px] text-sm leading-7 text-[#536064]">On Moi Avenue, close enough to the town&apos;s pulse and high enough to leave it behind. Come for the room; stay for the view.</p>
          <div className="mt-10 space-y-5 border-t border-[#203036]/20 pt-5">
            <div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-[#a34f35]" size={18} strokeWidth={1.5} /><div><strong className="block text-xs">Moi Avenue, Kitale</strong><span className="mt-1 block text-xs text-[#667277]">Trans-Nzoia County, Kenya</span></div></div>
            <div className="flex gap-4"><Phone className="mt-1 shrink-0 text-[#a34f35]" size={17} strokeWidth={1.5} /><div><a className="block text-xs" href="tel:+254790282828" data-testid="link-phone-location">+254 790 282 828</a><span className="mt-1 block text-xs text-[#667277]">We&apos;re here 24 hours</span></div></div>
          </div>
          <a href="https://maps.google.com/?q=Kittony+Heights+Kitale" target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-3 text-[10px] uppercase tracking-[.15em] text-[#496d61]" data-testid="link-open-map">Open in maps <ExternalLink size={14} /></a>
        </div>
        <div className="map-card relative min-h-[450px] overflow-hidden p-6 text-[#f7f1e7] md:min-h-[550px]">
          <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 500 500" fill="none" aria-hidden="true">
            <path d="M-30 110 C80 150 90 65 200 100 S350 195 530 130 M-40 360 C60 300 160 440 250 340 S410 260 540 310 M130 -20 C170 70 145 150 200 220 S270 350 215 520 M370 -20 C315 80 390 165 320 230 S350 390 300 520" stroke="#e7ddcc" strokeOpacity=".23" strokeWidth="1.5" className="map-path" />
            <path d="M34 235 L470 235 M260 30 L260 470" stroke="#d99b58" strokeOpacity=".28" strokeWidth="1" />
          </svg>
          <div className="relative flex h-full min-h-[398px] flex-col justify-between">
            <span className="eyebrow text-[#d99b58]">A sense of place</span>
            <div className="self-center text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d99b58]/70 bg-[#d99b58]/10"><MapPin size={24} className="text-[#d99b58]" /></div>
              <strong className="mt-4 block text-xl tracking-[-.02em] serif">Kittony Heights</strong>
              <span className="mt-1 block text-[10px] uppercase tracking-[.18em] text-white/55">Moi Avenue / Kitale</span>
            </div>
            <div className="flex justify-between border-t border-white/20 pt-4 text-[10px] text-white/55"><span>Kitale town centre · 4 min</span><span>ELDORET · 1 hr 40</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const [form, setForm] = useState({ arrival: '', departure: '', guests: '2 guests', name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const update = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((current) => ({ ...current, [field]: event.target.value }));
  return (
    <section id="booking" className="bg-[#a34f35] py-24 text-[#f7f1e7] md:py-32">
      <div className="container-wide grid gap-14 md:grid-cols-[.8fr_1.2fr] md:gap-24">
        <div>
          <p className="eyebrow text-[#f1c88d]">Make it real</p>
          <h2 className="mt-5 max-w-[460px] text-[clamp(3.1rem,6vw,6.2rem)] leading-[.86] tracking-[-.055em] serif">Your room<br /><em className="font-normal text-[#f1c88d]">is waiting.</em></h2>
          <p className="mt-8 max-w-[360px] text-sm leading-7 text-white/72">Tell us when you&apos;re coming. We&apos;ll check what&apos;s open and come back to you shortly — usually within the hour.</p>
          <div className="mt-12 border-t border-white/25 pt-5">
            <p className="text-[10px] uppercase tracking-[.15em] text-white/60">Prefer a conversation?</p>
            <a href="https://wa.me/254790282828" target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-3 text-sm text-[#f1c88d]" data-testid="link-whatsapp-booking"><MessageCircle size={17} /> WhatsApp the front desk <ArrowRight size={15} /></a>
          </div>
        </div>
        <div className="bg-[#f7f1e7] p-6 text-[#203036] md:p-10">
          {submitted ? (
            <div className="flex min-h-[390px] flex-col items-start justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#496d61] text-[#f7f1e7]"><Check size={22} /></div>
              <h3 className="mt-7 text-4xl leading-none tracking-[-.04em] serif">Consider it noted.</h3>
              <p className="mt-4 max-w-[380px] text-sm leading-6 text-[#667277]">Thank you{form.name ? `, ${form.name}` : ''}. Our front desk will be in touch soon with the best available room for your dates.</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 text-[10px] uppercase tracking-[.15em] text-[#a34f35]" data-testid="button-new-enquiry">Make another enquiry <Plus size={14} className="ml-2 inline" /></button>
            </div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-8" data-testid="form-booking">
              <div className="flex items-center justify-between border-b border-[#203036]/20 pb-5"><span className="eyebrow text-[#a34f35]">Direct booking enquiry</span><span className="mono text-[9px] text-[#667277]">01 / 02</span></div>
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block"><span className="eyebrow text-[#667277]">Arrival</span><span className="relative mt-1 block"><input className="booking-input" type="date" required value={form.arrival} onChange={update('arrival')} data-testid="input-arrival" /><CalendarDays size={16} className="pointer-events-none absolute right-0 top-3 text-[#a34f35]" /></span></label>
                <label className="block"><span className="eyebrow text-[#667277]">Departure</span><span className="relative mt-1 block"><input className="booking-input" type="date" required value={form.departure} onChange={update('departure')} data-testid="input-departure" /><CalendarDays size={16} className="pointer-events-none absolute right-0 top-3 text-[#a34f35]" /></span></label>
              </div>
              <label className="block"><span className="eyebrow text-[#667277]">Guests</span><select className="booking-input mt-1" value={form.guests} onChange={update('guests')} data-testid="select-guests"><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4+ guests</option></select></label>
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block"><span className="eyebrow text-[#667277]">Your name</span><input className="booking-input mt-1" type="text" placeholder="First and last name" required value={form.name} onChange={update('name')} data-testid="input-name" /></label>
                <label className="block"><span className="eyebrow text-[#667277]">Email or phone</span><input className="booking-input mt-1" type="text" placeholder="How can we reach you?" required value={form.email} onChange={update('email')} data-testid="input-contact" /></label>
              </div>
              <button type="submit" className="solid-button flex w-full items-center justify-between bg-[#203036] hover:bg-[#496d61]" data-testid="button-submit-booking"><span>Check availability</span><ArrowRight size={17} /></button>
              <p className="text-center text-[10px] text-[#667277]">No payment today. We&apos;ll confirm your room before anything else.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({ openGallery }: { openGallery: (index: number) => void }) {
  return (
    <footer className="bg-[#203036] py-16 text-[#f7f1e7] md:py-20">
      <div className="container-wide">
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-[1.4fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center border border-[#d99b58] text-[17px] serif">K</span><span className="text-[13px] tracking-[.22em]">KITTONY</span></div>
            <p className="mt-7 max-w-[300px] text-sm leading-6 text-white/55">A quiet address in Kenya&apos;s highlands. Come up, slow down.</p>
            <button onClick={() => openGallery(0)} className="mt-7 flex items-center gap-3 text-[10px] uppercase tracking-[.15em] text-[#d99b58]" data-testid="button-footer-gallery">Explore the house <ArrowRight size={15} /></button>
          </div>
          <div><p className="eyebrow text-[#d99b58]">Explore</p><div className="mt-5 space-y-4 text-xs text-white/62"><a href="#stay" className="block hover:text-white" data-testid="link-footer-stay">Stay</a><a href="#gather" className="block hover:text-white" data-testid="link-footer-gather">Gather</a><a href="#know" className="block hover:text-white" data-testid="link-footer-know">Good to know</a></div></div>
          <div><p className="eyebrow text-[#d99b58]">Say hello</p><div className="mt-5 space-y-4 text-xs text-white/62"><a href="tel:+254790282828" className="block hover:text-white" data-testid="link-footer-phone">+254 790 282 828</a><a href="mailto:stay@kittonyheights.co.ke" className="block hover:text-white" data-testid="link-footer-email">stay@kittonyheights.co.ke</a><a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white" data-testid="link-footer-instagram"><Instagram size={14} /> @kittonyheights</a></div></div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-7 text-[9px] uppercase tracking-[.12em] text-white/35 md:flex-row"><span>© 2024 Kittony Heights / Kitale, Kenya</span><span>Made for the highland light</span></div>
      </div>
    </footer>
  );
}

function Lightbox({ index, onClose, onNext, onPrevious }: { index: number; onClose: () => void; onNext: () => void; onPrevious: () => void }) {
  const photo = photos[index];
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrevious();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, onNext, onPrevious]);
  return (
    <div className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-label="Photo gallery" data-testid="dialog-gallery">
      <button onClick={onClose} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/30 text-white" aria-label="Close gallery" data-testid="button-close-gallery"><X size={20} /></button>
      <button onClick={onPrevious} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 text-white md:left-8" aria-label="Previous photo" data-testid="button-gallery-previous"><ChevronLeft size={20} /></button>
      <div className="flex max-w-5xl flex-col items-center">
        <img className="lightbox-image max-w-full object-contain" src={photo.src} alt={photo.alt} data-testid={`img-gallery-${index}`} />
        <div className="mt-5 flex w-full items-center justify-between text-[#f7f1e7]"><span className="eyebrow text-[#d99b58]">{photo.label}</span><span className="mono text-[10px] text-white/55">0{index + 1} / 0{photos.length}</span></div>
      </div>
      <button onClick={onNext} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 text-white md:right-8" aria-label="Next photo" data-testid="button-gallery-next"><ChevronRight size={20} /></button>
    </div>
  );
}

function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openBooking = () => scrollToId('#booking');
  const openGallery = (index: number) => setLightboxIndex(index);
  return (
    <main className="site-shell texture">
      <Hero onBook={openBooking} />
      <IntroSection />
      <RoomsSection />
      <GatherSection openGallery={openGallery} />
      <KnowSection />
      <StoriesSection />
      <LocationSection />
      <BookingSection />
      <Footer openGallery={openGallery} />
      <a href="https://wa.me/254790282828" target="_blank" rel="noreferrer" className="contact-float fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#496d61] text-[#f7f1e7]" aria-label="Chat with Kittony Heights on WhatsApp" data-testid="link-whatsapp-float"><MessageCircle size={23} /></a>
      {lightboxIndex !== null && <Lightbox index={lightboxIndex} onClose={() => setLightboxIndex(null)} onPrevious={() => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)} onNext={() => setLightboxIndex((lightboxIndex + 1) % photos.length)} />}
    </main>
  );
}

function Router() {
  return (
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