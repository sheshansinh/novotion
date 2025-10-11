"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./BlogDetail.css";

export default function BlogDetail({ blog }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!blog) {
    return (
      <main className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Blog not found 😢
          </h1>
          <Link
            href="/blog"
            className="text-blue-300 hover:text-white transition-colors"
          >
            ← Back to Blogs
          </Link>
        </motion.div>
      </main>
    );
  }

  // Define the base URL for your server.
  // 'your_project_folder' is the correct name of your project's root directory.
  const serverBaseUrl = "http://localhost/custom-sites/novotion-backend/";

  // Construct the full URL for the main image, correctly handling the `../`
  let imageUrl = "";
  if (blog.image) {
    // Remove the "../" from the path and append it to the base URL
    const cleanImagePath = blog.image.replace("../", "");
    imageUrl = `${serverBaseUrl}${cleanImagePath}`;
  }

  return (
    <main className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors group"
          >
            <motion.span whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
              ←
            </motion.span>
            Back to Blogs
          </Link>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-10 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* The image src now uses the full URL */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
          )}
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
              {blog.category}
            </span>
            {blog.featured == 1 && (
              <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
            <span className="text-blue-200 text-sm">{blog.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-blue-100">
            <div>
              <p className="font-semibold">{blog.author}</p>
              <p className="text-sm">{blog.date}</p>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg prose-invert max-w-none"
        >
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </motion.article>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            ← Explore More Career Resources
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
