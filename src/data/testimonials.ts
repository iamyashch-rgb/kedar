export interface ClientTestimonial {
  id: string;
  clientName: string;
  designation: string;
  location: string;
  projectType: string;
  rating: number;
  comment: string;
  avatar: string;
  verifiedTransaction: string;
}

export const TESTIMONIALS: ClientTestimonial[] = [
  {
    id: "test-01",
    clientName: "Rajeshwar & Meenakshi Singhania",
    designation: "NRI Investor & Industrialist",
    location: "Dubai / Gurugram",
    projectType: "Luxury Villa & Commercial Plot Buying",
    rating: 5,
    comment: "Kedar Properties made buying our Goa villa and Gurugram commercial plot effortless. As NRIs living in Dubai, their 100% legal title search, CLU documentation, and regular video drone updates gave us complete confidence.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    verifiedTransaction: "Assagao Villa & SPR Land Plot",
  },
  {
    id: "test-02",
    clientName: "Vikramaditya Rao",
    designation: "Managing Director, Apex Logistics",
    location: "Chandigarh Tri-city",
    projectType: "8.5 Acre Commercial Land Acquisition & PEB Construction",
    rating: 5,
    comment: "Acquiring industrial land with clear title and obtaining CLU approvals in Punjab usually takes months. Kedar Properties's land dealing team executed the entire acquisition and turnkey warehouse construction in record time.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    verifiedTransaction: "Airport Road Land Parcel & Turnkey PEB",
  },
  {
    id: "test-03",
    clientName: "Dr. Ananya Deshmukh",
    designation: "Chief Surgeon",
    location: "Mumbai MMR",
    projectType: "Penthouse Renovation & Turnkey Interior Execution",
    rating: 5,
    comment: "Their structural engineering precision and interior fit-out team turned our 3,800 sq.ft penthouse into an architectural masterpiece. Zero cost overruns and completed right on the promised deadline.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    verifiedTransaction: "BKC Sky Penthouse Refurbishment",
  },
];
