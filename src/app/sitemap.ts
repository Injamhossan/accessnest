import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://accessnest.tech"

  // Static routes
  const staticRoutes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/terms-and-conditions',
    '/privacy-policy',
    '/refund-policy',
    '/how-it-works',
    '/partners'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  let dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    // Fetch all active products
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true, id: true }
    })

    dynamicRoutes = products.map(product => {
      const slug = product.slug || product.id
      return {
        url: `${baseUrl}/products/${slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })
  } catch (error) {
    console.error("Failed to generate sitemap for products:", error)
  }

  return [...staticRoutes, ...dynamicRoutes]
}
