import { useEffect, useMemo, useState } from 'react';
import { BIGHA_BY_STATE, STATES, UNITS, formatValue, getRelativePlotSize, type StateKey, type UnitKey } from './lib/conversions';
import { getDashboardMetrics, useConverterStore } from './store/converterStore';

const guideLinks = [
  {
    href: '/india-agri-converter/guides/bigha-to-acre/',
    title: 'Bigha to Acre',
    description: 'North India conversion guide with state nuance.'
  },
  {
    href: '/india-agri-converter/guides/bigha-to-hectare/',
    title: 'Bigha to Hectare',
    description: 'Metric standard for land records and surveys.'
  },
  {
    href: '/india-agri-converter/guides/bigha-to-square-meter/',
    title: 'Bigha to Square Meter',
    description: 'Precise SI conversion for technical planning.'
  },
  {
    href: '/india-agri-converter/guides/kanal-to-acre/',
    title: 'Kanal to Acre',
    description: 'Punjab and Haryana property unit reference.'
  },
  {
    href: '/india-agri-converter/guides/guntha-to-acre/',
    title: 'Guntha to Acre',
    description: 'Central and South India land conversion guide.'
  }
];

function relativeTime(timestamp: number) {
  const minutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return `${hours}h ago`;
}

export default function App() {
  const { value, unit, state, history, setValue, setUnit, setState, loadHistory, saveCurrentToHistory, restoreHistoryItem } = useConverterStore();
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    const timer = window.setTimeout(() => saveCurrentToHistory(), 1200);
    return () => window.clearTimeout(timer);
  }, [value, unit, state, saveCurrentToHistory]);

  const metrics = useMemo(() => getDashboardMetrics(value, unit, state), [value, unit, state]);
  const plotSize = getRelativePlotSize(metrics.acre);
  const stateVariance = ((BIGHA_BY_STATE[state] / BIGHA_BY_STATE.uttar_pradesh) * 100).toFixed(0);

  return (
    <div className="shell">
      <aside className={`sidebar ${mobileControlsOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__top">
          <div className="brand-mark" aria-hidden="true">IA</div>
          <div>
            <p className="eyebrow">Professional Land Engine</p>
            <h1 className="brand-title">India Agri Converter</h1>
            <p className="brand-copy">Built for surveyors, brokers and operators who need clean answers fast.</p>
          </div>
        </div>

        <div className="panel panel--control">
          <label className="field-label" htmlFor="value-input">Input value</label>
          <input
            id="value-input"
            className="field-input field-input--mono"
            type="number"
            value={Number.isFinite(value) ? value : ''}
            step="any"
            onChange={(event) => setValue(Number.parseFloat(event.target.value) || 0)}
            placeholder="Enter land value"
          />

          <label className="field-label" htmlFor="unit-input">Measurement unit</label>
          <select id="unit-input" className="field-input" value={unit} onChange={(event) => setUnit(event.target.value as UnitKey)}>
            {UNITS.map((item) => (
              <option key={item.key} value={item.key}>{item.label}</option>
            ))}
          </select>

          <label className="field-label" htmlFor="state-input">Bigha profile</label>
          <select id="state-input" className="field-input" value={state} onChange={(event) => setState(event.target.value as StateKey)}>
            {STATES.map((item) => (
              <option key={item.key} value={item.key}>{item.label}</option>
            ))}
          </select>

          <div className="quick-row">
            {[1, 5, 10, 25].map((quick) => (
              <button key={quick} className="quick-chip" type="button" onClick={() => setValue(quick)}>{quick}</button>
            ))}
          </div>
        </div>

        <div className="panel panel--history">
          <div className="panel-header">
            <h2>Recent runs</h2>
            <span>{history.length}/6</span>
          </div>
          <div className="history-list">
            {history.length === 0 ? (
              <p className="empty-text">Conversions you run here stay available for quick recall.</p>
            ) : history.map((item) => (
              <button key={item.id} type="button" className="history-item" onClick={() => restoreHistoryItem(item.id)}>
                <span>
                  <strong>{item.value}</strong> {item.unit}
                </span>
                <small>{relativeTime(item.timestamp)}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-note">
          <p className="eyebrow">Current state profile</p>
          <strong>{STATES.find((item) => item.key === state)?.label}</strong>
          <p>1 Bigha = {formatValue(metrics.localBighaSqm)} sq m</p>
        </div>
      </aside>

      <main className="workspace">
        <header className="workspace__header">
          <div>
            <p className="eyebrow">Conversion workspace</p>
            <h2>Senior-grade land measurement dashboard</h2>
            <p className="header-copy">Fast calculations, clear comparisons, and enough visual context to trust the answer.</p>
          </div>
          <button type="button" className="mobile-toggle" onClick={() => setMobileControlsOpen((open) => !open)}>
            {mobileControlsOpen ? 'Close controls' : 'Open controls'}
          </button>
        </header>

        <section className="hero-strip">
          <article className="hero-card hero-card--lead">
            <p className="eyebrow">Current input</p>
            <h3>{formatValue(value)} {UNITS.find((item) => item.key === unit)?.label}</h3>
            <p>Profiled against <strong>{STATES.find((item) => item.key === state)?.label}</strong> for region-aware bigha math.</p>
          </article>
          <article className="hero-card">
            <p className="eyebrow">Bigha variance</p>
            <h3>{stateVariance}%</h3>
            <p>Compared with Uttar Pradesh baseline sizing.</p>
          </article>
          <article className="hero-card">
            <p className="eyebrow">Square meters</p>
            <h3>{formatValue(metrics.sqm)}</h3>
            <p>Canonical value used for every downstream conversion.</p>
          </article>
        </section>

        <section className="card-grid">
          {metrics.results.map((result) => (
            <article key={result.key} className={`metric-card ${result.key === unit ? 'metric-card--active' : ''}`}>
              <div className="metric-card__top">
                <div>
                  <p className="metric-label">{result.label}</p>
                  {result.family ? <span className="metric-family">{result.family}</span> : null}
                </div>
                {result.key === 'bigha' ? <span className="metric-pill">{STATES.find((item) => item.key === state)?.label}</span> : null}
              </div>
              <div className="metric-value">{formatValue(result.value)}</div>
            </article>
          ))}
        </section>

        <section className="visual-section">
          <div className="visual-card visual-card--plot">
            <div className="panel-header">
              <h2>Plot scale visualizer</h2>
              <span>{formatValue(metrics.acre)} acre equivalent</span>
            </div>
            <div className="plot-stage">
              <div className="plot-grid" />
              <svg viewBox="0 0 420 320" className="plot-svg" role="img" aria-label="Scaled land plot visualization">
                <rect x={(420 - plotSize) / 2} y={(320 - plotSize) / 2} width={plotSize} height={plotSize} rx="12" className="plot-shape" />
              </svg>
              <div className="plot-scale-label">Reference scale: 1 acre base</div>
            </div>
          </div>

          <div className="visual-card visual-card--insight">
            <div className="panel-header">
              <h2>Operating insight</h2>
              <span>Region-aware</span>
            </div>
            <ul className="insight-list">
              <li>
                <strong>State-driven Bigha logic</strong>
                <span>Switching profiles updates every Bigha-derived result instantly.</span>
              </li>
              <li>
                <strong>Engineering precision</strong>
                <span>Small values retain precision, large values stay readable in Indian locale formatting.</span>
              </li>
              <li>
                <strong>Operational memory</strong>
                <span>Recent conversions persist locally so you can revisit site checks quickly.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="guides-section" id="guides">
          <div className="panel-header">
            <h2>Reference guides</h2>
            <span>SEO + explainers</span>
          </div>
          <div className="guide-grid">
            {guideLinks.map((guide) => (
              <a key={guide.href} className="guide-card" href={guide.href}>
                <p className="eyebrow">Guide</p>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
