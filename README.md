# Poplar Christian Learning Academy Website Rebuild

A lightweight, static, GitHub Pages-friendly website rebuild for Poplar Christian Learning Academy (PCLA), focused on clear family information and call-driven enrollment inquiries.

## File Structure

```
/
├── README.md
├── index.html
├── about.html
├── programs.html
├── locations.html
├── parent-resources.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   ├── logo/
│   │   ├── home/
│   │   ├── about/
│   │   ├── programs/
│   │   └── locations/
│   └── docs/
```

## Local Preview

1. Clone the repository.
2. Open `index.html` directly in your browser, or use a simple static server.
3. Confirm navigation, responsive layout, and mobile menu behavior.

## GitHub Pages Hosting

This project uses plain HTML, CSS, and vanilla JavaScript with relative paths, making it ready for GitHub Pages hosting from the repository root.

## Current Implementation Status

- ✅ All six core pages are implemented: `index.html`, `about.html`, `programs.html`, `locations.html`, `parent-resources.html`, and `contact.html`.
- ✅ Global layout, header, navigation, mobile menu, and footer are implemented sitewide.
- ✅ Contact page includes a native HTML form (no iframe) configured for Google Forms submission.
- ✅ Contact form is handled with vanilla JavaScript using `fetch` with `mode: "no-cors"` and dynamic child field generation/serialization.
- ✅ Site remains static (HTML/CSS/JS only) and compatible with GitHub Pages.

## Image and Document Integration Notes

- Expected logo path: `assets/images/logo/poplar_cla.png`
- Suggested image directories:
  - `assets/images/home/`
  - `assets/images/about/`
  - `assets/images/programs/`
  - `assets/images/locations/`
- Expected document paths:
  - `assets/docs/supply-list.pdf`
  - `assets/docs/daily-schedule.pdf`
- Optimize final image and document assets before upload for performance.
- Reference image filenames in HTML/CSS only after the files exist in the repository.

## Next Recommended Step

Upload final logo/documents/selected page images, then perform final cross-browser visual integration testing and a live contact-form submission test.
