/**
 * Dynamic Sitemap for ScaleUp Web
 * Auto-generated for Google & Bing indexing
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
import { servicesData } from "../data/servicesData";
import { blogsData } from "../data/blogsData";

export default function sitemap() {
  const baseUrl = "https://www.scaleupweb.xyz";
  const lastModified = new Date();

  const staticPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const servicePages = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogPages = blogsData.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}

