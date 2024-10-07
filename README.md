# Blog Platform

This project is a **Blog Platform** built with **Angular** and integrated with **Firebase services**. It implements **SEO best practices** and supports **Server-Side Rendering (SSR)** using **Angular Universal**.

## Features

### 1. Authentication

- **Email/Password Registration and Login**: Secure user authentication using Firebase's email/password system.
- **Google Sign-In**: OAuth integration for easy authentication via Google.
- **User Profile Page**: Each user can view and edit their profile information.

### 2. Blog Post Management

- **CRUD Operations**: Create, read, update, and delete blog posts, fully integrated with Firebase's Firestore.
- **Real-Time Comments**: Blog posts support real-time comments, with listeners that automatically update the comments section when new comments are added.

### 3. SEO and Server-Side Rendering (SSR)

- **Angular Universal Integration**: Server-Side Rendering (SSR) is set up to improve SEO and initial load performance.

---

## Hosted Demo

You can check out the hosted demo of the Blog Platform at the following link:

[Hosted Demo Website](#) _([link](https://blog-app-lab.web.app/sign-in))_

---

## Development Server

To start the development server, run:

```bash
ng serve
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
