export interface CompanyStat {
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export const COMPANY_STATS: CompanyStat[] = [
  {
    label: "Total Area Developed",
    value: "14.2M+",
    subtext: "Square feet delivered across North & West India",
    iconName: "Building2",
  },
  {
    label: "Land Bank Portfolio",
    value: "2,400+",
    subtext: "Acres of clear-title freehold & strategic land bank",
    iconName: "Trees",
  },
  {
    label: "RERA Verified Projects",
    value: "48+",
    subtext: "Residential towers, gated villas & commercial hubs",
    iconName: "ShieldCheck",
  },
  {
    label: "Satisfied Families & Investors",
    value: "8,500+",
    subtext: "Homeowners, NRI investors & corporate clients",
    iconName: "Users",
  },
  {
    label: "On-Time Delivery Track Record",
    value: "99.4%",
    subtext: "Zero litigation, strict schedule & structural guarantees",
    iconName: "Award",
  },
];

export const COMPANY_MISSION = {
  vision: "To set the gold standard in Indian real estate and construction through transparent legal due diligence, architectural precision, and landmark land development across India.",
  mission: "Empowering land owners, homebuyers, and commercial enterprises with uncompromised engineering quality, RERA compliant transactions, and end-to-end turnkey project execution.",
  coreValues: [
    {
      title: "100% Clear Title Assurance",
      description: "Rigorous legal vetting, CLU verification, and hassle-free registry transfer for every land and property transaction.",
    },
    {
      title: "Turnkey Engineering Mastery",
      description: "From architectural drawings and IS-code structural design to handover, managed by expert civil engineers.",
    },
    {
      title: "PAN-India Strategic Footprint",
      description: "Active projects and advisory teams in NCR, Mumbai MMR, Bengaluru, Hyderabad, Goa, Jaipur, and Chandigarh.",
    },
    {
      title: "Vastu & Sustainable Architecture",
      description: "Fusing ancient Vastu principles with contemporary green building certifications and energy-efficient design.",
    },
  ],
};
