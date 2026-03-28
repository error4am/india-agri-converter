import { create } from 'zustand';
import { BIGHA_BY_STATE, type StateKey, type UnitKey, calculateResults } from '../lib/conversions';

type HistoryItem = {
  id: string;
  value: number;
  unit: UnitKey;
  state: StateKey;
  timestamp: number;
};

type ConverterStore = {
  value: number;
  unit: UnitKey;
  state: StateKey;
  history: HistoryItem[];
  setValue: (value: number) => void;
  setUnit: (unit: UnitKey) => void;
  setState: (state: StateKey) => void;
  loadHistory: () => void;
  saveCurrentToHistory: () => void;
  restoreHistoryItem: (id: string) => void;
};

const HISTORY_KEY = 'agri-converter-history-v2';

export const useConverterStore = create<ConverterStore>((set, get) => ({
  value: 1,
  unit: 'acre',
  state: 'uttar_pradesh',
  history: [],
  setValue: (value) => set({ value }),
  setUnit: (unit) => set({ unit }),
  setState: (state) => set({ state }),
  loadHistory: () => {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return;
    try {
      const history = JSON.parse(raw) as HistoryItem[];
      set({ history });
    } catch {
      window.localStorage.removeItem(HISTORY_KEY);
    }
  },
  saveCurrentToHistory: () => {
    const { value, unit, state, history } = get();
    if (!value) return;
    const next: HistoryItem = {
      id: `${value}-${unit}-${state}`,
      value,
      unit,
      state,
      timestamp: Date.now()
    };
    const merged = [next, ...history.filter((item) => item.id !== next.id)].slice(0, 6);
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(merged));
    set({ history: merged });
  },
  restoreHistoryItem: (id) => {
    const found = get().history.find((item) => item.id === id);
    if (!found) return;
    set({ value: found.value, unit: found.unit, state: found.state });
  }
}));

export function getDashboardMetrics(value: number, unit: UnitKey, state: StateKey) {
  const results = calculateResults(value, unit, state);
  const sqm = results.find((item) => item.key === 'sqm')?.value ?? 0;
  const acre = results.find((item) => item.key === 'acre')?.value ?? 0;
  const localBighaSqm = BIGHA_BY_STATE[state];
  return {
    results,
    sqm,
    acre,
    localBighaSqm
  };
}
