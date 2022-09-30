const GET_CATEGORIES = `
SELECT
    *
FROM categories
;
`

const GET_CATEGORY = `
SELECT
    *
FROM CATEGORIES
WHERE category_id = $1
`

const ADD_CATEGORY = `
INSERT INTO categories(category_name) values
($1)
returning *
;
`

const UPDATE_CATEGORY = `
update categories c set
    category_name = (
        case
            when length($2) > 0 then $2
            else c.category_name::varchar
        end
    )
where category_id = $1
returning *
`

const DELETE_CATEGORY = `
delete from categories
where category_id = $1
returning *
`

export default {
    GET_CATEGORY,
    GET_CATEGORIES,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY
}