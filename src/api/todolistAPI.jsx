import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const createData = (data) => {
  axios
    .post(`${apiUrl}/save`, {
      description: data,
    })
    .then((response) => {
      console.log("your post request has been sent successfully: ", response);
    })
    .catch((error) => {
      alert("Error to sent your post request");
      console.log("ERROR POST REQUEST: " + error);
    });
};

export const getAllData = (setData) => {
  axios
    .get(apiUrl)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      alert("Error requesting data");
      console.log(error);
    });
};

export const deleteData = (_id) => {
  axios
    .delete(`${apiUrl}/delete`, {
      data: {
        _id: _id,
      },
    })
    .then(() => {
      alert("Tarefa deletada com sucesso!");
      console.log("Task deleted with success");
    })
    .catch((error) => {
      alert("Error to delete");
      console.log("ERROR DELETE: " + error);
    });
};

export const updateData = (description, _id) => {
  axios
    .put(`${apiUrl}/edit`, {
      description: description,
      _id: _id,
    })
    .then((response) => {
      console.log("Task edited with success! [TASK EDITED]: " + response.data);
    })
    .catch((error) => {
      alert("ERRO ao editar sua tarefa");
      console.log("ERROR PUT: " + error);
    });
};
