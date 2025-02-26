import { useState, useEffect } from "react";
import { Heart, Bookmark, Share, Clock } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    fetchPost();
    fetchRecentPosts();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://www.immindia.edu.in/blog/wp-json/wp/v2/posts?slug=${slug}&_embed`
      );
      const data = await response.json();
      if (data.length > 0) {
        setPost(data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setLoading(false);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const response = await fetch(
        `https://www.immindia.edu.in/blog/wp-json/wp/v2/posts?_embed&per_page=2&exclude=${
          post?.id || 0
        }`
      );
      const data = await response.json();
      setRecentPosts(data);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Post not found</p>
      </div>
    );
  }

  // Strip HTML tags from excerpt for meta description
  const metaDescription = post.excerpt.rendered
    .replace(/<[^>]+>/g, "")
    .slice(0, 160);
  const canonicalUrl = `https://www.immindia.edu.in/blog/${slug}`;
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{post.title.rendered} | IMM India</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph tags */}
        <meta property="og:title" content={post.title.rendered} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {featuredImage && <meta property="og:image" content={featuredImage} />}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title.rendered} />
        <meta name="twitter:description" content={metaDescription} />
        {featuredImage && <meta name="twitter:image" content={featuredImage} />}

        {/* Article specific meta tags */}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.modified} />
      </Helmet>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              className="w-full h-auto  object-cover"
              src={post._embedded["wp:featuredmedia"][0].source_url}
              alt={post.title.rendered}
            />
          )}

          <div className="p-8">
            {/* Article Meta */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-5 w-5 mr-1" />
                <span className="text-sm">
                  {Math.ceil(post.content.rendered.split(" ").length / 200)} min
                  read
                </span>
              </div>
            </div>

            {/* Article Title */}
            <h1
              className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Article Content */}
            <div className="prose prose-lg max-w-none article-content">
              <style>
                {`
                  .article-content {
                    color: #374151;
                    line-height: 1.8;
                  }
                  .article-content p {
                    margin-bottom: 1.5rem;
                    font-size: 1rem;
                  }
                  .article-content h2 {
                    font-size: 1.875rem;
                    font-weight: 700;
                    color: #111827;
                    margin-top: 2.5rem;
                    margin-bottom: 1.25rem;
                  }
                  .article-content h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1F2937;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                  }
                  .article-content ul, .article-content ol {
                    margin-left: 1.5rem;
                    margin-bottom: 1.5rem;
                    list-style-type: disc;
                  }
                  .article-content ol {
                    margin-left: 1.5rem;
                    margin-bottom: 1.5rem;
                    list-style-type: decimal;
                  }
                  .article-content li {
                    margin-bottom: 0.5rem;
                  }
                  .article-content blockquote {
                    border-left: 4px solid #6366F1;
                    padding-left: 1rem;
                    margin: 2rem 0;
                    font-style: italic;
                    color: #4B5563;
                  }
                  .article-content img {
                    border-radius: 0.5rem;
                    margin: 2rem 0;
                  }
                  .article-content a {
                    color: #4F46E5;
                    text-decoration: underline;
                  }
                  .article-content pre {
                    background: #F3F4F6;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                  }
                `}
              </style>
              <div
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </div>

            {/* Article Actions */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Heart className="h-6 w-6" />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Bookmark className="h-6 w-6" />
                  <span>Save</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Share className="h-6 w-6" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Recent Articles */}
        {recentPosts.length > 0 && (
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((recentPost) => (
                <Link
                  key={recentPost.id}
                  to={`/blog/${recentPost.slug}`}
                  className="group cursor-pointer"
                >
                  <img
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    src={
                      recentPost._embedded?.["wp:featuredmedia"]?.[0]
                        ?.source_url ||
                      "https://pagedone.io/asset/uploads/1696244317.png"
                    }
                    alt={recentPost.title.rendered}
                  />
                  <h3
                    className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 mb-2"
                    dangerouslySetInnerHTML={{
                      __html: recentPost.title.rendered,
                    }}
                  />
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {Math.ceil(
                        recentPost.content.rendered.split(" ").length / 200
                      )}{" "}
                      min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BlogDetails;
