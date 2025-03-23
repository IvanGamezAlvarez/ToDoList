import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import "./App.css";
import ToDoElement from "./components/toDoElement";

function App() {
  const [formValue, setFormValue] = useState("");

  const [statusMessage, setStatusMessage] = useState("Write a task to do");
  const [tableData, setTableData] = useState([]);

  const getList = async () => {
    try {
      const listDB = await axios.get("http://localhost:3001/list");
      setTableData(listDB.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const submitForm = async () => {
    if (formValue.length === 0) {
      setStatusMessage("The task cant be empty");
      return;
    } else if (formValue.length > 80) {
      setStatusMessage("The character limit is 80");
      return;
    }
    try {
      await axios.post("http://localhost:3001/list", {
        formContent: formValue,
      });
      setStatusMessage("Task added succefully");
      setFormValue("");
      getList();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold p-5 mt-10 uppercase">
        To do list
      </h1>
      <p className="m-3  text-2xl font-bold">Write a task to do:</p>
      <input
        type="text"
        value={formValue}
        className="block border-1 yellow m-auto  text-center"
        placeholder='"Buy milk"'
        onChange={(e) => {
          setFormValue(e.target.value);
        }}
      />
      <p className="m-4">{statusMessage}</p>
      <input
        type="submit"
        content="Send"
        name=""
        id=""
        className="m-5 bg-indigo-500 px-4 py-1 rounded-sm hover:bg-indigo-800  hover:scale-110 "
        onClick={submitForm}
      />

      <div className=" flex items-center justify-center  flex-wrap ">
        {tableData.map((data) => {
          if (data.task == "") {
            return;
          } else {
            return (
              <ToDoElement key={data.id} data={data} updateTable={getList} />
            );
          }
        })}
      </div>
    </>
  );
}

export default App;
