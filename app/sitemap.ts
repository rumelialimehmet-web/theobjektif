import { MetadataRoute } from 'next'
import { CATEGORIES } from '@/lib/categories'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theobjektif.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/nasil-test-ediyoruz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/objektif-puan-sistemi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en-iyiler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = Object.entries(CATEGORIES).map(([slug, data]) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Subcategory pages
  const subcategoryPages: MetadataRoute.Sitemap = []
  Object.entries(CATEGORIES).forEach(([catSlug, catData]) => {
    Object.keys(catData.subcategories).forEach((subSlug) => {
      subcategoryPages.push({
        url: `${baseUrl}/${catSlug}/${subSlug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      })
    })
  })

  // Product pages - Supabase'den çek
  const { data: products } = await supabase.from('products').select('slug, category, subcategory, created_at')

  const productPages: MetadataRoute.Sitemap = (products || []).map((product) => ({
    url: `${baseUrl}/${product.category}/${product.subcategory}/${product.slug}`,
    lastModified: product.created_at ? new Date(product.created_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  return [...staticPages, ...categoryPages, ...subcategoryPages, ...productPages]
}
