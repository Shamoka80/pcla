# Missing Items

## Original-site image retrieval blocked

Date checked: 2026-05-02 (UTC)

Attempted sources:
- https://www.poplarcla.org
- https://www.poplarcla2.org

Blocking issue:
- Network fetch attempts returned proxy tunnel errors (`403 Forbidden`) from this environment.
- Result: original company-owned image assets could not be downloaded during this run.

Required follow-up:
1. Re-run image crawl/download from a network environment that can access both domains.
2. Save raw files to:
   - `assets/images/original-sites/poplarcla/`
   - `assets/images/original-sites/poplarcla2/`
3. Create optimized derivatives in `assets/images/optimized/` and page-specific folders.
4. Replace TODO placeholders in each page with final `<figure>`/`<img>` integrations.
5. Update `docs/image-inventory.md` and `docs/content-inventory.md` with final placements.
