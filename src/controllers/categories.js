import error from "../utils/error.js";
import modelCategory from "../model/model.category.js";

const GET = async (req, res, next) => {
    try {
        const categories = await modelCategory.getCategories()
        const { categoryId } = req.query

        if (parseInt(categoryId)) {
            const category = await modelCategory.getCategory({ categoryId })
            if (category) {
                return res
                    .status(201)
                    .json({
                        status: 200,
                        category: category
                    })
            }
            return res
                .status(404)
                .json({
                    status: 404,
                    message: "The category not found with this category id"
                })

        }

        return res
            .status(201)
            .json({
                status: 200,
                categories: categories
            })
    } catch (error) {
        console.log(error);
        return next(new error.InternalServerError(500, error.message))

    }
}

const POST = async (req, res, next) => {
    try {

        const { categoryName } = req.body
        if (!categoryName) {
            throw new error.ValidationError("Category name is required")
        }
        if (categoryName.length < 3) {
            throw new error.ValidationError("Category name's length must be more than 3")
        }

        const newCategory = await modelCategory.addCategory({ categoryName })

        return res
            .status(201)
            .json({
                status: 200,
                message: "The category succesfully created",
                category: newCategory
            })

    } catch (error) {
        console.log(error);
        return next(new error.InternalServerError(500, error.message))
    }
}

const PUT = async (req, res, next) => {
    try {

        const { categoryName, categoryId } = req.body
        if (!categoryName) {
            throw new error.ValidationError("Category name is required")
        }
        if (!categoryId) {
            throw new error.ValidationError("Category id is required")
        }
        if (categoryName.length < 3) {
            throw new error.ValidationError("Category name's length must be more than 3")
        }

        const updatedCategory = await modelCategory.editCategory({ categoryName, categoryId })

        return res
            .status(201)
            .json({
                status: 200,
                message: "The category succesfully updated",
                category: updatedCategory
            })

    } catch (error) {

        console.log(error);
        return next(new error.InternalServerError(500, error.message))
    }
}

const DELETE = async (req, res, next) => {
    try {
        const { categoryId } = req.body
        if (!categoryId) {
            throw new error.ValidationError("Category Id is required")
        }

        const deletedCategory = await modelCategory.deleteCategory({ categoryId })

        return res
            .status(201)
            .json({
                status: 200,
                message: "The book succesfully deleted"
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