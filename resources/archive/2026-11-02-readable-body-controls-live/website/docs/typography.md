# GoLocal reading and control sizes

Updated November 2, 2026. Keep the existing cream/forest palette, DM Sans interface type and Georgia display headings.

| Role | Shared CSS token | Desktop | Mobile (800px and below) |
| --- | --- | --- | --- |
| Body copy | `--gl-text-body` | 18px | 17px |
| Buttons, links, tabs and form fields | `--gl-text-control` | 16px | 16px |
| Supporting text and demo messages | `--gl-text-small` | 16px | 16px |
| Captions and compact metadata | `--gl-text-meta` | 14px | 14px |

Use the tokens in `apps/web/app/globals.css` rather than adding page-specific smaller sizes. Main actions and inputs have a minimum 48px height; compact interactive controls and text actions have a minimum 44px height. Allow controls to wrap instead of reducing their text on narrow screens. Body copy uses comfortable line spacing; the homepage keeps the established heading hierarchy.

The standalone `/agent` HTML page uses a 16px monospace reading size, including mobile. Tailwind-based legacy screens share a 16px `text-sm` and 14px `text-xs` scale. Brand lettering and decorative symbols keep their own proportions.
