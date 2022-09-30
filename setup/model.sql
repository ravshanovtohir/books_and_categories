\c postgres;
-- drop database if exists
drop database if exists project;

-- create database look
create database project;

\c project

--connect to database

--table branches

drop table if exists categories;
create table categories (
    category_id serial not null primary key,
    category_name varchar(64) not null unique,
    created_at timestamp default CURRENT_TIMESTAMP not null
);


drop table if exists books;
create table books (
    book_id serial not null,
    book_name varchar(64) not null unique,
    short_description varchar(128) not null,
    long_description varchar(512) not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    book_img varchar(128) not null,
    category_id int not null references categories(category_id)
);

