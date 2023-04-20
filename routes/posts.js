const router = require("express").Router();
const Post = require("../models/Post.model");
const isAuth = require("../middleware/authMiddleware").isAuth;
const isAdmin = require("../middleware/authMiddleware").isAdmin;

// *------------------------Routes--------------------------*

// *------------------------GET--------------------------*
router.get("/", isAuth, async (req, res) => {
    const { page, limit } = req.query;
    try {
        const posts = await Post.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Post.count();
        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            error: false,
            data: {
                posts,
                totalPages,
            },
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: "Could not retrieve posts",
        });
    }
});

router.get("/:id", isAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).json({
            error: false,
            data: {
                post,
            },
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: "Could not retrieve post",
        });
    }
});

// *------------------------POSTS--------------------------*
router.post("/", isAuth, isAdmin, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({
            title,
            content,
        });

        const post = await newPost.save();
        res.status(200).json({
            error: false,
            data: {
                post,
            },
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: "Could not create post",
        });
    }
});

// *------------------------PUT--------------------------*
router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(
            id,
            {
                title,
                content,
            },
            { new: true }
        );
        res.status(200).json({
            error: false,
            data: {
                post,
            },
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: "Could not update post",
        });
    }
});

// *------------------------DELETE--------------------------*
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        res.status(200).json({
            error: false,
            data: {
                post,
            },
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: "Could not delete post",
        });
    }
});

module.exports = router;
