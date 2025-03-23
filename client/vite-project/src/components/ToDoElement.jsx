import { FaTrash, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import clsx from "clsx";
import axios from "axios";
import { useState } from "react";

export default function ToDoElement({ data, updateTable }) {
  const [editState, SetEditState] = useState(true);
  const [newTask, SetNewTask] = useState("");
  const [itemCss, setItemCss] = useState("bg-indigo-800");

  const deleteElement = async () => {
    try {
      await axios.delete(`http://localhost:3001/list/${data.id}`);
      await updateTable();
    } catch (error) {
      console.error(error);
    }
  };
  const editElement = async () => {
    try {
      await axios.put("http://localhost:3001/list", {
        id: data.id,
        info: newTask,
      });
      await updateTable();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={clsx(
        "w-10/12  p-3 rounded-sm my-2 flex items-center justify-end transition-transform-colors  duration-500   animate-fade-left",
        itemCss
      )}
    >
      {editState ? (
        <h1 className="font-bold uppercase   w-10/12  rounded-sm m-auto">
          {" "}
          {data.task}
        </h1>
      ) : (
        <input
          type="text"
          className=" border-2 border-amber-50 w-9/12  h-10 mx-auto  rounded-sm text-center"
          placeholder="Write your new task"
          onChange={(e) => {
            SetNewTask(e.target.value);
          }}
        ></input>
      )}

      <button
        className=" bg-emerald-600 mx-2 p-3 rounded-sm hover:bg-emerald-800  hover:scale-110"
        onClick={() => {
          console.log("hola");
          if (editState) {
            SetEditState(false);
          } else {
            setItemCss("bg-emerald-400 scale-110");
            setTimeout(() => {
              editElement();
              SetEditState(true);
              setItemCss(" bg-indigo-800");
            }, 600);
          }
        }}
      >
        {editState ? <FaPencil /> : <FaCheck />}
      </button>
      <button
        className="bg-red-700 p-3 rounded-sm hover:bg-red-900 hover:scale-110  "
        onClick={() => {
          setItemCss(" bg-indigo-800 translate-x-500 scale-100 opacity-100");
          setTimeout(() => {
            setItemCss("hidden");
            deleteElement();
          }, 600);
        }}
      >
        <FaTrash />
      </button>
    </div>
  );
}
