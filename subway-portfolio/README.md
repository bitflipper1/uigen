# DesignMatt-ers — NYC Subway Edition

A redesign of [designmatt-ers.com](https://designmatt-ers.com) as an interactive,
Vignelli-inspired NYC subway map. **Each line is a company; each station is a project.**

| Line | Bullet | Company / Theme | Stations |
| --- | --- | --- | --- |
| Red | 1 | Honeywell | Safety Suite Transformation, Integrated Lifecare Platform |
| Blue | A | EDA / Top Bid | EDA Responsive Redesign, TopBid Design System, Top Bid Mobile App |
| Green | 4 | Ecomdash | Onboarding & Design System |
| Yellow | S | Founder Shuttle | RepRevive, AdSpark, Bitflip |

All lines depart the **About Me** interchange, run via **Digital Leadership**
(the design process), and terminate at **Contact**.

## Running it

It's a fully static site with zero dependencies and no build step:

```bash
cd subway-portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

Or just open `index.html` in a browser.

## Structure

```
subway-portfolio/
├── index.html        # page shell & static sections
├── css/styles.css    # Vignelli/MTA-inspired design system
└── js/
    ├── data.js       # ALL content: lines, stations, case studies, about, process, contact
    └── main.js       # renders the system map, project feed, trunk backdrop, interactions
```

To add or edit a project, edit `js/data.js` (`PROJECTS` + the station coordinates
in `MAP.stations` in `main.js`). No other file needs to change.

## Deploying

The folder is self-contained — copy it into its own repo and serve it from
GitHub Pages, Netlify, Vercel, or any static host. Case-study content was
sourced from the live designmatt-ers.com site; each station links back to the
original case study page.
