import type { MetadataRoute } from 'next'

import { routeData } from '@/lib/sitemap-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ponyclub.gr'

  const routes = routeData.map(({ route, fileMtime }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(fileMtime * 1000).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Generate localized routes for i18n
  const locales = ['en', 'el']
  const localizedRoutes: MetadataRoute.Sitemap = []

  routeData.forEach(({ route, fileMtime }) => {
    locales.forEach(locale => {
      // Ensure the path starts with a slash if it's not empty
      const pathSegment = route.startsWith('/') ? route : `/${route}`
      // Handle the root path correctly for locales
      const finalPath = route === '' ? `/${locale}` : `/${locale}${pathSegment}`

      localizedRoutes.push({
        url: `${baseUrl}${finalPath}`,
        lastModified: new Date(fileMtime * 1000).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return localizedRoutes
}
