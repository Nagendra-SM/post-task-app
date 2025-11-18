import React from "react";
import PostCard from "./PostCard";

export default function CardGrid({posts,onRemove,view}){
    if(!posts.length){
        return <div className="empty">No posts found</div>
    }
    return (
        <div className={`cards-wrap ${view === "list" ? "list-view" : "grid-view"}`}>
            {posts.map(post => (
                <PostCard key={post.id} post={post} onRemove={onRemove} view={view} />
            ))}
        </div>
    )
}