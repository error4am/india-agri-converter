export type UnitKey =
  | 'acre'
  | 'hectare'
  | 'bigha'
  | 'kanal'
  | 'marla'
  | 'guntha'
  | 'cent'
  | 'biswa'
  | 'sqft'
  | 'sqm';

export type StateKey =
  | 'uttar_pradesh'
  | 'punjab'
  | 'rajasthan'
  | 'haryana'
  | 'madhya_pradesh'
  | 'karnataka'
  | 'maharashtra'
  | 'bihar'
  | 'tamil_nadu'
  | 'west_bengal';

export const UNITS: Array<{ key: UnitKey; label: string; family?: string }> = [
  { key: 'acre', label: 'Acre', family: 'Global' },
  { key: 'hectare', label: 'Hectare', family: 'Metric' },
  { key: 'bigha', label: 'Bigha', family: 'Regional' },
  { key: 'kanal', label: 'Kanal', family: 'Regional' },
  { key: 'marla', label: 'Marla', family: 'Regional' },
  { key: 'guntha', label: 'Guntha', family: 'Regional' },
  { key: 'cent', label: 'Cent', family: 'Regional' },
  { key: 'biswa', label: 'Biswa', family: 'Regional' },
  { key: 'sqft', label: 'Square Feet', family: 'Imperial' },
  { key: 'sqm', label: 'Square Meters', family: 'SI' }
];

export const STATES: Array<{ key: StateKey; label: string }> = [
  { key: 'uttar_pradesh', label: 'Uttar Pradesh' },
  { key: 'punjab', label: 'Punjab' },
  { key: 'rajasthan', label: 'Rajasthan' },
  { key: 'haryana', label: 'Haryana' },
  { key: 'madhya_pradesh', label: 'Madhya Pradesh' },
  { key: 'karnataka', label: 'Karnataka' },
  { key: 'maharashtra', label: 'Maharashtra' },
  { key: 'bihar', label: 'Bihar' },
  { key: 'tamil_nadu', label: 'Tamil Nadu' },
  { key: 'west_bengal', label: 'West Bengal' }
];

export const CONVERSIONS: Record<Exclude<UnitKey, 'bigha'>, number> = {
  acre: 4046.8564224,
  hectare: 10000,
  kanal: 1011.7141,
  marla: 25.29285,
  guntha: 101.17141,
  cent: 40.46856,
  biswa: 126.46426,
  sqft: 0.09290304,
  sqm: 1
};

export const BIGHA_BY_STATE: Record<StateKey, number> = {
  uttar_pradesh: 2529.3,
  punjab: 1011.71,
  rajasthan: 1618.7,
  haryana: 1011.71,
  madhya_pradesh: 1348.28,
  karnataka: 1011.71,
  maharashtra: 1011.71,
  bihar: 2529.3,
  tamil_nadu: 4046.86,
  west_bengal: 1337.8
};

export type ConversionResult = {
  key: UnitKey;
  label: string;
  family?: string;
  value: number;
};

export function toSquareMeters(value: number, unit: UnitKey, state: StateKey): number {
  if (unit === 'bigha') return value * BIGHA_BY_STATE[state];
  return value * CONVERSIONS[unit];
}

export function fromSquareMeters(value: number, unit: UnitKey, state: StateKey): number {
  if (unit === 'bigha') return value / BIGHA_BY_STATE[state];
  return value / CONVERSIONS[unit];
}

export function calculateResults(value: number, unit: UnitKey, state: StateKey): ConversionResult[] {
  const sqm = toSquareMeters(value, unit, state);
  return UNITS.map((item) => ({
    ...item,
    value: fromSquareMeters(sqm, item.key, state)
  }));
}

export function formatValue(value: number): string {
  if (!Number.isFinite(value)) return '0.00';
  if (value === 0) return '0.00';
  if (Math.abs(value) < 0.0001) return value.toExponential(3);
  if (Math.abs(value) < 0.01) return value.toFixed(6);
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: value > 1000 ? 2 : 4
  });
}

export function getRelativePlotSize(acreValue: number): number {
  const normalized = Math.min(Math.sqrt(Math.max(acreValue, 0)), 6) / 6;
  return 72 + normalized * 240;
}
