import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreatePost = ({ fetchPosts }) => {
    const [form, setForm] = useState({ id: null, title: '', content: '', image: null });
    const fileInputRef = useRef(); // Ref for the file input field

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('content', form.content);
        if (form.image) formData.append('image', form.image);

        try {
            if (form.id) {
                await axios.put(`http://localhost:5000/api/posts/${form.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await axios.post('http://localhost:5000/api/posts', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            fetchPosts();
            handleClearForm(); // Clear the form after submission
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    const handleImageChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleClearForm = () => {
        // Reset form state
        setForm({ id: null, title: '', content: '', image: null });
        // Reset file input field
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="container">
            <Link to="/" className="home-link">Home</Link>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef} // Attach ref to file input
                    onChange={handleImageChange}
                />
                <button type="submit">{form.id ? 'Update Post' : 'Create Post'}</button>
                <button
                    type="button" // Ensure it's not a submit button
                    onClick={handleClearForm} // Attach the handleClearForm function
                >
                    Clear Form
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
