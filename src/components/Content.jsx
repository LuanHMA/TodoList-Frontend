import React, { useEffect, useState } from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getAllData, deleteData, updateData } from "../api/todolistAPI";
import { Modal } from "./Modal";

export const Content = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({
    description: "",
    id: "",
  });

  const updateDataState = (response) => {
    setData(response);
  };

  useEffect(() => {
    getAllData(updateDataState);
  }, []);

  useEffect(() => {
    getAllData(setData);
  }, [data]);

  const updateTask = (id, description) => {
    setIsOpen(true);
    setDataToEdit({
      description: description,
      id: id,
    });
  };

  const deleteTask = (id) => {
    console.log(id);
    deleteData(id);
  };

  return (
    <div className="mt-3 text-white">
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} dataToEdit={dataToEdit} />

      {data.map((task) => {
        return (
          <div
            key={task._id}
            className="bg-blue-900 flex justify-between items-center p-3"
          >
            <h1>{task.description}</h1>
            <div className="ml-2 flex gap-x-3">
              <button onClick={() => updateTask(task._id, task.description)}>
                <BiEdit size={22} />
              </button>
              <button onClick={() => deleteTask(task._id)}>
                <BiTrashAlt size={22} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
