/**
 * India Agricultural Land Unit Converter - Senior Implementation
 * 
 * Features:
 * - High-Precision Unit Conversions
 * - State-Specific Bigha Variance Calculation
 * - Engineering Visualizer (Live Plot Scaling)
 * - LocalStorage History (Recent Conversions)
 * - Accessibility & Performance Optimized
 */

(() => {
  'use strict';

  // Engineering Constants
  const CONVERSIONS = {
    acre: 4046.8564224,    // Standard international acre
    hectare: 10000.0,      // SI standard
    kanal: 1011.7141,      // Standardized Kanal (0.25 acre)
    marla: 25.29285,       // Standardized Marla (1/20 kanal)
    guntha: 101.17141,     // Standardized Guntha (1/40 acre)
    cent: 40.46856,        // Standardized Cent (1/100 acre)
    biswa: 126.46426,      // Standardized Biswa (North India)
    sqft: 0.09290304,      // International survey foot
    sqm: 1.0,              // Base unit
  };

  // State-Specific Bigha Reference (sq meters)
  const STATE_BIGHA = {
    "uttar_pradesh": 2529.3,       // Pucca Bigha (standard UP)
    "punjab": 1011.71,             // standard in Punjab/Haryana (0.25 acre)
    "rajasthan": 1618.7,           // standard Rajasthan
    "haryana": 1011.71,            // standard Haryana
    "madhya_pradesh": 1348.28,     // standard MP
    "karnataka": 1011.71,          // standard Karnataka
    "maharashtra": 1011.71,        // standard Maharashtra
    "bihar": 2529.3,               // standard Bihar
    "tamil_nadu": 4046.86,         // (1 Acre)
    "west_bengal": 1337.8,         // standard West Bengal
    "default": 2500.0              // Average
  };

  const HISTORY_LIMIT = 5;

  // State Management
  let appState = {
    value: 1,
    fromUnit: 'acre',
    selectedState: 'uttar_pradesh',
    history: []
  };

  // DOM Cache
  const UI = {
    input: document.getElementById('valInput'),
    unit: document.getElementById('unitSelect'),
    state: document.getElementById('stateSelect'),
    bentoGrid: document.getElementById('comparisonGrid'),
    historyList: document.getElementById('historyList'),
    visualizer: document.getElementById('landPlot'),
    plotLabel: document.getElementById('plotLabel')
  };

  // Initializer
  function init() {
    loadHistory();
    attachListeners();
    updateUI();
  }

  function attachListeners() {
    UI.input.addEventListener('input', (e) => handleUpdate('value', e.target.value));
    UI.unit.addEventListener('change', (e) => handleUpdate('fromUnit', e.target.value));
    UI.state.addEventListener('change', (e) => handleUpdate('selectedState', e.target.value));
    
    // Quick-fill delegates
    document.querySelectorAll('[data-quick-val]').forEach(btn => {
      btn.addEventListener('click', () => {
        UI.input.value = btn.dataset.quickVal;
        handleUpdate('value', btn.dataset.quickVal);
      });
    });
  }

  function handleUpdate(key, val) {
    if (key === 'value') {
      const parsed = parseFloat(val);
      appState.value = isNaN(parsed) ? 0 : parsed;
    } else {
      appState[key] = val;
    }
    
    updateUI();
    debounceSaveToHistory();
  }

  function updateUI() {
    const results = calculateAll();
    renderBento(results);
    renderVisualizer(results);
  }

  function calculateAll() {
    // 1. Get Base Unit (Square Meters)
    let baseValue = appState.value;
    let factor = appState.fromUnit === 'bigha' 
      ? (STATE_BIGHA[appState.selectedState] || STATE_BIGHA['default'])
      : CONVERSIONS[appState.fromUnit];
    
    const sqmTotal = baseValue * factor;

    // 2. Generate Results for each unit
    const units = [
      { key: 'acre', label: 'Acre' },
      { key: 'hectare', label: 'Hectare' },
      { key: 'bigha', label: 'Bigha' },
      { key: 'kanal', label: 'Kanal' },
      { key: 'marla', label: 'Marla' },
      { key: 'guntha', label: 'Guntha' },
      { key: 'cent', label: 'Cent' },
      { key: 'biswa', label: 'Biswa' },
      { key: 'sqft', label: 'Square Feet' },
      { key: 'sqm', label: 'Square Meters' }
    ];

    return units.map(u => {
      let targetFactor = u.key === 'bigha'
        ? (STATE_BIGHA[appState.selectedState] || STATE_BIGHA['default'])
        : CONVERSIONS[u.key];
      
      const val = sqmTotal / targetFactor;
      return { ...u, value: val };
    });
  }

  function renderBento(results) {
    UI.bentoGrid.innerHTML = results.map(res => `
      <div class="metric-card animate-in">
        <div class="metric-header">
          <span class="metric-label">${res.label}</span>
          ${res.key === 'acre' || res.key === 'hectare' ? '<span class="metric-badge">International</span>' : ''}
          ${res.key === 'bigha' ? `<span class="metric-badge">${appState.selectedState.replace('_', ' ')}</span>` : ''}
        </div>
        <div class="metric-value">${formatPrecision(res.value)}</div>
      </div>
    `).join('');
  }

  function renderVisualizer(results) {
    const acreVal = results.find(r => r.key === 'acre').value;
    
    // Scale the rectangle relative to 1 Acre (base box is 80% of container)
    // Map value 0-5 to dimension 0-100%
    const scale = Math.min(Math.sqrt(acreVal), 5) / 5; // sqrt because area scales by squares
    const size = 30 + (scale * 200); // base 30px, max ~230px
    
    UI.visualizer.setAttribute('width', size);
    UI.visualizer.setAttribute('height', size);
    UI.plotLabel.textContent = `${formatPrecision(appState.value)} ${appState.fromUnit.charAt(0).toUpperCase() + appState.fromUnit.slice(1)}`;
  }

  function formatPrecision(num) {
    if (num === 0) return '0.00';
    if (num < 0.0001) return num.toExponential(4);
    if (num < 0.01) return num.toFixed(6);
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }

  // History Management
  let historyTimeout;
  function debounceSaveToHistory() {
    clearTimeout(historyTimeout);
    historyTimeout = setTimeout(saveToHistory, 2000);
  }

  function saveToHistory() {
    if (appState.value === 0) return;
    
    const entry = {
      val: appState.value,
      unit: appState.fromUnit,
      state: appState.selectedState,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Prevent duplicates
    if (appState.history.length > 0 && 
        appState.history[0].val === entry.val && 
        appState.history[0].unit === entry.unit) return;

    appState.history.unshift(entry);
    if (appState.history.length > HISTORY_LIMIT) appState.history.pop();
    
    localStorage.setItem('agri_history', JSON.stringify(appState.history));
    renderHistory();
  }

  function loadHistory() {
    const saved = localStorage.getItem('agri_history');
    if (saved) {
      appState.history = JSON.parse(saved);
      renderHistory();
    }
  }

  function renderHistory() {
    UI.historyList.innerHTML = appState.history.map((h, i) => `
      <div class="history-item" onclick="loadHistoryItem(${i})">
        <div class="history-text">${h.val} ${h.unit}</div>
        <div class="history-meta">${h.timestamp}</div>
      </div>
    `).join('');
  }

  // Exposed to global for click handler
  window.loadHistoryItem = (index) => {
    const h = appState.history[index];
    UI.input.value = h.val;
    UI.unit.value = h.unit;
    UI.state.value = h.state;
    
    appState.value = h.val;
    appState.fromUnit = h.unit;
    appState.selectedState = h.state;
    updateUI();
  };

  // App Start
  document.addEventListener('DOMContentLoaded', init);

})();
