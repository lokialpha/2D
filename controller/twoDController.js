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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        const total  = await Blog.countDocuments({user : req.user._id});
        const pages = Math.ceil(total/limit);
                
        if(page > pages){
            res.status(400).send("There is no page with this number");
        }
        
        const blogs = await Blog.find({user : req.user._id}).skip(skip).limit(limit).sort({ createdAt : -1 });
        res.status(200).send({blogs,page,pages,totalBlogs : total});

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


module.exports = {createBlog , getAllBlogs , getBlogDetails   };