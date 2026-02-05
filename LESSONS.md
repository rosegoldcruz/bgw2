Lessons & Anti-Patterns

Project: Katachi / AEON

Status: Initialized from Codebase Audit & Development History
1. Technical Anti-Patterns (To Be Fixed)

    The In-Memory Trap: The current visualizer-jobs.js stores active AI tasks in a local variable.

        Lesson: In a serverless environment (Vercel), memory is not shared between requests. This must be moved to a Redis or Database layer (Prisma/Supabase) to prevent "lost" jobs.

    Ignoring the Compiler: Multiple "MANUAL PUSH" commits were made while ignoring TypeScript errors.

        Lesson: Technical debt accumulates exponentially. If a type is broken, the design implementation will eventually drift. Strict Mode must be respected to maintain the "Precision" required by the UI/UX Architect role.

    Static Data Scaling: Hardcoding 85 products into a single products.js file makes filtering and searching slow as the catalog grows.

        Lesson: While okay for a MVP, the architecture should prepare for a headless CMS (like Sanity or Contentful) to allow the marketing team to update products without touching code.

2. Design Lessons

    Metallic Contrast: The "Electric Border" effect is powerful but visually "loud."

        Lesson: Use it only for primary CTAs (Call to Actions). Overusing high-contrast metallic effects on every card creates "visual noise" and dilutes the premium feel.

    Visualizer Friction: Initial testing shows users hesitate when asked to upload a photo immediately.

        Lesson: Always provide "Vulpine Presets" (high-res pre-loaded kitchens) to allow users to experience the "magic" of the AI before requiring them to provide their own data.

    Hydration Mismatches: Using dynamic values (like random IDs or timestamps) in the first render causes the UI to "flicker" on load.

        Lesson: Ensure the server and client agree on the initial HTML to maintain a "confident and quiet" loading experience.

    Avoid Visual Gimmicks: Sticker peel logos and heavy hover rotations read as novelty rather than premium.

        Lesson: Keep brand marks flat, restrained, and confident. Movement should signal intent, not personality.

    Nested Scroll Fatigue: Scrollable grids inside a scrollable page slow selection on mobile.

        Lesson: Prefer horizontal swipe cards for first-step selection to keep the journey frictionless.

3. Workflow Improvements

    The "Back of the Fence" Rule: Even if a component is hidden (like a loading skeleton), it must follow the same spacing and radius tokens as the main UI.

    Atomic Consistency: Do not invent a new button style for the Visualizer. Reference the DESIGN_SYSTEM.md and use the Button primitive from @/components/ui.
