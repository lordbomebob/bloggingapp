import { Box, Divider, Typography } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import BlogCard from '../components/BlogCard';
import { db } from '../firebaseConfig';
import useLocalStorage from '../hooks/useLocalStorage';



const ViewBlogsPage = () => {
    const [currentUser, setCurrentUser] = useLocalStorage('current_user', null);
    const blogCollectionReference = collection(db, "blogs");
    const [blogsList, setBlogsList] = useState([]);
    const [alertConfig, setAlertConfig] = useState({});

    const getBlogsList = async () => {
        const blogs = await getDocs(blogCollectionReference);
        const extractedBlogs = blogs.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        setBlogsList(extractedBlogs);
        console.log(extractedBlogs, 'blogs')
    }

    const deleteBlog = async (id) => {
        // First get the doc you want to delete
        const blogDoc = doc(db, "blogs", id); // We will get the  blog we are trying to delete.

        console.log(blogDoc, 'blogDoc'); 
        try {
            await deleteDoc(blogDoc);
            setAlertConfig({...alertConfig, message:'Succesfully deleted the blog', color: 'success', isOpen: true })
        } catch (error) {
            setAlertConfig({...alertConfig, message:'Error Deleting the blog', color: 'error', isOpen: true })
        }
    }
    //console.log(currentUser)
    const favoriteBlogCollectionReference = collection(db, "favorite");
    const [favoritesList, setFavoritesList] = useState([]);
    
    const getFavoriteBlogsList = async () => {
        
        const blogs = await getDocs(favoriteBlogCollectionReference);     
        const extractedBlogs = blogs.docs.map((doc) => {
            return {
                favId: doc.id,
                ...doc.data()
            }
        })

        setFavoritesList(extractedBlogs);
        console.log(extractedBlogs, 'favorite')
    }

    const addFavorite = async (blog) => {
        //checking if current user like the post that they created
        if(currentUser.uid === blog.userId){
            setAlertConfig({ message: 'You cannot Favorite Your own Post', color: 'error', isOpen: true });
            return;
        }

        const favoriteDoc = doc(favoriteBlogCollectionReference, `${currentUser.uid}_${blog.id}`);
        try {
            await setDoc(favoriteDoc, { 
                userId: currentUser.uid,
                ...blog
            });
            console.log(blog.id, "this is coming from add favorite");

            setFavoritesList(prev => [...prev, blog.id]);
            setAlertConfig({ message: 'Added to favorites', color: 'success', isOpen: true });
        } catch (error) {
            setAlertConfig({ message: 'Error adding to favorites', color: 'error', isOpen: true });
        }
    };
    const removeFavorite = async (blog) => {    

        const favoriteDoc = doc(favoriteBlogCollectionReference, `${currentUser.uid}_${blog.id}` );
        try {
            await deleteDoc(favoriteDoc);
            setFavoritesList(prev => prev.filter(id => id !== blog.id));
            setAlertConfig({ message: 'Removed from favorites', color: 'success', isOpen: true });
        } catch (error) {
            setAlertConfig({ message: 'Error removing from favorites', color: 'error', isOpen: true });
        }
    };
    const isFavorite = (blog) => favoritesList.includes(blog.id);
    useEffect(() => {
        getBlogsList();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertConfig])

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h3">View Blogs</Typography>
            <Divider />
            <Box display="grid" gridTemplateColumns="33% 33% 33%" gap="12px">
                {
                    blogsList.map((blog, index) => {
                        return <BlogCard key={index} blog={blog} deleteBlog={deleteBlog} isFavorite={isFavorite(blog)}  addFavorite={() => addFavorite(blog)} removeFavorite={() => removeFavorite(blog)} />
                    })
                }
            </Box>
            <Alert alertConfig={alertConfig} />
        </Box>
    )
}

export default ViewBlogsPage