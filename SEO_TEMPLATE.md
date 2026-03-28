# SEO Template for Landing Pages

This template ensures consistent SEO optimization across all landing pages.

## Page Variables to Customize

```
PRIMARY_KEYWORD = "bigha to acre"  // Change per page
MODIFIER = "Instant & Free"
STATE = "Uttar Pradesh"            // If applicable
CONVERSION_RATIO = "0.4"
FAQ_QUESTION = "How many acres is 1 Bigha?"
FAQ_ANSWER = "1 Bigha equals 0.4 acres in Uttar Pradesh"
```

---

## HTML Head Section

```html
<!-- SEO Tags -->
<title>{PRIMARY_KEYWORD} Converter - {MODIFIER}</title>
<!-- Length: 55-60 characters -->

<meta name="description" content="Convert {PRIMARY_KEYWORD} instantly. Get the exact formula, state-specific examples and our free calculator for quick plot size checks.">
<!-- Length: 155-160 characters -->

<meta name="keywords" content="{PRIMARY_KEYWORD}, {PRIMARY_KEYWORD} converter, {PRIMARY_KEYWORD} {STATE}, Indian land units">

<meta name="robots" content="index, follow">

<link rel="canonical" href="https://error4am.github.io/india-agri-converter/guides/{PRIMARY_KEYWORD_SLUG}/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="{PRIMARY_KEYWORD} Converter - {MODIFIER}">
<meta property="og:description" content="Convert {PRIMARY_KEYWORD} instantly with our free calculator, formula and examples.">
<meta property="og:url" content="https://error4am.github.io/india-agri-converter/guides/{PRIMARY_KEYWORD_SLUG}/">
<meta property="og:image" content="https://error4am.github.io/india-agri-converter/og-image.png">
<meta property="og:site_name" content="India Agri Converter">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{PRIMARY_KEYWORD} Converter">
<meta name="twitter:description" content="Free instant conversion calculator">
<meta name="twitter:image" content="https://error4am.github.io/india-agri-converter/og-image.png">

<!-- Structured Data / Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{FAQ_QUESTION}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{FAQ_ANSWER}"
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert {PRIMARY_KEYWORD}?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiply the value by the conversion factor. For example: 1 {PRIMARY_KEYWORD.split(' ')[0]} = {CONVERSION_RATIO} {PRIMARY_KEYWORD.split(' ')[2]}"
      }
    }
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://error4am.github.io/india-agri-converter/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{PRIMARY_KEYWORD}",
      "item": "https://error4am.github.io/india-agri-converter/guides/{PRIMARY_KEYWORD_SLUG}/"
    }
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{PRIMARY_KEYWORD} Converter - {MODIFIER}",
  "description": "Learn how to convert {PRIMARY_KEYWORD} with our free calculator and formula guide.",
  "image": "https://error4am.github.io/india-agri-converter/og-image.png",
  "author": {
    "@type": "Organization",
    "name": "India Agri Converter"
  },
  "datePublished": "2026-03-28",
  "dateModified": "2026-03-28"
}
</script>
```

---

## Page Body Structure

### Hero Section (50-75 words)

```html
<section class="hero">
  <div class="breadcrumb">
    <a href="/">Home</a> / {PRIMARY_KEYWORD}
  </div>
  
  <h1>How to Convert {PRIMARY_KEYWORD} - Instant Calculator</h1>
  
  <p class="lead">
    Need to convert {PRIMARY_KEYWORD}? This page gives you the exact conversion,
    state-specific examples, and a free calculator to quickly check plot sizes.
  </p>
</section>
```

**SEO Notes:**
- H1 includes primary keyword
- Includes benefit ("How to...")
- Defines what you'll get ("exact conversion, examples, calculator")

---

### Quick Answer Section (25-50 words)

```html
<section class="quick-answer">
  <h2>Quick Answer</h2>
  <p>
    <strong>1 {PRIMARY_KEYWORD.split(' ')[0]} = {CONVERSION_RATIO} {PRIMARY_KEYWORD.split(' ')[2]}</strong>
    {STATE ? `in ${STATE}` : 'on average'}.
  </p>
  <p>The conversion varies by state due to regional measurement standards.</p>
</section>
```

**SEO Notes:**
- Answers the search query in first paragraph
- Acknowledges state variance (unique value prop)

---

### Converter Tool Section (with Form)

```html
<section class="converter-tool">
  <h2>Convert {PRIMARY_KEYWORD}</h2>
  
  <div class="converter-form">
    <input type="number" id="value" placeholder="Enter value" value="1">
    <select id="unit">
      <option value="bigha">Bigha</option>
      <option value="acre">Acre</option>
      <option value="hectare">Hectare</option>
      <!-- Add other units -->
    </select>
    
    <select id="state" {STATE ? 'required' : ''}>
      <option value="">Select State (for accurate Bigha)</option>
      <option value="uttar_pradesh">Uttar Pradesh</option>
      <option value="punjab">Punjab</option>
      <!-- Add other states -->
    </select>
  </div>
  
  <div id="results" class="results">
    <!-- Results populate here via converter.js -->
  </div>
  
  <div class="quick-fill">
    <button class="quick-fill-btn" data-value="1" data-unit="{PRIMARY_KEYWORD.split(' ')[0].toLowerCase()}">
      1 {PRIMARY_KEYWORD.split(' ')[0]}
    </button>
    <button class="quick-fill-btn" data-value="5" data-unit="{PRIMARY_KEYWORD.split(' ')[0].toLowerCase()}">
      5 {PRIMARY_KEYWORD.split(' ')[0]}
    </button>
    <button class="quick-fill-btn" data-value="10" data-unit="{PRIMARY_KEYWORD.split(' ')[0].toLowerCase()}">
      10 {PRIMARY_KEYWORD.split(' ')[0]}
    </button>
  </div>
</section>
```

---

### Formula Explanation Section (75-100 words)

```html
<section class="formula">
  <h2>{PRIMARY_KEYWORD} Conversion Formula</h2>
  
  <p>
    The conversion formula for {PRIMARY_KEYWORD} is simple:
  </p>
  
  <div class="formula-box">
    <code>{PRIMARY_KEYWORD.split(' ')[0]} × {CONVERSION_RATIO} = {PRIMARY_KEYWORD.split(' ')[2]}</code>
  </div>
  
  <p>
    For example, if you have 5 {PRIMARY_KEYWORD.split(' ')[0]} and want to know how many 
    {PRIMARY_KEYWORD.split(' ')[2]} that is:
  </p>
  
  <p>
    <code>5 × {CONVERSION_RATIO} = {5 * CONVERSION_RATIO} {PRIMARY_KEYWORD.split(' ')[2]}</code>
  </p>
  
  <p>
    This formula works because {PRIMARY_KEYWORD.split(' ')[0]} and 
    {PRIMARY_KEYWORD.split(' ')[2]} are both measures of land area, just in different units.
  </p>
</section>
```

**SEO Notes:**
- H2 includes secondary keyword
- Explains the "why" behind conversion
- Provides concrete example

---

### Examples Section (100-150 words)

```html
<section class="examples">
  <h2>Common {PRIMARY_KEYWORD} Examples</h2>
  
  <table class="examples-table">
    <thead>
      <tr>
        <th>{PRIMARY_KEYWORD.split(' ')[0]}</th>
        <th>{PRIMARY_KEYWORD.split(' ')[2]}</th>
        <th>Common Use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1 {PRIMARY_KEYWORD.split(' ')[0]}</td>
        <td>{CONVERSION_RATIO} {PRIMARY_KEYWORD.split(' ')[2]}</td>
        <td>Small residential plot</td>
      </tr>
      <tr>
        <td>5 {PRIMARY_KEYWORD.split(' ')[0]}</td>
        <td>{5 * CONVERSION_RATIO} {PRIMARY_KEYWORD.split(' ')[2]}</td>
        <td>Standard house plot</td>
      </tr>
      <tr>
        <td>10 {PRIMARY_KEYWORD.split(' ')[0]}</td>
        <td>{10 * CONVERSION_RATIO} {PRIMARY_KEYWORD.split(' ')[2]}</td>
        <td>Farm or larger property</td>
      </tr>
    </tbody>
  </table>
  
  <p>
    These are the most common sizes you'll encounter when buying or selling land in India.
  </p>
</section>
```

**SEO Notes:**
- Table provides scannable content (Google loves tables)
- Includes real-world context
- Relevant to search intent

---

### State Variations Section (100-150 words)

```html
<section class="state-variations">
  <h2>State-Specific {PRIMARY_KEYWORD.split(' ')[0]} Sizes</h2>
  
  <p>
    One unique challenge with converting {PRIMARY_KEYWORD} is that the {PRIMARY_KEYWORD.split(' ')[0]} 
    size varies significantly by state in India. This is because land measurements were historically 
    standardized differently in each region.
  </p>
  
  <div class="state-table">
    <table>
      <thead>
        <tr>
          <th>State</th>
          <th>{PRIMARY_KEYWORD.split(' ')[0]} Size (Sq M)</th>
          <th>In {PRIMARY_KEYWORD.split(' ')[2]}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Uttar Pradesh</td>
          <td>1,618.74</td>
          <td>0.4</td>
        </tr>
        <tr>
          <td>Punjab</td>
          <td>5,043.2</td>
          <td>1.25</td>
        </tr>
        <tr>
          <td>Rajasthan</td>
          <td>2,023.45</td>
          <td>0.5</td>
        </tr>
        <!-- Add other states -->
      </tbody>
    </table>
  </div>
  
  <p>
    Always check your state's specific size when doing important conversions for property transactions.
  </p>
</section>
```

**SEO Notes:**
- Addresses search intent directly
- Explains unique value (state variations)
- Provides comprehensive reference table

---

### FAQ Section (150-200 words)

```html
<section class="faq">
  <h2>Frequently Asked Questions</h2>
  
  <div class="faq-item">
    <h3>{FAQ_QUESTION}</h3>
    <p>{FAQ_ANSWER}</p>
  </div>
  
  <div class="faq-item">
    <h3>How do I use this converter?</h3>
    <p>
      Enter the value you want to convert, select the unit (Bigha, Acre, etc.), 
      choose your state if relevant, and the converter will instantly show you 
      the conversion in all other units.
    </p>
  </div>
  
  <div class="faq-item">
    <h3>Why does {PRIMARY_KEYWORD.split(' ')[0]} size vary by state?</h3>
    <p>
      Historically, different regions of India standardized land measurements differently. 
      These regional standards persist today, which is why accurate conversions require 
      knowing which state the measurement comes from.
    </p>
  </div>
  
  <div class="faq-item">
    <h3>Is this converter accurate for property transactions?</h3>
    <p>
      Yes, this converter uses official government-recognized conversion factors. 
      However, for official property documents, always verify with a licensed land surveyor.
    </p>
  </div>
  
  <div class="faq-item">
    <h3>Can I use this on my mobile phone?</h3>
    <p>
      Yes! This converter is fully optimized for mobile devices. Just visit the site 
      on your phone and you can convert instantly from anywhere.
    </p>
  </div>
</section>
```

**SEO Notes:**
- FAQ section aids featured snippet optimization
- Schema markup will be applied to this
- Answers common user questions
- Builds trust and authority

---

### Related Guides Section (Internal Links)

```html
<section class="related-guides">
  <h2>Other Conversion Guides</h2>
  
  <nav class="guides-grid">
    <a href="/guides/bigha-to-hectare/" class="guide-card">
      <span class="guide-title">Bigha to Hectare</span>
      <span class="guide-desc">Quick conversion formula and examples</span>
    </a>
    
    <a href="/guides/bigha-to-square-meter/" class="guide-card">
      <span class="guide-title">Bigha to Square Meter</span>
      <span class="guide-desc">Metric conversion for surveys and maps</span>
    </a>
    
    <a href="/guides/kanal-to-acre/" class="guide-card">
      <span class="guide-title">Kanal to Acre</span>
      <span class="guide-desc">Punjab & Haryana conversions</span>
    </a>
    
    <a href="/guides/guntha-to-acre/" class="guide-card">
      <span class="guide-title">Guntha to Acre</span>
      <span class="guide-desc">South India land measurements</span>
    </a>
    
    <a href="/" class="guide-card">
      <span class="guide-title">Main Converter</span>
      <span class="guide-desc">Convert between all Indian units</span>
    </a>
  </nav>
</section>
```

**SEO Notes:**
- Internal links distribute page authority
- Anchor text is keyword-rich
- Improves site crawlability

---

## Word Count Guidelines

```
Total Page: 600-800 words minimum

Breakdown:
- Hero Section:          50-75 words
- Quick Answer:          25-50 words
- Formula Section:       75-100 words
- Examples Section:      100-150 words
- State Variations:      100-150 words
- FAQ Section:           150-200 words
- Meta/Navigation:       50 words
```

---

## Keyword Density Targets

```
Primary Keyword: 0.8-1.2% (8-12 times in 800 words)
Example: "bigha to acre" appears 10 times

LSI Keywords: 2-3 variations
- "convert bigha to acres"
- "bigha in acres"
- "how many acres in bigha"

Related Keywords:
- "bigha converter"
- "acre conversion"
- "land measurement"
```

---

## Images & Visual Assets

**Recommended:**
- Conversion formula diagram
- State map showing Bigha variations
- Example property layouts
- Comparison table graphics

**Requirements:**
- All images optimized (< 100KB)
- Descriptive alt text (includes keyword naturally)
- Responsive sizing
- WebP format (with PNG fallback)

---

## Testing Checklist Before Publishing

- [ ] Title is 55-60 characters
- [ ] Meta description is 155-160 characters
- [ ] H1 appears once and includes primary keyword
- [ ] H2/H3 use secondary keywords naturally
- [ ] Internal links have keyword-rich anchor text
- [ ] FAQ section has 5+ questions
- [ ] Schema markup validates (validator.schema.org)
- [ ] Mobile responsive (test on phone)
- [ ] Page load < 3 seconds
- [ ] No broken links
- [ ] All images have alt text
- [ ] Copy is original (no plagiarism)
- [ ] Grammar and spelling checked
- [ ] Content matches search intent

---

## Publishing Workflow

1. **Draft** - Write content using this template
2. **Optimize** - Add keywords, format headings, optimize meta
3. **Review** - Check checklist above
4. **Test** - Mobile test, speed test, schema validation
5. **Publish** - Push to GitHub Pages
6. **Submit** - Add to sitemap.xml and submit to GSC
7. **Monitor** - Track rankings weekly for 4 weeks

---

**Template Version:** 1.0  
**Last Updated:** March 28, 2026  
**For Pages:** All landing pages in /guides/ directory
