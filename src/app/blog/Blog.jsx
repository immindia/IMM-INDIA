import { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `https://www.immindia.edu.in/blog/wp-json/wp/v2/posts?_embed&page=${page}&per_page=9`
      );
      const data = await response.json();
      setPosts(data);

      // Get total pages from headers
      const totalPosts = parseInt(response.headers.get("X-WP-Total") || "0");
      const postsPerPage = parseInt(
        response.headers.get("X-WP-Per-Page") || "12"
      );
      const calculatedPages = Math.max(
        1,
        Math.min(Math.ceil(totalPosts / postsPerPage), 100)
      ); // Add upper limit of 100
      setTotalPages(calculatedPages);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center">Loading posts...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading
          title="Our latest blog"
          titleClassName="text-center text-primary-color"
          subtitle="Stay updated with our latest insights and articles"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              date={new Date(post.date).toLocaleDateString()}
              title={post.title.rendered}
              description={
                post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 150) +
                "..."
              }
              imageUrl={
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "https://pagedone.io/asset/uploads/1696244317.png"
              }
              slug={post.slug}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-12 flex justify-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-pink-800 text-white hover:bg-pink-900"
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from(
              { length: Math.max(0, Math.min(totalPages, 100)) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setPage(index + 1)}
                  className={`w-10 h-10 rounded ${
                    page === index + 1
                      ? "bg-pink-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              )
            ).slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))}
          </div>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${
              page === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-pink-800 text-white hover:bg-pink-900"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;

const BlogCard = ({ id, date, title, description, imageUrl, slug }) => {
  return (
    <div
      id={id}
      className="group w-full overflow-hidden  border border-gray-300 rounded-2xl"
    >
      <div className="flex items-center">
        <img
          src={imageUrl || "https://pagedone.io/asset/uploads/1696244317.png"}
          alt={title}
          className="rounded-t-2xl w-full object-cover h-48"
        />
      </div>
      <div className="p-4 lg:p-6 h-full transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
        <span className="text-indigo-600 font-medium mb-3 block">{date}</span>
        <Link to={`/blog/${slug}`}>
          <h4 className="text-xl text-gray-900 hover:text-primary-color transition-all duration-300 hover:underline font-medium leading-8 mb-5">
            {title}
          </h4>
        </Link>
        <p className="text-gray-500  mb-5 line-clamp-3">{description}</p>
        <Link
          to={`/blog/${slug}`}
          className="cursor-pointer text-lg text-indigo-600 font-semibold"
        >
          Read more..
        </Link>
      </div>
    </div>
  );
};
