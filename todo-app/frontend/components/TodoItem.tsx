import React from 'react';
import { format } from 'date-fns';
import { Todo } from '../services/todoService';
import Link from 'next/link';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggleComplete }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'なし';
    return format(new Date(dateString), 'yyyy/MM/dd HH:mm');
  };

  return (
    <div className={`border p-4 rounded-lg shadow-sm mb-3 ${todo.completed ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id, !todo.completed)}
            className="h-5 w-5 text-blue-600 rounded"
          />
          <h3 className={`ml-3 text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {todo.name}
          </h3>
        </div>
        <div className="flex space-x-2">
          <Link href={`/todos/${todo.id}`} className="btn btn-secondary text-sm">
            詳細
          </Link>
          <Link href={`/todos/${todo.id}/edit`} className="btn btn-primary text-sm">
            編集
          </Link>
          <button
            onClick={() => onDelete(todo.id)}
            className="btn btn-danger text-sm"
          >
            削除
          </button>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500 grid grid-cols-2 gap-2">
        <div>
          <span className="font-medium">作成日時:</span> {formatDate(todo.created_at)}
        </div>
        <div>
          <span className="font-medium">更新日時:</span> {formatDate(todo.updated_at)}
        </div>
        <div>
          <span className="font-medium">期限:</span> {formatDate(todo.deadline)}
        </div>
        <div>
          <span className="font-medium">ステータス:</span> {todo.completed ? '完了' : '未完了'}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
