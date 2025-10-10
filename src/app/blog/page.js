"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import BlogList from "./BlogList";
import BlogDetail from "./BlogDetail";
import NovotionNavbar from "@/components/Navbar";
import NovotionFooter from "@/components/Footer";

const blogs = [
  {
    id: 1,
    title: "Overcome Job Interview Anxiety",
    excerpt: "Learn proven strategies to manage interview anxiety...",
    content: `...`,
    image: "https://images.unsplash.com/photo-1551834326-5eb22e4ee2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: "IT Recruitment Team",
    date: "December 15, 2024",
    category: "Interview Tips",
    readTime: "6 min read",
    featured: true
  },
  {
    id: 2,
    title: "Top Resume Trends for 2025",
    excerpt: "Discover the latest resume trends...",
    content: `...`,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: "Career Development Team",
    date: "December 12, 2024",
    category: "Resume",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 3,
    title: "Virtual Job Interview Tips",
    excerpt: "Master the art of virtual interviews...",
    content: `...`,
    image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd61b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: "Remote Work Experts",
    date: "December 5, 2024",
    category: "Interview Tips",
    readTime: "7 min read",
    featured: true
  },
  {
    id: 4,
    title: "Build a LinkedIn Profile That Gets You Hired",
    excerpt: "Transform your LinkedIn profile...",
    content: `...`,
    image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: "Digital Recruitment Team",
    date: "December 8, 2024",
    category: "LinkedIn",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 5,
    title: "Craft a Winning Cover Letter",
    excerpt: "Learn how to create compelling cover letters...",
    content: `...`,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: "HR Experts",
    date: "December 10, 2024",
    category: "Application",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 6,
    title: "Importance of Networking in Job Searching",
    excerpt: "Discover how strategic networking can accelerate your career...",
    content: `...`,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: "Career Strategy Team",
    date: "December 3, 2024",
    category: "Networking",
    readTime: "6 min read",
    featured: false
  }
];

const categories = ["All", "Interview Tips", "Resume", "Application", "LinkedIn", "Networking"];

function BlogPageContent() {
  const params = useSearchParams();
  const id = params.get("id");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const blog = blogs.find((b) => b.id === parseInt(id));

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
  return (
    <>
      <NovotionNavbar />
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <BlogPageContent />
      </Suspense>
      <NovotionFooter />
    </>
  );
}