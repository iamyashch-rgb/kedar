import React, { useState, useEffect, useRef } from 'react';
import { dataService } from '../../services/dataService';
import type { Location } from '../../types/location';
import { Eyebrow } from '../common/Eyebrow';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { Navigation, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface IndiaMarketArea {
  id: string;
  name: string;
  state: string;
  coords: string;
  x: number; // SVG X position (percentage 0-100)
  y: number; // SVG Y position (percentage 0-100)
  terrain: string;
  regulatory: string;
  scopeFocus: string;
}

export const PanIndiaSection: React.FC = () => {
  const [activeMarketId, setActiveMarketId] = useState<string>('delhi-ncr');
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgMapRef = useRef<SVGSVGElement>(null);

  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    let isMounted = true;
    dataService.getLocations().then((data) => {
      if (isMounted) {
        setLocations(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const DEFAULT_MARKETS: IndiaMarketArea[] = [
    {
      id: 'delhi-ncr',
      name: 'Delhi NCR',
      state: 'National Capital Region',
      coords: '28.61°N 77.20°E',
      x: 39,
      y: 30,
      terrain: 'Gangetic Alluvial Soil // Seismic Zone IV',
      regulatory: 'DDA / DMRC Infrastructure Guidelines',
      scopeFocus: 'High-Rise Residential & Commercial Headquarters',
    },
    {
      id: 'noida',
      name: 'Noida',
      state: 'Uttar Pradesh',
      coords: '28.53°N 77.39°E',
      x: 43,
      y: 31,
      terrain: 'Yamuna Floodplain Alluvium',
      regulatory: 'NOIDA / Greater Noida Authority Masterplan',
      scopeFocus: 'Expressway Commercial Towers & Gated Communities',
    },
    {
      id: 'gurugram',
      name: 'Gurugram',
      state: 'Haryana',
      coords: '28.45°N 77.02°E',
      x: 36,
      y: 32,
      terrain: 'Aravali Quartzite Hard Rock Ridge',
      regulatory: 'DTCP Haryana RERA & High-Rise Zoning',
      scopeFocus: 'Grade-A Corporate IT Parks & Golf Enclaves',
    },
    {
      id: 'lucknow',
      name: 'Lucknow',
      state: 'Uttar Pradesh',
      coords: '26.84°N 80.94°E',
      x: 55,
      y: 35,
      terrain: 'Deep Alluvial Plain // Sub-Moist Basin',
      regulatory: 'LDA Sanctioned Integrated Townships',
      scopeFocus: 'Awadhi Modern Micro-Cement Mid-Rise Estates',
    },
    {
      id: 'dehradun',
      name: 'Dehradun',
      state: 'Uttarakhand',
      coords: '30.31°N 78.03°E',
      x: 42,
      y: 22,
      terrain: 'Himalayan Foothill Slope // Seismic Zone IV',
      regulatory: 'MDDA Eco-Sensitive Slope Regulations',
      scopeFocus: 'Contour Retaining Walls & Plotted Hill Townships',
    },
    {
      id: 'jaipur',
      name: 'Jaipur',
      state: 'Rajasthan',
      coords: '26.91°N 75.78°E',
      x: 33,
      y: 37,
      terrain: 'Semi-Arid Sandy Loam & Pink Sandstone',
      regulatory: 'JDA Heritage Envelope Norms',
      scopeFocus: 'Thermal Facade Masonry & Mixed-Use Hubs',
    },
    {
      id: 'mumbai',
      name: 'Mumbai',
      state: 'Maharashtra',
      coords: '19.07°N 72.87°E',
      x: 23,
      y: 62,
      terrain: 'Coastal Basalt & Reclaimed Marine Clay',
      regulatory: 'MCGM / CRZ Coastal Zone Clearances',
      scopeFocus: 'BKC Grade-A Towers & Post-Tensioned Slabs',
    },
    {
      id: 'pune',
      name: 'Pune',
      state: 'Maharashtra',
      coords: '18.52°N 73.85°E',
      x: 27,
      y: 65,
      terrain: 'Deccan Trap Amygdaloidal Basalt',
      regulatory: 'PMRDA Urban Expansion & IT Corridor',
      scopeFocus: 'Basalt Anchor Foundations & Corporate Fit-outs',
    },
    {
      id: 'bengaluru',
      name: 'Bengaluru',
      state: 'Karnataka',
      coords: '12.97°N 77.59°E',
      x: 39,
      y: 81,
      terrain: 'Deccan Plateau Red Laterite & Granite',
      regulatory: 'BBMP / BDA Master Plan 2031',
      scopeFocus: 'LEED Platinum Tech Campuses & Smart Infrastructure',
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      state: 'Telangana',
      coords: '17.38°N 78.48°E',
      x: 42,
      y: 67,
      terrain: 'Precambrian Granite Rock Formations',
      regulatory: 'GHMC / HMDA High-Density Corridor',
      scopeFocus: 'Hillside Monolithic Concrete Villas & Tech Parks',
    },
    {
      id: 'chandigarh',
      name: 'Chandigarh',
      state: 'Punjab / Haryana',
      coords: '30.73°N 76.77°E',
      x: 38,
      y: 24,
      terrain: 'Shivalik Foothill Alluvial Fan',
      regulatory: 'Chandigarh Administration Architectural Grid',
      scopeFocus: 'Exposed Concrete Structural Panels & Urban Villas',
    },
  ];

  const MARKETS: IndiaMarketArea[] = locations.length > 0 ? locations.map(loc => ({
    id: loc.id,
    name: loc.name,
    state: loc.state || 'India',
    coords: loc.coords || loc.coordinates || '',
    x: loc.xPct ?? loc.x ?? 40,
    y: loc.yPct ?? loc.y ?? 40,
    terrain: loc.terrain || 'Standard Alluvial Soil',
    regulatory: loc.regulatory || 'RERA Compliant Masterplan',
    scopeFocus: loc.scopeFocus || 'Real Estate & Civil Construction',
  })) : DEFAULT_MARKETS;

  const activeMarket = MARKETS.find((m) => m.id === activeMarketId) || MARKETS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG Map outline path draw animation
      const paths = gsap.utils.toArray<SVGPathElement>('.india-map-path');
      paths.forEach((path) => {
        const length = path.getTotalLength ? path.getTotalLength() : 1000;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        });
      });

      // City node staggered reveal
      gsap.fromTo(
        '.city-gis-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pan-india"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[var(--color-bg-primary)] border-b border-[var(--color-border-stone)] overflow-hidden"
    >
      <ArchGridOverlay />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--color-border-stone)]">
          <div className="space-y-4 max-w-3xl">
            <Eyebrow index="10">PAN-INDIA FOOTPRINT & REGIONAL MARKETS</Eyebrow>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[var(--color-text-primary)] leading-[1.1]">
              FROM ONE SITE <br />
              <span className="text-[var(--color-earth-accent)]">TO AN ENTIRE COUNTRY.</span>
            </h2>

            <p className="font-body text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Property, soil geology, seismic dynamics, and local municipal bylaws vary significantly across India — from northern Himalayan foothills to southern granite plateaus and western coastal corridors. We coordinate every project tailored to regional engineering conditions.
            </p>
          </div>

          <div className="p-4 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[2px] space-y-1 self-start lg:self-end shrink-0 max-w-xs">
            <span className="font-mono text-[10px] text-[var(--color-earth-accent)] uppercase tracking-widest block font-bold">
              [ CLASSIFICATION NOTICE ]
            </span>
            <span className="font-mono text-xs text-[var(--color-text-secondary)] block">
              LISTED LOCATIONS REPRESENT ACTIVE REGIONAL MARKETS & PROJECT SERVICE AREAS.
            </span>
          </div>
        </div>

        {/* Main Interactive Map & Market Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Stylized Vector India Map (7 cols) */}
          <div className="lg:col-span-7 relative bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] rounded-[2px] p-6 sm:p-10 flex items-center justify-center min-h-[480px] sm:min-h-[560px] overflow-hidden shadow-2xl">
            {/* Background Blueprint Grid Lines */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C26D47_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* HUD overlay */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[var(--color-text-tertiary)] space-y-0.5">
              <div>[ REGIONAL SERVICE METRIC: 11 KEY MARKETS ]</div>
            </div>

            {/* Interactive SVG India Vector Map */}
            <div className="relative w-full max-w-lg aspect-[4/5] flex items-center justify-center">
              <svg
                ref={svgMapRef}
                viewBox="0 0 500 600"
                className="w-full h-full drop-shadow-xl overflow-visible"
                aria-hidden="true"
              >
                {/* India Outline Paths */}
                <path
                  className="india-map-path fill-none stroke-[var(--color-border-stone)] stroke-[1.5] opacity-60"
                  d="M 220 50 C 230 40, 250 40, 260 50 L 280 70 L 310 90 L 330 110 L 320 130 L 340 150 L 360 170 L 350 190 L 380 200 L 400 220 L 380 240 L 350 240 L 330 260 L 310 270 L 290 290 L 270 320 L 250 350 L 240 380 L 220 420 L 210 460 L 200 500 L 190 530 L 180 500 L 170 460 L 150 420 L 130 380 L 120 340 L 110 300 L 120 270 L 130 240 L 140 210 L 150 180 L 170 150 L 190 120 Z"
                />

                {/* Internal Lat/Long CAD Rays */}
                <line x1="50" y1="180" x2="450" y2="180" stroke="var(--color-border-stone)" strokeDasharray="3,3" opacity="0.3" />
                <line x1="50" y1="360" x2="450" y2="360" stroke="var(--color-border-stone)" strokeDasharray="3,3" opacity="0.3" />
                <line x1="200" y1="30" x2="200" y2="550" stroke="var(--color-border-stone)" strokeDasharray="3,3" opacity="0.3" />

                {/* Dynamic Rays connecting active city to center point */}
                {MARKETS.map((m) => {
                  const isActive = m.id === activeMarketId;
                  const cx = (m.x / 100) * 500;
                  const cy = (m.y / 100) * 600;

                  return (
                    <g key={`ray-${m.id}`}>
                      {isActive && (
                        <line
                          x1="250"
                          y1="300"
                          x2={cx}
                          y2={cy}
                          stroke="var(--color-earth-accent)"
                          strokeWidth="1.5"
                          strokeDasharray="4,4"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  );
                })}

                {/* City Nodes */}
                {MARKETS.map((m) => {
                  const isActive = m.id === activeMarketId;
                  const cx = (m.x / 100) * 500;
                  const cy = (m.y / 100) * 600;

                  return (
                    <g
                      key={m.id}
                      className="city-gis-node cursor-pointer group arch-focus"
                      tabIndex={0}
                      role="button"
                      aria-label={`Inspect ${m.name} market dossier in ${m.state}`}
                      onClick={() => setActiveMarketId(m.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveMarketId(m.id);
                        }
                      }}
                    >
                      {/* Invisible Touch Hitbox Circle for 44px target */}
                      <circle cx={cx} cy={cy} r="24" className="fill-transparent cursor-pointer" />

                      {/* Pulsing Concentric Radar Rings */}
                      {isActive && (
                        <>
                          <circle
                            cx={cx}
                            cy={cy}
                            r="18"
                            className="fill-none stroke-[var(--color-earth-accent)] opacity-40 animate-ping"
                          />
                          <circle
                            cx={cx}
                            cy={cy}
                            r="12"
                            className="fill-none stroke-[var(--color-earth-accent)] opacity-70"
                          />
                        </>
                      )}

                      {/* Main Node Point */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? '6' : '4'}
                        className={`transition-all duration-300 ${
                          isActive
                            ? 'fill-[var(--color-earth-accent)] stroke-white stroke-2'
                            : 'fill-[var(--color-text-secondary)] hover:fill-[var(--color-earth-accent)]'
                        }`}
                      />

                      {/* City Name Label */}
                      <text
                        x={cx + 10}
                        y={cy + 4}
                        className={`font-mono text-[10px] uppercase font-bold transition-colors duration-300 pointer-events-none select-none ${
                          isActive ? 'fill-[var(--color-earth-accent)]' : 'fill-[var(--color-text-tertiary)]'
                        }`}
                      >
                        {m.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right Column: Active Market Inspector Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Market Selection Navigation Pills */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest block">
                SELECT A SERVICE MARKET:
              </span>
              <div className="flex flex-wrap gap-2">
                {MARKETS.map((m) => {
                  const isActive = m.id === activeMarketId;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setActiveMarketId(m.id)}
                      className={`px-3.5 py-2 min-h-[44px] font-mono text-xs uppercase rounded-[1px] border transition-all duration-300 touch-target cursor-pointer ${
                        isActive
                          ? 'bg-[var(--color-earth-accent)] text-white border-[var(--color-earth-accent)] font-bold shadow-md'
                          : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)]'
                      }`}
                    >
                      {m.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Market Inspector Box */}
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] rounded-[2px] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--color-border-stone)] pb-4">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[var(--color-earth-accent)]" />
                  <span className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-wider">
                    MARKET DOSSIER // {activeMarket.id.toUpperCase()}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase">
                  ACTIVE REGION
                </span>
              </div>

              <div>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] block uppercase mb-1">
                  {activeMarket.state}
                </span>
                <h3 className="font-heading text-3xl font-extrabold uppercase text-[var(--color-text-primary)]">
                  {activeMarket.name}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px] space-y-1">
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                    Regional Terrain & Soil Dynamics
                  </span>
                  <span className="font-mono text-xs text-[var(--color-earth-accent)] font-bold block">
                    {activeMarket.terrain}
                  </span>
                </div>

                <div className="p-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px] space-y-1">
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                    Municipal Regulatory Framework
                  </span>
                  <span className="font-mono text-xs text-[var(--color-text-primary)] font-semibold block">
                    {activeMarket.regulatory}
                  </span>
                </div>

                <div className="p-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[1px] space-y-1">
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                    Primary Service Capabilities
                  </span>
                  <span className="font-mono text-xs text-[var(--color-text-secondary)] block">
                    {activeMarket.scopeFocus}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-stone)] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase">
                  READY FOR SITE EVALUATION
                </span>
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact') || document.querySelector('footer');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-1 font-mono text-xs text-[var(--color-earth-accent)] hover:underline uppercase font-bold"
                >
                  <span>Inquire For Market</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
