import { collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export const ViewFavoritePage = () => {
    const [alertConfig, setAlertConfig] = useState({});
    const [favoritesList, setFavoritesList] = useState([]);
    const {uid}= useParams()
    const favoritesCollectionReference = collection(db, uid,'favorites', 'blogs');
    const getFavoritesList = async () => {
        const favorites = await getDocs(favoritesCollectionReference);
        const extractedFavorites = favorites.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        setFavoritesList(extractedFavorites);
        console.log(extractedFavorites, 'favorites')
    }
    useEffect(() => {
        getFavoritesList();
    }, [alertConfig]);

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h3">Favorite Blogs</Typography>
            <Divider />
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="12px">
                {favoritesList.map((blog,index) => (
                    <BlogCard key={index} blog={blog} addFavorite={() => {}} isFavorite={true} />
                ))}
            </Box>
        </Box>
    )
}
