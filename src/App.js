/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import FeedbackModal from './components/FeedbackModal';
import PaginationBar from './components/PaginationBar';
import CardGrid from './components/CardGrid';
import usePost from './hooks/usePost';
import {useAppState, useAppDispatch} from './context/AppContext';

const PAGE_SIZE = 6;

function App() {
  const {posts,view} = useAppState();
  const dispatch = useAppDispatch();

  const {loading,error,posts:fetchPosts} = usePost();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if(!loading && fetchPosts && fetchPosts.length > 0){
      dispatch({type:'SET_POSTS',payload:fetchPosts});
    }
  }, [dispatch,fetchPosts,loading]);

  function handleRemove(id){
    dispatch({type:'REMOVE_POST',payload:id});

    const totalAfterRemove = posts.length - 1;
    const maxPage = Math.max(1,Math.ceil(totalAfterRemove / PAGE_SIZE));
    if(currentPage > maxPage){
      setCurrentPage(maxPage);
    }
  }
  const total = posts.length;
    const totalPages = Math.max(1,Math.ceil(total / PAGE_SIZE));
    const normalizedPage = Math.min(currentPage, totalPages);
    useEffect(() => {
      setCurrentPage(normalizedPage);
    }, [total]);

    const start = (normalizedPage - 1) * PAGE_SIZE;
    const visiblePosts = posts.slice(start,start + PAGE_SIZE);
    
    function handleToggleView(){
      dispatch({type:'TOGGLE_VIEW'});
    }

    function openFeedback(){
      setIsFeedbackOpen(true);
    }

    function closeFeedbackModal(){
      setIsFeedbackOpen(false);
    }

    function handleFeedbackSubmit(feedback){
      console.log("Feedback submitted:",feedback);
      alert("Feedback submitted successfully");
    }

    if(loading){
      return <div className='centered'>
        <div className="loader">Loading...</div>
        </div>;
    }
    if(error){
      return <div className='centered'>Error: {error}</div>;
    }
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Post App</h2>
        </div>
        <div className="sidebar-content">
          <div className="view-toggle-section">
            <h3>View Mode</h3>
            <div className="toggle-buttons">
              <button className={`toggle-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => view !== 'grid' && handleToggleView()}>
                <span className="toggle-icon">⊞</span>
                Grid View
              </button>
              <button className={`toggle-btn ${view === 'list' ? 'active' : ''}`} onClick={() => view !== 'list' && handleToggleView()}>
                <span className="toggle-icon">☰</span>
                List View
              </button>
            </div>
          </div>
          <div className="feedback-section">
            <h3>Feedback</h3>
            <button className="feedback-btn" onClick={openFeedback}>
              <span className="feedback-icon">✉</span>
              Send Feedback
            </button>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>Posts</h1>
        </header>
        <CardGrid posts={visiblePosts} view={view} onRemove={handleRemove} />
        <footer>
          <PaginationBar totalItems={total} pageSize={PAGE_SIZE} currentPage={normalizedPage} onPageChange={setCurrentPage} />
        </footer>
      </main>
      <FeedbackModal visible={isFeedbackOpen} onClose={closeFeedbackModal} onSubmit={handleFeedbackSubmit} />
    </div>
  );
}

export default App;
