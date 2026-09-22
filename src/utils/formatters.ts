export type AreaUnit = 'sq.ft' | 'Sq. Yds' | 'Acres' | 'Bigha' | 'Guntha';

/**
 * Formats Rupee amounts into standard Indian Real Estate notation (Lakhs & Crores)
 * e.g., 67500000 -> "₹6.75 Cr"
 * e.g., 8500000 -> "₹85 Lakhs"
 * e.g., 450000 -> "₹4.50 Lakhs"
 */
export function formatIndianCurrency(amount: number): string {
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `₹${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(2)} Lakhs`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats plot/built-up sizes with commas and unit string
 */
export function formatArea(size: number, unit: AreaUnit): string {
  const formattedNumber = new Intl.NumberFormat('en-IN').format(size);
  return `${formattedNumber} ${unit}`;
}

/**
 * Abbreviates numbers for counters & statistics (e.g., 14200000 -> "14.2M+")
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M+`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K+`;
  }
  return `${num}`;
}
