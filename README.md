# Achilles Girls FC — Website

A static website for Achilles Girls FC, built for hosting on GitHub Pages.

## File Structure

```
achilles-fc/
├── index.html              ← Home / landing page
├── team-albion.html        ← Albion U12s team page
├── team-flamingos.html     ← Flamingos U13s team page
├── team-pumas.html         ← Pumas U14s team page
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← Navigation, tabs, contact form
├── images/
│   ├── logo-albion.png     ← Albion seagull logo
│   ├── logo-flamingos.png  ← Flamingos logo
│   └── logo-pumas.jpg      ← Pumas logo
└── README.md
```

---

## Hosting on GitHub Pages

1. Create a new repository on GitHub (e.g. `achilles-girls-fc`)
2. Upload all these files (maintaining the folder structure)
3. Go to **Settings → Pages**
4. Under "Source", select **main branch** and **/ (root)**
5. Click Save — your site will be live at:
   `https://yourusername.github.io/achilles-girls-fc/`

---

## Setting Up the Contact Form (Formspree)

1. Go to [https://formspree.io](https://formspree.io) and create a free account
2. Click **New Form**, give it a name, and enter your email address
3. Copy your form endpoint — it looks like:
   `https://formspree.io/f/xpzvwrkg`
4. Open `index.html` and find this line:
   ```html
   action="https://formspree.io/f/YOUR_FORMSPREE_ID"
   ```
5. Replace `YOUR_FORMSPREE_ID` with your actual form ID from step 3

The free Formspree tier allows 50 submissions/month which is plenty for a club site.

---

## Adding FA Full Time Embeds

Each team page has placeholder sections waiting for FA Full Time embed codes.
Look for the `<!-- FA FULL TIME EMBED -->` comments in each team HTML file.

### Option A — FA Widget (preferred)
1. Log in to [https://fulltime.thefa.com](https://fulltime.thefa.com)
2. Navigate to your team/league page
3. Look for a **Widgets** link (usually in sidebar or footer of the team page)
4. Copy the `<iframe>` code provided
5. In the relevant team HTML file, replace the `<div class="embed-placeholder">` block with:
   ```html
   <div class="fa-embed-wrapper">
     [paste your iframe code here]
   </div>
   ```

### Option B — Direct iframe (if no widget available)
Some FA pages can be iframed directly. Try replacing the placeholder with:
```html
<div class="fa-embed-wrapper">
  <iframe
    src="https://fulltime.thefa.com/displayFixture.html?id=XXXXXXX"
    width="100%"
    height="600"
    frameborder="0"
    scrolling="auto">
  </iframe>
</div>
```

Note: If FA Full Time blocks iframes, the "View on FA Full Time ↗" button 
in the placeholder is already set up as a fallback link.

**Team FA Full Time URLs:**
- Flamingos (U13s): https://fulltime.thefa.com/displayFixture.html?id=28595986
- Pumas (U14s): https://fulltime.thefa.com/displayFixture.html?id=28595753

---

## Adding the Third Team (Albion U12s)

When the Albion U12s are registered on FA Full Time:
1. Find their team page URL
2. Open `team-albion.html`
3. Find the embed placeholder comments and add the iframe code

---

## Customisation

- **Club info / about text**: Edit the `#about` section in `index.html`
- **Colours**: All colours are CSS variables at the top of `css/style.css`
- **Year in footer**: Search for `© 2025` and update as needed
- **Division names**: Each team page has a `<!-- Add league/division name here -->` comment
