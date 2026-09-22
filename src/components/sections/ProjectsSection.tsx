import React, { useState, useEffect, useRef } from 'react';
import type { Project, ProjectCategory } from '../../types/project';
import { dataService } from '../../services/dataService';
import { ProjectDetailModal } from '../common/ProjectDetailModal';
import { Eyebrow } from '../common/Eyebrow';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { ArrowUpRight, MapPin, Filter, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjectsCount, setAllProjectsCount] = useState<number>(0);

  // Custom Cursor Badge Ref & State
  const cursorBadgeRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);
  const [cursorText, setCursorText] = useState<string>('VIEW PROJECT');

  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch projects based on active category
  useEffect(() => {
    let isMounted = true;
    dataService.getProjects(activeCategory).then((data) => {
      if (isMounted) {
        setProjects(data);
      }
    });
    dataService.getProjects('all').then((data) => {
      if (isMounted) {
        setAllProjectsCount(data.length);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const filteredProjects = projects;

  // Setup GSAP Parallax & Reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal project cards on scroll
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Image Parallax within Card Container
        const img = card.querySelector<HTMLElement>('.project-card-img');
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -10, scale: 1.1 },
            {
              yPercent: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Direct DOM cursor position update (avoids React re-renders on mousemove)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cursorBadgeRef.current) {
      cursorBadgeRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }
  };

  const CATEGORIES: { label: string; value: ProjectCategory }[] = [
    { label: 'ALL PROJECTS', value: 'all' },
    { label: 'RESIDENTIAL', value: 'residential' },
    { label: 'COMMERCIAL', value: 'commercial' },
    { label: 'LAND & TOWNSHIPS', value: 'land' },
    { label: 'COMPLETED', value: 'completed' },
    { label: 'UNDER CONSTRUCTION', value: 'under-construction' },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-32 bg-[var(--color-bg-primary)] border-b border-[var(--color-border-stone)] overflow-hidden"
    >
      <ArchGridOverlay />

      {/* Floating Cursor Follower Badge (Desktop only, GPU transform) */}
      <div
        ref={cursorBadgeRef}
        className={`fixed top-0 left-0 z-[150] pointer-events-none transition-opacity duration-200 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-[1px] bg-[var(--color-earth-accent)] text-white font-mono text-xs font-bold shadow-2xl uppercase tracking-widest ${
          cursorVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <span>{cursorText}</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--color-border-stone)]">
          <div className="space-y-4 max-w-2xl">
            <Eyebrow index="08">PORTFOLIO & RECENT WORKS</Eyebrow>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[var(--color-text-primary)]">
              BUILT WITH <span className="text-[var(--color-earth-accent)]">PURPOSE.</span>
            </h2>

            <p className="font-body text-base sm:text-lg text-[var(--color-text-secondary)]">
              An architectural showcase of engineered skylines, Grade-A commercial construction office towers, sustainable residential construction townships, and luxury house construction estates across India.
            </p>
          </div>

          <div className="font-mono text-xs text-[var(--color-text-tertiary)] flex items-center gap-2 self-start lg:self-end">
            <Layers className="w-4 h-4 text-[var(--color-earth-accent)]" />
            <span>SHOWING {filteredProjects.length} OF {allProjectsCount} PROJECTS</span>
          </div>
        </div>

        {/* Filter Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          <Filter className="w-4 h-4 text-[var(--color-earth-accent)] shrink-0 mr-1" />
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                aria-label={`Filter projects by ${cat.label}`}
                className={`px-4 py-2 min-h-[44px] font-mono text-xs uppercase tracking-wider rounded-[1px] border transition-all duration-300 shrink-0 touch-target snap-start ${
                  isActive
                    ? 'bg-[var(--color-earth-accent)] text-white border-[var(--color-earth-accent)] font-bold shadow-md'
                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Mobile Swipe Gesture Hint */}
        <div className="flex md:hidden items-center justify-between font-mono text-[10px] text-[var(--color-earth-accent)] uppercase mb-3">
          <span>SWIPE TO EXPLORE PORTFOLIO →</span>
          <span>[ {filteredProjects.length} PROJECTS ]</span>
        </div>

        {/* Editorial Asymmetric Projects Grid / Swipeable Carousel on Mobile */}
        <div
          ref={gridRef}
          className="flex md:grid overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 gap-6 md:gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-3 scrollbar-none snap-x snap-mandatory"
        >
          {filteredProjects.map((project) => {
            return (
              <article
                key={project.id}
                data-cursor="project"
                tabIndex={0}
                role="button"
                aria-label={`View portfolio details for ${project.title} in ${project.location}`}
                onMouseEnter={() => {
                  setCursorVisible(true);
                  setCursorText(`EXPLORE // ${project.id.toUpperCase()}`);
                }}
                onMouseLeave={() => setCursorVisible(false)}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                className={`project-card group cursor-pointer ${project.columnSpan} flex flex-col justify-between space-y-4 w-[84vw] max-w-[340px] md:w-auto shrink-0 md:shrink snap-start arch-focus`}
              >
                {/* Image Container with Parallax & Hover Zoom */}
                <div className={`relative w-full ${project.aspectRatio} overflow-hidden rounded-[2px] border border-[var(--color-border-stone)] bg-[var(--color-bg-tertiary)]`}>
                  <img
                    src={project.image || (project.images && project.images[0]) || ''}
                    alt={`Kedar Properties Portfolio - ${project.title} (${project.location})`}
                    loading="lazy"
                    decoding="async"
                    className="project-card-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Top Status & Type Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                    <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md font-mono text-[10px] uppercase tracking-wider text-[var(--color-earth-accent)] border border-white/10 rounded-[1px]">
                      {project.type || project.category}
                    </span>
                    <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md font-mono text-[10px] uppercase tracking-wider text-[var(--color-concrete-light)] border border-white/10 rounded-[1px]">
                      {project.status === 'completed' ? 'COMPLETED' : 'IN CONSTRUCTION'}
                    </span>
                  </div>

                  {/* Bottom Visual Indicator */}
                  <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-100 md:opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-[var(--color-earth-accent)]" />
                  </div>
                </div>

                {/* Project Metadata & Description */}
                <div className="space-y-2 pt-2 border-t border-[var(--color-border-stone)]">
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--color-text-tertiary)]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-earth-accent)]" />
                      {project.location}
                    </span>
                    <span>{project.yearStatus || project.year}</span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-earth-accent)] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="font-body text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
