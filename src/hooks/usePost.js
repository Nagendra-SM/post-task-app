import { useEffect, useState } from "react";

export default function usePost(){
    // const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{
        let mounted = true;
        async function fetchPosts(){
            try{
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                if(!response.ok){
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setTimeout(() => {
                    if(mounted){
                        setLoading(false);
                        // setError(null);
                        window.__fetchedPosts = data;
                    }
                },5000)
            }catch(error){
                if(mounted){
                    setError(error);
                    setLoading(false);
                }
            }
        }
        fetchPosts();
        return () => {
            mounted = false;
        }
    },[])
    return {loading,error,posts:window.__fetchedPosts}
}