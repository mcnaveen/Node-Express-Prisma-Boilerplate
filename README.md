## Node Express Typescript Prisma Boilerplate

🦄 Starter template for your Express Prisma MySQL API

## 🍔 Stack Specs

- Node.js
- Express
- TypeScript
- Prisma
- MySQL

## 🧬 Development

- Clone the repository

```
git clone https://github.com/mcnaveen/node-express-prisma-boilerplate nepb
```
- Cd into the project directory
```
cd nepb
```

- Install dependencies

```
yarn install
```

- Create a Database in MySQL (or) You can use GUI to create a database

```
mysql> CREATE DATABASE express;
```

- Copy the `.env.sample` file as `.env`

```
cp .env.sample .env
```

- Edit the MySQL Details in the `.env` file

```
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/DBNAME?schema=public"
```

- Push the Prisma Schema into Database

```
npx prisma migrate dev
```

- Run the development server

```
yarn dev
```

## 🚀 Production Build

- Run the production build

```
yarn build
```

- Start the production server

```
yarn start
```

> Your production build is available on `dist` folder

## 🧭 Endpoints

- `POST` - For Creating New User
- `GET` - For Getting All Users
- `GET` - For Getting User By ID
- `PATCH` - For Updating User By ID
- `DELETE` - For Deleting User By ID

## 🃏 Examples

> 💡 Please install the Recommended VS Code Extensions and Check `api.rest` file for Examples

- Creating a New User

```
POST http://localhost:4000/users
Content-Type: application/json

{
  "name": "john",
  "email": "john@gmail.com"
}
```

- Getting All Users

```
GET http://localhost:4000/users
```

- Getting User By ID

```
GET http://localhost:4000/users/1
```

- Patching User By ID

```
PATCH http://localhost:4000/users/1
Content-Type: application/json

{
  "name": "newjohn",
  "email": "john@gmail.com"
}
```

- Deleting User By ID

```
DELETE http://localhost:4000/users/1
```

## ☑️ LICENSE
- MIT

---
### 💰 HELP ME WITH DEVELOPMENT COST

<a href="https://www.buymeacoffee.com/mcnaveen" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
