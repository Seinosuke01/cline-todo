'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { getTodoById, Todo } from '../../../services/todoService';

export default function TodoDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const data = await getTodoById(parseInt(params.id));
        setTodo(data);
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'なし';
    return format(new Date(dateString), 'yyyy/MM/dd HH:mm');
  };

  if (loading) {
    return <div className="text-center py-4">読み込み中...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!todo) {
    return <div className="text-center py-4">ToDoが見つかりませんでした。</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">ToDo詳細</h2>
        <div className="flex space-x-2">
          <Link href="/" className="btn btn-secondary">
            一覧に戻る
          </Link>
          <Link href={`/todos/${todo.id}/edit`} className="btn btn-primary">
            編集
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-2xl font-medium mb-2">{todo.name}</h3>
          <div className={`inline-block px-2 py-1 rounded text-sm ${
            todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {todo.completed ? '完了' : '未完了'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-sm text-gray-500">作成日時</p>
            <p className="font-medium">{formatDate(todo.created_at)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">更新日時</p>
            <p className="font-medium">{formatDate(todo.updated_at)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">期限</p>
            <p className="font-medium">{formatDate(todo.deadline)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
