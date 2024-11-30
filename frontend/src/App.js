import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import ViewPosts from './components/ViewPosts';
import Home from './components/Home';
import "./App.css"


const App = () => {
    return (
      
        <Router>
          
            <Routes>
              
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/view-posts" element={<ViewPosts />} />
            </Routes>
        </Router>
    );
};

export default App;
