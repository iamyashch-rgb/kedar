import React, { useState, useRef, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { useLanguage } from '../../context/LanguageContext';
import type { Property, PropertyCategory, IndianCity, PropertyPurpose } from '../../types/property';
import { Eyebrow } from '../common/Eyebrow';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { PropertyDetailModal } from '../common/PropertyDetailModal';
import { ArrowLeft, ArrowRight, MapPin, Compass, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedPropertiesSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory | 'ALL'>('ALL');
  const [selectedCity, setSelectedCity] = useState<IndianCity | 'ALL CITIES'>('ALL CITIES');
  const [selectedPurpose, setSelectedPurpose] = useState<PropertyPurpose | 'ALL'>('ALL');

  // Selected Property for Modal View
  const [selectedPropertyModal, setSelectedPropertyModal] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);

  const CATEGORIES: (PropertyCategory | 'ALL')[] = [
    'ALL',
    'APARTMENTS',
    'INDEPENDENT HOMES',
    'VILLAS',
    'COMMERCIAL',
    'LAND & PLOTS',
  ];

  const CITIES: (IndianCity | 'ALL CITIES')[] = [
    'ALL CITIES',
    'Delhi NCR',
    'Gurugram',
    'Noida',
    'Mumbai',
    'Bengaluru',
    'Lucknow',
    'Dehradun',
    'Jaipur',
    'Hyderabad',
  ];

  const PURPOSES: (PropertyPurpose | 'ALL')[] = ['ALL', 'BUY', 'SELL', 'INVESTMENT'];

  useEffect(() => {
    let isMounted = true;
    const fetchProps = () => {
      dataService
        .getProperties({
          category: selectedCategory,
          city: selectedCity,
          purpose: selectedPurpose,
        })
        .then((data) => {
          if (isMounted) {
            setProperties(data);
          }
        });
    };

    fetchProps();
    const unsubscribe = dataService.subscribeToProperties(fetchProps);

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [selectedCategory, selectedCity, selectedPurpose]);

  const filteredProperties = properties;

  // Scroll Left / Right Controls
  const scrollTrack = (direction: 'left' | 'right') => {
    if (!scrollTrackRef.current) return;
    const amount = direction === 'left' ? -420 : 420;
    scrollTrackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // GSAP Viewport Entrance Animation
  useEffect(() => {
    if (!sectionRef.current || !scrollTrackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollTrackRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="properties"
      className="relative w-full py-28 lg:py-40 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden select-none"
    >
      {/* Architectural Grid Overlay */}
      <ArchGridOverlay columns={4} showCrosshairs />

      <div className="relative z-10 max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Eyebrow index="04" variant="accent" className="mb-4">
              {t('properties_eyebrow')}
            </Eyebrow>
            <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] leading-none">
              {t('properties_title')}
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-base text-[var(--color-text-secondary)] font-normal max-w-md leading-relaxed">
              Discover, evaluate, buy, and sell verified real estate assets, land for sale, and luxury apartments across India with 100% legal title assurance.
            </p>

            {/* Horizontal Track Scroll Controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => scrollTrack('left')}
                className="p-3 rounded-[2px] bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] hover:text-[var(--color-earth-accent)] arch-focus transition-colors cursor-pointer"
                aria-label="Scroll property track left"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTrack('right')}
                className="p-3 rounded-[2px] bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] hover:text-[var(--color-earth-accent)] arch-focus transition-colors cursor-pointer"
                aria-label="Scroll property track right"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================================================
           MULTI-FILTER CONTROLS BAR (Category, Location, Purpose)
           ========================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 mb-8 sm:mb-12 bg-[var(--color-bg-card)] border border-[var(--color-border-stone)] rounded-[2px]">
          
          {/* Category Pills Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none snap-x snap-mandatory">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 min-h-[44px] font-mono text-xs uppercase tracking-wider rounded-[2px] transition-all whitespace-nowrap cursor-pointer arch-focus touch-target snap-start ${
                  selectedCategory === cat
                    ? 'bg-[var(--color-earth-accent)] text-white font-bold'
                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Location & Purpose Dropdown Selectors */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* City Filter */}
            <div className="flex items-center gap-2 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] px-3 py-2 min-h-[44px] rounded-[2px] w-full sm:w-auto">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-earth-accent)] shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value as any)}
                aria-label="Filter properties by city location"
                className="bg-transparent font-mono text-xs text-[var(--color-text-primary)] focus:outline-none cursor-pointer w-full"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city} className="bg-[#0A0A0C] text-white">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Purpose Filter */}
            <div className="flex items-center gap-2 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] px-3 py-2 min-h-[44px] rounded-[2px] w-full sm:w-auto">
              <Compass className="w-3.5 h-3.5 text-[var(--color-earth-accent)] shrink-0" />
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value as any)}
                aria-label="Filter properties by transaction purpose"
                className="bg-transparent font-mono text-xs text-[var(--color-text-primary)] focus:outline-none cursor-pointer w-full"
              >
                {PURPOSES.map((p) => (
                  <option key={p} value={p} className="bg-[#0A0A0C] text-white">
                    {p === 'ALL' ? 'ALL PURPOSES' : `PURPOSE: ${p}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Mobile Swipe Gesture Hint */}
        <div className="flex sm:hidden items-center justify-between font-mono text-[10px] text-[var(--color-earth-accent)] uppercase mb-3">
          <span>SWIPE TO EXPLORE PROPERTIES →</span>
          <span>[ {filteredProperties.length} ASSETS ]</span>
        </div>

        {/* ==========================================================================
           HORIZONTALLY SCROLLING PROPERTY SHOWCASE TRACK
           ========================================================================== */}
        {filteredProperties.length === 0 ? (
          <div className="p-12 text-center bg-[var(--color-bg-card)] border border-[var(--color-border-stone)] rounded-[2px] font-mono text-xs text-[var(--color-concrete-light)]">
            [ NO PROPERTIES MATCH THE SELECTED FILTERS. RESET FILTERS TO VIEW ALL ]
          </div>
        ) : (
          <div
            ref={scrollTrackRef}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory"
          >
            {filteredProperties.map((prop) => (
              <article
                key={prop.id}
                data-cursor="property"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${prop.title}, ${prop.category} in ${prop.locality}, ${prop.city}`}
                onClick={() => setSelectedPropertyModal(prop)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPropertyModal(prop);
                  }
                }}
                className="group arch-card relative w-[85vw] max-w-[340px] sm:w-[380px] shrink-0 rounded-[2px] overflow-hidden flex flex-col justify-between cursor-pointer snap-start arch-focus"
              >
                {/* Image Container with Hover Scale */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border-stone)]">
                  <img
                    src={prop.featuredImage || (prop.images && prop.images[0]) || ''}
                    alt={`Kedar Properties - ${prop.title} ${prop.category} in ${prop.city || prop.locality}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 bg-[var(--color-bg-primary)]/90 border border-[var(--color-earth-accent-border)] text-[var(--color-earth-accent)]">
                      {prop.category}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 bg-[var(--color-bg-primary)]/90 border border-[var(--color-border-stone)] text-emerald-400">
                      {prop.availability || prop.status}
                    </span>
                  </div>


                </div>

                {/* Card Info Body */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-earth-accent)] mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{prop.locality}, {prop.city}</span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-earth-accent)] transition-colors line-clamp-1 mb-2">
                      {prop.title}
                    </h3>

                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-4">
                      {prop.description}
                    </p>
                  </div>

                  {/* Specs Grid & Price Bottom */}
                  <div>
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-[var(--color-border-stone)] font-mono text-[10px] text-[var(--color-concrete-light)] mb-4">
                      <div>
                        <span className="block text-[var(--color-text-muted)]">AREA</span>
                        <span className="text-[var(--color-text-primary)] font-bold">{prop.area}</span>
                      </div>
                      <div>
                        <span className="block text-[var(--color-text-muted)]">CONFIG</span>
                        <span className="text-[var(--color-text-primary)] font-bold truncate block">{prop.configuration || prop.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {prop.priceDisplay && (
                        <div>
                          <span className="font-mono text-[9px] text-[var(--color-text-muted)] uppercase block">OFFERING</span>
                          <span className="font-heading text-lg font-bold text-[var(--color-earth-accent)]">{prop.priceDisplay}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1 font-mono text-xs text-[var(--color-text-primary)] group-hover:text-[var(--color-earth-accent)] transition-colors">
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

      </div>

      {/* Property Detail View Modal */}
      <PropertyDetailModal
        property={selectedPropertyModal}
        onClose={() => setSelectedPropertyModal(null)}
      />
    </section>
  );
};

export default FeaturedPropertiesSection;
