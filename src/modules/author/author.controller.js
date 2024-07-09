import { response } from "express";
import { Author } from "../../../DB/models/author.model.js"

export const addAuthor = async (req, res) => {
try {
    const { name, bio, birthDate } = req.body;
    const isAuthorExist = await Author.findOne({ name });
    if (isAuthorExist) {
        return res.json({ message: "author name already exists" });
    }
    const author=await Author.create({ name, bio, birthDate})
    res.json({ message: "author added ",author });
    } catch (error) {
        res.json({ message: "internal server error",error });
    }
};

export const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find()
        if(!authors)
            return res.status(404).json('ther is no authors')
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: "internal server error",error });
    }
};

export const getAuthorById = async (req, res) => {
    try {
        const{id}=req.params
        const author = await Author.findById(id)
        if(!author)
            return res.status(404).json('ther is no authors')
        res.status(200).json(author);
    } catch (error) {
        res.json({ message: "internal server error",error });
    }
};

export const upAuthorById = async (req, res) => {
    try {
        const{id}=req.params
        const{name,bio}=req.body
        const isExist=await Author.findOne({name})
        if(isExist)
            return res.status(409).json('name already exist change it please')
        const author = await Author.findByIdAndUpdate(id,{name,bio},{new:true})
        if(!author)
            return res.status(404).json('ther is no authors')
        res.status(200).json(author);
    } catch (error) {
        res.json({ message: "internal server error",error });
    }
};
export const deleteAuthor=async(req,res)=>{
    try {
        const {id}=req.params
        const author=await Author.findByIdAndDelete(id);
        if(!author)
            return res.status(404).json({message:"no matched author"})
        res.status(200).json({message:"author deleted"})
    } catch (error) {
        res.json({ message: "internal server error",error });
    }
}

export const getAllAuthorsAndBooks = async (req, res) => {
    try {
        const authors = await Author.find().populate("books",('-__v -createdAt -updatedAt'))
        if(!authors)
            return res.status(404).json('ther is no authors')
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: "internal server error",error });
    }
}

export const authorSearch=async(req,res)=>{
    const{name,bio}=req.body;
    const author=await Author.find({$or:[{name:{$regex:name || ''}},{bio:{$regex:bio || ''}}]})
    if(!author)
        return res.status(404).json({message:"No matched author"})
    res.status(200).json(author)
}