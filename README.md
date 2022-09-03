
# Kanban

### Table of Contents

- [Features](#features)
- [About](#about)
- [How to run](#how-to-run)
- [How to test](#how-to-test)
- [Performance, SEO and accessibility](#performance-seo-and-accessibility)



## Features

In this minimal kanban application, users are able to **create**, **edit**, and **delete** tickets from the board. Most importantly, users are able to **drag and drop** cards **across different columns** or **within the same column** having their changes **persisted** in the database. Users can also easily **share the task link** with others by tapping a share icon that automatically copies the link to the clipboard. Additionally, users can include **tags** to their tasks. Below is a quick video demo:


https://user-images.githubusercontent.com/58868651/187059204-780508ad-6385-43fb-9de8-07b82f6ceb57.mo

## About

This is a full-stack application using [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Prisma](https://www.prisma.io/) and [tRPC](https://trpc.io/). All data is persisted in a [PostgreSQL](https://www.postgresql.org/) database. In terms of styling, I used [tailwindcss](https://tailwindcss.com/) and [headless UI](https://headlessui.com/) to help me with animations.

The core features are end-to-end tested with [cypress](https://www.cypress.io/).

I deployed this app to Vercel and hosted the database in [ElephantSQL](https://www.elephantsql.com/) – you can click [here](https://kanban-made-with-love.vercel.app) to access the live version.


## How to run

In order to run the project locally, make sure you have [Docker](https://www.docker.com/) and [Node.js](https://nodejs.org/en/) installed. The instructions are with yarn, but you can use npm at your convenience.

```
# Clone this repository
$ git clone https://github.com/riltonfranzonee/kanban

# Enter the project folder
$ cd kanban

# Copy .env
$ cp .env.example .env

# Install dependencies
$ yarn install

# Init database
$ yarn initdb

# Sync database with prisma (just the first time)
$ yarn prisma db push 

# Init next.js app
$ yarn dev
```

Now you should be able to open the project at [http://localhost:3000](http://localhost:3000)

## How to test

As I mentioned, this repository also contains a couple of end-to-end tests using cypress. With cypress we have two options:

```
# Open cypress UI to watch each test
$ yarn cypress:open

# Simply run the tests and see the output directly in the console
$ yarn cypress:run
```

Here's a quick demo of the tests:


https://user-images.githubusercontent.com/58868651/187059297-dd3dcc90-9b3c-415c-89ff-96bc608dd036.mov



## Performance, SEO and accessibility

![lighthouse-report](https://user-images.githubusercontent.com/58868651/187059341-96a74d8b-8452-4508-9330-75bf6b0466e5.png)
