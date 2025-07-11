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
  "/contact-us",
  "/life-at-imm/gallery",
  "/gallery",
  "/privacy-policy",
  "/disclaimer",
  "/aicte-approval",
  "/career",
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

const getBlogSlugs = async () => {
  try {
    console.log("🔍 Fetching blog posts from WordPress API...");

    // WordPress REST API configuration
    const baseApiUrl = "https://stealthlearn.in/immblog/wp-json/wp/v2/posts";
    const postsPerPage = 100; // Maximum posts per request
    let allPosts = [];
    let currentPage = 1;
    let hasMorePosts = true;

    while (hasMorePosts) {
      try {
        const apiUrl = `${baseApiUrl}?per_page=${postsPerPage}&page=${currentPage}&status=publish`;
        console.log(`📄 Fetching page ${currentPage}: ${apiUrl}`);

        const response = await fetch(apiUrl, {
          headers: {
            "User-Agent": "IMM-Sitemap-Generator/1.0",
            Accept: "application/json",
          },
          timeout: 10000, // 10 second timeout
        });

        if (!response.ok) {
          if (response.status === 404 || response.status === 400) {
            console.log(`📝 No more posts found at page ${currentPage}`);
            hasMorePosts = false;
            break;
          }
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const pageData = await response.json();

        // Check if we got any posts
        if (!pageData || pageData.length === 0) {
          console.log(`📝 No posts returned from page ${currentPage}`);
          hasMorePosts = false;
          break;
        }

        // Filter and validate posts
        const validPosts = pageData.filter(
          (post) =>
            post &&
            post.slug &&
            post.status === "publish" &&
            post.type === "post"
        );

        allPosts = [...allPosts, ...validPosts];

        console.log(
          `✅ Fetched ${validPosts.length} valid posts from page ${currentPage}`
        );

        // Check if we got fewer posts than requested (indicating last page)
        if (pageData.length < postsPerPage) {
          hasMorePosts = false;
        } else {
          currentPage++;
        }

        // Add delay to be respectful to the API
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (pageError) {
        console.error(
          `❌ Error fetching page ${currentPage}:`,
          pageError.message
        );
        hasMorePosts = false;
      }
    }

    // Generate blog routes from collected posts
    const blogRoutes = allPosts.map((post) => {
      // Clean the slug to ensure it's URL-safe
      const cleanSlug = post.slug.replace(/[^a-zA-Z0-9-]/g, "");
      return `/blog/${cleanSlug}`;
    });

    // Remove duplicates (just in case)
    const uniqueBlogRoutes = [...new Set(blogRoutes)];

    console.log(
      `🎉 Successfully generated ${uniqueBlogRoutes.length} unique blog routes from ${allPosts.length} posts`
    );

    // Log sample posts for verification
    if (allPosts.length > 0) {
      console.log("\n📋 Sample blog posts found:");
      allPosts.slice(0, 3).forEach((post, index) => {
        console.log(
          `   ${index + 1}. "${post.title.rendered}" -> /blog/${post.slug}`
        );
      });
      if (allPosts.length > 3) {
        console.log(`   ... and ${allPosts.length - 3} more posts`);
      }
    }

    return uniqueBlogRoutes;
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error.message);
    console.warn("⚠️  Skipping blog posts in sitemap due to API error");

    // Return empty array instead of failing completely
    return [];
  }
};

const generateSitemap = async () => {
  const baseUrl = "https://www.immindia.edu.in";

  console.log("🚀 Starting sitemap generation...\n");

  // Get job slugs synchronously
  console.log("💼 Fetching job routes...");
  const jobRoutes = getJobSlugs();
  console.log(`✅ Found ${jobRoutes.length} job routes\n`);

  // Get blog slugs asynchronously
  const blogRoutes = await getBlogSlugs();
  console.log(`✅ Found ${blogRoutes.length} blog routes\n`);

  // Combine all routes
  const allRoutes = [...staticRoutes, ...jobRoutes, ...blogRoutes];

  // Generate sitemap XML
  const currentDate = new Date().toISOString().split("T")[0];

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes
        .map((route) => {
          // Set different priorities for different route types
          let priority = "0.8";
          let changefreq = "daily";

          if (route === "/") {
            priority = "1.0";
          } else if (route.startsWith("/blog/")) {
            priority = "0.7";
            changefreq = "weekly";
          } else if (route.startsWith("/career/")) {
            priority = "0.6";
            changefreq = "monthly";
          }

          return `
            <url>
              <loc>${baseUrl}${route}</loc>
              <lastmod>${currentDate}</lastmod>
              <changefreq>${changefreq}</changefreq>
              <priority>${priority}</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>`;

  const sitemapPath = path.resolve(__dirname, "public", "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap.trim());

  // Generate summary
  console.log("🎯 SITEMAP GENERATION COMPLETE!");
  console.log("═".repeat(50));
  console.log(`📍 Location: public/sitemap.xml`);
  console.log(`📄 Static routes: ${staticRoutes.length}`);
  console.log(`💼 Job routes: ${jobRoutes.length}`);
  console.log(`📝 Blog routes: ${blogRoutes.length}`);
  console.log(`🔗 Total URLs: ${allRoutes.length}`);
  console.log("═".repeat(50));

  if (jobRoutes.length === 0) {
    console.warn("⚠️  No job routes found. Check jobData.js file.");
  }

  if (blogRoutes.length === 0) {
    console.warn("⚠️  No blog routes found. Check WordPress API connection.");
  }

  console.log(`✨ Sitemap available at: ${baseUrl}/sitemap.xml\n`);
};

// Execute the sitemap generation
generateSitemap().catch((error) => {
  console.error("💥 Fatal error during sitemap generation:", error);
  process.exit(1);
});
