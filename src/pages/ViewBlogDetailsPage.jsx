import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { db } from '../firebaseConfig';

const ViewBlogDetailsPage = () => {

  const { id } = useParams();

  const [blogData, setBlogData] = useState({});

  useEffect(() => {

    const getBlogData = async () => {
      const snap = await getDoc(doc(db, 'blogs', id))
      if (snap.exists()) {
        console.log(snap.data(), 'snap.data()')
        setBlogData(snap.data());
      }
    }

    getBlogData();

  }, [id])



  return (
    <BlogCard  blog={blogData} showDeleteIcon={false} />
  )
}

export default ViewBlogDetailsPage