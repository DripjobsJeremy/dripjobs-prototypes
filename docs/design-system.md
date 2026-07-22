  
# DripJobs Design System  
  
A reference for the UI/UX patterns used across the application. Use this when refreshing or building pages so the look and feel stays consistent.  
  
The patterns are scoped under a per-page wrapper id (e.g. `#settings-page`, `#crew-settings-page`, `#proposals-page`) so styles don't leak between pages. Copy the relevant rule blocks under that scope. Class names can stay identical because the id-prefix gives them uniqueness — the examples below use `#settings-page` as a stand-in, but swap it for whatever id you pick on your page.  
  
---  
  
## 1. Color tokens  
  
Defined as CSS custom properties on the page wrapper. Every other rule reads from these — so to retheme an entire page, change the tokens, not the rules.  
  
```css  
#settings-page {  
    --st-color-primary:        #8B85EA;   /* soft indigo, ~64% sat / 72% light */  
    --st-color-primary-hover:  #736BE3;  
    --st-color-primary-active: #5C53DC;  
    --st-color-primary-rgb:    139, 133, 234;  /* used for rgba() halos */  
  
    --st-color-text:           #32415B;  
    --st-color-text-muted:     #80879A;  
    --st-color-border:         #DAD8E3;  
    --st-color-card-bg:        #FFFFFF;  
}  
```  
  
**Why this primary?** The original brand purple `#6A5AEB` was visually harsh next to the page's pastel chips. `#8B85EA` keeps the brand's indigo identity but reduces saturation enough to coexist with soft pastels, while staying dark enough to avoid reading as "disabled".  
  
### Pastel palette (for tab chips and decorative accents)  
  
11 distinct pastels keyed by `:nth-child()` position:  
  
| # | Hue       | Hex       |  
|---|-----------|-----------|  
| 1 | lavender  | `#E8E6FA` |  
| 2 | peach     | `#FAF0E6` |  
| 3 | mint      | `#E6FAF0` |  
| 4 | sky       | `#E6F3FA` |  
| 5 | lemon     | `#FAF7E6` |  
| 6 | coral     | `#FAE6E6` |  
| 7 | lime      | `#F0FAE6` |  
| 8 | aqua      | `#E6FAFA` |  
| 9 | salmon    | `#FAEAE6` |  
| 10| neutral   | `#EFEFF3` |  
| 11| pink      | `#FAE6F0` |  
  
Use these for **chip-style tab navigation only**. For all other surfaces, default to white/neutral and let the soft purple be the accent.  
  
### Tag/chip family (for tags inputs, status badges, etc.)  
  
| Use | Color |  
|-----|-------|  
| Pill background | `#E8E6FA` (lavender pastel) |  
| Pill text | `#5C53DC` (primary-active, for legibility on lavender) |  
| Pill border | `#D6D2F5` |  
| Pill prefix badge | `#D6D2F5` (slightly deeper than pill bg) |  
| × close button (resting) | transparent bg, `#8B85EA` text |  
| × close button (hover) | `#8B85EA` bg, white text |  
  
### Alert variants  
  
| Variant | Background | Border | Text |  
|---|---|---|---|  
| `--danger`  | `#FEF2F2` | `#FECACA` | `#991B1B` |  
| `--warn`    | `#FFFBEB` | `#FDE68A` | `#92400E` |  
| `--info`    | `#EFF6FF` | `#BFDBFE` | `#1E40AF` |  
| `--success` | `#F0FDF4` | `#BBF7D0` | `#166534` |  
  
---  
  
## 2. Layout — sections and grids  
  
The page is a vertical stack of **section cards**, each containing a **responsive field grid** or specialized content (tags, toggles, alerts, etc.).  
  
### Section card  
  
```html  
<section class="settings-section">  
    <h4 class="settings-section-title">Section Title</h4>  
    <p class="settings-section-subtitle">Optional description, one short sentence.</p>  
    <div class="settings-grid">  
        <!-- fields go here -->  
    </div>  
</section>  
```  
  
```css  
.settings-section {  
    background: var(--st-color-card-bg);  
    border: 1px solid var(--st-color-border);  
    border-radius: 10px;  
    padding: 18px;  
    margin-bottom: 18px;  
}  
.settings-section-title    { font-size: 14px; font-weight: 600; margin: 0 0 14px 0; }  
.settings-section-subtitle { font-size: 12px; color: var(--st-color-text-muted); margin: -8px 0 14px 0; }  
```  
  
### Responsive 6-col grid  
  
```css  
.settings-grid {  
    display: grid;  
    grid-template-columns: 1fr;          /* mobile */  
    gap: 18px 14px;  
}  
@media (min-width: 576px) { .settings-grid { grid-template-columns: repeat(2, 1fr); } }  
@media (min-width: 992px) {  
    .settings-grid { grid-template-columns: repeat(6, 1fr); }  
    .settings-field          { grid-column: span 2; }      /* default: 3-up at desktop */  
    .settings-field--full    { grid-column: 1 / -1; }  
    .settings-field--half    { grid-column: span 3; }  
    .settings-field--compact { grid-column: span 2; max-width: 180px; } /* tax-rate-style fields */  
}  
```  
  
**Modifier rules of thumb:**  
- Default span 2 = three fields per row at desktop (most fields)  
- `--half` = two fields per row (long inputs like emails, addresses)  
- `--full` = full-width row (textareas, single-row toggle clusters)  
- `--compact` = capped at ~180px max width (decimals, %, short numerics)  
  
---  
  
## 3. Form fields  
  
### Floating-label input  
  
Custom implementation, *not* Bootstrap 5's `.form-floating`. The label sits notched in the input's top border at all times.  
  
```html  
<div class="settings-field">  
    <label class="settings-field-label is-required" for="Foo_Bar">Bar</label>  
    @Html.TextBoxFor(x => x.Foo.Bar, new { @class = "settings-field-input form-control", id = "Foo_Bar" })  
</div>  
```  
  
```css  
.settings-field { position: relative; display: flex; flex-direction: column; }  
.settings-field-label {  
    position: absolute; top: -8px; left: 10px;  
    background: var(--st-color-card-bg);  
    padding: 0 6px;  
    font-size: 11px; font-weight: 500;  
    color: var(--st-color-text-muted);  
    z-index: 1; pointer-events: none;  
    letter-spacing: 0.2px;  
}  
.settings-field-label.is-required::after { content: " *"; color: #DC2626; }  
  
.settings-field-input,  
.settings-field .form-control {  
    height: 40px;  
    padding: 0 14px;  
    border: 1px solid var(--st-color-border);  
    border-radius: 8px;  
    font-size: 14px;  
    background: var(--st-color-card-bg);  
    transition: border-color 0.15s ease, box-shadow 0.15s ease;  
    width: 100%;  
}  
.settings-field-input:focus,  
.settings-field .form-control:focus {  
    outline: none;  
    border-color: var(--st-color-primary);  
    box-shadow: 0 0 0 3px rgba(var(--st-color-primary-rgb), 0.18);  
}  
```  
  
**Variants:**  
- Plain text input — as above  
- `<select>` — same wrapper. If select2 is initialized on it, an extra rule aligns the select2-rendered chrome to 40px height and the 8px radius.  
- `<textarea>` — extend to `min-height: 80px` via inline style or a `.settings-field--textarea` modifier.  
  
### Field group with prefix/suffix  
  
For `%`, `$`, `Tomorrow at`, etc.  
  
```html  
<div class="settings-field-group">  
    <span class="settings-field-group-prefix">Tomorrow at</span>  
    <input class="settings-field-input" />  
    <!-- or suffix on the right: -->  
    <span class="settings-field-group-suffix">%</span>  
</div>  
```  
  
The group itself has the border/radius; the inner input is borderless. `:focus-within` lifts the focus ring on the whole group.  
  
### Icon prefix variant  
  
For social URL inputs (Facebook/Instagram/etc.):  
  
```html  
<div class="settings-field-group">  
    <span class="settings-field-group-prefix-icon"><i class="fa fa-facebook"></i></span>  
    <input class="settings-field-input" />  
</div>  
```  
  
40×full-height square slot for the icon.  
  
### Tagging widget  
  
For multi-tag entry. The library renders `<span class="tag"><span>#</span> tag-name <a class="tag-i">×</a></span>`. We restyle the inner pieces:  
  
```css  
.settings-tag-field { display: flex; flex-direction: column; gap: 6px; }  
.settings-tag-field-label { font-size: 12px; font-weight: 600; }  
  
.tagging .tag {                  /* the pill */  
    background: #E8E6FA;  
    color: #5C53DC;  
    border: 1px solid #D6D2F5;  
    border-radius: 14px;  
    padding: 4px 28px 4px 0;       /* right padding leaves room for absolutely-positioned ×  */  
}  
.tagging .tag > span {           /* the # prefix badge */  
    background: #D6D2F5;  
    border-radius: 14px 0 0 14px;  
    padding: 4px 9px;  
    font-weight: 600;  
}  
.tagging .tag .tag-i {           /* the × close button (anchor) */  
    /* 18×18 round target, vertically centered, hover fills purple with white × */  
}  
```  
  
Required: input wrapper gets the same focus-within treatment as floating-label fields.  
  
### Toggle row (Switchery)  
  
```html  
<div class="settings-toggle-row">  
    @Html.CheckBoxFor(x => x.Foo.Bar, new { @class = "form-check-input switchery", id = "barToggle" })  
    <span class="settings-toggle-label">Bar Enabled</span>  
    <span class="settings-toggle-help">@Html.Tooltip("Reason this matters.")</span>  
</div>  
```  
  
```css  
.settings-toggle-row { display: flex; align-items: center; gap: 10px; }  
.settings-toggle-row + .settings-toggle-row { margin-top: 12px; }   /* stack spacing */  
```  
  
**Switchery init color**: `#8B85EA`. Initialized in `_MasterLayout.cshtml` for `.switchery` and `.switchery-small`. If you add a new init site, use the same color for consistency.  
  
### Inline checkbox row  
  
For small inline opt-ins (e.g. "Billing same as physical").  
  
```html  
<div class="settings-checkbox-row">  
    @Html.CheckBoxFor(x => x.Foo.Bar)  
    <label for="Foo_Bar">Inline label</label>  
</div>  
```  
  
Renders as a soft gray pill containing the checkbox + label.  
  
---  
  
## 4. Buttons  
  
All buttons inside the page wrapper inherit the soft purple via a scoped override on Bootstrap's `.btn-primary` and `.btn-outline-primary` — so just use Bootstrap classes and it stays on-brand. You do **not** need to write custom button colors.  
  
| Use | Class | Notes |  
|---|---|---|  
| Primary action (Save, Submit) | `btn btn-primary` | Solid soft purple. |  
| Secondary action (Edit, Setup, Cancel) | `btn btn-outline-primary` | Purple outline, fills on hover. |  
| Destructive (Delete, Remove) | `btn btn-danger` | Red. |  
| Success / additive (Add addon) | `btn btn-success` (or custom) | Green. |  
| Small inline (Copy, etc.) | `btn btn-sm btn-outline-primary` | 8px radius. |  
| Pill-shaped | add `btn-round` | 999px radius. |  
  
**All buttons get rounded corners**: 10px (default size), 8px (`btn-sm`), 999px (`btn-round`). Bootstrap's default 4px is overridden.  
  
**Size rule**: Use the default `.btn` size for buttons that sit *under* a 40px input or stand alone. Use `.btn-sm` for buttons that sit *inline next to text* (e.g. Copy beside a hostname). Don't mix sizes within a single section.  
  
**Placement rule**: Action buttons that belong to a single field (Edit Reply Email, Customize PDF) sit **inside** the field column, on a new row, **right-aligned** under the input.  
  
---  
  
## 5. Alerts and status banners  
  
```html  
<div class="settings-alert settings-alert--warn">  
    <i class="feather icon-alert-triangle"></i>  
    <div class="settings-alert-body">  
        <div class="settings-alert-title">Title</div>  
        <div>Body text…</div>  
    </div>  
    <a href="#" class="settings-alert-action">Action &gt;</a>  
</div>  
```  
  
Three slots: leading icon, body (title + text), optional trailing action link. Variants `--danger / --warn / --info / --success` use the alert color table above.  
  
**Use cases:**  
- `--danger`: payment overdue, account at risk, validation error  
- `--warn`: trial countdown, deprecation notice  
- `--info`: upcoming billing date, next steps, did-you-know  
- `--success`: coupon applied, verified state  
  
---  
  
## 6. Tab navigation pattern  
  
```html  
<div id="my-page">  
    <div class="settings-tabs">  
        <nav>  
            <a href="#" class="settings-tab-link active" data-tab="overview">Overview</a>  
            <a href="#" class="settings-tab-link" data-tab="details">Details</a>  
            <!-- … -->  
        </nav>  
    </div>  
    <div class="settings-tab-panels">  
        <div class="settings-tab-content active" data-content="overview">…</div>  
        <div class="settings-tab-content" data-content="details">…</div>  
        <!-- … -->  
    </div>  
</div>  
```  
  
**Visual**:  
- Pill-shaped chips with horizontal scroll at every breakpoint (mobile up to desktop)  
- Each tab gets a pastel from the 11-color palette via `:nth-child(n)`  
- Active state: `box-shadow: inset 0 0 0 2px var(--st-color-primary); font-weight: 600` — keeps the pastel, adds the purple inner border  
- Hidden scrollbar, scroll-snap-type proximity, soft swipe feel on mobile  
- Active chip auto-scrolls into view when activated  
  
**Activation JS** (vanilla + jQuery):  
- Click handler on `.settings-tab-link` flips active classes on link and matching `[data-content]` panel  
- On load, reads `?tab=` query param, falls back to URL `#hash`, falls back to `ViewBag.Tab`, falls back to first tab  
- Maintains a hidden `#activeTab` form field so the server-side POST round-trip remembers which tab was open  
- Pushes URL state on click (no reload)  
  
The deal: never use Bootstrap's `data-toggle="tab"` / `nav-tabs` — they don't give us the visual or the deep-link behavior. The custom pattern is small and predictable.  
  
---  
  
## 7. Border radius scale  
  
For visual cohesion, all rounded corners pull from a small scale:  
  
| Element | Radius |  
|---|---|  
| Section cards | 10px |  
| Inputs, field groups | 8px |  
| Buttons (default) | 10px |  
| Buttons (`btn-sm`) | 8px |  
| Buttons (`btn-round`), Switchery | 999px (full pill) |  
| Tab chips | 16px |  
| Tag pills | 14px |  
| Alert banners | 8px |  
  
---  
  
## 8. Spacing scale  
  
| Use | Value |  
|---|---|  
| Section internal padding | 18px |  
| Section bottom margin (between sections) | 18px |  
| Grid row gap | 18px |  
| Grid column gap | 14px |  
| Field input height | 40px |  
| Toggle row vertical stack gap | 12px |  
  
---  
  
## 9. Typography  
  
| Element | Size | Weight | Color |  
|---|---|---|---|  
| Body text | 14px | 400 | text |  
| Section title | 14px | 600 | text |  
| Section subtitle | 12px | 500 | text-muted |  
| Field input | 14px | 400 | text |  
| Field label (floating) | 11px | 500 | text-muted |  
| Tag label / small caps label | 12px | 600 | text |  
| Helper text | 12px | 400 | text-muted |  
| Alert title | 13px | 600 | variant text |  
| Alert body | 13px | 400 | variant text |  
| Tag pill text | 12px | 500 | `#5C53DC` |  
| Status meta label (caps) | 11px | 500 | text-muted, uppercase, 0.5px tracking |  
| Status meta value | 16px | 600 | text |  
  
Letter-spacing: leave alone except `0.2px` on field labels and `0.5px` on uppercase meta labels.  
  
---  
  
## 10. JavaScript hooks to preserve  
  
When refactoring forms, these CSS classes / DOM ids carry behavior. **Don't rename them or styling will break, but do change them only in coordinated PRs that update the JS too.**  
  
| Hook | Purpose |  
|---|---|  
| `.select2` | Initialized by select2 |  
| `.switchery`, `.switchery-small` | Initialized by Switchery (master layout) |  
| `.formatted-phone-no` | Phone number digit-only formatter |  
| `.autocomplete-address`, `.autocomplete-city`, `.autocomplete-state`, `.autocomplete-zip` | Google Places autocomplete (physical address) |  
| `.autocomplete-billing-*` | Same for billing address |  
| `.billing-address-field` | Toggled disabled/enabled when "Billing same as physical" checkbox flips |  
| `.tag-input.tagging` | Initialized by the tagging library |  
| `.copy` + `data-value` | Copy-to-clipboard handler |  
| `.ckeditor`, `.ckeditor-minimal` | CKEditor instances |  
  
---  
  
## 11. Anti-patterns to avoid  
  
- **Bootstrap `.form-group .row` with col-sm-2 label / col-sm-10 input.** This is the legacy pattern we replaced. Use `.settings-grid` + `.settings-field` instead.  
- **Hardcoded `#6A5AEB` / `#7367F0` / `#685AE8` purples.** Use `var(--st-color-primary)` or the rgb tuple for halos.  
- **Switchery init with any color other than `#8B85EA`.** All toggles should match.  
- **`btn-primary` outside the scoped wrapper expecting it to be the soft purple.** The override is scoped — outside the wrapper, Bootstrap's default purple comes through.  
- **Wrapping section content in `<div class="container">` or `<div class="row"><div class="col-X">`.** That centers and pads in ways that fight the section card's own padding. Section content should run flush to the card's inner edge.  
- **Mixing `btn` and `btn-sm` within a single field/cell.** Pick one size for the section's secondary actions.  
- **Mobile dropdowns for tab switching.** Use the swipeable chip nav at all viewports.  
- **Inventing per-doc semantic icon colors.** The Portal tab uses unique icon colors per document type (insurance=blue, warranty=green, license=purple, etc.) — that's an established affordance there. Don't extend the practice elsewhere.  
  
---  
  
## 12. How to apply this to a new page  
  
1. Wrap the page's main content in `<div id="my-new-page">` (pick a unique id).  
2. Copy the rule blocks from sections 1–9 of this guide into the new page's `<style>` block.  
3. Update the wrapper-id selector in those rules to match your page (e.g. find/replace `#settings-page` → `#my-new-page`).  
4. (Optional) tweak the `--st-color-primary*` tokens at the top if the new page should feel slightly different.  
5. Restructure the page content into `<section class="settings-section">` cards with the floating-label `.settings-field` markup.  
6. Switch any custom button hex colors to `btn-primary` / `btn-outline-primary` and let the scoped override take effect.  
7. If the page has tabs, copy the `.settings-tabs` markup + activation JS pattern.  
  
The whole thing is intentionally non-CSS-in-JS, non-Tailwind, no build step — just plain `<style>` blocks scoped by a wrapper id. Easy to copy, easy to fork, easy to delete.  
