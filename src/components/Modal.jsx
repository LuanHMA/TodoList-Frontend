import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { updateData } from "../api/todolistAPI";

export const Modal = ({ isOpen, setIsOpen, dataToEdit }) => {
  const [descriptonToEdit, setDescriptionToEdit] = useState("");

  useEffect(() => {
    const { description } = dataToEdit;

    setDescriptionToEdit(description);
  }, [dataToEdit]);

  const handlEdit = () => {
    const { id } = dataToEdit;

    setIsOpen(false);
    updateData(descriptonToEdit, id);
  };

  return (
    <Transition
      show={isOpen}
      enter="transition duration-400 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-400 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="bg-blue-400 text-white relative w-10/12 md:w-3/6 left-2 top-[-500px] m-auto p-4 "
      >
        <Dialog.Panel>
          <Dialog.Title className=" text-xl font-bold">
            Editando tarefa
          </Dialog.Title>
          <hr />
          <div className="mt-4">
            <input
              type="text"
              value={descriptonToEdit}
              onChange={(event) => setDescriptionToEdit(event.target.value)}
              className="text-black bg-blue-300 w-full p-2 outline-none"
              placeholder="Qual é o novo texto ?"
            />
          </div>

          <div className="flex items-center gap-x-2 mt-4">
            <button
              onClick={() => handlEdit()}
              className="bg-blue-600 py-1 px-2 rounded-lg"
            >
              Editar
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-blue-200 py-1 px-2 rounded-lg text-blue-600"
            >
              Cancelar
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};
