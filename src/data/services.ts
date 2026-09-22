import type { Service } from '../types/service';
import { CURATED_IMAGES } from '../config/image.config';

export const SERVICES_DATA: Service[] = [
  {
    id: 'srv-001',
    num: '01',
    code: 'SRV-01',
    title: 'PROPERTY DEALING',
    category: 'real-estate',
    description:
      'Seamless acquisition, valuation, and transaction of premium residential & commercial real estate assets with 100% verified title search.',
    shortDescription: 'Seamless acquisition, valuation, and transaction of verified real estate assets.',
    image: CURATED_IMAGES.heroBg.url,
    capabilities: [
      '30-Year Revenue Record Title Search',
      'Legal Deed Verification & Mutation',
      'Comparative Market Valuation Audit',
      'RERA Registration & Escrow Compliance',
    ],
    featured: true,
  },
  {
    id: 'srv-002',
    num: '02',
    code: 'SRV-02',
    title: 'LAND & PLOTS',
    category: 'land-dealing',
    description:
      'Strategic acquisition of freehold land parcels, agricultural bighas, joint-ventures, and gated residential plots across India.',
    shortDescription: 'Freehold land acquisition, gated plots, and Change of Land Use (CLU) clearance.',
    image: CURATED_IMAGES.landPlot.url,
    capabilities: [
      'CLU & Municipal Zoning Clearances',
      'Freehold Title Deed Transfer',
      'Boundary Demarcation & Topo Survey',
      'Joint Venture Land Structuring',
    ],
    featured: true,
  },
  {
    id: 'srv-003',
    num: '03',
    code: 'SRV-03',
    title: 'APARTMENTS',
    category: 'real-estate',
    description:
      'Luxury high-rise apartments, duplexes, and penthouses in tier-1 urban metropolitan corridors with complete amenity integration.',
    shortDescription: 'Luxury sky residences, duplexes, and high-rise apartments in tier-1 hubs.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    capabilities: [
      'Penthouses & Sky Duplex Residences',
      'RERA Compliant Tier-1 Projects',
      'Clubhouse & Amenity Verification',
      'Institutional Home Loan Sanction',
    ],
    featured: true,
  },
  {
    id: 'srv-004',
    num: '04',
    code: 'SRV-04',
    title: 'RESIDENTIAL HOMES',
    category: 'real-estate',
    description:
      'Bespoke modern independent luxury villas, farmhouses, and custom architectural estates built to personalized structural specifications.',
    shortDescription: 'Bespoke modern independent luxury villas and custom architectural estates.',
    image: CURATED_IMAGES.luxuryVilla.url,
    capabilities: [
      'Custom Villa Architectural Design',
      'Natural Contour Landscape Integration',
      'Turnkey Interior Fit-out Execution',
      'Solar & Smart Automation Integration',
    ],
    featured: true,
  },
  {
    id: 'srv-005',
    num: '05',
    code: 'SRV-05',
    title: 'COMMERCIAL PROPERTY',
    category: 'real-estate',
    description:
      'Grade-A office towers, retail plazas, and industrial logistics parks with high rental yields and long-term institutional leases.',
    shortDescription: 'Grade-A office towers, retail plazas, and high-yield commercial real estate.',
    image: CURATED_IMAGES.commercialHub.url,
    capabilities: [
      'Grade-A Corporate Office Space',
      'Retail & High-Street Plazas',
      'Institutional Tenant Pre-Leases',
      'LEED Green Building Certification',
    ],
    featured: true,
  },
  {
    id: 'srv-006',
    num: '06',
    code: 'SRV-06',
    title: 'BUILDING CONSTRUCTION',
    category: 'construction',
    description:
      'End-to-end IS-code certified civil construction, structural steel engineering, and post-tensioned RCC framing under single-point accountability.',
    shortDescription: 'End-to-end IS-code certified civil construction & RCC structural framing.',
    image: CURATED_IMAGES.constructionSite.url,
    capabilities: [
      'IS-Code Certified RCC & Structural Steel',
      '28-Day Concrete Cube Strength Lab Audit',
      'Material Testing & Quality Assurance',
      'Single-Point PMC Project Supervision',
    ],
    featured: true,
  },
  {
    id: 'srv-007',
    num: '07',
    code: 'SRV-07',
    title: 'RENOVATION',
    category: 'construction',
    description:
      'Structural refurbishment, heritage restoration, seismic retrofitting, and high-end interior architectural modernization.',
    shortDescription: 'Structural refurbishment, facade retrofitting, and high-end interior modernization.',
    image: CURATED_IMAGES.interiorRenovation.url,
    capabilities: [
      'Structural Retrofitting & Carbon-Wrap',
      'Interior Fit-out & Travertine Marble',
      'Curtain Wall Facade Modernization',
      '5-Bar Hydro Plumbing Overhaul',
    ],
    featured: false,
  },
  {
    id: 'srv-008',
    num: '08',
    code: 'SRV-08',
    title: 'PROPERTY DEVELOPMENT',
    category: 'advisory',
    description:
      'Joint-venture development, master-planning CAD blueprints, municipal approvals, and institutional real estate capital deployment.',
    shortDescription: 'Joint-venture development, master-planning, and capital deployment.',
    image: CURATED_IMAGES.architecturalDrawing.url,
    capabilities: [
      'Joint Venture Development Agreements',
      'Parametric 3D BIM Master-Planning',
      'Capital Deployment & Financial BOQ',
      'Municipal & RERA Sanction Coordination',
    ],
    featured: false,
  },
];

// Backwards compatibility export
export const SERVICES_LIST = SERVICES_DATA;
