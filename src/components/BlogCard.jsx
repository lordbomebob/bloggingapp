/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { FavoriteBorder, FavoriteBorderOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = (props) => {
    const { blog, deleteBlog = () => {}, showDeleteIcon = true, isFavorite=()=>{}, removeFavorite, addFavorite} = props;
    // Favorites Table as well in the database

    const navigate = useNavigate();
    const handleFavoriteClick=()=>{
        if (isFavorite) {
            removeFavorite(blog);
        } else {
            addFavorite(blog);
        }
    }

    return (
        <Card style={{ position: 'relative' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={blog.image}
                title="green iguana"
            />
            {
                showDeleteIcon && <IconButton style={{ position: 'absolute', right: '10px', top: '5px' }} aria-label="delete" size="small" onClick={() => deleteBlog(blog.id)}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.description}
                </Typography>
                <Chip label={blog.category} variant="outlined" />

            </CardContent>
            <CardActions>
                <IconButton aria-label="favorite" onClick={() => handleFavoriteClick(blog)}>
                    {isFavorite ? <FavoriteBorder color="error" /> : <FavoriteBorderOutlined />}
                </IconButton>
                <Button color='secondary' variant='contained' onClick={() => navigate(`/viewblogs/${blog.id}`)}>Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default BlogCard