const Blog = require("../models/2dModel");
const fs = require("fs");

//create blog
const createBlog = async (req,res) => {
    const {number,amount,screenShots,user} =req.body;
    try {
        const blog = new Blog({
            number,
            amount,
            screenShots : req.file.path,
            user
        });
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.sendStatus(500);
    }
};

//get all blogs
const getAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find();
        res.send(blogs);
    } catch (error) {
        res.sendStatus(500);
    }
};

//get single blog
const getBlogDetails = async (req,res) => {
    
    try {
        const {id} = req.params;
        const {populate} = req.query;
        
        if(populate){
            const blog = await Blog.find({public : true,_id : id}).populate("user");
            res.send(blog);  
        }else{
            const blog = await Blog.find({public : true,_id : id});
            res.send(blog); 
        }
        
    } catch (error) {
        res.sendStatus(500);
    }
};
//get public blogs
// const getPublicBlogs = async (req,res) => {
//     //query localhost:3000/public?page=1&&limit=10
//     try {
//         const page = Number(req.query.page) || 1;
//         const limit = Number(req.query.limit) || 10;
//         const skip = (page - 1) * limit;
//         const total  = await Blog.countDocuments({public : true});
//         const pages = Math.ceil(total/limit);
        
//         if(page > pages){
//             res.status(400).send("There is no page with this number");
//         }

//         const blogs = await Blog.find({public : true}).skip(skip).limit(limit);
//         res.send({blogs,page,pages,totalBlogs : total});
//     } catch (error) {
//         res.sendStatus(500);
//     }
// };


//get mine blog
// const getMineBlog = async (req,res) => {
//     try {
//         const page = Number(req.query.page) || 1;
//         const limit = Number(req.query.limit) || 3;
//         const skip = (page - 1) * limit;
//         const total  = await Blog.countDocuments({user : req.user._id});
//         const pages = Math.ceil(total/limit);
        
//         if(page > pages){
//             res.status(400).send("There is no page with this number");
//         }

//         const blogs = await Blog.find({user : req.user._id}).skip(skip).limit(limit);
//         res.status(200).send({blogs,page,pages,totalBlogs : total});
//     } catch (error) {
//         res.sendStatus(500);
//     }
// };

// //delete blog
// const deleteBlog = async (req,res) => {
//     try {
//         const {id} = req.params;
//         try {
//             const blogToDelete = await Blog.findOne({_id : id,user : req.user._id});
        
//             fs.unlinkSync(blogToDelete.blogImage);
            
//             //await blogToDelete.remove();
//             await Blog.findOneAndDelete({_id : id,user : req.user._id});
//             res.sendStatus(200);
//         } catch (error) {
//             res.status(404).send("U can't delete this blog");
//         }
        
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// };

//toggle blog
// const toggleBlog = async (req,res) => {
//     try {
//         const {id} = req.params;
//         const userId = req.user._id;

//         const blogToToggle = await Blog.findOne({_id : id,user:userId});
        

//         blogToToggle.public = !blogToToggle.public;
//         const blog = await blogToToggle.save();
//         res.send(blog);
//     } catch (error) {
        
//         res.sendStatus(500);
//     }
// };

//edit blog
// const editBlog = async (req,res) => {
//     try {
//         const {id} = req.params;
//         const userId = req.user._id;

//         const blogToToggle = await Blog.findOne({_id : id,user:userId});
        
//         req.body.blogImage = req.file ? req.file.path : blogToToggle.blogImage;

//         if(req.file){
//             fs.unlinkSync(blogToToggle.blogImage);
//         }

//         const blog = await Blog.findOneAndUpdate({_id : id,user:userId},{...req.body},{ new : true});
        
//         res.send(blog);
//     } catch (error) {
//         res.sendStatus(500);
//     }
// };



module.exports = {createBlog , getAllBlogs , getBlogDetails   };