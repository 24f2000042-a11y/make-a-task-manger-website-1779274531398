# Task Manager MERN App

This is a simple Task Manager web application built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

*   **CRUD Operations:** Create, Read, Update, and Delete tasks.
*   **Task Status:** Mark tasks as completed or incomplete.
*   **Modern Blue Theme:** A clean and modern user interface with a blue color scheme.
*   **Responsive Design:** Works well on various screen sizes.

## Technologies Used

*   **Frontend:** React with Vite, Axios
*   **Backend:** Node.js, Express, CORS, Mongoose, dotenv
*   **Database:** MongoDB

## Project Structure


.
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── index.html
│   └── package.json
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── README.md
└── ...


## Setup and Installation

### Prerequisites

*   Node.js and npm (or yarn) installed
*   MongoDB installed locally or an account on MongoDB Atlas

### Backend Setup

1.  **Navigate to the backend directory:**
    bash
    cd backend
    

2.  **Install dependencies:**
    bash
    npm install
    

3.  **Create a `.env` file:**
    Copy the `.env.example` file and rename it to `.env`.
    bash
    cp .env.example .env
    

4.  **Configure `.env`:**
    Open the `.env` file and update the `MONGO_URI` with your MongoDB connection string.
    *   **For local MongoDB:** `MONGO_URI=mongodb://localhost:27017/taskmanagerdb` (replace `taskmanagerdb` with your desired database name).
    *   **For MongoDB Atlas:** Use the connection string provided by Atlas.

5.  **Start the backend server:**
    bash
    npm start
    # or for development with auto-restarts:
    npm run dev
    

### Frontend Setup

1.  **Navigate to the frontend directory:**
    bash
    cd ../frontend
    

2.  **Install dependencies:**
    bash
    npm install
    

3.  **Configure API URL:**
    By default, the frontend will try to connect to `http://localhost:5000`. If your backend is running on a different port or URL, you can set the `VITE_API_URL` environment variable.

    *   **Option 1 (Recommended for Vite):** Create a `.env` file in the `frontend` directory:
        
        VITE_API_URL=http://localhost:5000
        
        (Replace `http://localhost:5000` with your actual backend URL).
    *   **Option 2 (Directly in code - less recommended):** Modify the `API_URL` constant in `src/App.jsx`.

4.  **Start the frontend development server:**
    bash
    npm run dev
    

## Usage

Once both the backend and frontend servers are running, open your browser to `http://localhost:5173` (or the port Vite is running on). You should see the Task Manager application.

*   **Add Tasks:** Fill in the title and optional description in the "Add New Task" section and click "Add Task".
*   **View Tasks:** All your tasks will be displayed in the "My Tasks" section.
*   **Mark as Complete:** Click the "Complete" button to mark a task as done.
*   **Edit Tasks:** Click the "Edit" button to modify a task's title, description, or completion status. Click "Save" to confirm changes or "Cancel" to discard.
*   **Delete Tasks:** Click the "Delete" button to remove a task.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
