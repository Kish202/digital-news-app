import { PostProps } from "@/sections/Posts";
import Link from "next/link";
import React from "react";
import './sidePostItem.css'

export default function SidePostItem({ item }: { item: PostProps }) {
  return (
    <div>
      <div className="post-meta">
        <span className="date">{item.category}</span>
        <span className="mx-1">
          <i className="bi bi-dot"></i>
        </span>
        <span>{new Date(item.date).toLocaleDateString("en-US")}</span>
      </div>
      sidepost
      <h2 className="mb-2">
        <Link href={`/postitem/${item._id}`}>{item.title}</Link>
      </h2>
      {item.author && (
        <span className="author mb-3 d-block">{item.author}</span>
      )}
    </div>
  );
}
