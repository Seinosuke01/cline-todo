'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import { getTodos, createTodo, updateTodo, deleteTodo, Todo, CreateTodoInput, UpdateTodoInput } from '../services/todoService';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('ToDoの取得に失敗しました。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (todoData: CreateTodoInput | UpdateTodoInput) => {
    try {
      console.log('Adding todo:', todoData);
      // Since we're adding a new todo, we can safely cast to CreateTodoInput
      // The form ensures all required fields are present
      await createTodo(todoData as CreateTodoInput);
      setShowForm(false);
      fetchTodos();
    } catch (err) {
      setError('ToDoの追加に失敗しました。');
      console.error(err);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTodo(id, { completed });
      fetchTodos();
    } catch (err) {
      setError('ToDoの更新に失敗しました。');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (window.confirm('このToDoを削除してもよろしいですか？')) {
      try {
        await deleteTodo(id);
        fetchTodos();
      } catch (err) {
        setError('ToDoの削除に失敗しました。');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">ToDo一覧</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'キャンセル' : '新規ToDo追加'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-3">新規ToDo追加</h3>
          <TodoForm onSubmit={handleAddTodo} />
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">読み込み中...</div>
      ) : todos.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          ToDoがありません。新しいToDoを追加してください。
        </div>
      ) : (
        <div>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
