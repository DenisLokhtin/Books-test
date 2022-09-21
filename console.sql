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

insert into Books.books (id, title, author, createdAt)
values (1, 'dsafg', 'sdfg', '2022-09-15'),
       (3, '1', '1', '2022-09-16'),
       (4, '1', '1', '2022-09-16'),
       (5, '1', '1', '2022-09-16'),
       (6, '5', '4', '2022-09-16'),
       (7, '345345345', '534534', '2022-09-21'),
       (8, '345345345', '534534', '2022-09-21');

insert into Books.history (id, books_id, user_id)
values (1, 1, 1),
       (2, 5, 1),
       (3, 6, 1);

insert into Books.users (id, firstName, lastName, age, isFree, createdAt, updatedAt)
values (1, 'sdasd', 'goo', 15, 0, '2022-09-21', '2022-09-21');