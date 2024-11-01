const express = require('express');
const Article = require('./article');
const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add new article
router.post('/', async (req, res) => {
    const { title, content, image } = req.body;
    try {
        const newArticle = new Article({ title, content, image });
        await newArticle.save();
        res.json({ message: 'Article added' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get article by ID
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.json(article);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
