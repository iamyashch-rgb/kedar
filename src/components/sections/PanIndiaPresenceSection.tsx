import React from 'react';
import { SITE_CONFIG } from '../../config/site.config';
import { SectionHeader } from '../common/SectionHeader';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { MapPin, Phone, Mail, Building2 } from 'lucide-react';
import { useGsapScroll } from '../../hooks/useGsapScroll';
import { animateStaggerList } from '../../utils/animationUtils';

export const PanIndiaPresenceSection: React.FC = () => {
  const containerRef = useGsapScroll((ctx) => {
    ctx.add(() => {
      animateStaggerList('.office-card', '.offices-grid', { stagger: 0.12, start: 'top 80%' });
    });
  });

  const allOffices = [SITE_CONFIG.headquarters, ...SITE_CONFIG.regionalOffices];

  return (
    <section ref={containerRef} id="presence" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="PAN-India Footprint"
          title="Regional Operations Across Key Metropolitan Corridors"
          highlightWord="Operations"
          subtitle="Dedicated advisory and engineering teams stationed across major economic centers to serve local homebuyers, land developers, and NRI investors."
        />

        <div className="offices-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allOffices.map((office, idx) => (
            <Card
              key={idx}
              className={`office-card flex flex-col justify-between ${
                office.isHeadquarters ? 'border-amber-500/40 bg-slate-900/90' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-serif font-bold text-amber-300">{office.city}</span>
                  </div>
                  {office.isHeadquarters ? (
                    <Badge variant="gold">Corporate HQ</Badge>
                  ) : (
                    <Badge variant="outline">{office.region}</Badge>
                  )}
                </div>

                <div className="space-y-3 mb-6 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{office.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-200">{office.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-200">{office.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 text-[11px] text-amber-400 font-medium">
                Local On-site Legal & Construction Advisory Available
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
