NINE3 DESIGNS - SITE IMPROVEMENT PACK
Built 25 September 2026 (supersedes the earlier fix pack from 24 Sep 2026)
Prepared for: Natalie - natalie@nine3designs.co.uk

=====================================================
WHAT'S IN THIS PACK
=====================================================

1. UPDATED PAGES (upload to the site root, same filenames)

   index.html      Homepage. NEW: social-share + canonical tags,
                   hero collage replacing the old floating logo,
                   branded placeholder for the missing Hillsborough card image.
   portfolio.html  Our Work page. NEW: social-share + canonical tags,
                   filter chips (All work / Brand identity / Logo design /
                   Print & packaging), "What clients can expect" section
                   replacing the placeholder testimonials, branded
                   placeholder tiles where portfolio images are missing.
   services.html   NEW: social-share + canonical tags.
   about.html      NEW: social-share + canonical tags.
   contact.html    NEW: social-share + canonical tags.

2. UPDATED CODE FILES (go in these folders)

   assets/css/portfolio.css   -> upload to  assets/css/portfolio.css
   assets/css/animations.css  -> upload to  assets/css/animations.css
                                 (site-wide file - used by every page)
   assets/js/main.js          -> upload to  assets/js/main.js
                                 (site-wide file - IMPORTANT: this version
                                 fixes a JavaScript syntax error in the
                                 previous main.js that stopped scroll
                                 animations, the mobile menu and the new
                                 filters/fallbacks from running)

   In this pack the three files sit in the folder root for convenience -
   move them into the folders above when uploading.

   STUDIO POLISH (25 Sep, included in these files): animated nav
   underlines, card hover states, a scrolling services ticker on the
   homepage + Our Work, a gentle hero-collage parallax and a soft focus
   glow on form fields. All respect prefers-reduced-motion and need no
   extra files or setup.

3. optimised-images/  (OPTIONAL but recommended)

   Six oversized images recompressed (max width 1800px, quality 82) -
   same filenames, drop-in replacements:

     hillsborough-2.jpg    2.48 MB -> 132 KB
     boldbrick-2.jpg       2.30 MB -> 238 KB
     paigeoldham-main.jpg  4.75 MB -> 463 KB
     paigeoldham-3.jpg     4.08 MB -> 219 KB
     nordkustcoffee2.jpg   1.21 MB -> 210 KB
     aurelia-2.jpg         824 KB  -> 142 KB

   Upload each to  assets/images/portfolio/  replacing the current file
   (keep the same filename). No HTML changes needed.

4. aurelia.jpg
   Recovered portfolio image - upload to  assets/images/portfolio/

5. signature-demo.html
   A standalone preview of the animated Natalie signature effect.
   PREVIEW ONLY - do not upload this file. The effect itself is already
   included in the pages via animations.css + main.js.

=====================================================
IMAGES STILL NEEDED (current site returns broken links)
=====================================================

Upload these to  assets/images/portfolio/  (filenames as referenced):
   aurelia-3.jpg
   boldbrick-main.jpg
   drivetheline-main.jpg
   drivetheline-3.jpg
   nordkustcoffee-3.jpg
   paigeoldham-2.jpg
   hbro.jpg   (homepage Hillsborough card)

Until they exist the site shows a branded "Nine3 Designs" placeholder
tile instead of a broken image - nothing else to do.

Also still welcome (not required):
   - A professional photo of Natalie for the About page
   - More client logos for the "Trusted by" strip

=====================================================
NOTES
=====================================================
- The live production site has NOT been changed. Everything here is a
  handover pack for you (or your hosting person) to upload.
- Wedding stationery content is untouched; the word "wedding" was removed
  from meta descriptions on About and Contact only (page copy still
  mentions wedding stationery where it always did).
- Social share tags use existing site images as the preview picture:
  homepage/Our Work = Tails & Tides, Services = Nordkust Coffee,
  About = Aurelia, Contact = Beauty Bothy. Swap any of these later by
  editing the og:image line in that page's <head>.

Questions? natalie@nine3designs.co.uk
