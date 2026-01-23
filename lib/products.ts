export interface Product {
  id: number
  name: string
  type: string
  image: string
  description?: string
  category?: string
  material?: string
  size?: string
  gallery?: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Beaumont",
    type: "Modular Sofa",
    image: "/beaumont-modular-sofa.jpg",
    description:
      "Experience ultimate comfort with our Beaumont Modular Sofa. Designed for flexibility and style, this piece can be configured to fit any living space perfectly. The modular design allows you to customize seating arrangements to match your lifestyle and space requirements.",
    category: "ready-stock",
    material: "Premium Fabric",
    size: "Customizable (L-R: 200-400cm)",
    gallery: [
      "/beaumont-modular-sofa.jpg",
      "/modern-sofa-1.jpg",
      "/modern-sofa-2.jpg",
      "/modern-sofa-3.jpg",
    ],
  },
  {
    id: 2,
    name: "Edmond",
    type: "2 Seater Sofa",
    image: "/edmond-2-seater-sofa.jpg",
    description:
      "The Edmond 2 Seater Sofa combines contemporary design with exceptional comfort. Perfect for compact living spaces without compromising on style. Features high-quality upholstery and a sturdy frame for long-lasting durability.",
    category: "ready-stock",
    material: "Premium Fabric",
    size: "W 180cm H 80cm D 90cm",
    gallery: ["/edmond-2-seater-sofa.jpg", "/two-seater-sofa-1.jpg", "/two-seater-sofa-2.jpg"],
  },
  {
    id: 3,
    name: "Winston",
    type: "2 Seater Sofa",
    image: "/winston-2-seater-sofa.jpg",
    description:
      "The Winston 2 Seater Sofa offers a timeless design with modern comfort features. An ideal choice for creating a cozy seating area in your home. Premium leather upholstery ensures elegance and easy maintenance.",
    category: "2 Seater",
    material: "Premium Leather",
    size: "W 185cm H 85cm D 95cm",
    gallery: ["/winston-2-seater-sofa.jpg", "/leather-sofa-1.jpg", "/leather-sofa-2.jpg"],
  },
  {
    id: 4,
    name: "Dante",
    type: "2 Seater Sofa",
    image: "/dante-2-seater-sofa.jpg",
    description:
      "The Dante 2 Seater features a sleek design with premium upholstery. Perfect for modern living spaces that demand both style and comfort. Crafted with attention to detail and superior construction quality.",
    category: "2 Seater",
    material: "Premium Fabric",
    size: "W 175cm H 78cm D 88cm",
    gallery: ["/dante-2-seater-sofa.jpg", "/modern-2seater-1.jpg", "/modern-2seater-2.jpg"],
  },
  {
    id: 5,
    name: "Trace",
    type: "3 Seater Sofa",
    image: "/trace-3-seater-sofa.jpg",
    description:
      "The Trace 3 Seater Sofa provides ample seating with refined aesthetics. Ideal for family gatherings and comfortable entertaining. Features a spacious seating area with ergonomic design for maximum relaxation.",
    category: "3 Seater",
    material: "Premium Fabric",
    size: "W 220cm H 82cm D 92cm",
    gallery: ["/trace-3-seater-sofa.jpg", "/three-seater-sofa-1.jpg", "/three-seater-sofa-2.jpg"],
  },
  {
    id: 6,
    name: "Garnet",
    type: "3 Seater Sofa",
    image: "/garnet-3-seater-sofa.jpg",
    description:
      "The Garnet 3 Seater combines luxurious comfort with elegant design. A sophisticated choice for contemporary and traditional interiors. Premium craftsmanship and materials ensure lasting beauty and comfort.",
    category: "3 Seater",
    material: "Premium Leather",
    size: "W 225cm H 85cm D 95cm",
    gallery: ["/garnet-3-seater-sofa.jpg", "/luxury-leather-sofa-1.jpg", "/luxury-leather-sofa-2.jpg"],
  },
  {
    id: 7,
    name: "Murphy",
    type: "3 Seater Sofa",
    image: "/murphy-3-seater-sofa.jpg",
    description:
      "The Murphy 3 Seater offers classic comfort with a modern twist. Perfect for creating an inviting focal point in any living room. Combines traditional design elements with contemporary comfort features.",
    category: "3 Seater",
    material: "Premium Fabric",
    size: "W 215cm H 80cm D 90cm",
    gallery: ["/murphy-3-seater-sofa.jpg", "/classic-sofa-1.jpg", "/classic-sofa-2.jpg"],
  },
  {
    id: 8,
    name: "Milo",
    type: "3 Seater Sofa",
    image: "/milo-3-seater-sofa.jpg",
    description:
      "The Milo 3 Seater brings minimalist elegance to your space. Engineered for maximum comfort and durable daily use. Clean lines and simple design make it a versatile choice for any interior style.",
    category: "3 Seater",
    material: "Premium Fabric",
    size: "W 210cm H 79cm D 88cm",
    gallery: [
      "/milo-3-seater-sofa.jpg",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 9,
    name: "Madison",
    type: "U Shape Sofa",
    image: "/images/screenshot-202025-12-30-20at-2015.png",
    description:
      "The Madison U Shape Sofa offers maximum seating comfort for large living spaces. Perfect for family gatherings and entertaining. Features plush cushioning, sturdy wooden frame, and premium upholstery that combines luxury with practicality. The U-shape design creates a cozy conversation area while maximizing space efficiency.",
    category: "U Shape",
    material: "Premium Leather",
    size: "W 365cm H 84cm D 170/188cm",
    gallery: [
      "/images/screenshot-202025-12-30-20at-2015.png",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 10,
    name: "Madeline",
    type: "L Shape Sofa",
    image: "/madeline-l-shape-sofa.jpg",
    description:
      "The Madeline L Shape Sofa maximizes seating in style. Designed for spacious living areas that need flexible, comfortable arrangements. The L-shaped configuration provides ample seating while maintaining a sophisticated appearance suitable for modern homes.",
    category: "L Shape",
    material: "Premium Fabric",
    size: "W 300cm H 85cm D 180cm",
    gallery: [
      "/madeline-l-shape-sofa.jpg",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 11,
    name: "Charlotte",
    type: "L Shape Sofa",
    image: "/charlotte-l-shape-sofa.jpg",
    description:
      "The Charlotte L Shape features premium materials and exceptional craftsmanship. Perfect for creating a luxurious seating corner. Combines elegance with comfort, featuring high-quality leather upholstery and solid wood construction for years of enjoyment.",
    category: "L Shape",
    material: "Premium Leather",
    size: "W 310cm H 88cm D 185cm",
    gallery: [
      "/charlotte-l-shape-sofa.jpg",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 12,
    name: "Lauren",
    type: "L Shape Sofa",
    image: "/lauren-l-shape-sofa.jpg",
    description:
      "The Lauren L Shape combines elegance with practicality. An excellent investment for modern homes seeking comfort and style. Features contemporary design elements with premium fabric upholstery, perfect for creating a cozy family gathering space.",
    category: "L Shape",
    material: "Premium Fabric",
    size: "W 295cm H 83cm D 175cm",
    gallery: [
      "/lauren-l-shape-sofa.jpg",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
]

export const collections = [
  {
    title: "New Arrival",
    image: "/Asset-28.jpg",
  },
  {
    title: "Ready Stock",
    image: "/Asset-29.jpg",
  },
  {
    title: "Sales Stock",
    image: "/Asset-30.jpg",
  },
  {
    title: "All Products",
    image: "/Asset-31.jpg",
  },
]

export function getProductById(id: number) {
  return products.find((p) => p.id === id)
}

export function getRelatedProducts(id: number, limit = 4) {
  return products.filter((p) => p.id !== id).slice(0, limit)
}
