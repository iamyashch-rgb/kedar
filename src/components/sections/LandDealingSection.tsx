import React, { useRef } from 'react';
import { Eyebrow } from '../common/Eyebrow';
import { useLanguage } from '../../context/LanguageContext';
import { LeadEnquiryButton } from '../common/LeadEnquiryButton';
import { ArchGridOverlay } from '../common/ArchGridLine';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LandDealingSection: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const LAND_SERVICES = isHindi
    ? [
        { num: '01', title: 'भूमि खोज', desc: 'प्रमुख विकास गलियारों में उच्च-लाभ वाली फ्रीहोल्ड भूमि और संयुक्त उद्यम भूखंडों की पहचान।' },
        { num: '02', title: 'प्लॉट खरीद व बिक्री', desc: 'गेटेड आवासीय भूखंडों, वाणिज्यिक भूमि और औद्योगिक क्षेत्रों का प्रत्यक्ष अधिग्रहण।' },
        { num: '03', title: 'साइट मूल्यांकन', desc: 'स्थलाकृतिक सर्वेक्षण, मृदा भार परीक्षण और पर्यावरणीय ऑडिट।' },
        { num: '04', title: 'विकास के अवसर', desc: 'मास्टर-प्लानिंग, सीएलयू ज़ोनिंग मंजूरी और एफएआर अनुकूलन।' },
        { num: '05', title: 'दस्तावेज़ समन्वय', desc: '30-वर्षीय कानूनी शीर्षक खोज, जमाबंदी, खसरा-खतौनी और राजस्व नामकरण।' },
        { num: '06', title: 'निर्माण योजना', desc: 'कच्चे भूभाग के सीमांकन से लेकर टर्नकी सिविल निर्माण तक सुचारू परिवर्तन।' },
      ]
    : [
        { num: '01', title: 'Land Discovery', desc: 'Identifying high-yield freehold land parcels & joint-venture plots across prime corridors.' },
        { num: '02', title: 'Plot Buying & Selling', desc: 'Direct acquisition of gated residential plots, commercial land, and industrial zones.' },
        { num: '03', title: 'Site Evaluation', desc: 'Topographic contour surveys, soil load-bearing tests, and environmental audit.' },
        { num: '04', title: 'Development Opportunities', desc: 'Master-planning, Change of Land Use (CLU) zoning approvals, and FAR optimization.' },
        { num: '05', title: 'Documentation Coordination', desc: '30-Year legal title deeds search, Jamabandi, Khasra-Khatauni, and revenue mutation.' },
        { num: '06', title: 'Construction Planning', desc: 'Seamless transition from raw terrain demarcation to turnkey civil engineering.' },
      ];

  return (
    <section
      ref={sectionRef}
      id="land"
      className="relative w-full py-28 lg:py-40 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden select-none"
    >
      {/* Background Architectural Grid Overlay */}
      <ArchGridOverlay columns={4} showCrosshairs />

      <div className="relative z-10 max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[var(--color-border-stone)]">
          <div>
            <Eyebrow index="05" variant="accent" className="mb-4">
              {t('land_eyebrow')}
            </Eyebrow>
            <h2 className="font-heading text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
              {t('land_title')}
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-base text-[var(--color-text-secondary)] font-normal max-w-md leading-relaxed">
              {t('land_desc')}
            </p>

            <LeadEnquiryButton
              variant="FIND LAND"
              size="lg"
              buttonStyle="accent"
              analyticsCategory="Land Section"
            />
          </div>
        </div>

        {/* ==========================================================================
           MAIN CONTENT: 6 LAND & PLOT SERVICES MATRIX + TRUST & JV CALLOUT
           ========================================================================== */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="font-mono text-xs text-[var(--color-earth-accent)] uppercase tracking-widest">
              [{isHindi ? 'भूमि एवं साइट विकास क्षमताएं' : 'LAND & SITE DEVELOPMENT CAPABILITIES'}]
            </div>

            {/* Land Due-Diligence Trust Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border-stone)] rounded-[2px]">
              <ShieldCheck className="w-5 h-5 text-[var(--color-earth-accent)] shrink-0" />
              <div className="font-heading text-xs font-bold text-[var(--color-text-primary)]">
                {isHindi ? '30-वर्षीय राजस्व रिकॉर्ड क्लीयरेंस और स्वामित्व आश्वासन' : '30-Year Revenue Record Clearance & Title Assurance'}
              </div>
            </div>
          </div>

          {/* 6 Capabilities Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LAND_SERVICES.map((srv) => (
              <div
                key={srv.num}
                className="arch-card p-6 rounded-[2px] flex flex-col justify-between group hover:border-[var(--color-earth-accent-border)] transition-colors bg-[var(--color-bg-card)] border border-[var(--color-border-stone)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--color-border-stone)]">
                    <span className="font-mono text-xs text-[var(--color-earth-accent)] font-bold">
                      {srv.num} //
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-concrete-mid)] group-hover:text-[var(--color-earth-accent)] transition-colors" />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-earth-accent)] transition-colors mb-3">
                    {srv.title}
                  </h3>

                  <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout & Action */}
          <div className="mt-4 p-8 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-stone)] rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-heading text-lg font-bold text-[var(--color-text-primary)]">
                {isHindi ? 'क्या आपके पास बिक्री या संयुक्त उद्यम के लिए भूमि पार्सल है?' : 'Have a Land Parcel For Sale or Joint Venture?'}
              </div>
              <div className="font-body text-sm text-[var(--color-text-muted)] mt-1">
                {isHindi ? 'संयुक्त उद्यम विकास या संस्थागत भूमि अधिग्रहण के लिए प्रत्यक्ष सबमिशन।' : 'Direct submission for joint venture development or institutional land acquisition.'}
              </div>
            </div>

            <LeadEnquiryButton
              variant="ENQUIRE NOW"
              customText={isHindi ? "पार्सल जमा करें" : "Submit Parcel"}
              size="md"
              buttonStyle="accent"
              analyticsCategory="Land Section JV"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default LandDealingSection;
