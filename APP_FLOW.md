Application Flow: Katachi / AEON

Status: Initialized from Codebase Scan & V3 Configurator Logic

Navigation Philosophy: Flat Hierarchy, Deep Focus, No Dead Ends
1. Global Navigation Structure

The app uses a header-driven navigation model with a focus on high-intent conversion points.
Route	View	Purpose
/	Landing / Hero	High-level brand positioning and entry to the Visualizer.
/visualizer	AR Configurator	The core "killer feature." AI-driven kitchen transformation.
/shop	Product Catalog	Aggregated view of all 85+ products (Doors, Hardware, Windows).
/cabinets	Category Page	Deep dive into cabinet refacing styles and options.
/windows	Category Page	Specialized iron and glass window configurations.
/api/visualize	System Route	Serverless endpoint for Replicate API / AI orchestration.
2. The V3 Configurator Flow (The "Inevitable" Journey)

The Visualizer is a state-driven experience designed to feel like a high-end physical showroom.

    Entry: User lands on /visualizer.

    Upload/Select: User uploads a kitchen photo or selects a high-fidelity "Vulpine" preset.

    Style Selection:

        Options: Shaker Classic, Shaker Slide, Fusion Shaker, Fusion Slide, Slab.

        Action: User selects a style; UI updates the "floating detail card."

    Color/Finish Selection:

        Logic: System filters available colors based on style (e.g., Flour, Graphite, Storm).

        Action: Selection triggers an instant scene swap or overlay.

    Hardware Selection: Final refinement of handles and pulls.

    Processing: * UI displays a "Metallic Shimmer" loading state.

        Client polls /api/visualizer/status for the Replicate/Nano Banana output.

    Final Reveal: High-fidelity image output with a "Sticker Peel" tag showing the itemized product list.

3. Product Discovery Journey

    Path A (Direct): Hero → Shop → Product Detail [/product/[slug]] → Inquiry.

    Path B (Inspirational): Visualizer → Item Identification → Shop → Checkout/Inquiry.

4. Error & Edge Case Flow

    Invalid Upload: If the AI cannot detect a kitchen, the user is guided back to "Use a Preset" to maintain momentum.

    Polling Timeout: If the job store fails (noted as a current risk in progress.txt), the UI offers a "Notify me when ready" fallback rather than a hard crash.