# Deployment Guide - India Agri Converter

## Phase 7: Launch & Deploy

This guide covers deploying India Agri Converter to GitHub Pages and submitting to search engines.

---

## Prerequisites

- GitHub Account (free)
- Google Search Console Account (free)
- Bing Webmaster Tools Account (free)

---

## Step 1: Create GitHub Repository

### 1a. Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `india-agri-converter`
3. Description: "Free online converter for Indian land units - Bigha, Acre, Hectare, Kanal, Guntha"
4. Make it **PUBLIC** (required for GitHub Pages)
5. **Do NOT** initialize with README (we have one)
6. Click "Create repository"

### 1b. Add Remote to Local Repository

```bash
cd /home/error/Desktop/india-agri-converter
git remote add origin https://github.com/YOUR_USERNAME/india-agri-converter.git
git branch -M master
git push -u origin master
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Settings → Pages (left sidebar)
3. **Source:** Select "Deploy from a branch"
4. **Branch:** Select `master` and `/root` folder
5. Click "Save"
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://YOUR_USERNAME.github.io/india-agri-converter/`

---

## Step 3: Update Analytics & AdSense IDs

After setting up Google Analytics and AdSense:

1. Find and replace `G-XXXXXXXXXX` with your actual Google Analytics ID
2. All 6 HTML files have the analytics code ready

```bash
# Example replacement (do this in your editor or with sed):
sed -i 's/G-XXXXXXXXXX/G-YOUR_ACTUAL_ID/g' *.html guides/*/index.html
```

---

## Step 4: Test Live Site

Once GitHub Pages is live:

1. Visit your site: `https://YOUR_USERNAME.github.io/india-agri-converter/`
2. Test all pages:
   - Homepage loads correctly
   - All 5 guide pages load
   - Converter tool functions
   - Internal links work
   - Mobile responsive

### Mobile Testing

```bash
# Check responsive design by resizing browser
# Or use Chrome DevTools: F12 → Toggle device toolbar (Ctrl+Shift+M)
```

### Page Speed Test

Use these free tools:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

Expected results:
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **First Byte:** < 600ms

---

## Step 5: Submit to Google Search Console

### 5a. Verify Domain

1. Go to https://search.google.com/search-console
2. Click "URL prefix" → Enter `https://YOUR_USERNAME.github.io/india-agri-converter/`
3. Click "Continue"
4. Choose verification method:
   - **HTML file** (easiest): Download file, add to root, verify
   - **HTML tag**: Copy meta tag, add to `<head>` of homepage

### 5b. Submit Sitemap

1. In Search Console, go to Sitemaps
2. Enter: `https://YOUR_USERNAME.github.io/india-agri-converter/sitemap.xml`
3. Click "Submit"
4. Wait for Google to crawl (can take hours to days)

### 5c. Check Indexation

1. Go to "Pages" section
2. Should see your 6 pages indexed over 7 days:
   - Homepage
   - Bigha to Acre
   - Bigha to Hectare
   - Bigha to Square Meter
   - Kanal to Acre
   - Guntha to Acre

---

## Step 6: Submit to Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Sign in with Microsoft account
3. Add site: `https://YOUR_USERNAME.github.io/india-agri-converter/`
4. Verify using HTML meta tag
5. Submit sitemap: `https://YOUR_USERNAME.github.io/india-agri-converter/sitemap.xml`

---

## Step 7: Monitor Performance

### Google Search Console

Track:
- **Impressions:** How often your site appears in search
- **Clicks:** How often users click through
- **Average Position:** Ranking position (lower = better)
- **Coverage:** Which pages are indexed

### Google Analytics

Track:
- **Traffic:** Daily/weekly/monthly users
- **Source:** Organic search, direct, social
- **Behavior:** Pages viewed, time on page, bounce rate
- **Conversions:** Goal completions

### Expected Timeline

**Month 1 (Days 1-30):**
- ~0-50 impressions
- 0-5 clicks
- Ranking: 100+ (not visible)

**Month 2-3 (Days 30-90):**
- 100-500 impressions
- 10-50 clicks
- Ranking improving (50+)

**Month 4-6 (Days 90-180):**
- 500-2,000 impressions
- 50-200 clicks
- Ranking: 15-30 for main keywords

---

## Troubleshooting

### Site Not Appearing in Google

**Problem:** Submitted sitemap but site not indexed after 7 days

**Solutions:**
1. Check Search Console for crawl errors
2. Request indexing manually: Search Console → URL inspection
3. Submit manual request for each page
4. Check robots.txt allows crawling
5. Verify canonical URLs are correct

### Pages Not Loading on GitHub Pages

**Problem:** Getting 404 or site not found

**Solutions:**
1. Verify repository is PUBLIC
2. Check branch is set to `master` in Pages settings
3. Verify index.html exists in root
4. Check .nojekyll file exists
5. Wait 2-5 minutes after enabling Pages

### Converter Tool Not Working

**Problem:** JavaScript converter not functioning

**Solutions:**
1. Check browser console (F12) for JS errors
2. Verify js/converter.js loads correctly
3. Check for CORS issues (shouldn't be any)
4. Test on different browser

### Mobile Issues

**Problem:** Site doesn't look right on mobile

**Solutions:**
1. Check viewport meta tag present
2. Test with Chrome DevTools device emulation
3. Verify CSS media queries working
4. Test actual mobile device

---

## Optimization Tips

### SEO Optimization

1. **Internal Linking:** Already optimized (hub-and-spoke model)
2. **Mobile:** Already optimized (responsive CSS)
3. **Speed:** Already optimized (no images, lean assets)
4. **Content:** Already optimized (600-800 words per page)

### Content Marketing

1. Create Twitter threads about land conversions
2. Post on farming/real estate Reddit
3. Answer Quora questions about land measurements
4. Link from agricultural blogs
5. Guest post on property/farming sites

### Technical SEO

1. Monitor Core Web Vitals monthly
2. Check for broken links quarterly
3. Update content every 3 months
4. Monitor 404 errors in GSC
5. Fix crawl errors immediately

---

## Monthly Maintenance

- [ ] Check Google Search Console for errors
- [ ] Review analytics for traffic patterns
- [ ] Check rankings for target keywords
- [ ] Update content if needed
- [ ] Build backlinks
- [ ] Monitor Core Web Vitals

---

## Contact & Support

- **Google Search Console Help:** https://support.google.com/webmasters
- **GitHub Pages Help:** https://docs.github.com/en/pages
- **Bing Webmaster Tools Help:** https://www.bing.com/webmasters/help

---

**Status:** Phase 7 Complete after deployment ✅  
**Next:** Phase 8: Monitor & Grow (ongoing)  
**Last Updated:** March 28, 2026
