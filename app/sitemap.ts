import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ponyclub.gr';

  // Map of routes to their last modified Unix timestamps
  // Using 1745668341 as a placeholder mtime for new routes
  const routeData = [
    { route: '', fileMtime: 1745668341 }, // /
    { route: '/kayaking', fileMtime: 1745659457 },
    { route: '/rafting', fileMtime: 1745659457 },
    { route: '/riding', fileMtime: 1745665844 },
    { route: '/river-village', fileMtime: 1745665900 },
    { route: '/trekking', fileMtime: 1745665880 },
    { route: '/ziplining', fileMtime: 1745665971 },
    { route: '/for-schools', fileMtime: 1745668341 },
    { route: '/kayak-rafting', fileMtime: 1745668341 },
  ];

  const routes = routeData.map(({ route, fileMtime }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(fileMtime * 1000).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // New logic for i18n sitemap
  const locales = ['en', 'el'];
  const localizedRoutes: MetadataRoute.Sitemap = [];

  routeData.forEach(({ route, fileMtime }) => {
    locales.forEach(locale => {
      // Ensure the path starts with a slash if it's not empty
      const pathSegment = route.startsWith('/') ? route : `/${route}`;
      // Handle the root path correctly for locales
      const finalPath = route === '' ? `/${locale}` : `/${locale}${pathSegment}`;

      localizedRoutes.push({
        url: `${baseUrl}${finalPath}`,
        lastModified: new Date(fileMtime * 1000).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8, // Priority might be the same for localized versions
        // It's good practice to include <xhtml:link rel="alternate" hreflang="x"/> in sitemaps
        // but MetadataRoute.Sitemap type doesn't directly support it.
        // Next.js might handle this if `alternates` is set in page metadata.
        // For now, just generating the localized URLs.
      });
    });
  });

  return localizedRoutes;
}
