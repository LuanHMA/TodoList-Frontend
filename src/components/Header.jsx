import React, { useRef, useState } from "react";
import { createData } from "../api/todolistAPI";

export const Header = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const inputRef = useRef(null);

  const validateField = (taskDescription) => {
    if (taskDescription.length === 0) {
      alert("Você precisa digitar alguma coisa!");
    } else {
      return true;
    }
  };

  const sentRequest = () => {
    if (validateField(taskDescription)) {
      createData(taskDescription);
      setTaskDescription("");
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex items-center bg-blue-900 text-white w-full p-3">
      <input
        type="text"
        name="description"
        placeholder="O que vamos anotar ?"
        value={taskDescription}
        onChange={(event) => setTaskDescription(event.target.value)}
        className="bg-blue-900 border-none outline-none w-10/12"
        ref={inputRef}
      />
      <button onClick={sentRequest} className="ml-2 bg-blue-600 p-2 rounded-lg">
        Adicionar
      </button>
    </div>
  );
};
