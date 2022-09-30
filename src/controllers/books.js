import error from "../utils/error.js";
import modelBook from "../model/model.book.js";
import modelCategory from "../model/model.category.js";
import path from "path"

const GET = async (req, res, next) => {
    try {
        const books = await modelBook.getBooks()
        const { bookId } = req.query
        if (parseInt(bookId)) {
            const book = await modelBook.getBook({ bookId })
            if (book) {
                return res
                    .status(201)
                    .json({
                        status: 200,
                        book: book
                    })
            }
            return res
                .status(404)
                .json({
                    status: 404,
                    message: "The book not found with this book id"
                })

        }

        return res
            .status(201)
            .json({
                status: 200,
                books: books
            })

    } catch (error) {
        console.log(error);
        return next(new error.InternalServerError(500, error.message))
    }
}

const POST = async (req, res, next) => {
    try {
        let { bookName, shortDescription, longDescription, categoryId } = req.body
        let { file } = req.files
        if (bookName.length < 3) {
            throw new error.ValidationError("Book's name length must be more then 3")
        }
        if (shortDescription.length < 10) {
            throw new error.ValidationError("Short description's length must be more then 10")
        }
        if (longDescription.length < 20) {
            throw new error.ValidationError("Long description's length must be more then 20")
        }

        categoryId = parseInt(categoryId)

        const bookCategory = await modelCategory.getCategory({ categoryId })
        if (!bookCategory) {
            throw new error.ValidationError("Invalid category id")
        }
        if (!file) {
            return next(
                new error.ValidationError(400, 'File is required')
            )
        }

        if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
            return next(
                new error.AuthorizationError(400, 'Invalid mime type for books image')
            )
        }

        if (file.size > 50 * 1024 * 1024) {
            return next(
                new error.ValidationError(400, 'File is too large')
            )
        }

        const fileName = Date.now() + file.name.replace(/\s/g, "")
        const filePath = path.join(process.cwd(), 'uploads', fileName)

        file.mv(filePath)

        const newBook = await modelBook.addBook({ bookName, shortDescription, longDescription, fileName, categoryId })

        return res
            .status(201)
            .json({
                status: 200,
                message: "The book succesfully created",
                book: newBook
            })

    } catch (error) {
        console.log(error);
        return next(new error.InternalServerError(500, error.message))
    }
}

const PUT = async (req, res, next) => {
    try {
        let { bookId, bookName, shortDescription, longDescription } = req.body
        if (bookName.length < 3) {
            throw new error.ValidationError("Book's name length must be more then 3")
        }
        if (shortDescription.length < 10) {
            throw new error.ValidationError("Short description's length must be more then 10")
        }
        if (longDescription.length < 20) {
            throw new error.ValidationError("Long description's length must be more then 20")
        }

        const updatedBook = await modelBook.updateBook({ bookId, bookName, shortDescription, longDescription })

        return res
            .status(201)
            .json({
                status: 200,
                message: "The book succesfully updated",
                book: updatedBook
            })

    } catch (error) {
        console.log(error);
        return next(new error.InternalServerError(500, error.message))
    }
}

const DELETE = async (req, res, next) => {
    try {
        const { bookId } = req.body
        console.log(bookId);
        const bookIdd = await modelBook.getBook({ bookId })
        console.log(bookId);
        if (!bookIdd) {

            throw new error.AuthorizationError("Invalid Book Id")
        }

        const deletedBook = await modelBook.deleteBook({ bookId })
        console.log(deletedBook);

        return res
            .status(201)
            .json({
                status: 200,
                message: "The book succesfully deleted",
            })

    } catch (error) {
        console.log(error);
        return next(new error.InternalServerError(500, error.message))
    }
}

export default {
    GET,
    POST,
    PUT,
    DELETE
}