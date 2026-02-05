Technical Stack: Katachi / AEON

Status: Initialized from package.json and tsconfig.json

Philosophy: Bleeding Edge, Type-Safe, High-Performance
1. Core Framework & Environment

    Framework: Next.js 15.2.6 (App Router)

    Runtime: React 19 (Concurrent Mode enabled)

    Language: TypeScript 5.x (Strict Mode)

    Build Tool: Next.js Compiler (SWC)

    Styling: Tailwind CSS 4.1.9 (Using the new high-performance engine)

2. UI & Interaction

    Primitives: Radix UI (26 specialized packages including Dialog, Popover, Select, and Scroll-Area).

    Design System Implementation: shadcn/ui patterns using CVA (Class Variance Authority) for variant management.

    Animation: Framer Motion (for complex orchestration) and Native CSS Keyframes (for the "Electric" metallic effects).

    Icons: Lucide React.

3. AI & Image Processing

    Orchestration: Replicate API integration.

    Model: Google Nano Banana (via Replicate) for Image-to-Image / Inpainting kitchen transformations.

    Status Handling: Custom polling logic in lib/visualizer-jobs.js.

4. Backend & Utilities

    API Routes: Next.js Route Handlers (Edge-ready).

    Data Handling: Static JSON (data/products.js) currently serves as the database for 85 products.

    Utility Library: clsx, tailwind-merge (for dynamic class resolution).

    Feedback: sonner / toast for user notifications.

5. Infrastructure (Identified)

    Deployment: Vercel (assumed based on Next.js 15/App Router patterns).

    Environment: .env.local for Replicate API keys and local development configurations.