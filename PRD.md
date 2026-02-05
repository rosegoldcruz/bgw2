Product Requirements Document: Katachi / AEON

Status: Reverse-Engineered from Codebase & Product Data

Objective: Provide a high-end, AI-powered digital showroom for premium cabinet refacing and home hardware.
1. Core Feature: AI Visualizer (The "Aeon" Engine)

The primary value proposition is the ability for users to see premium products in their own space before purchasing.

    Input: User-uploaded kitchen photos or high-fidelity base presets.

    Processing: Integration with Replicate API (Google Nano Banana model) for image-to-image kitchen transformation.

    Real-time Configuration: Users must be able to toggle styles (Shaker, Fusion, Slab) and finishes (Flour, Graphite, Storm, etc.) dynamically.

    Job Management: A backend polling system to track the status of AI generations.

2. Product Catalog & Taxonomy

The system manages 85 unique products across 7 distinct categories.

    Categories: Cabinets, Windows, Iron Doors, Hardware, Accessories.

    Dynamic Routing: Every product requires a unique slug-based detail page (/product/[slug]).

    Metadata: Each product entry in data/products.js must include name, category, material description, and high-res image paths.

3. User Experience Requirements

    Frictionless Discovery: Users should reach a product detail page in 3 clicks or less from the landing page.

    Visual Fidelity: The UI must support the "Metallic" design language (silver cards, electric borders) to match the premium nature of the physical products.

    Responsiveness: The visualizer must be fully functional on mobile devices, optimized for "thumb-driven" configuration.

4. Current Constraints & Requirements

    Static Data: The current iteration uses a static JSON/JS file for products. The system must be designed to eventually support a CMS without breaking the frontend layout.

    No Auth (Phase 1): The initial release focuses on public browsing and inquiry generation. User accounts and "Saved Designs" are identified as future enhancements.

    Inquiry System: A simple, direct call-to-action (CTA) on every product and visualizer output to bridge the gap between digital browsing and physical sales.