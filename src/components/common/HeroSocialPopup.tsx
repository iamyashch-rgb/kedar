import React, { useState, useEffect } from 'react';
import { SITE_CONFIG, trackLeadEvent } from '../../config/site.config';
import { X, ExternalLink, Sparkles, CheckCircle2, Share2, Bell } from 'lucide-react';

export const HeroSocialPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'youtube' | 'instagram' | 'facebook'>('all');

  useEffect(() => {
    // Show popup after a smooth 1.8s delay to let Hero text animate in first
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
    trackLeadEvent('Hero Social Popup', 'Dismissed', 'Close Button Click');
  };

  const handleOpen = () => {
    setIsVisible(true);
    setIsDismissed(false);
    trackLeadEvent('Hero Social Popup', 'Reopened', 'Trigger Pill Click');
  };

  const handleSocialClick = (platform: 'YouTube' | 'Instagram' | 'Facebook', url: string) => {
    trackLeadEvent('Hero Social Popup', `Click ${platform}`, url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Trigger Pill (Visible when popup is minimized/dismissed) */}
      {isDismissed && (
        <button
          onClick={handleOpen}
          aria-label="Open Social Media Channels Popup"
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-4 py-2.5 bg-[var(--color-bg-secondary)]/90 backdrop-blur-md border border-[var(--color-earth-accent-border)] rounded-full shadow-2xl hover:border-[var(--color-earth-accent)] transition-all duration-300 transform hover:-translate-y-0.5 arch-focus cursor-pointer"
        >
          <div className="relative flex items-center gap-1.5">
            {/* YouTube Icon */}
            <div className="w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center text-white shrink-0">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>

            {/* Instagram Icon */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1px] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[var(--color-bg-primary)] rounded-full flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </div>
            </div>

            {/* Facebook Icon */}
            <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white shrink-0">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>

            {/* Notification Badge Dot */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-earth-accent)] rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-earth-accent)] rounded-full" />
          </div>

          <span className="font-mono text-xs font-bold tracking-wider text-[var(--color-text-primary)] uppercase group-hover:text-[var(--color-earth-accent)] transition-colors">
            Follow Us
          </span>
        </button>
      )}

      {/* Main Popup Modal Overlay (Floating Widget in Hero area) */}
      {isVisible && !isDismissed && (
        <div className="fixed sm:absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 w-[calc(100%-2rem)] max-w-sm sm:max-w-md bg-[var(--color-bg-secondary)]/95 backdrop-blur-xl border border-[var(--color-earth-accent-border)] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-6">
          
          {/* Top Decorative Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-red-600 via-rose-500 via-[#1877F2] to-[var(--color-earth-accent)]" />

          {/* Popup Header */}
          <div className="p-4 sm:p-5 border-b border-[var(--color-border-stone)] flex items-center justify-between bg-[var(--color-bg-tertiary)]/50">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[var(--color-earth-accent)]/15 border border-[var(--color-earth-accent-border)] rounded-[2px]">
                <Share2 className="w-4 h-4 text-[var(--color-earth-accent)]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[var(--color-earth-accent)] uppercase tracking-widest">
                    OFFICIAL SOCIAL CONNECT
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono rounded-[2px]">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    LIVE
                  </span>
                </div>
                <h4 className="font-heading text-base font-extrabold text-[var(--color-text-primary)] uppercase tracking-tight leading-tight mt-0.5">
                  Connect With Kedar
                </h4>
              </div>
            </div>

            <button
              onClick={handleClose}
              aria-label="Close social media popup"
              className="p-1.5 text-[var(--color-concrete-light)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-primary)] rounded-[2px] transition-colors arch-focus cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex border-b border-[var(--color-border-stone)] font-mono text-[11px] bg-[var(--color-bg-primary)]/40">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 text-center transition-colors border-b-2 ${
                activeTab === 'all'
                  ? 'border-[var(--color-earth-accent)] text-[var(--color-earth-accent)] font-bold bg-[var(--color-bg-tertiary)]/80'
                  : 'border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveTab('youtube')}
              className={`flex-1 py-2 text-center transition-colors border-b-2 flex items-center justify-center gap-1 ${
                activeTab === 'youtube'
                  ? 'border-red-600 text-red-500 font-bold bg-[var(--color-bg-tertiary)]/80'
                  : 'border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-600" />
              YOUTUBE
            </button>
            <button
              onClick={() => setActiveTab('instagram')}
              className={`flex-1 py-2 text-center transition-colors border-b-2 flex items-center justify-center gap-1 ${
                activeTab === 'instagram'
                  ? 'border-rose-500 text-rose-400 font-bold bg-[var(--color-bg-tertiary)]/80'
                  : 'border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-500" />
              INSTAGRAM
            </button>
            <button
              onClick={() => setActiveTab('facebook')}
              className={`flex-1 py-2 text-center transition-colors border-b-2 flex items-center justify-center gap-1 ${
                activeTab === 'facebook'
                  ? 'border-[#1877F2] text-[#1877F2] font-bold bg-[var(--color-bg-tertiary)]/80'
                  : 'border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#1877F2]" />
              FACEBOOK
            </button>
          </div>

          {/* Social Cards Section */}
          <div className="p-4 space-y-3.5 max-h-[320px] overflow-y-auto custom-scrollbar">
            
            {/* YOUTUBE CARD */}
            {(activeTab === 'all' || activeTab === 'youtube') && (
              <div className="group relative p-3.5 bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-primary)] border border-red-500/20 hover:border-red-500/50 rounded-[4px] transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* YouTube Avatar / Icon */}
                    <div className="w-10 h-10 rounded-full bg-[#FF0000] p-[2px] shrink-0 shadow-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading text-sm font-bold text-[var(--color-text-primary)]">
                          YouTube Channel
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                      </div>
                      <p className="font-mono text-[11px] text-[var(--color-concrete-light)]">
                        @jaibabakedarproperty
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[10px] rounded-[2px] shrink-0">
                    OFFICIAL
                  </span>
                </div>

                <p className="font-body text-xs text-[var(--color-text-secondary)] mt-2.5 leading-relaxed">
                  Watch property walkthroughs, land tour videos, and site development updates in Uttarakhand.
                </p>

                <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[var(--color-border-stone)]/50">
                  <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--color-text-tertiary)]">
                    <Sparkles className="w-3 h-3 text-red-400" />
                    <span>Property Video Tours</span>
                  </div>

                  <button
                    onClick={() => handleSocialClick('YouTube', SITE_CONFIG.socials.youtube)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF0000] hover:bg-red-700 text-white font-mono text-xs font-semibold rounded-[2px] shadow-md transition-all duration-200 arch-focus cursor-pointer"
                  >
                    <span>SUBSCRIBE YOUTUBE</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* INSTAGRAM CARD */}
            {(activeTab === 'all' || activeTab === 'instagram') && (
              <div className="group relative p-3.5 bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-primary)] border border-rose-500/20 hover:border-rose-500/50 rounded-[4px] transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Instagram Avatar / Icon */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                      <div className="w-full h-full bg-[var(--color-bg-primary)] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading text-sm font-bold text-[var(--color-text-primary)]">
                          Instagram
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                      </div>
                      <p className="font-mono text-[11px] text-[var(--color-concrete-light)]">
                        @propertykedar
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-[10px] rounded-[2px] shrink-0">
                    18.5K+ Followers
                  </span>
                </div>

                <p className="font-body text-xs text-[var(--color-text-secondary)] mt-2.5 leading-relaxed">
                  Explore site walk-throughs, luxury villa showcases & architectural engineering videos.
                </p>

                <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[var(--color-border-stone)]/50">
                  <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--color-text-tertiary)]">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Daily Visual Reels</span>
                  </div>

                  <button
                    onClick={() => handleSocialClick('Instagram', SITE_CONFIG.socials.instagram)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-mono text-xs font-semibold rounded-[2px] shadow-md transition-all duration-200 arch-focus cursor-pointer"
                  >
                    <span>FOLLOW INSTAGRAM</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* FACEBOOK CARD */}
            {(activeTab === 'all' || activeTab === 'facebook') && (
              <div className="group relative p-3.5 bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-primary)] border border-[#1877F2]/20 hover:border-[#1877F2]/50 rounded-[4px] transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Facebook Avatar / Icon */}
                    <div className="w-10 h-10 rounded-full bg-[#1877F2] p-[2px] shrink-0 shadow-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading text-sm font-bold text-[var(--color-text-primary)]">
                          Facebook
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1877F2]" />
                      </div>
                      <p className="font-mono text-[11px] text-[var(--color-concrete-light)]">
                        Kedar Properties Page
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-[#1877F2]/10 border border-[#1877F2]/20 text-blue-300 font-mono text-[10px] rounded-[2px] shrink-0">
                    24K+ Likes
                  </span>
                </div>

                <p className="font-body text-xs text-[var(--color-text-secondary)] mt-2.5 leading-relaxed">
                  Stay updated on RERA land acquisitions, investment reports & company news.
                </p>

                <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[var(--color-border-stone)]/50">
                  <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--color-text-tertiary)]">
                    <Bell className="w-3 h-3 text-[#1877F2]" />
                    <span>Project Announcements</span>
                  </div>

                  <button
                    onClick={() => handleSocialClick('Facebook', SITE_CONFIG.socials.facebook)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-mono text-xs font-semibold rounded-[2px] shadow-md transition-all duration-200 arch-focus cursor-pointer"
                  >
                    <span>LIKE FACEBOOK</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar inside Popup */}
          <div className="p-3 bg-[var(--color-bg-primary)]/80 border-t border-[var(--color-border-stone)] flex items-center justify-between text-[10px] font-mono text-[var(--color-concrete-light)]">
            <span>RERA REGISTERED CHANNELS</span>
            <button
              onClick={handleClose}
              className="text-[var(--color-earth-accent)] hover:underline uppercase font-semibold cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSocialPopup;
