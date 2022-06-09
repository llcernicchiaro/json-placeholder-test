import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { onDelete, onGet, onPost, onPut } from "api";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

function User() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [textError, setTextError] = useState("");
  const { data: user, isLoading: loadingUser } = useQuery("user", () =>
    onGet("users/" + userId)
  );

  const { data: todos, isLoading: loadingTodos } = useQuery(
    "todos-by-user",
    () => onGet("todos?userId=" + userId)
  );

  const edit = useMutation((editedTodo: Partial<Todo>) =>
    onPut("todos/" + editedTodo.id, editedTodo)
  );

  const onChangeCompleted = (todo: Todo) => {
    edit.mutate({ ...todo, completed: !todo.completed });
  };

  const deleteTodo = useMutation((id: number) => onDelete("todos/" + id));

  const onDeleteTodo = (id: number) => {
    deleteTodo.mutate(id);
  };

  const addTodo = useMutation((newTodo: Partial<Todo>) =>
    onPost("todos", newTodo)
  );

  const onAddTodo = () => {
    if (inputValue === "") {
      setTextError("Write something!");
    } else {
      setInputValue("");
      setTextError("");
      addTodo.mutate({
        completed: false,
        userId: Number(userId!),
        title: inputValue,
      });
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") setTextError("");
    setInputValue(e.target.value);
  };

  return (
    <Stack spacing={3}>
      <div>
        <IconButton edge="start" onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <Typography variant="h3">{loadingUser ? "..." : user.name}</Typography>
      <Typography variant="h6">Add new todo:</Typography>
      <TextField
        label="New todo"
        variant="outlined"
        value={inputValue}
        helperText={textError}
        error={!!textError}
        onChange={onChangeInput}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            onAddTodo();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onAddTodo}>
                <ArrowForwardIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="h5">Todo's List:</Typography>
      <List>
        {!loadingTodos &&
          todos.map((todo: Todo) => (
            <ListItem
              disablePadding
              key={todo.id}
              secondaryAction={
                <IconButton onClick={() => onDeleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton onClick={() => onChangeCompleted(todo)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={todo.title} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}

export default User;
