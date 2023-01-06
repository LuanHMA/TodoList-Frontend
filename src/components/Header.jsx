import React, { useEffect, useState } from "react";
import { createData } from "../api/todolistAPI";

export const Header = () => {
  const [taskDescription, setTaskDescription] = useState("");

  function sentRequest() {
    createData(taskDescription);
  }

  return (
    <div className="flex items-center bg-blue-900 text-white w-full p-3">
      <input
        type="text"
        name="description"
        placeholder="O que vamos anotar ?"
        value={taskDescription}
        onChange={(event) => setTaskDescription(event.target.value)}
        className="bg-blue-900 border-none outline-none w-10/12"
        autoComplete="none"
      />
      <button onClick={sentRequest} className="ml-2 bg-blue-600 p-2 rounded-lg">
        Adicionar
      </button>
    </div>
  );
};
