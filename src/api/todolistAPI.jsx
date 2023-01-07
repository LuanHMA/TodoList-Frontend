import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const addTodo = (taskDescription, setData, data) => {
  axios
    .post(`${apiUrl}/save`, {
      description: taskDescription,
    })
    .then((response) => {
      console.log("your post request has been sent successfully: ");
      setData([...data, response.data]);
    })
    .catch((error) => {
      alert("Houve algum problema ao adicionar um novo item :(");
      console.log("ERROR POST REQUEST: " + error);
    });
};

export const getAllTodos = (updateDataState) => {
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        updateDataState(response.data);
      })
      .catch((error) => {
        alert("Houve um problema ao recuperar os dados!");
        console.log("ERROR GET: " + error);
      })
      .finally(() => setIsFetching(false));
  }, []);

  return { isFetching };
};

export const deleteTodo = (_id, setData, data) => {
  axios
    .delete(`${apiUrl}/delete`, {
      data: {
        _id: _id,
      },
    })
    .then((response) => {
      console.log("Task deleted with success");

      const res = response.data;
      const newData = data.filter((item) => {
        return item._id != res._id;
      });
      setData(newData);
    })
    .catch((error) => {
      alert("[ERROR] Não conseguimos deletar sua tarefa");
      console.log("ERROR DELETE: " + error);
    });
};

export const updateTodo = (description, _id, setData, data) => {
  axios
    .put(`${apiUrl}/edit`, {
      description: description,
      _id: _id,
    })
    .then((response) => {
      console.log("Task edited with success! [TASK EDITED]: ");

      const res = response.data[0];
      const newData = data.map((item) => {
        if (item._id == res._id) {
          item.description = res.description;
        }
        return item;
      });

      setData(newData);
    })
    .catch((error) => {
      alert("ERRO ao editar sua tarefa");
      console.log("ERROR PUT: " + error);
    });
};
