import { Alert, Box, Divider, Typography } from '@mui/material';
import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { db } from '../firebaseConfig';
import useLocalStorage from '../hooks/useLocalStorage';

export const ViewFavoritePage = () => {
    const favoriteBlogCollectionReference = collection(db, "favorite");
    const [currentUser, setCurrentUser] = useLocalStorage('current_user', null);

    const [blogsList, setBlogsList] = useState([]);
    const [favoritesList, setFavoritesList] = useState([]);
    const [alertConfig, setAlertConfig] = useState({});
    const navigate = useNavigate();

    const getFavoritesList = async () => {
        const favorites = await getDocs(favoriteBlogCollectionReference);
        const extractedFavorites = favorites.docs.filter(doc => doc.data().userId !== currentUser.uid).map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setFavoritesList(extractedFavorites);
        console.log(extractedFavorites, 'fav blog');
    };

    useEffect(() => {
        getFavoritesList();
    }, [alertConfig]);

    const deleteBlog = async (id) => {
        const blogDoc = doc(db, "blogs", id);
        try {
            await deleteDoc(blogDoc);
            setAlertConfig({ message: 'Successfully deleted the blog', color: 'success', isOpen: true });
            setBlogsList(prev => prev.filter(blog => blog.id !== id));
        } catch (error) {
            setAlertConfig({ message: 'Error deleting the blog', color: 'error', isOpen: true });
        }
    };
    const addFavorite = async (blog) => {
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
        const favoriteDoc = doc(favoriteBlogCollectionReference, `${currentUser.uid}_${blog.id}`);
        try {
            await deleteDoc(favoriteDoc);
            setFavoritesList(prev => prev.filter(id => id !== blog.id));
            setAlertConfig({ message: 'Removed from favorites', color: 'success', isOpen: true });
        } catch (error) {
            setAlertConfig({ message: 'Error removing from favorites', color: 'error', isOpen: true });
        }
    };
    const isFavorite = (blog) => favoritesList.includes(blog.id);
    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h3">View Favorite Blogs</Typography>
            <Divider />
            <Box display="grid" gridTemplateColumns="33% 33% 33%" gap="12px">
                {
                    favoritesList.map((blog, index) => {
                        return <BlogCard key={index} blog={blog} showDeleteIcon={false} deleteBlog={deleteBlog} isFavorite={isFavorite(blog)}  addFavorite={() => addFavorite(blog)} removeFavorite={() => removeFavorite(blog)} />
                    })
                }
            </Box>
            <Alert alertConfig={alertConfig} />
        </Box>
    )
}
