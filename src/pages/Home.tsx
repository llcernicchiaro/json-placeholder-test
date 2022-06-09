import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography
} from "@mui/material";
import { onGet } from "api";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("users", () => onGet("users"));

  useEffect(() => {
    if (!!data) setUsers(data);
  }, [data]);

  const onClickItem = (id: number) => {
    navigate("users/" + id);
  };

  return (
    <div>
      <Typography variant="h3">Home</Typography>
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Skeleton variant="rectangular" width="100%" height={118} />
        </>
      ) : (
        <List>
          {users.map((user: any) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton onClick={() => onClickItem(user.id)}>
                <ListItemText primary={user.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default Home;
