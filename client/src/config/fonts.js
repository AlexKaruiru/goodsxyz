// Site-wide font configuration.
//
// Body text always uses Inter - it's the default, highly-legible choice for UI/paragraph text
// and isn't meant to be swapped casually.
//
// The HEADING font is the one worth experimenting with (it drives the site's overall "feel" -
// hero title, section titles, card titles, prices). Both candidate fonts are loaded in
// client/index.html's Google Fonts <link> so switching ACTIVE_HEADING_FONT below takes effect
// immediately with no other file changes and no network-request changes.

export const HEADING_FONTS = {
  montserrat: {
    label: 'Montserrat',
    family: '"Montserrat", sans-serif',
    note: 'Geometric, bold, more "SaaS/corporate" feel.',
  },
  dmSans: {
    label: 'DM Sans',
    family: '"DM Sans", sans-serif',
    note: 'Rounder, friendlier, more "consumer wellness" feel.',
  },
}

// Change this one value to switch the site's heading font - e.g. 'montserrat' to revert.
export const ACTIVE_HEADING_FONT = 'dmSans'

export const headingFontFamily = HEADING_FONTS[ACTIVE_HEADING_FONT].family
export const bodyFontFamily = '"Inter", sans-serif'
