import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const ViewPosts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`);
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="containe">
             <Link to="/" className="home-link">Home</Link>
            <h1>View Posts</h1>
            <div className="posts">
                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        {post.image && <img src={`http://localhost:5000${post.image}`} alt="Post" className="post-image" />}
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <div className="post-actions">
                            <button onClick={() => handleDelete(post._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewPosts;
