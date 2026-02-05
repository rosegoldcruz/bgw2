Frontend Guidelines: Katachi / AEON

Status: Initialized from Codebase Scan

Architecture: Feature-Driven Atomic Components
1. Component Architecture

The project follows a modular structure, separating reusable primitives from feature-specific logic.

    UI Primitives (/components/ui): Highly reusable, low-level components (Buttons, Cards, Inputs). Powered by Radix UI for accessibility and shadcn/ui patterns.

    Feature Components (/components/visualizer, /components/product): Complex, stateful components tied to specific business logic (e.g., the AR door visualizer).

    Layouts (/app/layout.tsx): Root-level wrappers managing global state, fonts, and the master grid.

2. Styling & Implementation

    Engine: Tailwind CSS 4.0 (utilizing the new @theme block in CSS).

    Dynamic Styles: Managed via cva (Class Variance Authority) for clean, type-safe component variants.

    Precision: Use of clsx and tailwind-merge (lib/utils.ts) is mandatory to prevent class collisions.

    Metallic Theme: Specific global classes (.silver-card, .electric-border) must be applied via className to maintain the premium "Apple-esque" finish.

3. State Management & Data Fetching

    Client State: Standard React useState and useReducer for local UI states (e.g., toggles, active product selection).

    Server Logic: Heavy reliance on Next.js 15 Server Components by default.

    Hooks: * use-mobile.ts: Standardizes responsive behavior.

        use-toast.ts: Centralized feedback system.

    Visualizer Polling: A custom useEffect pattern is currently used to poll the Replicate API status from /api/visualizer/status.

4. Animation & Motion

    Core: CSS Transitions and Keyframe animations.

    Philosophy: Motion should be functional, not decorative.

        Entrance: Subtle 10px Y-axis slide with opacity-0 to opacity-100.

        Hover: Micro-scale changes (e.g., scale-[1.02]) on product cards.

        Loading: Shimmer/Skeleton states found in components/ui are used to maintain visual stability during data fetching.

5. Coding Standards

    TypeScript: All new components must be strictly typed. Avoid any. Note: Current suppressHydrationWarning flags in layout.tsx are temporary.

    File Naming: Kebab-case for folders/files, PascalCase for React components.

    Clean Code: Remove console.log and debugging stubs before pushing to production (refer to LESSONS.md).