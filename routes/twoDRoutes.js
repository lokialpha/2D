const express = require("express");
const { createBlog, getAllBlogs, getBlogDetails, deleteBlog } = require("../controller/twoDController");
const auth = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin")
const fileUpload = require("../middlewares/fileUpload");
const validateReq = require("../middlewares/validateReq");
const blogCreateSchema = require("../schema/blog/blogBodySchema");

const router = express.Router();

//create blog
router.post("/",auth,fileUpload.single('image'),blogCreateSchema,validateReq,createBlog)


//get all blogs (admin)
router.get("/",auth,adminMiddleware,getAllBlogs);


//get single blog
router.get("/single/:id",auth , adminMiddleware ,getBlogDetails);

//get mine blog
// router.get("/mine",auth,getMineBlog);

//delete blog
// router.delete("/:id",auth,deleteBlog);

//toggle blog
// router.put("/public/:id",auth,toggleBlog)



module.exports = router;