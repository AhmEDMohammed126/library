import { Book } from "../../../DB/models/book.model.js"
import { Author } from "../../../DB/models/author.model.js"
export const addBook=async(req,res)=>{
try {
    const{title,content,author,publishedDate}=req.body
    const isAuthorFound = await Author.findOne({ name: author });
    if(!isAuthorFound)
        return res.status(404).json('ther is no matched author')
    const bookInstance = new Book({
        title,
        content,
        author,
        publishedDate,
    });
    const upAuthor= await Author.updateOne({ name: author},{$addToSet:{books:bookInstance._id}})
    const newBook=await bookInstance.save()
    if(!newBook)
        return res.status(400).json('incomplet adding')
    res.status(201).json({message:'book added',newBook})
} catch (error) {
    res.status(500).json('Internal server error',error)
}
}
export const listBooks=async (req,res)=>{
    try {
        const books=await Book.find().select('-__v -createdAt -updatedAt')
        if (!books) 
            return res.status(404).json("ther is no books")
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json('Internal server error',error)
    }
} 
export const bookById=async (req,res)=>{
    try {
        const{id}=req.params
        const book=await Book.findById(id).select('-__v -createdAt -updatedAt')
        if (!book) 
            return res.status(404).json("ther is no books")
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json('Internal server error',error)
    }
} 

export const upBook=async (req,res)=>{
    try {
        const{id}=req.params
        const{content}=req.body
        const book=await Book.findByIdAndUpdate(id,{content},{new:true})
        if (!book) 
            return res.status(404).json("ther is no book matched")
        res.status(200).json("book updated")
    } catch (error) {
        res.status(500).json('Internal server error',error)
    }
} 
export const deleteBook=async (req,res)=>{
    try {
        const{id}=req.params
        const book=await Book.findByIdAndDelete(id)
        if (!book) 
            return res.status(404).json("ther is no book matched")
    const author = await Author.findOne({ name: book.author });
    const index = author.books.indexOf(id);
    author.books.splice(index, 1);
    await author.save();
        res.status(200).json("book deleted")
    } catch (error) {
        res.status(500).json('Internal server error',error)
    }
} 

export const bookSearch=async(req,res)=>{
    const{title,content}=req.body;
    const books=await Book.find({$or:[{title:{$regex:title || ''}},{content:{$regex:content || ''}}]})
    if(!books)
        return res.status(404).json({message:"No matched book"})
    res.status(200).json(books)
}