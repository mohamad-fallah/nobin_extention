import { useState } from "react";

const fakeTodos = [
  { id: 1, title: "Exam quiz", done: false },
  { id: 2, title: "ES6/ES7 تمرین", done: true },
];

export default function TodoWidget() {
  const [todos, setTodos] = useState(fakeTodos);

  return (
    <div className="rounded-2xl bg-white/80 shadow p-6 flex flex-col min-w-[220px]">
      <div className="flex items-center mb-4">
        <span className="text-lg font-bold ml-2">وظایف امروز</span>
        <span className="ml-auto text-xs text-gray-400">همه</span>
      </div>
      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="text-gray-400 text-center">وظیفه‌ای برای این روز وجود ندارد.</div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between">
              <span className={todo.done ? "line-through text-gray-400" : ""}>{todo.title}</span>
              <input type="checkbox" checked={todo.done} readOnly />
            </div>
          ))
        )}
      </div>
      <button className="mt-4 w-full rounded bg-blue-100 text-blue-600 py-1 text-sm">
        + وظیفه جدید
      </button>
    </div>
  );
}
