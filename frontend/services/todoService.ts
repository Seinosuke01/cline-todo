import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface Todo {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deadline: string | null;
  completed: boolean;
}

export interface CreateTodoInput {
  name: string;
  deadline?: string | null;
  completed?: boolean;
}

export interface UpdateTodoInput {
  name?: string;
  deadline?: string | null;
  completed?: boolean;
}

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

// Get a single todo by ID
export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await axios.get(`${API_URL}/todos/${id}`);
  return response.data;
};

// Create a new todo
export const createTodo = async (todo: CreateTodoInput): Promise<Todo> => {
  const response = await axios.post(`${API_URL}/todos`, todo);
  return response.data;
};

// Update a todo
export const updateTodo = async (id: number, todo: UpdateTodoInput): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/todos/${id}`, todo);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/todos/${id}`);
};
