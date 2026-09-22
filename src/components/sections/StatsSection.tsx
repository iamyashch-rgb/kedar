import React from 'react';
import { COMPANY_STATS } from '../../data/company';
import { Building2, Trees, ShieldCheck, Users, Award } from 'lucide-react';
import { useGsapScroll } from '../../hooks/useGsapScroll';
import { animateStaggerList } from '../../utils/animationUtils';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  Trees,
  ShieldCheck,
  Users,
  Award,
};

export const StatsSection: React.FC = () => {
  const containerRef = useGsapScroll((ctx) => {
    ctx.add(() => {
      animateStaggerList('.stat-card', '.stats-grid', { stagger: 0.12, start: 'top 85%' });
    });
  });

  return (
    <section ref={containerRef} className="py-16 sm:py-20 bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-stone)] relative z-10">
      <div className="max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {COMPANY_STATS.map((stat, idx) => {
            const IconComponent = ICON_MAP[stat.iconName] || Building2;
            return (
              <div
                key={idx}
                className="stat-card arch-card p-5 sm:p-6 flex flex-col items-start justify-between border border-[var(--color-border-stone)] bg-[var(--color-bg-card)] rounded-[2px]"
              >
                <div className="p-2.5 rounded-[2px] bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] text-[var(--color-earth-accent)] mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-earth-accent)] font-semibold">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[var(--color-text-tertiary)] leading-snug">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

