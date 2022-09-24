# Books-test API

**Запуск проекта при помощи docker-compose:**

```
git clone https://github.com/DenisLokhtin/Books-test.git

cd Books-test/

docker-compose up
```

- Это запустит сборку приложения через docker-compose.
- После сборки докер образов запустится поднятие приложения.
- Прогонятся миграции.
- Прогонятся сиды.
- После успешной сборки и запуска приложение будет доступно на localhost 8071 порту.

***

**Эндпоинты:**

в приложении есть несколько эндпоинтов:

```
GET /users
POST /users
GET /users/:id
PUT /users/:id
DELETE /users/:id

GET /books
POST /books
GET /books/:id
PUT /books/:id
DELETE /books/:id

GET /history
POST /history
GET /history/:id
PUT /history/:id
DELETE /history/:id
```

***

- **GET /users**

Возвращает список объектов всех пользователей:

```
[
    {
        "id": 1,
        "firstName": "Marsden",
        "lastName": "Powell",
        "age": 7,
        "isFree": 0,
        "createdAt": "2022-09-16T00:00:00.000Z",
        "updatedAt": "2023-01-21T00:00:00.000Z"
    },
]
```

- **GET /users/:id**

Возвращает объект пользователя со списком объектов с его прочитанными книгами:

```
{
    "id": 1,
    "firstName": "Marsden",
    "lastName": "Powell",
    "age": 7,
    "isFree": 0,
    "createdAt": "2022-09-16T00:00:00.000Z",
    "updatedAt": "2023-01-21T00:00:00.000Z",
    "books": [
        {
            "id": 108,
            "title": "tincidunt dui augue",
            "author": "Cherokee Atkins",
            "createdAt": "2022-11-29T00:00:00.000Z"
        }
    ]
}
```

***

- **GET /books**

Возвращает список объектов всех книг:

```
[
    {
        "id": 1,
        "title": "dui nec urna suscipit nonummy.",
        "author": "Kimberley Peck",
        "createdAt": "2022-04-27T00:00:00.000Z"
    },
]
```

- **GET /books/:id**

Возвращает объект с книгой.

```
{
    "id": 1,
    "title": "dui nec urna suscipit nonummy.",
    "author": "Kimberley Peck",
    "createdAt": "2022-04-27T00:00:00.000Z"
}
```

***

- **GET /history**

Возвращает список объектов с id книги и id пользователя.

```
[
    {
        "id": 1,
        "books_id": 67,
        "user_id": 111
    },
]
```

- **GET /history/:id**

Возвращает объект с id книги и id пользователя.

```
{
    "id": 1,
    "books_id": 67,
    "user_id": 111
}
```

***

**Также все Get (/history, /users, /books) могут принимать 3 query параметра:**

- limit=number (от 1) (количество записей).
- page=number (от 0) (номер страницы).
- all=boolean (true) (запросить весь список).

Базовые значения:

- limit - 10 записей.
- page - страница 0.
- all - false.

**Пример использования:**

```
http://localhost:8071/users
```

```
http://localhost:8071/users?page=3
```

```
http://localhost:8071/users?limit=20
```

```
http://localhost:8071/users?page=3&limit=30
```

```
http://localhost:8071/users?all=true
```

***

- **POST /users**

Тело запроса:

```
{
	"firstName": string,
	"lastName": string,
	"age": number,
	"isFree": boolean
}
```

- **POST /books**

Тело запроса:

```
{
	"author": string,
	"title": string,
}
```

- **POST /history**

Тело запроса:

```
{
	"books_id": number,
	"user_id": number,
}
```

***

- **PUT /users**

Тело запроса:

```
{
	"firstName": string,
	"lastName": string,
	"age": number,
	"isFree": boolean
}
```

- **PUT /books**

Тело запроса:

```
{
	"author": string,
	"title": string,
}
```

- **PUT /history**

Тело запроса:

```
{
	"books_id": number,
	"user_id": number,
}
```

***

- **DELETE /:id**

***
