Design System: Katachi / AEON

Status: Updated to match current UI direction

Visual Philosophy: Quiet Monochrome + Warm Gold, Precision-Grid
1. Color Palette (OKLCH)

The system utilizes the oklch color space for consistent perceived brightness and professional depth.
Token	OKLCH Value	HEX (Approx)	Role
--background	0.12 0 0	#0b0b0b	Deep canvas background
--foreground	0.96 0.01 95	#f6f1ea	Primary text and icons (soft ivory)
--primary	0.82 0.08 88	#f0c46a	Primary actions / Warm Gold (Amber-aligned)
--secondary	0.35 0 0	#5b5b5b	Secondary UI elements
--accent	0.82 0.08 88	#f0c46a	Highlights and focus
--border	0.2 0 0	#2b2b2b	Low-contrast structural lines
2. Typography

Primary Font: Inter / System Sans (specified in layout.tsx)

Scale Base: 16px (1rem)
Size Token	REM	PX	Usage
text-xs	0.75rem	12px	Captions, metadata
text-sm	0.875rem	14px	Product descriptions, labels
text-base	1rem	16px	Body copy
text-xl	1.25rem	20px	Small headings, card titles
text-4xl	2.25rem	36px	Page titles, Hero headlines
text-7xl	4.5rem	72px	Impact displays / Branding
3. Spacing & Rhythm

Defined via Tailwind 4.0 spacing tokens.

    Base Unit: 4px

    Grid: 8px soft grid.

    Standard Gutters: p-4 (16px) for mobile, p-10 (80px) for desktop.

    Max Section Width: 1280px (centered).

4. Components & Effects

The system uses "Metallic" and "Electric" styling to denote premium quality.

    Electric Border: CSS-driven animation utilizing linear-gradient and conic-gradient (found in electric-border.css).

    Silver Card: Multi-layered background with subtle noise and satin-finish gradients (silver-card.css).

    Sticker Peel: Custom CSS Module effect for interactive product tags (sticker-peel.module.css).

    Border Radius:
        rounded-sm: 2px (Internal components)
        rounded-md: 6px (Standard buttons/inputs)
        rounded-xl: 12px (Main cards/containers)
        rounded-full: Pill buttons

5. Motion Tokens

    --motion-fast: 150ms
    --motion-base: 200ms
    --motion-slow: 400ms

6. Elevation Tokens

    elevation-1: 0 12px 40px rgba(0,0,0,0.35)
    elevation-2: 0 24px 70px rgba(0,0,0,0.45)

7. Iconography

    Library: Lucide React (via Radix UI primitives).

    Weight: 2px (Default).

    Size: 18px-20px for standard interface icons.
