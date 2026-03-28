// India Agricultural Land Unit Converter
// Conversion logic for Indian land measurements

(() => {
  // Conversion factors (all to square meters as base)
  const CONVERSIONS = {
    acre: 4046.86,
    hectare: 10000,
    kanal: 1012.85,
    marla: 25.29,
    guntha: 101,
    cent: 40.4,
    biswa: 2023.45,
    sqft: 0.092903,
    sqm: 1
  };

  // State-specific Bigha sizes (in square meters)
  const BIGHA_BY_STATE = {
    "uttar_pradesh": 1618.74,      // 0.4 acres
    "punjab": 5043.2,              // 1.25 acres
    "rajasthan": 2023.45,          // 0.5 acres
    "haryana": 5043.2,             // 1.25 acres
    "madhya_pradesh": 2529.75,     // 0.625 acres
    "karnataka": 2023.45,          // 0.5 acres
    "maharashtra": 6070.6,         // 1.5 acres
    "bihar": 1618.74,              // 0.4 acres
    "tamil_nadu": 2529.75,         // 0.625 acres
    "west_bengal": 1428.4,         // 0.353 acres
    "default": 2500                // Average
  };

  // Get Bigha conversion value based on state
  function getBighaValue(state = "default") {
    return BIGHA_BY_STATE[state] || BIGHA_BY_STATE["default"];
  }

  // Format number to 2 decimal places
  function toFixedNumber(n, decimals = 2) {
    return Number.parseFloat(n).toFixed(decimals);
  }

  // Main conversion function
  function convertValue(value, fromUnit, toUnit, state = "default") {
    if (!value || isNaN(value)) {
      return null;
    }

    value = parseFloat(value);

    // Get conversion factors
    let fromFactor = CONVERSIONS[fromUnit];
    let toFactor = CONVERSIONS[toUnit];

    // Handle Bigha (state-specific)
    if (fromUnit === "bigha") {
      fromFactor = getBighaValue(state);
    }
    if (toUnit === "bigha") {
      toFactor = getBighaValue(state);
    }

    if (!fromFactor || !toFactor) {
      return null;
    }

    // Convert to base unit (sq m) then to target unit
    const sqm = value * fromFactor;
    const result = sqm / toFactor;

    return result;
  }

  // Get all conversion results from one unit
  function convertAndRender(value, unit, state = "default") {
    const units = [
      { key: "acre", label: "Acre" },
      { key: "hectare", label: "Hectare" },
      { key: "bigha", label: "Bigha" },
      { key: "kanal", label: "Kanal" },
      { key: "marla", label: "Marla" },
      { key: "guntha", label: "Guntha" },
      { key: "cent", label: "Cent" },
      { key: "biswa", label: "Biswa" },
      { key: "sqft", label: "Square Feet" },
      { key: "sqm", label: "Square Meters" }
    ];

    const results = {};
    units.forEach(u => {
      const converted = convertValue(value, unit, u.key, state);
      if (converted !== null) {
        results[u.label] = converted;
      }
    });

    return results;
  }

  // DOM elements
  const valueInput = document.getElementById("value");
  const unitSelect = document.getElementById("unit");
  const stateSelect = document.getElementById("state");
  const resultsDiv = document.getElementById("results");
  const quickFillButtons = document.querySelectorAll(".quick-fill");

  // Accessibility
  const statusEl = document.createElement("div");
  statusEl.setAttribute("aria-live", "polite");
  statusEl.className = "sr-only";
  document.body.appendChild(statusEl);

  // Focus on load
  window.addEventListener("load", () => {
    if (!valueInput || !unitSelect) return;
    if (valueInput.value.trim()) {
      renderConversions();
    }
    valueInput.focus();
  });

  // Debounce helper
  function debounce(fn, wait = 150) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  // Animate counting effect
  function animateCount(spanEl, targetNum) {
    const displayDecimals = targetNum < 1 ? 4 : 2;
    const start = performance.now();
    const duration = 400;

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;
      spanEl.textContent = spanEl.textContent.split(":")[0] + ": " + toFixedNumber(current, displayDecimals);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        spanEl.textContent = spanEl.textContent.split(":")[0] + ": " + Number(targetNum).toFixed(displayDecimals);
      }
    }
    requestAnimationFrame(step);
  }

  // Render conversions
  function renderConversions() {
    const raw = valueInput.value.trim();
    const value = parseFloat(raw);
    const unit = unitSelect.value;
    const state = stateSelect ? stateSelect.value : "default";

    if (!raw || isNaN(value)) {
      resultsDiv.innerHTML = "";
      return;
    }

    const results = convertAndRender(value, unit, state);

    const frag = document.createDocumentFragment();
    Object.entries(results).forEach(([label, num]) => {
      const outer = document.createElement("div");
      outer.className =
        "result-row relative flex justify-between items-center p-3 rounded-md bg-gray-50 hover:bg-green-50 transition-colors animate-fadeIn";

      const span = document.createElement("span");
      span.className = "result-label font-semibold text-gray-900";
      span.dataset.target = Number(num).toString();
      span.textContent = `${label}: ${toFixedNumber(0, 2)}`;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "copy-btn bg-green-600 text-white text-xs px-3 py-1 rounded-md hover:bg-green-700 active:scale-95 transition-all font-semibold";
      btn.setAttribute("aria-label", `Copy ${label} value`);
      btn.dataset.value = Number(num).toFixed(2);
      btn.textContent = "Copy";

      outer.appendChild(span);
      outer.appendChild(btn);
      frag.appendChild(outer);

      animateCount(span, Number(num));
    });

    resultsDiv.innerHTML = "";
    resultsDiv.appendChild(frag);
  }

  // Copy to clipboard
  resultsDiv.addEventListener("click", (e) => {
    const btn = e.target.closest(".copy-btn");
    if (!btn) return;
    const val = btn.dataset.value || "";
    if (!val) return;

    navigator.clipboard?.writeText(val)
      .then(() => {
        flashCopySuccess(btn, `Copied ${val}`);
      })
      .catch(() => {
        fallbackCopy(val, btn);
      });
  });

  function fallbackCopy(text, btn) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      flashCopySuccess(btn, `Copied ${text}`);
    } catch {
      flashCopyFailure(btn, "Copy failed");
    } finally {
      ta.remove();
    }
  }

  function flashCopySuccess(btn, message = "Copied!") {
    const parent = btn.parentElement;
    if (!parent) return;
    parent.classList.add("bg-green-200");
    setTimeout(() => parent.classList.remove("bg-green-200"), 800);

    const tip = document.createElement("span");
    tip.className = "copy-tip absolute -top-8 text-xs px-2 py-1 rounded bg-green-600 text-white whitespace-nowrap";
    tip.textContent = message;
    parent.style.position = parent.style.position || "relative";
    parent.appendChild(tip);
    setTimeout(() => tip.remove(), 900);

    statusEl.textContent = message;
  }

  function flashCopyFailure(btn, message = "Copy failed") {
    const parent = btn.parentElement;
    if (!parent) return;
    parent.classList.add("bg-red-200");
    setTimeout(() => parent.classList.remove("bg-red-200"), 900);
    statusEl.textContent = message;
  }

  // Event listeners
  const runConvert = debounce(renderConversions, 120);
  if (valueInput) {
    valueInput.addEventListener("input", runConvert);
  }
  if (unitSelect) {
    unitSelect.addEventListener("change", renderConversions);
  }
  if (stateSelect) {
    stateSelect.addEventListener("change", renderConversions);
  }

  // Quick-fill buttons
  quickFillButtons.forEach((button) => {
    button.addEventListener("click", () => {
      valueInput.value = button.dataset.value || "";
      unitSelect.value = button.dataset.unit || "acre";
      if (button.dataset.state && stateSelect) {
        stateSelect.value = button.dataset.state;
      }
      renderConversions();
      valueInput.focus();
    });
  });

  // Expose functions globally
  window.convertValue = convertValue;
  window.convertAndRender = convertAndRender;
})();
