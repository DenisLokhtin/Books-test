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
    updatedAt date         null
);

create table history
(
    id       int auto_increment
        primary key,
    books_id int not null,
    user_id  int not null,
    constraint history_books_null_fk
        foreign key (books_id) references books (id),
    constraint history_users_null_fk
        foreign key (user_id) references users (id)
);