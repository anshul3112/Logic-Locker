# Logic-Locker - Snippet Manager

Logic-Locker is a full-stack web application designed as a secure, personal library for developers to manage and reuse code snippets. It integrates an AI-powered summarization feature to provide quick insights into your code.

---

## Features

- **Secure User Authentication:** Full user registration and login system using JWT with `httpOnly` cookies and refresh token rotation.
- **Complete CRUD Functionality:** Users can create, read, update, and delete their own private code snippets.
- **AI-Powered Summarization:** Integrates the Google Gemini API to generate concise summaries of code snippets on demand.
- **Dynamic Filtering:** Client-side filtering allows users to instantly search their snippet library by title or programming language.
- **Responsive Design:** A clean, modern UI built with Tailwind CSS that works seamlessly on desktop and mobile devices.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **APIs:** Google Gemini API

---
