import React, { useState } from 'react';
import { Button } from '../common/Button';
import { SectionHeader } from '../common/SectionHeader';
import { Eyebrow } from '../common/Eyebrow';
import { Card } from '../common/Card';
import { ArchitecturalImage } from '../common/ArchitecturalImage';
import { ArchGridOverlay, ArchHairline } from '../common/ArchGridLine';
import { ArrowRight, Compass, ChevronRight, ExternalLink } from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'tokens' | 'typography' | 'buttons' | 'components' | 'layout'>('all');

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] relative arch-grid-bg selection:bg-[var(--color-earth-accent)]">
      {/* Background Architectural Guidelines */}
      <ArchGridOverlay columns={4} showCrosshairs />

      {/* Header Banner */}
      <header className="relative z-10 pt-28 pb-16 border-b border-[var(--color-border-stone)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md">
        <div className="max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Eyebrow index="00 // DESIGN SYSTEM" variant="accent" className="mb-4">
                Kedar Properties Visual Standard
              </Eyebrow>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-none">
                Architectural <span className="text-[var(--color-earth-accent)] font-normal italic">Design System</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl font-normal leading-relaxed">
                Precision token system, fluid typography scale, dark concrete surface palette, and architectural grid details crafted for premier Indian real estate enterprise.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 font-mono text-xs text-[var(--color-concrete-light)]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[var(--color-earth-accent)]" />
                <span>SPECIFICATION v1.0.0</span>
              </div>
              <div className="text-[10px] text-[var(--color-text-muted)]">
                [ PAN-INDIA REAL ESTATE & INFRASTRUCTURE ]
              </div>
            </div>
          </div>

          {/* Quick Section Nav Tabs */}
          <div className="mt-12 flex flex-wrap gap-2 pt-6 border-t border-[var(--color-border-stone)]">
            {[
              { id: 'all', label: '00 // All Specs' },
              { id: 'tokens', label: '01 // Color Tokens' },
              { id: 'typography', label: '02 // Typography Scale' },
              { id: 'buttons', label: '03 // Buttons & Links' },
              { id: 'components', label: '04 // Architectural Components' },
              { id: 'layout', label: '05 // Spacing & Breakpoints' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all rounded-[2px] arch-focus ${
                  activeTab === tab.id
                    ? 'bg-[var(--color-earth-accent)] text-white font-semibold'
                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border-stone)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-earth-accent-border)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-24">
        
        {/* ==========================================================================
           SECTION 01: COLOR TOKENS
           ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'tokens') && (
          <section id="tokens" className="flex flex-col gap-10">
            <SectionHeader
              index="01"
              eyebrow="SURFACE & ACCENT PALETTE"
              title="Architectural Color Direction"
              highlightWord="Color Direction"
              subtitle="Built on near-black surfaces, warm off-white typography, concrete grey, muted stone tones, and a single restrained earthy terracotta accent."
              layout="split"
            />

            {/* Color Swatch Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Near-Black Surfaces */}
              <Card index="01.1 // NEAR-BLACK SURFACES" showCrosshair>
                <h3 className="font-heading text-lg font-bold text-[var(--color-text-primary)] mb-4">
                  Surfaces & Depth
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] rounded-[2px]">
                    <div>
                      <div className="font-mono text-xs font-medium text-[var(--color-text-primary)]">Primary Background</div>
                      <div className="font-mono text-[10px] text-[var(--color-concrete-light)]">--color-bg-primary</div>
                    </div>
                    <div className="font-mono text-xs font-bold text-[var(--color-earth-accent)]">#0A0A0C</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] rounded-[2px]">
                    <div>
                      <div className="font-mono text-xs font-medium text-[var(--color-text-primary)]">Secondary Surface</div>
                      <div className="font-mono text-[10px] text-[var(--color-concrete-light)]">--color-bg-secondary</div>
                    </div>
                    <div className="font-mono text-xs font-bold text-[var(--color-earth-accent)]">#121215</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[var(--color-bg-card)] border border-[var(--color-border-stone)] rounded-[2px]">
                    <div>
                      <div className="font-mono text-xs font-medium text-[var(--color-text-primary)]">Card Concrete Surface</div>
                      <div className="font-mono text-[10px] text-[var(--color-concrete-light)]">--color-bg-card</div>
                    </div>
                    <div className="font-mono text-xs font-bold text-[var(--color-earth-accent)]">#141416</div>
                  </div>
                </div>
              </Card>

              {/* Warm Off-White Typography */}
              <Card index="01.2 // WARM OFF-WHITE" showCrosshair>
                <h3 className="font-heading text-lg font-bold text-[var(--color-text-primary)] mb-4">
                  Warm Editorial Text
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#F4F1EA] text-[#0A0A0C] rounded-[2px]">
                    <div>
                      <div className="font-mono text-xs font-bold">Primary Text (Off-White)</div>
                      <div className="font-mono text-[10px] opacity-70">--color-text-primary</div>
                    </div>
                    <div className="font-mono text-xs font-bold">#F4F1EA</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#C8C4BC] text-[#0A0A0C] rounded-[2px]">
                    <div>
                      <div className="font-mono text-xs font-bold">Secondary Text</div>
                      <div className="font-mono text-[10px] opacity-70">--color-text-secondary</div>
                    </div>
                    <div className="font-mono text-xs font-bold">#C8C4BC</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#8C8A84] text-[#F4F1EA] rounded-[2px]">
                    <div>
                      <div className="font-mono text-xs font-bold">Muted Subtext</div>
                      <div className="font-mono text-[10px] opacity-70">--color-text-muted</div>
                    </div>
                    <div className="font-mono text-xs font-bold">#8C8A84</div>
                  </div>
                </div>
              </Card>

              {/* Restrained Earthy Accent */}
              <Card index="01.3 // RESTRAINED EARTH ACCENT" variant="accent" showCrosshair>
                <h3 className="font-heading text-lg font-bold text-[var(--color-text-primary)] mb-4">
                  Terracotta Earth Accent
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[var(--color-earth-accent)] text-white rounded-[2px]">
                    <div>
                      <div className="font-mono text-xs font-bold">Earth Accent (Terracotta)</div>
                      <div className="font-mono text-[10px] opacity-90">--color-earth-accent</div>
                    </div>
                    <div className="font-mono text-xs font-bold">#C26D47</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[var(--color-earth-accent-hover)] text-white rounded-[2px]">
                    <div>
                      <div className="font-mono text-xs font-bold">Accent Hover</div>
                      <div className="font-mono text-[10px] opacity-90">--color-earth-accent-hover</div>
                    </div>
                    <div className="font-mono text-xs font-bold">#D87A52</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-earth-accent-border)] rounded-[2px]">
                    <div>
                      <div className="font-mono text-xs font-medium text-[var(--color-earth-accent)]">Accent Muted Glow</div>
                      <div className="font-mono text-[10px] text-[var(--color-concrete-light)]">rgba(194, 109, 71, 0.15)</div>
                    </div>
                    <div className="w-4 h-4 bg-[var(--color-earth-accent-muted)] border border-[var(--color-earth-accent)]" />
                  </div>
                </div>
              </Card>

            </div>

            {/* Concrete & Stone Hairline Rules Demo */}
            <Card index="01.4 // CONCRETE & STONE LINES" className="mt-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] mb-4">
                Hairline Grid Dividers & Borders
              </h4>
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] text-[var(--color-concrete-light)] mb-1">Stone Hairline (Subtle)</div>
                  <ArchHairline variant="subtle" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[var(--color-concrete-light)] mb-1">Medium Structural Hairline</div>
                  <ArchHairline variant="medium" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[var(--color-earth-accent)] mb-1">Terracotta Accent Hairline</div>
                  <ArchHairline variant="accent" />
                </div>
                <div>
                  <ArchHairline variant="subtle" label="01 // SPECIFICATION DIVISION" />
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* ==========================================================================
           SECTION 02: TYPOGRAPHY SCALE
           ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'typography') && (
          <section id="typography" className="flex flex-col gap-10">
            <SectionHeader
              index="02"
              eyebrow="EDITORIAL TYPOGRAPHY HIERARCHY"
              title="Fluid Typography Scale"
              highlightWord="Typography Scale"
              subtitle="Combining modern display font Syne for major architectural headings, clean sans-serif Plus Jakarta Sans for body text, and monospaced JetBrains Mono for metadata."
              layout="split"
            />

            <Card index="02.1 // FONT FAMILIES MATRIX" showCrosshair>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-[var(--color-border-stone)]">
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-earth-accent)] uppercase tracking-widest">DISPLAY TYPEFACE</span>
                  <h4 className="font-heading text-2xl font-bold text-[var(--color-text-primary)] mt-1">Syne / Cinzel</h4>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Used for editorial section titles, hero headlines, and major statements.</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-earth-accent)] uppercase tracking-widest">BODY TYPEFACE</span>
                  <h4 className="font-body text-2xl font-semibold text-[var(--color-text-primary)] mt-1">Plus Jakarta Sans</h4>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Highly legible modern sans-serif for lead copy, paragraphs, and descriptions.</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-earth-accent)] uppercase tracking-widest">METADATA TYPEFACE</span>
                  <h4 className="font-mono text-xl font-medium text-[var(--color-text-primary)] mt-1">JetBrains Mono</h4>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Used for section indices, coordinates, RERA tags, and technical specs.</p>
                </div>
              </div>

              {/* Fluid Scale Specimen Stack */}
              <div className="space-y-8">
                <div className="border-b border-[var(--color-border-stone)] pb-6">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-earth-accent)] mb-2">
                    <span>DISPLAY 6XL (4.5rem -&gt; 7.5rem)</span>
                    <span>font-heading / leading-none</span>
                  </div>
                  <div className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
                    Architectural Rigor.
                  </div>
                </div>

                <div className="border-b border-[var(--color-border-stone)] pb-6">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-earth-accent)] mb-2">
                    <span>DISPLAY 4XL (2.75rem -&gt; 4.25rem)</span>
                    <span>font-heading / tracking-tight</span>
                  </div>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
                    Land Acquisition & Development Across India
                  </div>
                </div>

                <div className="border-b border-[var(--color-border-stone)] pb-6">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-earth-accent)] mb-2">
                    <span>SECTION HEADING 2XL (1.5rem -&gt; 2.25rem)</span>
                    <span>font-heading / font-semibold</span>
                  </div>
                  <div className="font-heading text-2xl font-semibold text-[var(--color-text-primary)]">
                    Turnkey Construction & Master Planning
                  </div>
                </div>

                <div className="border-b border-[var(--color-border-stone)] pb-6">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-earth-accent)] mb-2">
                    <span>LEAD BODY LG (1.125rem -&gt; 1.25rem)</span>
                    <span>font-body / text-secondary</span>
                  </div>
                  <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
                    Kedar Properties operates with absolute architectural integrity, bridging institutional capital with master-planned land holdings, luxury residential estates, and commercial infrastructure across India’s core urban corridors.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-earth-accent)] mb-2">
                    <span>MONOSPACED INDEX METADATA (0.75rem)</span>
                    <span>font-mono / tracking-widest</span>
                  </div>
                  <div className="font-mono text-xs text-[var(--color-concrete-light)] tracking-[0.2em] uppercase">
                    01 // RERA REGISTRATION NO. PRM/KA/RERA/1251/310/PR/210408
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* ==========================================================================
           SECTION 03: BUTTON MATRIX & LINKS
           ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'buttons') && (
          <section id="buttons" className="flex flex-col gap-10">
            <SectionHeader
              index="03"
              eyebrow="INTERACTIVE ELEMENTS"
              title="Buttons, Hover States & Focus Rings"
              highlightWord="Focus Rings"
              subtitle="Clean, sharp-edged buttons and link hover animations designed without generic glossy gradients or cheap bubble rounding."
              layout="split"
            />

            {/* Button Variants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Primary & Accent Buttons */}
              <Card index="03.1 // SOLID BUTTON VARIANTS" showCrosshair>
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] mb-6">
                  Solid Architectural Buttons
                </h4>
                
                <div className="flex flex-wrap gap-4 items-center mb-8">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                    Primary Action
                  </Button>
                  <Button variant="accent" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                    Terracotta Accent
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary" size="md">
                    Medium Primary
                  </Button>
                  <Button variant="accent" size="sm">
                    Small Accent
                  </Button>
                  <Button variant="primary" size="sm" disabled>
                    Disabled
                  </Button>
                </div>
              </Card>

              {/* Outline & Secondary Buttons */}
              <Card index="03.2 // HAIRLINE OUTLINE VARIANTS" showCrosshair>
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] mb-6">
                  Hairline & Text Links
                </h4>

                <div className="flex flex-wrap gap-4 items-center mb-8">
                  <Button variant="secondary" size="lg">
                    Secondary Panel
                  </Button>
                  <Button variant="outline" size="lg" icon={<ExternalLink className="w-4 h-4" />}>
                    Hairline Outline
                  </Button>
                </div>

                <div className="flex flex-wrap gap-6 items-center">
                  <Button variant="ghost" size="md" icon={<ChevronRight className="w-4 h-4" />}>
                    Ghost Button
                  </Button>

                  <Button variant="text" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                    Editorial Text Link
                  </Button>
                </div>
              </Card>

            </div>

            {/* Link Hover & Focus State Specimen */}
            <Card index="03.3 // HOVER & FOCUS SPECIFICATION" showCrosshair>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] mb-6">
                Interactive Link Animations & Focus State
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <span className="font-mono text-[10px] text-[var(--color-concrete-light)] block mb-2">EDITORIAL LINK HOVER</span>
                  <a href="#test" className="arch-link-hover text-lg font-heading font-semibold">
                    Explore Land Portfolio →
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-[var(--color-concrete-light)] block mb-2">ARCHITECTURAL FOCUS OUTLINE</span>
                  <button className="px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] text-xs font-mono arch-focus text-[var(--color-text-primary)]">
                    Press Tab To Focus Me
                  </button>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-[var(--color-concrete-light)] block mb-2">MONOSPACED ACCENT LINK</span>
                  <a href="#test" className="font-mono text-xs text-[var(--color-earth-accent)] tracking-widest uppercase hover:underline">
                    [ DOWNLOAD SITE SPEC ]
                  </a>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* ==========================================================================
           SECTION 04: ARCHITECTURAL COMPONENTS
           ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'components') && (
          <section id="components" className="flex flex-col gap-10">
            <SectionHeader
              index="04"
              eyebrow="REUSABLE DESIGN COMPONENTS"
              title="Eyebrows, Section Headers & Image Treatments"
              highlightWord="Image Treatments"
              subtitle="Custom UI components enforcing razor-sharp corner radii, architectural coordinate tags, and precision frame overlays."
              layout="split"
            />

            {/* Eyebrows Specimen */}
            <Card index="04.1 // EYEBROW LABEL SPECIMENS" showCrosshair>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] mb-6">
                Eyebrow Variant Matrix
              </h4>

              <div className="flex flex-wrap items-center gap-6">
                <Eyebrow index="01" variant="default">
                  Default Terracotta Dot Tag
                </Eyebrow>

                <Eyebrow index="02" variant="accent">
                  Accent Muted Frame
                </Eyebrow>

                <Eyebrow index="03" variant="boxed">
                  Boxed Panel Label
                </Eyebrow>

                <Eyebrow index="04" variant="minimal">
                  Minimal Structural Tag
                </Eyebrow>
              </div>
            </Card>

            {/* Architectural Image Ratio Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <span className="font-mono text-[10px] text-[var(--color-earth-accent)] block mb-2">WIDESCREEN 16:9 RATIO</span>
                <ArchitecturalImage
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                  alt="Modern Luxury Architectural Structure"
                  aspectRatio="16/9"
                  tag="RESIDENTIAL RESIDENCE"
                  caption="Modernist concrete villa in New Delhi"
                  coordinate="28°37'N 77°12'E"
                />
              </div>

              <div>
                <span className="font-mono text-[10px] text-[var(--color-earth-accent)] block mb-2">SQUARE 1:1 RATIO</span>
                <ArchitecturalImage
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
                  alt="Interior Architectural Elevation"
                  aspectRatio="1/1"
                  tag="INTERIOR DETAIL"
                  caption="Travertine marble atrium"
                  coordinate="19°07'N 72°52'E"
                />
              </div>

              <div>
                <span className="font-mono text-[10px] text-[var(--color-earth-accent)] block mb-2">PORTRAIT 3:4 RATIO</span>
                <ArchitecturalImage
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
                  alt="Architectural Tower Elevation"
                  aspectRatio="3/4"
                  tag="COMMERCIAL TOWER"
                  caption="Raw basalt facade texture"
                  coordinate="12°57'N 77°35'E"
                />
              </div>
            </div>

            {/* Architectural Form Controls */}
            <Card index="04.2 // ARCHITECTURAL FORM CONTROLS" showCrosshair>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] mb-6">
                Form Inputs & Selection Controls
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    Property Inquiry Type
                  </label>
                  <select className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] font-body text-sm rounded-[2px] arch-focus">
                    <option>Land Acquisition & Joint Venture</option>
                    <option>Luxury Residential Development</option>
                    <option>Turnkey Commercial Construction</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    Contact Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] font-mono text-sm rounded-[2px] arch-focus placeholder:[var(--color-concrete-mid)]"
                  />
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* ==========================================================================
           SECTION 05: SPACING & BREAKPOINTS
           ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'layout') && (
          <section id="layout" className="flex flex-col gap-10">
            <SectionHeader
              index="05"
              eyebrow="RESPONSIVE BREAKPOINTS & SPACING"
              title="Grid Containers & Breakpoints"
              highlightWord="Breakpoints"
              subtitle="Fluid layout containers and generous editorial spacing scale tuned for mobile, tablet, laptop, and ultra-wide displays."
              layout="split"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Breakpoint Table */}
              <Card index="05.1 // RESPONSIVE BREAKPOINTS" showCrosshair>
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] mb-6">
                  Target Device Breakpoints
                </h4>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center p-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)]">
                    <span>MOBILE (SM)</span>
                    <span className="text-[var(--color-earth-accent)]">640px</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)]">
                    <span>TABLET (MD)</span>
                    <span className="text-[var(--color-earth-accent)]">768px</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)]">
                    <span>LAPTOP (LG)</span>
                    <span className="text-[var(--color-earth-accent)]">1024px</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)]">
                    <span>DESKTOP (XL)</span>
                    <span className="text-[var(--color-earth-accent)]">1280px</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)]">
                    <span>ULTRA-WIDE (WIDE)</span>
                    <span className="text-[var(--color-earth-accent)]">1680px</span>
                  </div>
                </div>
              </Card>

              {/* Generous Whitespace Tokens */}
              <Card index="05.2 // SECTION WHITESPACE" showCrosshair>
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-earth-accent)] mb-6">
                  Generous Editorial Spacing Scale
                </h4>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono text-[var(--color-concrete-light)] mb-1">
                      <span>Section Padding Y (--space-section-y)</span>
                      <span>5rem -&gt; 10rem</span>
                    </div>
                    <div className="h-6 bg-[var(--color-earth-accent-muted)] border border-[var(--color-earth-accent-border)] flex items-center justify-center font-mono text-[10px] text-[var(--color-earth-accent)]">
                      clamp(5rem, 10vw, 10rem)
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono text-[var(--color-concrete-light)] mb-1">
                      <span>Container Max Width</span>
                      <span>1680px Wide</span>
                    </div>
                    <div className="h-6 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] flex items-center justify-center font-mono text-[10px] text-[var(--color-text-secondary)]">
                      --container-wide: 1680px
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </section>
        )}

      </main>

      {/* Footer Specimen Bar */}
      <footer className="relative z-10 py-12 border-t border-[var(--color-border-stone)] bg-[var(--color-bg-secondary)] text-center font-mono text-xs text-[var(--color-text-muted)]">
        <div className="max-w-[var(--container-wide)] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>[ KEDAR PROPERTIES SYSTEM SPECIFICATION ]</div>
          <div className="text-[var(--color-earth-accent)]">RERA APPROVED // PAN-INDIA ENTERPRISE</div>
        </div>
      </footer>
    </div>
  );
};

export default DesignSystemShowcase;
