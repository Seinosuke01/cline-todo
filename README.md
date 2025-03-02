# ToDo Application

A full-stack ToDo application built with Next.js for the frontend and FastAPI for the backend.

## Features

- Add new ToDo items
- View a list of all ToDo items
- View details of a specific ToDo item
- Edit existing ToDo items
- Delete ToDo items
- Mark ToDo items as completed

## ToDo Item Structure

Each ToDo item includes:
- Name
- Creation time
- Update time
- Deadline
- Completion status

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios for API requests
- date-fns for date formatting
- react-datepicker for date selection

### Backend
- FastAPI
- SQLAlchemy for ORM
- SQLite for database
- Pydantic for data validation

## Setup and Running

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

   The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

   The application will be available at http://localhost:3000

## API Endpoints

- `GET /todos` - Get all ToDo items
- `GET /todos/{id}` - Get a specific ToDo item
- `POST /todos` - Create a new ToDo item
- `PUT /todos/{id}` - Update a ToDo item
- `DELETE /todos/{id}` - Delete a ToDo item

## Git Version Control

This project includes a `.gitignore` file configured for both Python/FastAPI backend and Next.js frontend development. The following files and directories are excluded from version control:

### Backend
- Python cache files (`__pycache__/`, `*.pyc`, etc.)
- Virtual environments (`venv/`, `.venv/`)
- Environment variables (`.env`)
- Database files (`*.db`, `*.sqlite`)

### Frontend
- Dependencies (`node_modules/`)
- Build outputs (`.next/`, `out/`, `dist/`)
- Environment variables (`.env*.local`)
- Debug logs

### General
- IDE-specific files (`.vscode/`, `.idea/`)
- System files (`.DS_Store`)
- Log files

To initialize Git for this project:

```bash
cd todo-app
git init
git add .
git commit -m "Initial commit"
```

## Project Structure

```
todo-app/
├── backend/
│   ├── requirements.txt
│   ├── main.py
│   ├── models.py
│   └── database.py
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── todos/
│   │       └── [id]/
│   │           ├── page.tsx
│   │           └── edit/
│   │               └── page.tsx
│   ├── components/
│   │   ├── TodoItem.tsx
│   │   └── TodoForm.tsx
│   ├── services/
│   │   └── todoService.ts
│   ├── styles/
│   │   └── globals.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── .gitignore
├── README.md
└── run.sh
