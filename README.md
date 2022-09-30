# books_and_categories
 
To use the program, first download this repository
 
# setup database

The data structure is located inside the model file inside the setup file. In this file, copy the postgres code to your postgresql terminal and create a database. After that, edit the database information in the .env file (such as password and database name).
If you want, postgresQl code for mock data is written in the mockData.js file inside the setup file

# start program
```
To run the program fully, you need to type npm i in the terminal
To run the program, type npm run start:dev in the terminal
```

# To get books and categories

```
For user: http://localhost:5000/api/categories
For book: http://localhost:5000/api/books
```
