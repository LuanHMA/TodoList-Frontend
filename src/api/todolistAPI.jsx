import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const createData = (taskDescription) => {
  axios
    .post(`${apiUrl}/save`, {
      description: taskDescription,
    })
    .then((response) => {
      console.log("your post request has been sent successfully: ");
    })
    .catch((error) => {
      alert("Houve algum problema ao adicionar um novo item :(");
      console.log("ERROR POST REQUEST: " + error);
    });
};

export const getAllData = (updateDataState) => {
  axios
    .get(apiUrl)
    .then((response) => {
      updateDataState(response.data);
    })
    .catch((error) => {
      alert("Houve um problema ao recuperar os dados!");
      console.log("ERROR GET: " + error);
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
      alert("[ERROR] Não conseguimos deletar sua tarefa");
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
