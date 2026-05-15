# React Blog Application

A modern, full-featured blog application built with React, featuring user authentication, CRUD operations, and a beautiful UI.

## 🚀 Features

- ✅ User Authentication (Register/Login/Logout)
- ✅ Create, Read, Update, Delete blog posts
- ✅ Image preview in post form
- ✅ Responsive design with Tailwind CSS & DaisyUI
- ✅ Toast notifications
- ✅ Protected routes
- ✅ Only post owners can edit/delete their posts
- ✅ Floating action button for quick post creation

## 🛠️ Technologies Used

- **Frontend**: React 19, Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS, DaisyUI
- **HTTP Client**: Axios
- **Backend**: json-server-auth (fake REST API)
- **Notifications**: react-toastify

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/MoSalem149/react-blog-app.git
cd react-blog-app
```

2. Install dependencies:

```bash
npm install
```

3. Create `db.json` file in the root directory:

```json
{
  "users": [],
  "posts": []
}
```

## 🚀 Running Locally

You need to run both frontend and backend:

### Terminal 1 - Frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Terminal 2 - Backend:

```bash
npm run backend
```

Backend runs on: `http://localhost:3000`

## 📝 Usage

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Create Post**: Click the floating "+" button (bottom-right)
4. **Edit Post**: Click "Edit" on your own posts
5. **Delete Post**: Click "Delete" on your own posts

## 🌐 API Endpoints

- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /posts` - Get all posts
- `POST /posts` - Create new post (requires auth)
- `PUT /posts/:id` - Update post (requires auth)
- `DELETE /posts/:id` - Delete post (requires auth)

## 👨‍💻 Author

**Mohamed Salem**

- GitHub: [@MoSalem149E](https://github.com/MoSalem149E)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Final project for React Course
- Instructor: Ahmed Zaghloul
- Course: [React Course - Mansoura]

## Deployment Bonus

### Frontend (Vercel)
1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Deploy the project.

### Backend Hosting
The backend uses `json-server-auth`, so deploy it separately on a Node.js host such as Render, Railway, or Cyclic.

Recommended start command:
```bash
npm install
npm run backend
```

After deployment, update `src/api/axios.js` with the hosted backend URL.

