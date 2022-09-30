const GET_BOOKS = `
SELECT 
    b.book_id,
    b.book_name,
    b.short_description,
    b.long_description,
    b.created_at,
    c.category_name
FROM books AS b
JOIN categories AS c on b.category_id = c.category_id
ORDER BY b.book_id
;
`

const GET_BOOK = `
SELECT 
    b.book_id,
    b.book_name,
    b.short_description,
    b.long_description,
    b.created_at,
    c.category_name
FROM books AS b
JOIN categories AS c on b.category_id = c.category_id
WHERE b.book_id = $1
;
`

const ADD_BOOK = `
insert into books (book_name, short_description, long_description, book_img, category_id) values
($1,
 $2,
 $3,
 $4,
 $5
)
returning *
;
`

const UPDATE_BOOK = `
update books b set
    book_name = (
        case
            when length($2) > 0 then $2
            else b.book_name
        end
    ),
    short_description = (
        case
            when length($3) > 0 then $3
            else b.short_description
        end
    ),
    long_description = (
        case
            when length($4) > 0 then $4
            else b.long_description
        end
    )
where book_id = $1
returning *
`
const DELETE_BOOK = `
delete from books
where book_id = $1
returning *
`

export default {
    GET_BOOKS,
    GET_BOOK,
    ADD_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK
}