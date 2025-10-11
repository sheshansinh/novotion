"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import BlogList from "./BlogList";
import BlogDetail from "./BlogDetail";
import NovotionNavbar from "@/components/Navbar";
import NovotionFooter from "@/components/Footer";

// We'll fetch the data from the client-side using useEffect
async function fetchBlogsFromBackend() {
  // You must replace this URL with the correct path to your read.php file.
  // E.g., http://localhost/your_project_folder/api/read.php
  // Correct URL to your blog_api.php file
  const res = await fetch(
    "http://localhost/custom-sites/novotion-backend/blog/blog_api.php?action=read",
    {
      cache: "no-store", // This is important to ensure data is always fresh
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blogs from the backend.");
  }
  const result = await res.json();
  return result.data;
}

function BlogPageContent({ blogs, categories }) {
  const params = useSearchParams();
  const id = params.get("id");
  const [selectedCategory, setSelectedCategory] = useState("All");
  // We use `==` instead of `===` because the id from the URL is a string
  // and the blog ID from the database is a number.
  const blog = blogs.find((b) => b.id == parseInt(id));

  return id && blog ? (
    <BlogDetail blog={blog} />
  ) : (
    <BlogList
      blogs={blogs}
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
    />
  );
}

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const fetchedBlogs = await fetchBlogsFromBackend();
        setBlogs(fetchedBlogs);
        const uniqueCategories = [
          "All",
          ...new Set(fetchedBlogs.map((blog) => blog.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadBlogs();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <NovotionNavbar />
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <BlogPageContent blogs={blogs} categories={categories} />
      </Suspense>
      <NovotionFooter />
    </>
  );
}
