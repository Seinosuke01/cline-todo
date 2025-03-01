import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CreateTodoInput, UpdateTodoInput } from '../services/todoService';

interface TodoFormProps {
  initialValues?: {
    name: string;
    deadline: Date | null;
    completed: boolean;
  };
  onSubmit: (values: CreateTodoInput | UpdateTodoInput) => void;
  isEditing?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ 
  initialValues = { name: '', deadline: null, completed: false },
  onSubmit,
  isEditing = false
}) => {
  // Initialize state with default values
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [completed, setCompleted] = useState(false);

  // ここだけ修正した
  // // Update state when initialValues change
  // useEffect(() => {
  //   setName(initialValues.name);
  //   // Properly handle date conversion
  //   if (initialValues.deadline) {
  //     const deadlineDate = initialValues.deadline instanceof Date 
  //       ? initialValues.deadline 
  //       : new Date(initialValues.deadline);
  //     setDeadline(deadlineDate);
  //   } else {
  //     setDeadline(null);
  //   }
  //   setCompleted(initialValues.completed);
  // }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      deadline: deadline ? deadline.toISOString() : null,
      completed
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          ToDo名
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input mt-1 block w-full"
          placeholder="ToDoの名前を入力"
        />
      </div>

      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
          期限
        </label>
        <DatePicker
          id="deadline"
          selected={deadline}
          onChange={(date: Date | null) => setDeadline(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy/MM/dd HH:mm"
          className="input mt-1 block w-full"
          placeholderText="期限を選択（任意）"
          isClearable
        />
      </div>

      {isEditing && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label htmlFor="completed" className="ml-2 block text-sm text-gray-700">
            完了
          </label>
        </div>
      )}

      <div className="pt-2">
        <button type="submit" className="btn btn-primary w-full">
          {isEditing ? '更新' : '追加'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
