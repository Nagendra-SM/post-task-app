import React from "react";

export default function Header({ onToggleView, view, onOpenFeedback }){
    return (
        <header className="app-header">
            <h1>Post App</h1>
            <div className="header-controls">
                <button className={`btn ${view === 'grid' ? 'primary' : ''}`} onClick={() => view !== 'grid' && onToggleView()}>
                    Grid
                </button>
                <button className={`btn ${view === 'list' ? 'primary' : ''}`} onClick={() => view !== 'list' && onToggleView()}>
                    List
                </button>
            </div>
        </header>
    )
}