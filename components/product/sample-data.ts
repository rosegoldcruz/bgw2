// components/product/sample-data.ts
import type { Product } from './types'

export const sampleProducts: Product[] = [
  {
    id: 'bgw-aurora',
    slug: 'aurora-pivot-steel-door',
    sku: 'BGW-AURORA-01',
    name: 'Aurora Pivot Steel Door',
    shortDescription:
      'Architectural-grade pivot entry door crafted in weathered steel with insulated glass and precision hardware.',
    longDescription: `The Aurora Pivot Steel Door is engineered for dramatic entries that demand both artistry and performance. A thermally-broken steel frame, insulated low-E glass, and multi-point locking hardware deliver outstanding efficiency and security for coastal or desert climates alike.

Each Aurora door is fabricated in our California facility with aerospace tolerances. Hand-burnished patina layers, UV-stable coatings, and marine-grade seals protect against corrosion while preserving the sculpted finish for decades. Choose from multiple widths, custom heights, and interior trims to tailor the door to your project.

Whether anchoring a modern residence or a hospitality flagship, Aurora balances light, privacy, and presence with an effortless pivot motion that feels weightless to the touch.`,
    category: {
      id: 'modern-steel',
      name: 'Modern Steel Doors',
      slug: 'modern-steel',
    },
    price: {
      base: 3899,
      sale: 3499,
      currency: 'USD',
    },
    discount: 10,
    images: [
      {
        id: 'aurora-1',
        url: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1400&q=80&sat=-15&blend=000&blend-mode=multiply',
        thumbnail:
          'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=500&q=60&sat=-15&blend=000&blend-mode=multiply',
        alt: 'Aurora pivot steel door installed in a modern entryway',
        order: 1,
      },
      {
        id: 'aurora-2',
        url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80&sat=-20',
        thumbnail: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=500&q=60&sat=-20',
        alt: 'Detail of patina steel finish with insulated glass',
        order: 2,
      },
      {
        id: 'aurora-3',
        url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80&sat=-20',
        thumbnail: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&q=60&sat=-20',
        alt: 'Interior view of Aurora pivot door with sidelights',
        order: 3,
      },
      {
        id: 'aurora-4',
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80&sat=-10',
        thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=500&q=60&sat=-10',
        alt: 'Close up of pivot hardware and weatherstripping on Aurora door',
        order: 4,
      },
    ],
    options: {
      sizes: [
        { id: '36x96', name: '36" x 96"', priceAdjustment: 0, inStock: true },
        { id: '42x108', name: '42" x 108" (+$450)', priceAdjustment: 450, inStock: true },
        { id: 'custom', name: 'Custom Size — Talk to us', priceAdjustment: 0, inStock: true },
      ],
      finishes: [
        {
          id: 'forge-bronze',
          name: 'Forged Bronze',
          priceAdjustment: 0,
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=70',
          inStock: true,
        },
        {
          id: 'graphite',
          name: 'Graphite Matte',
          priceAdjustment: 175,
          image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=300&q=70',
          inStock: true,
        },
        {
          id: 'opal-white',
          name: 'Opal White',
          priceAdjustment: 220,
          image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=70',
          inStock: true,
        },
      ],
      glassStyles: [
        { id: 'clear-low-e', name: 'Clear Low-E', priceAdjustment: 0, inStock: true },
        { id: 'frosted', name: 'Frosted Privacy (+$120)', priceAdjustment: 120, inStock: true },
        { id: 'reeded', name: 'Reeded Decorative (+$220)', priceAdjustment: 220, inStock: true },
      ],
      hardwarePrice: 150,
    },
    specifications: {
      Dimensions: '36" W x 96" H x 2.25" D (custom sizes available)',
      Material: 'Thermally-broken steel frame with insulated glass',
      Finish: 'Hand-burnished patina with UV-stable clear coat',
      Glass: 'Low-E tempered, available in privacy styles',
      'Energy Rating': 'U-Factor 0.28, SHGC 0.23',
      Weight: '310 lbs',
      Certifications: 'Energy Star Most Efficient, NFRC Certified',
      Hardware: 'Pivot set, concealed closer, multi-point lock',
      Origin: 'Built in Ontario, CA, USA',
    },
    features: [
      'Energy Efficient — U-Factor 0.28 keeps interiors comfortable in all climates.',
      'Weather Resistant — Marine-grade seals block moisture, sand, and drafts.',
      'Customizable — Choose from 9 patina finishes and tailored dimensions.',
      'Security Ready — Multi-point lock and laminated glass deter forced entry.',
      'Silent Motion — Precision pivot hardware glides effortlessly despite weight.',
      'Smart Home Friendly — Optional mag-lock and access control integration.',
      'Sustainable — Recycled steel content and low-VOC finishing systems.',
      'Installation Support — Dedicated project manager and on-site video support.',
    ],
    rating: {
      average: 4.8,
      count: 127,
    },
    inStock: true,
    deliveryTime: '4-6 weeks',
    isNew: true,
    isBestSeller: true,
    relatedProducts: ['bgw-harbor', 'bgw-elysian'],
  },
  {
    id: 'bgw-harbor',
    slug: 'harbor-mission-wood-door',
    sku: 'BGW-HARBOR-02',
    name: 'Harbor Mission Wood Door',
    shortDescription:
      'Solid mahogany mission-style entry door with insulated glass, bronze clavos, and artisan joinery.',
    longDescription:
      'Hand-selected Honduran mahogany meets mission-style geometry in the Harbor collection. Triple-layer lamination, moisture-equalizing cores, and deep-set insulated glass create a door that resists warping while showcasing rich grain movement.',
    category: {
      id: 'craft-wood',
      name: 'Crafted Wood Doors',
      slug: 'crafted-wood',
    },
    price: {
      base: 2899,
      currency: 'USD',
    },
    images: [
      {
        id: 'harbor-1',
        url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80&sat=-5',
        thumbnail: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=60&sat=-5',
        alt: 'Mission wood door with sidelights and wrought iron grille',
        order: 1,
      },
      {
        id: 'harbor-2',
        url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80&sat=-5',
        thumbnail: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=60&sat=-5',
        alt: 'Close up of mahogany grain and bronze clavos',
        order: 2,
      },
    ],
    options: {
      sizes: [
        { id: '36x80', name: '36" x 80" (Standard)', priceAdjustment: 0, inStock: true },
        { id: '42x84', name: '42" x 84" (+$320)', priceAdjustment: 320, inStock: true },
      ],
      finishes: [
        { id: 'natural', name: 'Natural Mahogany', priceAdjustment: 0, inStock: true },
        { id: 'espresso', name: 'Espresso', priceAdjustment: 120, inStock: true },
      ],
      glassStyles: [
        { id: 'clear-beveled', name: 'Clear Beveled', priceAdjustment: 0, inStock: true },
        { id: 'seedy', name: 'Seedy Antique (+$90)', priceAdjustment: 90, inStock: true },
      ],
      hardwarePrice: 150,
    },
    specifications: {
      Dimensions: '36" W x 80" H x 2.25" D',
      Material: 'Solid mahogany with engineered stave core',
      Finish: 'Hand-rubbed oil or low-sheen polyurethane',
      Glass: 'Insulated decorative grille',
      'Energy Rating': 'U-Factor 0.30',
      Weight: '215 lbs',
      Certifications: 'FSC Certified lumber, CARB compliant',
      Hardware: 'Oil-rubbed bronze handle set optional',
      Origin: 'Crafted in Ontario, CA, USA',
    },
    features: [
      'Lifetime warranty on structure and core stability.',
      'Hand-forged bronze clavos and grille detailing.',
      'Option to add concealed multi-point locking.',
      'Pre-hung with weatherstripping and adjustable sill.',
    ],
    rating: {
      average: 4.7,
      count: 89,
    },
    inStock: true,
    deliveryTime: '6-8 weeks',
    isBestSeller: true,
    relatedProducts: ['bgw-aurora', 'bgw-elysian'],
  },
  {
    id: 'bgw-elysian',
    slug: 'elysian-glass-fiberglass-door',
    sku: 'BGW-ELYSIAN-05',
    name: 'Elysian Frost Fiberglass Door',
    shortDescription:
      'High-performance fiberglass entry system with etched glass, triple weather seals, and smart lock readiness.',
    longDescription:
      'Elysian pairs designer glass patterns with paint-ready fiberglass skins that emulate cast aluminum. A glued and dowelled LVL core keeps the slab rigid while remaining lightweight for effortless operation.',
    category: {
      id: 'fiberglass',
      name: 'Fiberglass Doors',
      slug: 'fiberglass',
    },
    price: {
      base: 1899,
      sale: 1699,
      currency: 'USD',
    },
    discount: 11,
    images: [
      {
        id: 'elysian-1',
        url: 'https://images.unsplash.com/photo-1449247519674-d4461a6a6103?auto=format&fit=crop&w=1400&q=80&sat=-5',
        thumbnail: 'https://images.unsplash.com/photo-1449247519674-d4461a6a6103?auto=format&fit=crop&w=400&q=60&sat=-5',
        alt: 'Fiberglass entry door with frosted glass and side lights',
        order: 1,
      },
      {
        id: 'elysian-2',
        url: 'https://images.unsplash.com/photo-1459535653751-d571815e906b?auto=format&fit=crop&w=1400&q=80&sat=-5',
        thumbnail: 'https://images.unsplash.com/photo-1459535653751-d571815e906b?auto=format&fit=crop&w=400&q=60&sat=-5',
        alt: 'Close up of etched glass pattern on fiberglass door',
        order: 2,
      },
    ],
    options: {
      sizes: [
        { id: 'single', name: 'Single Door 36" x 80"', priceAdjustment: 0, inStock: true },
        { id: 'double', name: 'Double Door Set 72" x 80" (+$650)', priceAdjustment: 650, inStock: true },
      ],
      finishes: [
        { id: 'polar-white', name: 'Polar White', priceAdjustment: 0, inStock: true },
        { id: 'storm-gray', name: 'Storm Gray', priceAdjustment: 95, inStock: true },
        { id: 'onyx', name: 'Onyx Black', priceAdjustment: 120, inStock: true },
      ],
      glassStyles: [
        { id: 'frosted', name: 'Frosted', priceAdjustment: 0, inStock: true },
        { id: 'clear', name: 'Clear', priceAdjustment: 0, inStock: true },
        { id: 'decorative', name: 'Decorative Grid (+$140)', priceAdjustment: 140, inStock: true },
      ],
      hardwarePrice: 180,
    },
    specifications: {
      Dimensions: '36" W x 80" H x 1.75" D',
      Material: 'Fiberglass skins over LVL + foam core',
      Finish: 'Factory paint or stain-ready',
      Glass: 'Triple pane etched safety glass',
      'Energy Rating': 'U-Factor 0.24, ENERGY STAR 7.0',
      Weight: '165 lbs',
      Certifications: 'ENERGY STAR 7.0, Florida HVHZ',
      Hardware: 'Smart lock compatible 5" bore prep',
      Origin: 'Built in Phoenix, AZ, USA',
    },
    features: [
      'Foam-filled core delivers industry-leading R-value.',
      'Integrated smart lock prep for effortless upgrades.',
      'Triple weather seals block wind-driven rain.',
      'Impact-rated glass option for coastal code compliance.',
    ],
    rating: {
      average: 4.6,
      count: 64,
    },
    inStock: true,
    deliveryTime: '3-4 weeks',
    isNew: false,
    relatedProducts: ['bgw-aurora'],
  },
]

export const productBySlug = Object.fromEntries(sampleProducts.map((product) => [product.slug, product]))
