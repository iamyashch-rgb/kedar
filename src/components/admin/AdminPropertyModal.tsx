import React, { useState, useEffect, useRef } from 'react';
import type { Property } from '../../types/property';
import { CURATED_IMAGES } from '../../config/image.config';
import {
  X,
  Save,
  Building2,
  MapPin,
  Tag,
  Image as ImageIcon,
  Upload,
  CheckCircle2,
  FolderOpen,
} from 'lucide-react';

interface AdminPropertyModalProps {
  isOpen: boolean;
  propertyToEdit: Property | null;
  onClose: () => void;
  onSave: (propertyData: Partial<Property>) => Promise<void>;
}

export const AdminPropertyModal: React.FC<AdminPropertyModalProps> = ({
  isOpen,
  propertyToEdit,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    type: 'Penthouse',
    category: 'APARTMENTS',
    purpose: 'BUY',
    city: 'Gurugram',
    state: 'Haryana',
    locality: 'Golf Course Road',
    location: 'Golf Course Road, Gurugram',
    price: 45000000,
    priceDisplay: '₹4.50 Cr',
    area: '2,800 sq.ft.',
    bedrooms: 3,
    bathrooms: 3,
    status: 'RERA Ready',
    availability: 'RERA Ready',
    reraId: 'HARERA/GGM/2026/102',
    description: '',
    featuredImage: CURATED_IMAGES.heroBg.url,
    images: [CURATED_IMAGES.heroBg.url, CURATED_IMAGES.luxuryVilla.url],
    gallery: [CURATED_IMAGES.heroBg.url, CURATED_IMAGES.luxuryVilla.url],
    features: [
      '100% Legal title clearance & RERA approval',
      'VRV Air Conditioning & Italian Marble',
      '24/7 High-tier security & Concierge',
    ],
    highlights: [
      '100% Legal title clearance & RERA approval',
      'VRV Air Conditioning & Italian Marble',
    ],
    featured: true,
    isFeatured: true,
    available: true,
    configuration: '3 BHK Luxury Suite',
  });

  const [featuresText, setFeaturesText] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [featuredImageSrc, setFeaturedImageSrc] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showPresetPicker, setShowPresetPicker] = useState<boolean>(false);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');

  const featuredFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (propertyToEdit) {
      setFormData({ ...propertyToEdit });
      setFeaturesText(
        Array.isArray(propertyToEdit.features)
          ? propertyToEdit.features.join('\n')
          : ''
      );
      const existingGallery = Array.isArray(propertyToEdit.gallery) && propertyToEdit.gallery.length > 0
        ? propertyToEdit.gallery
        : Array.isArray(propertyToEdit.images) && propertyToEdit.images.length > 0
        ? propertyToEdit.images
        : [propertyToEdit.featuredImage || CURATED_IMAGES.heroBg.url];
      
      setGalleryImages(existingGallery);
      setFeaturedImageSrc(propertyToEdit.featuredImage || existingGallery[0] || CURATED_IMAGES.heroBg.url);
    } else {
      const defaultImg = CURATED_IMAGES.luxuryVilla.url;
      setFormData({
        title: '',
        type: 'Penthouse',
        category: 'APARTMENTS',
        purpose: 'BUY',
        city: 'Gurugram',
        state: 'Haryana',
        locality: 'Golf Course Road',
        location: 'Golf Course Road, Gurugram',
        price: 55000000,
        priceDisplay: '₹5.50 Cr',
        area: '3,200 sq.ft.',
        bedrooms: 4,
        bathrooms: 4,
        status: 'RERA Ready',
        availability: 'RERA Ready',
        reraId: 'HARERA/GGM/2026/889',
        description: 'Luxury architectural residence crafted with premium structural specifications and Vastu compliance.',
        featuredImage: defaultImg,
        images: [defaultImg, CURATED_IMAGES.heroBg.url],
        gallery: [defaultImg, CURATED_IMAGES.heroBg.url],
        features: ['100% Clear Title Assurance', 'Turnkey Civil Construction Quality', '24/7 Security & Gated Access'],
        highlights: ['100% Clear Title Assurance', 'Turnkey Civil Construction Quality'],
        featured: true,
        isFeatured: true,
        available: true,
        configuration: '4 BHK Executive Residence',
      });
      setFeaturesText('100% Clear Title Assurance\nTurnkey Civil Construction Quality\n24/7 Security & Gated Access');
      setGalleryImages([defaultImg, CURATED_IMAGES.heroBg.url]);
      setFeaturedImageSrc(defaultImg);
    }
  }, [propertyToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Upload Featured Main Photo
  const handleFeaturedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setFeaturedImageSrc(result);
        if (!galleryImages.includes(result)) {
          setGalleryImages((prev) => [result, ...prev]);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Upload Multiple Gallery Pictures
  const handleGalleryFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setGalleryImages((prev) => {
            if (prev.includes(result)) return prev;
            return [...prev, result];
          });
          if (!featuredImageSrc) {
            setFeaturedImageSrc(result);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove a picture from gallery
  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setGalleryImages((prev) => {
      const updated = prev.filter((_, idx) => idx !== indexToRemove);
      if (featuredImageSrc === prev[indexToRemove] && updated.length > 0) {
        setFeaturedImageSrc(updated[0]);
      }
      return updated;
    });
  };

  // Select Preset Photo
  const handleSelectPresetImage = (url: string) => {
    if (!galleryImages.includes(url)) {
      setGalleryImages((prev) => [...prev, url]);
    }
    setFeaturedImageSrc(url);
    setShowPresetPicker(false);
  };

  // Add Custom Image URL
  const handleAddCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    const url = customUrlInput.trim();
    if (!galleryImages.includes(url)) {
      setGalleryImages((prev) => [...prev, url]);
    }
    if (!featuredImageSrc) setFeaturedImageSrc(url);
    setCustomUrlInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title?.trim()) {
      setErrorMsg('Property Title is required');
      return;
    }

    if (!formData.priceDisplay?.trim()) {
      setErrorMsg('Price Display (e.g. ₹5.50 Cr) is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const featureArray = featuresText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const finalGallery = galleryImages.length > 0 ? galleryImages : [featuredImageSrc || CURATED_IMAGES.heroBg.url];
      const finalFeatured = featuredImageSrc || finalGallery[0] || CURATED_IMAGES.heroBg.url;

      const finalData: Partial<Property> = {
        ...formData,
        location: `${formData.locality || ''}, ${formData.city || ''}`.replace(/^,\s*/, ''),
        features: featureArray.length > 0 ? featureArray : ['100% Clear Title', 'RERA Approved'],
        highlights: featureArray.length > 0 ? featureArray : ['100% Clear Title', 'RERA Approved'],
        gallery: finalGallery,
        images: finalGallery,
        featuredImage: finalFeatured,
        isFeatured: formData.featured ?? true,
      };

      await onSave(finalData);
      setIsSubmitting(false);
      onClose();
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Failed to save property.');
    }
  };

  const PRESET_PHOTOS = Object.values(CURATED_IMAGES);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[var(--color-bg-secondary)] border border-[var(--color-earth-accent-border)] rounded-lg shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border-stone)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--color-earth-accent)]/15 border border-[var(--color-earth-accent-border)] rounded-[2px]">
              <Building2 className="w-5 h-5 text-[var(--color-earth-accent)]" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--color-earth-accent)] font-bold uppercase tracking-widest block">
                ADMIN PROPERTY EDITOR & PICTURE MANAGER
              </span>
              <h3 className="font-heading text-xl font-extrabold text-[var(--color-text-primary)] uppercase tracking-tight">
                {propertyToEdit ? `Edit: ${propertyToEdit.title}` : 'Add New Property'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[var(--color-concrete-light)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-primary)] rounded-[2px] transition-colors arch-focus cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs rounded-[2px] shrink-0">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          
          {/* SECTION 1: PROPERTY PICTURES (UPLOAD & GALLERY MANAGER) */}
          <div className="space-y-4 p-4 bg-[var(--color-bg-tertiary)]/70 border border-[var(--color-border-stone)] rounded-[4px]">
            <div className="flex items-center justify-between border-b border-[var(--color-border-stone)] pb-2">
              <h4 className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>1. Property Pictures & Media Gallery</span>
              </h4>
              <span className="font-mono text-[10px] text-[var(--color-concrete-light)]">
                {galleryImages.length} Picture(s) Uploaded
              </span>
            </div>

            {/* Featured Image Display & File Upload Area */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start font-mono text-xs">
              
              {/* Featured Image Preview Card */}
              <div className="sm:col-span-4 space-y-2">
                <label className="block text-[var(--color-text-secondary)] uppercase text-[11px]">
                  Main Cover Picture
                </label>
                <div className="relative aspect-video sm:aspect-square bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] rounded-[2px] overflow-hidden group">
                  {featuredImageSrc ? (
                    <img
                      src={featuredImageSrc}
                      alt="Property Featured Main Cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-[var(--color-concrete-light)]">
                      <ImageIcon className="w-8 h-8 opacity-40 mb-1" />
                      <span>No Cover Selected</span>
                    </div>
                  )}
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/75 text-amber-300 text-[9px] font-mono rounded-[2px]">
                    MAIN COVER
                  </span>
                </div>
              </div>

              {/* Upload & Selector Controls */}
              <div className="sm:col-span-8 space-y-3">
                <label className="block text-[var(--color-text-secondary)] uppercase text-[11px]">
                  Add / Upload Pictures
                </label>

                {/* Upload Buttons Row */}
                <div className="flex flex-wrap gap-2">
                  
                  {/* File Upload Input (Hidden) */}
                  <input
                    ref={featuredFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedFileUpload}
                    className="hidden"
                  />
                  <input
                    ref={galleryFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryFilesUpload}
                    className="hidden"
                  />

                  {/* Upload Picture File Button */}
                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current?.click()}
                    className="px-3.5 py-2 bg-[var(--color-earth-accent)] hover:bg-[var(--color-earth-accent)]/90 text-white rounded-[2px] font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>UPLOAD PICTURE FILES</span>
                  </button>

                  {/* Choose Architectural Stock Presets */}
                  <button
                    type="button"
                    onClick={() => setShowPresetPicker(!showPresetPicker)}
                    className="px-3 py-2 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] text-[var(--color-text-primary)] rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-[var(--color-earth-accent)]" />
                    <span>ARCHITECTURAL PRESETS</span>
                  </button>
                </div>

                {/* Optional Web URL Input */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="Or paste image URL (https://images.unsplash.com/...)"
                    className="flex-1 px-3 py-2 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomUrl}
                    className="px-3 py-2 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] hover:text-[var(--color-earth-accent)] rounded-[2px] transition-colors cursor-pointer"
                  >
                    ADD URL
                  </button>
                </div>

                <p className="text-[10px] text-[var(--color-concrete-light)] leading-normal">
                  💡 Tip: Upload local image files from your computer or click preset photos. Images will save and display automatically.
                </p>
              </div>
            </div>

            {/* PRESET ARCHITECTURAL PHOTO PICKER GRID */}
            {showPresetPicker && (
              <div className="p-3 bg-[var(--color-bg-primary)] border border-[var(--color-earth-accent-border)] rounded-[2px] space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-earth-accent)] font-bold uppercase">
                  <span>SELECT ARCHITECTURAL PHOTO PRESET</span>
                  <button
                    type="button"
                    onClick={() => setShowPresetPicker(false)}
                    className="text-[var(--color-concrete-light)] hover:text-white"
                  >
                    CLOSE
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_PHOTOS.map((imgItem) => (
                    <button
                      key={imgItem.id}
                      type="button"
                      onClick={() => handleSelectPresetImage(imgItem.url)}
                      className="group relative aspect-video rounded-[2px] overflow-hidden border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent)] transition-all text-left cursor-pointer"
                    >
                      <img src={imgItem.url} alt={imgItem.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-1.5 flex items-end">
                        <span className="font-mono text-[9px] text-white uppercase truncate">{imgItem.alt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY PICTURE THUMBNAILS GRID */}
            {galleryImages.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[var(--color-border-stone)]/50">
                <span className="font-mono text-[10px] text-[var(--color-concrete-light)] uppercase tracking-wider block">
                  Uploaded Gallery Thumbnails (Click image to set as Main Cover):
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {galleryImages.map((imgUrl, idx) => {
                    const isCover = imgUrl === featuredImageSrc;
                    return (
                      <div
                        key={idx}
                        className={`group relative w-20 h-16 rounded-[2px] overflow-hidden border transition-all ${
                          isCover
                            ? 'border-amber-400 ring-1 ring-amber-400'
                            : 'border-[var(--color-border-stone)] hover:border-[var(--color-text-secondary)]'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Gallery picture ${idx + 1}`}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => setFeaturedImageSrc(imgUrl)}
                          title="Click to set as Main Cover"
                        />

                        {/* Cover Badge */}
                        {isCover && (
                          <span className="absolute top-0.5 left-0.5 px-1 py-0.2 bg-amber-500 text-black font-bold font-mono text-[8px] rounded-[1px]">
                            COVER
                          </span>
                        )}

                        {/* Delete Picture Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          title="Remove picture"
                          className="absolute top-0.5 right-0.5 p-1 bg-black/80 hover:bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: BASIC PROPERTY DETAILS */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-wider border-b border-[var(--color-border-stone)] pb-1.5 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" />
              <span>2. Basic Property Details</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="sm:col-span-2">
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  placeholder="e.g. The Sovereign Sky Penthouses"
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category || 'APARTMENTS'}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                >
                  <option value="APARTMENTS">APARTMENTS</option>
                  <option value="INDEPENDENT HOMES">INDEPENDENT HOMES</option>
                  <option value="VILLAS">VILLAS</option>
                  <option value="COMMERCIAL">COMMERCIAL</option>
                  <option value="LAND & PLOTS">LAND & PLOTS</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Type / Sub-Category *
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type || ''}
                  onChange={handleChange}
                  placeholder="e.g. Penthouse, Villa, Land Plot"
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Purpose *
                </label>
                <select
                  name="purpose"
                  value={formData.purpose || 'BUY'}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                  <option value="INVESTMENT">INVESTMENT</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Configuration / Layout
                </label>
                <input
                  type="text"
                  name="configuration"
                  value={formData.configuration || ''}
                  onChange={handleChange}
                  placeholder="e.g. 4 BHK Sky Villa & Pool"
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: LOCATION & SPECS */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-wider border-b border-[var(--color-border-stone)] pb-1.5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>3. Location & Specs</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  placeholder="e.g. Gurugram, Mumbai, Noida"
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  placeholder="e.g. Haryana, Maharashtra"
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Locality / Sector
                </label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality || ''}
                  onChange={handleChange}
                  placeholder="e.g. Golf Course Road, Sector 54"
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: PRICING & SPECIFICATIONS */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-wider border-b border-[var(--color-border-stone)] pb-1.5 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>4. Pricing & Dimensions</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Price Display *
                </label>
                <input
                  type="text"
                  name="priceDisplay"
                  value={formData.priceDisplay || ''}
                  onChange={handleChange}
                  placeholder="e.g. ₹6.75 Cr"
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Numeric Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || 0}
                  onChange={handleChange}
                  placeholder="67500000"
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Area / Size *
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area || ''}
                  onChange={handleChange}
                  placeholder="e.g. 3,700 sq.ft."
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms ?? 0}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms ?? 0}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Availability Status
                </label>
                <select
                  name="availability"
                  value={formData.availability || 'RERA Ready'}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                >
                  <option value="RERA Ready">RERA Ready</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Immediate Handover">Immediate Handover</option>
                  <option value="New Launch">New Launch</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  RERA Registration ID
                </label>
                <input
                  type="text"
                  name="reraId"
                  value={formData.reraId || ''}
                  onChange={handleChange}
                  placeholder="e.g. HARERA/GGM/2026/891"
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: DESCRIPTIONS & USPs */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-[var(--color-earth-accent)] font-bold uppercase tracking-wider border-b border-[var(--color-border-stone)] pb-1.5 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>5. Overview & Features</span>
            </h4>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Property Overview / Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description || ''}
                  onChange={handleChange}
                  placeholder="Detailed architectural description of the property..."
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] uppercase mb-1">
                  Key Features & Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="100% Legal Title clearance & RERA approval&#10;Private plunge pool on sky terrace&#10;VRV Air Conditioning & Italian Marble"
                  className="w-full px-3.5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-primary)] rounded-[2px] focus:border-[var(--color-earth-accent)] outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  name="featured"
                  checked={Boolean(formData.featured)}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[var(--color-earth-accent)] cursor-pointer"
                />
                <label htmlFor="featuredCheck" className="text-xs text-[var(--color-text-primary)] uppercase cursor-pointer select-none">
                  Mark as Featured Listing (Highlights in Hero & Home showcase)
                </label>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-[var(--color-border-stone)] flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-stone)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-mono text-xs rounded-[2px] transition-colors arch-focus cursor-pointer"
            >
              CANCEL
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[var(--color-earth-accent)] hover:bg-[var(--color-earth-accent)]/90 text-white font-mono text-xs font-bold rounded-[2px] shadow-lg transition-all duration-200 flex items-center gap-2 arch-focus cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'SAVING...' : propertyToEdit ? 'UPDATE PROPERTY' : 'CREATE PROPERTY'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPropertyModal;
