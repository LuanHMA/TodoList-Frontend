import { useState, useEffect, useRef } from "react";
import {
  addTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
} from "./api/todolistAPI";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Modal } from "./components/Modal";

function App() {
  const inputRef = useRef(null);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({
    description: "",
    id: "",
  });

  const { isFetching } = getAllTodos(setData);

  const updateTask = (id, description) => {
    setIsOpen(true); //Abrir modal
    setDataToEdit({
      //lista de itens a ser editado
      description: description,
      id: id,
      setData: setData,
      data: data,
    });
  };

  const deleteTask = (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir essa tarefa? "
    );
    if (confirmDelete) {
      console.log(id);
      deleteTodo(id, setData, data);
    }
  };

  const validateField = (taskDescription) => {
    if (taskDescription.length === 0) {
      alert("Você precisa digitar alguma coisa!");
    } else {
      return true;
    }
  };

  const clearField = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const sentRequest = () => {
    const taskDescription = inputRef.current.value;

    if (validateField(taskDescription)) {
      addTodo(taskDescription, setData, data);
      clearField();
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-900 flex justify-center">
      <div className="w-11/12 min-w-[320px] sm:w-2/6 h-max bg-slate-900 mt-5">
        <div className="flex items-center bg-blue-900 text-white w-full p-3">
          <input
            type="text"
            name="description"
            placeholder="O que vamos anotar ?"
            className="bg-blue-900 border-none outline-none w-10/12"
            ref={inputRef}
          />
          <button
            onClick={sentRequest}
            className="ml-2 bg-blue-600 p-2 rounded-lg disabled:opacity-50"
          >
            Adicionar
          </button>
        </div>

        <div className="mt-3 text-white">
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            dataToEdit={dataToEdit}
          />

          {isFetching ? (
            <div className="grid place-items-center mt-5 animate-spin">
              <AiOutlineLoading3Quarters size={22} />
            </div>
          ) : (
            data.map((task) => {
              return (
                <div
                  key={task._id}
                  className="bg-blue-900 flex justify-between items-center p-3"
                >
                  <h1>{task.description}</h1>
                  <div className="ml-2 flex gap-x-3">
                    <button
                      onClick={() => updateTask(task._id, task.description)}
                    >
                      <BiEdit size={22} />
                    </button>
                    <button onClick={() => deleteTask(task._id)}>
                      <BiTrashAlt size={22} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
