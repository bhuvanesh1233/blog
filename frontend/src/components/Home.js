import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="contain">
            <h1>Welcome to the Blog Platform</h1>
            <nav>
                <Link to="/create-post">Create Post</Link>
                <Link to="/view-posts">View Posts</Link>
            </nav>
        </div>
    );
};

export default Home;
