import { Children, createContext, useState } from "react";
import {baseUrl} from '../baseUrl'

//create context
export const AppContext = createContext();


//provider
function AppContextProvider({children}){
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPages] = useState(null)
    
    
    //data filling
    async function fetchBlogPosts(page=1){
        setLoading(true);
        let url = `${baseUrl}?page=${page}`
        try {
            const result = await fetch(url);
            const data = await result.json();
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages)
    
        } catch (error) {
            console.log("error in fetching data");
            setPage(1);
            setPosts([]);
            setTotalPages(null);
            return error.message;
        }
        setLoading(false)
    }

    function handlePageChange(page){
        setPage(page)
        fetchBlogPosts(page)
    }

    const value = {
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPage,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider
