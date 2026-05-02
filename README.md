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

- ✅ Global layout, header, navigation, mobile menu, and footer implemented.
- ✅ Homepage fully implemented with all required sections and calls to action.
- ✅ Programs page fully implemented with detailed classroom/program sections and enrollment CTAs.
- ✅ Locations page fully implemented with both locations, operating hours, and call-driven guidance.
- ✅ About page fully implemented with story, mission, leadership, expectations, and enrollment CTAs.
- ✅ Parent Resources page fully implemented with resource links, family guidance, FAQ, and call-driven CTAs.
- ✅ Contact page fully implemented with contact options, native form UX, and call-driven CTAs.
- ✅ Contact form configured to submit to Google Forms using vanilla JavaScript (`fetch` with `mode: "no-cors"`), including mapped Google Form entry IDs and dynamic children field handling.

## Next Recommended Step

Perform visual QA across pages and complete final content/image integration checks before launch.
