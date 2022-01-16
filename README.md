<!-- Please update value in the {}  -->

<h1 align="center">Rent or Sell</h1>

<div align="center">
  <a href="https://rentorsell.netlify.app/">
      Demo
  </a>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)

<!-- OVERVIEW -->

## Overview

A web app built in react, tailwind and firebase that allows user to put their house online for sale or rent after becoming a member of the website.
This project is an improved version of the project that Brad Traversy built in his React JS course on Udemy.

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [React](https://reactjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [DasiyUI](https://daisyui.com/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [Firebase](https://firebase.google.com/)
- [React router v6](https://reactrouter.com/)
- [Leaflet](https://leafletjs.com/)
- [Swiper](https://swiperjs.com/react/)
- [React Dropzone](https://react-dropzone.js.org/)
- [Geocoding API](https://us1.locationiq.com/)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

<ul>
<li>Form validation throughout the web-app</li>
<li>User has option to login/register through their google account.</li>
<li>User can filter listings according to
  <ul>
    <li>Price: Low to High</li>
    <li>Price: High to Low</li>
    <li>Bedrooms</li>
    <li>Bathrooms</li>
    <li>Carspace</li>
    <li>Area (in SQFT)</li>
  </ul>
</li>
<li>User can create/edit/delete listings from their account</li>
<li>Geocoding</li>
<li>User can save listings (like wishlist)</li>
<li>User can send message to house owner.</li>
<li>User can see messages received.</li>
</ul>

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/agrajy10/rent-or-sell

# Install dependencies
$ npm install

Place your firebase config file "firebase.config.js" inside src.
Export firestore, firebase storage and firebase auth as db, storage and auth. Then:

# Run the app
$ npm run dev
```
