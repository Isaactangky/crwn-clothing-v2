# Crwn Clothing - e-commerce application - React Project

"Crwn Clothing" is the capstone project of [React Course by Andrei Neagoie](https://www.udemy.com/course/complete-react-developer-zero-to-mastery/). This course is a comprehensive online resource on React. This project based course introduced me to the modern toolchain of a React developer.

Along the way, I build this massive e-commerce application similar to Shopify using React, Redux, React Hooks, React Router, Context API, Firebase, Redux-Saga, Stripe and more.

![screenshoot](Screenshot-Crwn-Clothing.png?raw=true)

## Overview

### Links

- Live Site URL: [Crwn Clothing](https://crwn-clothing-isaactangky.netlify.app)

### The challenge

Users should be able to:

- View directory on home page
- Sign up by email and password
- Sign in with Google popup or with email and password
- View porduct categories preview on "Shop" page
- View category page by clicking category title on preview page
- Add product to shopping cart
- Go to "Checkout" page by clicking "checkout" button on cart dropdown
- Persist cart record even a user close the session

## My process

### Built with

- HTML
- SASS
- JavaScript (ES6)
- React
- React Router
- Styled Component
- React-Redux
- React-Saga
- GitHub
- [Firebase Authentication & Firestore Database](https://firebase.google.com/)

### Development process

1. Routes

Since Navigation component is diplayed in every route, other route components are put in the Outlet of Navigation.

```jsx
<Routes>
  <Route path="/" element={<Navigation />}>
    <Route index element={<Home />} />
    <Route path="shop/*" element={<Shop />} />
    <Route path="auth" element={<Authentication />} />
    <Route path="checkout" element={<Checkout />} />
  </Route>
</Routes>
```

2. CSS in JS

As more components are added, **class name clash** becomes a issue in writing SASS codes. Styled Component is introduced to add unique class names for components.

An alternative to Styled Component is CSS modules, I prefer to use CSS modules in future projects as we can have meaningful values instead of random hash values as class names. Inside component JSX files, I also prefer to have pure html tags instead of Styled Component tags.

3. State Management

##### From Context to Redux

Context API is used at the beginning to provide access to "global" data for different componets and to solve the **props drilling** issue: User and Cart context consumed by whole app, Categories context consumed by the Shop route.

By using reducers and then Redux, a central store is built. Actions are dispatched to root reducer, then to all reducers and each reducer decides whether to update the data or not according to the type of the actions. Components access to the central state by using selectors.

Although it requires extensive setup to integrate Redux with a React Application, better code organization with separate UI logic and State Management Logic is achieved.

##### React Thunk and React Saga

To allow for asynchronous actions and seperate data fetching from UI logic, React Thunk and React Saga are introduced.

Using Redux Thunk, the category component only need to dispatch the "fetchCategoriesStartAsync" action instead of handling the entire fetching process.
Now asynchronous actions can also be handled by Redux.

```js
export const fetchCategoriesStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
    }
  };
};
```

Using Redux Saga requires a much more complicated setup, but by migrating from Thunk to Saga, all Firebase logic are moved from separated component files to saga files. Better code organization is achieved

### Continued development

- Handling errors
- Adding responsive designs
- Adding user order page
