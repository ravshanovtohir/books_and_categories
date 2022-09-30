import "./config/index.config.js"
import express from 'express'
import path from 'path'
import fileUpload from 'express-fileupload'
import database from "./config/db.config.js"

//other files


// other datas
const PORT = process.env.PORT || 5000
const app = express()

//middlewares
app.use(express.json())
app.use(fileUpload());

app.get('/', (req, res) => res.send("Hello"))

// create public folder
app.use(express.static(path.join(process.cwd(), 'uploads')))

// routes
// import authRouter from './routes/auth.js'
import bookRouter from './routes/books.js'
import categoryRouter from "./routes/category.js"

// sequelize initailize 
!async function () {
    try {

        // initailize routes
        app.use(bookRouter)
        app.use(categoryRouter)
    } catch (error) {
        console.log(error)
    }
    app.use((error, req, res, next) => {
        if (error.name == 'ValidationError') {
            return res.status(error.status).json({
                status: error.status,
                message: error.message,
                errorName: error.name,
                error: true,
            })
        }


        if (error.status != 500) {
            error.status = error.status ? error.status : 404
            return res.status(error.status).json({
                status: error.status,
                message: error.message,
                errorName: error.name,
                error: true,
            })
        }

        fs.appendFileSync('./log.txt', `${req.url}__${req.method}__${Date.now()}__${error.name}__${error.message}\n`)

        return res.status(error.status).json({
            status: error.status,
            message: 'Internal Server Error',
            errorName: error.name,
            error: true,
        })
    })
    app.listen(PORT, () => console.log("🚀 BackEnd server is running http://localhost:" + PORT))
}()