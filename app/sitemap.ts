import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ponyclub.gr';
  
  // Define all the routes in your application
  const routes = [
    '',
    '/kayak-rafting',
    '/kayaking',
    '/rafting',
    '/riding',
    '/river-village',
    '/trekking',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
} 