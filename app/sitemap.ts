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

  return routes;
}
