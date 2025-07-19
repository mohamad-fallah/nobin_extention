import {
  Card,
  Button,
  Box,
  Typography,
  Paper,
  Checkbox,
  TextField,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoWidget() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "بررسی ایمیل‌ها", completed: false },
    { id: 2, text: "جلسه تیم", completed: true },
    { id: 3, text: "بروزرسانی مستندات", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card
      sx={{
        height: 200,
        p: 2,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              mb: 0.5,
            }}
          >
            وظایف
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            لیست کارها
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            {todos.filter((t) => !t.completed).length} کار باقی‌مانده
          </Typography>
        </Box>
        <Typography variant="h3">📝</Typography>
      </Box>

      <Box sx={{ mt: 2, flex: 1, overflow: "hidden" }}>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <TextField
            size="small"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="کار جدید..."
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            sx={{ flex: 1 }}
          />
          <IconButton
            size="small"
            onClick={addTodo}
            sx={{ bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" } }}
          >
            <FiPlus size={16} />
          </IconButton>
        </Box>

        <Box sx={{ overflow: "auto", maxHeight: 80 }}>
          {todos.slice(0, 3).map((todo) => (
            <Paper
              key={todo.id}
              sx={{
                p: 1,
                mb: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "grey.50",
                borderRadius: 1,
              }}
            >
              <Checkbox
                size="small"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "text.secondary" : "text.primary",
                }}
              >
                {todo.text}
              </Typography>
              <IconButton
                size="small"
                onClick={() => deleteTodo(todo.id)}
                sx={{ color: "error.main" }}
              >
                <FiTrash2 size={14} />
              </IconButton>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6">📋</Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                display: "block",
              }}
            >
              مدیریت وظایف
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "success.main",
                }}
              >
                ✅ {todos.filter((t) => t.completed).length} انجام شده
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          size="small"
          variant="text"
          sx={{
            textTransform: "none",
            fontFamily: "Vazirmatn",
          }}
        >
          مشاهده همه
        </Button>
      </Box>
    </Card>
  );
}
