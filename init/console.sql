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
values (1, 'In Search of Lost Time', 'Marcel Proust', '2022-09-15'),
       (2, 'Ulysses', 'James Joyce', '2022-09-16'),
       (3, 'Don Quixote', 'Miguel de Cervantes', '2022-09-16'),
       (4, 'One Hundred Years of Solitude', 'Gabriel Garcia Marquez', '2022-09-16'),
       (5, 'To Kill a Mockingbird', 'Harper Lee', '2022-09-16'),
       (6, 'Where the Sidewalk Ends', 'Shel Silverstein', '2022-09-21'),
       (7, 'Valley of the Dolls', 'Jacqueline Susann', '2022-09-21'),
       (8, 'The Shining', 'Stephen King', '2022-09-15'),
       (9, 'The Little Prince', 'Antoine de Saint-Exupéry', '2022-09-16'),
       (10, 'The Fellowship of the Ring', 'J.R.R. Tolkien', '2022-09-16'),
       (11, 'The Handmaid’s Tale', 'Margaret Atwood', '2022-09-16'),
       (12, 'A Wrinkle in Time', 'Madeleine L’Engle', '2022-09-16'),
       (13, 'Pride and Prejudice', 'Jane Austen', '2022-09-21'),
       (14, 'Man’s Search for Meaning', 'Viktor E. Frankl', '2022-09-21');

insert into Books.users (id, firstName, lastName, age, isFree, createdAt, updatedAt)
values (1, 'john', 'doe', 34, 0, '2022-09-21', '2022-09-21'),
       (2, 'Leandro', 'Neville', 23, 1, '2022-09-21', '2022-09-21'),
       (3, 'Osman', 'Buckner', 44, 0, '2022-09-21', '2022-09-21'),
       (4, 'Connagh', 'Carpenter', 22, 1, '2022-09-21', '2022-09-21'),
       (5, 'Dane', 'Nairn', 23, 1, '2022-09-21', '2022-09-21');

insert into Books.history (id, books_id, user_id)
values (1, 1, 1),
       (2, 2, 2),
       (3, 3, 3),
       (4, 4, 4),
       (5, 5, 5),
       (6, 6, 1),
       (7, 7, 2),
       (8, 8, 3),
       (9, 9, 4),
       (10, 10, 5),
       (11, 11, 1),
       (12, 12, 2),
       (13, 13, 3),
       (14, 14, 4);