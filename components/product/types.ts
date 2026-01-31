// components/product/types.ts
export interface ProductImage {
  id: string
  url: string
  alt: string
  thumbnail: string
  order: number
}

export interface Option {
  id: string
  name: string
  priceAdjustment?: number
  image?: string
  inStock: boolean
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
}

export interface ProductRating {
  average: number
  count: number
}

export interface ProductPricing {
  base: number
  sale?: number
  currency: string
}

export interface Product {
  id: string
  slug: string
  sku: string
  name: string
  shortDescription: string
  longDescription: string
  category: ProductCategory
  price: ProductPricing
  images: ProductImage[]
  options: {
    sizes?: Option[]
    finishes?: Option[]
    glassStyles?: Option[]
    hardwarePrice?: number
  }
  specifications: Record<string, string>
  features: string[]
  rating?: ProductRating
  inStock: boolean
  deliveryTime: string
  isNew?: boolean
  isBestSeller?: boolean
  discount?: number
  relatedProducts?: string[]
}

export interface ProductOptionsState {
  size: string | null
  finish: string | null
  glass: string | null
  hardware: boolean
}
