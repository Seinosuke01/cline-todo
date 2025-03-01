'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TodoForm from '../../../../components/TodoForm';
import { getTodoById, updateTodo, CreateTodoInput, UpdateTodoInput } from '../../../../services/todoService';

export default function EditTodo({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState({
    name: '',
    deadline: null as Date | null,
    completed: false
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const data = await getTodoById(parseInt(params.id));
        setInitialValues({
          name: data.name,
          deadline: data.deadline ? new Date(data.deadline) : null,
          completed: data.completed
        });
        setError(null);
      } catch (err) {
        setError('ToDoの取得に失敗しました。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [params.id]);

  const handleSubmit = async (values: CreateTodoInput | UpdateTodoInput) => {
    try {
      console.log('Updating todo:', values);
      await updateTodo(parseInt(params.id), values as UpdateTodoInput);
      router.push(`/todos/${params.id}`);
    } catch (err) {
      setError('ToDoの更新に失敗しました。');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-4">読み込み中...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">ToDo編集</h2>
        <div className="flex space-x-2">
          <Link href={`/todos/${params.id}`} className="btn btn-secondary">
            詳細に戻る
          </Link>
          <Link href="/" className="btn btn-secondary">
            一覧に戻る
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <TodoForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isEditing={true}
        />
      </div>
    </div>
  );
}
