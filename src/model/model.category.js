import db from "../config/db.config.js"
import sql from "../sql/category.js"

async function getCategory({ categoryId }) {
    const [data] = await db(sql.GET_CATEGORY, categoryId)
    return data
}

async function getCategories() {
    const data = await db(sql.GET_CATEGORIES)
    return data
}

async function addCategory({ categoryName }) {
    const [data] = await db(sql.ADD_CATEGORY, categoryName)
    return data
}

async function editCategory({ categoryId, categoryName }) {
    const [data] = await db(sql.UPDATE_CATEGORY, categoryId, categoryName)
    return data
}

async function deleteCategory({ categoryId }) {
    const [data] = await db(sql.DELETE_CATEGORY, categoryId)
    return data
}
export default {
    getCategory,
    getCategories,
    addCategory,
    editCategory,
    deleteCategory
}