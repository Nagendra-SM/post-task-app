import React from "react";

export default function PostCard({post,onRemove,view}){
    const defaultImage = `https://picsum.photos/seed/post-${post.id}/280/180.jpg`;
    
    return (
        <div className={`post-card ${view === "list" ? "list" : "grid"}`}>
            <button className="remove-btn" onClick={() => onRemove(post.id)} title="Remove">X</button>
            <div className="post-content">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="meta">
                    post ID: {post.id}
                </div>
            </div>
            {view === "list" && (
                <div className="post-image">
                    <img src={defaultImage} alt={`Post ${post.id}`} />
                </div>
            )}
            <div className="post-image-grid">
                <img src={defaultImage} alt={`Post ${post.id}`} />
            </div>
        </div>
    )
}
