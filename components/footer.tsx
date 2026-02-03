// components/footer.tsx
"use client"
import { Instagram, Facebook, Youtube } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 border-t border-white/10 text-gray-300">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Column 1 - Brand */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">BGW Doors</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Premium fiberglass, wood, iron doors, cabinets, windows, and hardware engineered for nationwide delivery. Built for security, performance, and elevated curb appeal.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="TikTok">
                {/* Custom TikTok Icon since it might be missing in older Lucide versions */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>

            <a 
              href="/visualizer" 
              className="inline-block px-6 py-3 bg-white text-neutral-900 font-medium rounded-full hover:bg-gray-100 transition-colors text-sm"
            >
              Visualize on Your Home
            </a>
          </div>

          {/* Column 2 - Products */}
          <div>
            <h4 className="font-semibold text-white mb-6">Products</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/shop?category=iron" className="hover:text-white transition-colors">Iron Doors</a></li>
              <li><a href="/shop?category=fiberglass" className="hover:text-white transition-colors">Fiberglass Doors</a></li>
              <li><a href="/shop?category=wood" className="hover:text-white transition-colors">Wood Doors</a></li>
              <li><a href="/shop?category=slab" className="hover:text-white transition-colors">Slab Doors</a></li>
              <li><a href="/cabinets" className="hover:text-white transition-colors">Cabinets</a></li>
              <li><a href="/windows" className="hover:text-white transition-colors">Windows</a></li>
              <li><a href="/hardware" className="hover:text-white transition-colors">Door Hardware</a></li>
            </ul>
          </div>

          {/* Column 3 - Tools */}
          <div>
            <h4 className="font-semibold text-white mb-6">Tools</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/visualizer" className="hover:text-white transition-colors">Door Visualizer</a></li>
              <li><a href="/visualizer/cabinets" className="hover:text-white transition-colors">Cabinet Visualizer</a></li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/craftsmanship" className="hover:text-white transition-colors">Craftsmanship</a></li>
              <li><a href="/sustainability" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/press" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 5 - Support */}
          <div>
            <h4 className="font-semibold text-white mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="/warranty" className="hover:text-white transition-colors">Warranty</a></li>
              <li><a href="/installation" className="hover:text-white transition-colors">Installation Guide</a></li>
              <li><a href="/care" className="hover:text-white transition-colors">Care & Maintenance</a></li>
              <li><a href="/faqs" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/returns" className="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} BGW Doors. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
