// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');
const multer = require('multer');
const path = require('path');

// Set up multer storage and file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists or create it
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add a unique timestamp to file name
    }
});
const upload = multer({ storage });

// CREATE a new post
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : ''; // Save the image path

        const post = await Post.create({ title, content, image });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a post
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : undefined; // Update only if a new image is uploaded

        const post = await Post.findByIdAndUpdate(req.params.id, { title, content, image }, { new: true });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
