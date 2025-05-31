import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Reconstruct __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticRoutes = [
  "/",
  "/about/imm-legacy",
  "/about/leadership",
  "/about/advisory-board",
  "/about/imm-partners",
  "/about/accreditations-awards",
  "/programs/pgdm",
  "/programs/bba",
  "/faculty-and-research/faculty",
  "/faculty-and-research/research",
  "/faculty-and-research/international-conference",
  "/faculty-and-research/national-conference",
  "/admissions",
  "/corporate-connect/industry-visit",
  "/corporate-connect/industry-lectures-and-webinars",
  "/corporate-connect/corporate-events",
  "/corporate-connect/recruit-and-partner",
  "/life-at-imm/events-and-activities",
  "/life-at-imm/clubs-at-imm",
  "/life-at-imm/life-at-imm",
  "/placements/campus-recruitment",
  "/placements/placement-records",
  "/alumni/dazzling-divas",
  "/alumni/hall-of-fame",
  "/blog",
  // We need to handle dynamic blog routes separately if possible, or list them manually.
  // For now, we'll skip dynamic /blog/:slug
  "/contact-us",
  "/life-at-imm/gallery",
  "/gallery",
  "/privacy-policy",
  "/disclaimer",
  "/aicte-approval",
  "/career",
  // We need to handle dynamic career routes separately if possible, or list them manually.
  // For now, we'll skip dynamic /career/:job-opening
  "/feedback",
  "/nirf",
];

const getJobSlugs = () => {
  try {
    const jobDataPath = path.resolve(
      __dirname,
      "src",
      "app",
      "footerLinkComponents",
      "career",
      "jobData.js"
    );
    const jobDataContent = fs.readFileSync(jobDataPath, "utf8");
    const match = jobDataContent.match(
      /export const jobListings = ([\s\S]*?];)/
    );
    if (match && match[1]) {
      // This usage of eval can be a security risk if the source of jobData.js is not trusted.
      // Consider using a safer parsing method if this is a concern.
      const jobListings = eval(match[1]);
      return jobListings.map((job) => `/career/${job.slug}`);
    }
    console.warn("Could not find or parse jobListings in jobData.js");
    return [];
  } catch (error) {
    console.error("Error reading or parsing jobData.js:", error);
    return [];
  }
};

const generateSitemap = () => {
  const baseUrl = "https://www.immindia.edu.in";
  const jobRoutes = getJobSlugs();
  const allRoutes = [...staticRoutes, ...jobRoutes];

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes
        .map((route) => {
          return `
            <url>
              <loc>${baseUrl}${route}</loc>
              <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  const sitemapPath = path.resolve(__dirname, "public", "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap.trim());
  console.log("Sitemap generated successfully at public/sitemap.xml");
  console.log("Included static routes count:", staticRoutes.length);
  console.log("Included job routes count:", jobRoutes.length);
  console.log("Total routes in sitemap:", allRoutes.length);
  if (jobRoutes.length === 0) {
    console.warn(
      "No job routes were found or added. Check src/app/footerLinkComponents/career/jobData.js and the parsing logic in generate-sitemap.js."
    );
  }
};

generateSitemap();
