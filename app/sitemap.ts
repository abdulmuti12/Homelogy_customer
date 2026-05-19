import type { MetadataRoute } from "next"
import { products } from "@/lib/products"

const BASE_URL = "https://homelogystyle.com"

const staticRoutes = [
  "",
  "/about",
  "/contact",
  "/products",
  "/projects",
  "/press",
  "/catalogue",
]

const productCategories = ["all", "new-arrival", "ready-stock", "sales-stock"]

type ProjectApiResponse = {
  success?: boolean
  data?: {
    data?: Array<{ id: number }>
  }
}

type PressItem = { id: number }
type PressApiResponse = {
  success?: boolean
  data?: {
    data?: PressItem[]
    current_page?: number
    last_page?: number
  }
}

async function fetchProjectIds(): Promise<number[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/customers/project`, {
      next: { revalidate: 3600 },
    })
    if (!response.ok) return []

    const json = (await response.json()) as ProjectApiResponse
    return (json.data?.data ?? []).map((item) => item.id).filter(Boolean)
  } catch {
    return []
  }
}

async function fetchPressIds(): Promise<number[]> {
  try {
    const firstPageResponse = await fetch(`${BASE_URL}/api/press?page=1`, {
      next: { revalidate: 3600 },
    })
    if (!firstPageResponse.ok) return []

    const firstPageJson = (await firstPageResponse.json()) as PressApiResponse
    const firstItems = firstPageJson.data?.data ?? []
    const lastPage = Math.max(1, firstPageJson.data?.last_page ?? 1)

    const ids = new Set<number>(firstItems.map((item) => item.id).filter(Boolean))
    if (lastPage === 1) return Array.from(ids)

    const pageRequests: Promise<Response>[] = []
    for (let page = 2; page <= lastPage; page += 1) {
      pageRequests.push(
        fetch(`${BASE_URL}/api/press?page=${page}`, {
          next: { revalidate: 3600 },
        }),
      )
    }

    const pageResponses = await Promise.all(pageRequests)
    const validResponses = pageResponses.filter((res) => res.ok)
    const pagesJson = (await Promise.all(validResponses.map((res) => res.json()))) as PressApiResponse[]

    for (const pageJson of pagesJson) {
      for (const item of pageJson.data?.data ?? []) {
        if (item.id) ids.add(item.id)
      }
    }

    return Array.from(ids)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectIds, pressIds] = await Promise.all([fetchProjectIds(), fetchPressIds()])
  const now = new Date()

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }))

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/item/${product.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const categoryUrls: MetadataRoute.Sitemap = productCategories.map((category) => ({
    url: `${BASE_URL}/products/category/${category}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const projectUrls: MetadataRoute.Sitemap = projectIds.map((id) => ({
    url: `${BASE_URL}/projects/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const pressUrls: MetadataRoute.Sitemap = pressIds.map((id) => ({
    url: `${BASE_URL}/press/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticUrls, ...productUrls, ...categoryUrls, ...projectUrls, ...pressUrls]
}
