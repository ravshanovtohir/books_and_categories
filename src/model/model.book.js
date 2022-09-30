import db from "../config/db.config.js"
import sql from "../sql/books.js"

async function getBooks() {
    const data = await db(sql.GET_BOOKS)
    return data
}

async function getBook({ bookId }) {
    const [data] = await db(sql.GET_BOOK, bookId)
    return data
}

async function addBook({ bookName, shortDescription, longDescription, fileName, categoryId }) {
    const [data] = await db(sql.ADD_BOOK, bookName, shortDescription, longDescription, fileName, categoryId)
    return data
}

async function updateBook({ bookId, bookName, shortDescription, longDescription }) {
    const data = await db(sql.UPDATE_BOOK, bookId, bookName, shortDescription, longDescription)
    return data
}

async function deleteBook({ bookId }) {
    const data = await db(sql.DELETE_BOOK, bookId)
    return data
}

export default {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
}