import React, { useState } from "react";
import {
  FaCalendar,
  FaUser,
  FaTag,
  FaArrowRight,
  FaSearch,
  FaClock,
  FaEye,
  FaShare,
} from "react-icons/fa";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Posts", count: 12 },
    { id: "travel-tips", name: "Travel Tips", count: 5 },
    { id: "destinations", name: "Destinations", count: 4 },
    { id: "news", name: "News & Updates", count: 3 },
  ];

  const blogPosts = [
    {
      id: 1,
      title:
        "10 Essential Travel Tips for First-Time Bus Travelers in Bangladesh",
      excerpt:
        "Planning your first bus journey in Bangladesh? Here are the essential tips to make your trip comfortable and safe.",
      content:
        "Traveling by bus in Bangladesh can be an adventure in itself. From choosing the right operator to packing essentials, here's everything you need to know...",
      author: "Sarah Ahmed",
      date: "2025-01-08",
      category: "travel-tips",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=300&fit=crop",
      readTime: "5 min read",
      views: 1250,
      featured: true,
    },
    {
      id: 2,
      title: "Exploring Cox's Bazar: Your Complete Travel Guide",
      excerpt:
        "Discover the world's longest natural sea beach and everything Cox's Bazar has to offer for travelers.",
      content:
        "Cox's Bazar, known for its stunning coastline and vibrant culture, is a must-visit destination in Bangladesh...",
      author: "Mohammad Rahman",
      date: "2025-01-06",
      category: "destinations",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop",
      readTime: "8 min read",
      views: 2100,
      featured: true,
    },
    {
      id: 3,
      title: "TicketBari Launches New Mobile App with Enhanced Features",
      excerpt:
        "Our new mobile application brings improved booking experience and exclusive mobile-only deals.",
      content:
        "We're excited to announce the launch of our completely redesigned mobile application...",
      author: "TicketBari Team",
      date: "2025-01-05",
      category: "news",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=300&fit=crop",
      readTime: "3 min read",
      views: 890,
      featured: false,
    },
    {
      id: 4,
      title: "Budget Travel: How to Save Money on Transportation in Bangladesh",
      excerpt:
        "Smart strategies to reduce your travel costs without compromising on comfort and safety.",
      content:
        "Traveling on a budget doesn't mean you have to sacrifice comfort or safety. Here are proven ways to save money...",
      author: "Fatima Khan",
      date: "2025-01-04",
      category: "travel-tips",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop",
      readTime: "6 min read",
      views: 1680,
      featured: false,
    },
    {
      id: 5,
      title: "The Beauty of Sylhet: Tea Gardens and Natural Wonders",
      excerpt:
        "Journey through Sylhet's breathtaking landscapes, from rolling tea gardens to pristine waterfalls.",
      content:
        "Sylhet, the tea capital of Bangladesh, offers some of the most spectacular natural scenery in the country...",
      author: "Ahmed Ali",
      date: "2025-01-03",
      category: "destinations",
      image:
        "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=600&h=300&fit=crop",
      readTime: "7 min read",
      views: 1420,
      featured: false,
    },
    {
      id: 6,
      title: "Safety First: Essential Safety Tips for Long-Distance Travel",
      excerpt:
        "Stay safe during your journeys with these important safety guidelines and precautions.",
      content:
        "Your safety is our top priority. Here are essential safety tips for long-distance travel in Bangladesh...",
      author: "Dr. Rashida Begum",
      date: "2025-01-02",
      category: "travel-tips",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=300&fit=crop",
      readTime: "4 min read",
      views: 980,
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const BlogCard = ({ post, featured = false }) => (
    <article
      className={`card-consistent overflow-hidden ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className={`${featured ? "lg:flex" : ""}`}>
        <div className={`${featured ? "lg:w-1/2" : ""}`}>
          <img
            src={post.image}
            alt={post.title}
            className={`w-full object-cover ${
              featured ? "h-64 lg:h-full" : "h-48"
            }`}
          />
        </div>
        <div
          className={`p-6 ${
            featured ? "lg:w-1/2 lg:flex lg:flex-col lg:justify-center" : ""
          }`}
        >
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <FaCalendar className="text-xs" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaClock className="text-xs" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaEye className="text-xs" />
              <span>{post.views.toLocaleString()}</span>
            </div>
          </div>

          <h2
            className={`font-bold text-gray-900 dark:text-gray-100 mb-3 hover:text-primary transition-colors ${
              featured ? "text-2xl" : "text-xl"
            }`}
          >
            <a href={`/blog/${post.id}`}>{post.title}</a>
          </h2>

          <p className="text-body mb-4 line-clamp-3">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <FaUser className="text-xs" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <FaTag className="text-xs text-primary" />
                <span className="text-primary capitalize">
                  {post.category.replace("-", " ")}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <FaShare className="text-sm" />
              </button>
              <a
                href={`/blog/${post.id}`}
                className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                <span>Read More</span>
                <FaArrowRight className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-6">Travel Blog</h1>
          <p className="text-xl text-body max-w-2xl mx-auto">
            Discover travel tips, destination guides, and the latest updates
            from the world of transportation in Bangladesh.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input-custom pl-10"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {selectedCategory === "all" && searchTerm === "" && (
            <div className="mb-16">
              <h2 className="heading-2 mb-8">Featured Articles</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured={true} />
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="heading-2">
                {selectedCategory === "all"
                  ? "Latest Articles"
                  : `${
                      categories.find((c) => c.id === selectedCategory)?.name
                    }`}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredPosts.length} article
                {filteredPosts.length !== 1 ? "s" : ""} found
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <FaSearch className="text-4xl mx-auto mb-4" />
                  <p className="text-lg">No articles found</p>
                  <p className="text-sm">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="btn-outline-custom"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="btn-outline-custom">Load More Articles</button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest travel tips,
            destination guides, and exclusive offers.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
