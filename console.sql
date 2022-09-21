create database if not exists Books;

use Books;

create table books
(
    id        int auto_increment
        primary key,
    title     varchar(255) not null,
    author    varchar(255) not null,
    createdAt date         not null
);

create table users
(
    id        int auto_increment
        primary key,
    firstName varchar(255) not null,
    lastName  varchar(255) not null,
    age       int          not null,
    isFree    tinyint(1)   not null,
    createdAt date         not null,
    updatedAt date         not null,
    books     int          null,
    constraint users_books_null_fk
        foreign key (books) references books (id)
);

