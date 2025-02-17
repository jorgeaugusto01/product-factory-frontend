This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Authentication and dummy data for Development

The back-end provides a set of dummy data to get you up and running with some contents to help development. Necessary commands can be found in the back-end repository to import those data.

The front-end app provides dummy authentication to help login without OpenUnited Login in a local development environment. To use that, please create a file named `.env.development` in the project root directory and add the following two lines:

```
APPLICATION_MODE=development
TEST_USER=UUID_OF_USER_FROM_DUMMY_DATA
```

The `TEST_USER` should contain the UUID of the user that will be logged in when you click on the sign in button. After importing the dummy data, please get he generated UUID of a user from the `id` column of the `talent_person` table and use that.

Then start the dev server using command:
```
yarn dev
```

You can now sign in as the `TEST_USER` by clicking on the `Sign In` button and use the app as an authenticated user.


