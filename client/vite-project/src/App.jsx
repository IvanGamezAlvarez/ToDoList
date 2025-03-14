import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import "./App.css";
import ToDoElement from "./components/toDoElement";

function App() {
  const [formValue, setFormValue] = useState("");
  const [statusMessage, setStatusMessage] = useState(
    "Ingrese la tarea por hacer"
  );
  const [tableData, setTableData] = useState([]);

  const getList = async() => {
    await axios.get("http://localhost:3001/list").then(function (response) {
      setTableData(response.data);
    });
  };

  useEffect(() => {
    getList()
  }, []);

  const submitForm = async () => {
    if (formValue.length === 0) {
      setStatusMessage("La informacion no puede estar vacia");
    } else if (formValue.length > 80) {
      setStatusMessage("El limite de caracteres es de 80");
      setFormValue("");
    } else {
      await axios.post("http://localhost:3001/list", { formContent: formValue });
      setStatusMessage("Informacion agregada correctamente");
      setFormValue("");
      getList();
    }
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold p-5 mt-10 uppercase">
        To do list{" "}
      </h1>
      <input
        type="text"
        value={formValue}
        className="block border-1 yellow m-auto"
        onChange={(e) => {
          setFormValue(e.target.value);
        }}
      />
      <p className="m-3">{statusMessage}</p>
      <input
        type="submit"
        name=""
        id=""
        className="m-5 bg-amber-400 px-4 py-1 rounded-sm hover:bg-amber-600"
        onClick={() => {
          submitForm();
        }}
      />
      <h2 className="text-2xl font-bold mt-5">Things to do:</h2>
      <div className=" flex items-center justify-center  flex-wrap">
        {tableData.map((data) => {
          if (data.task == "") {
            return;
          } else {
            return <ToDoElement key={data.id} data={data} />;
          }
        })}
      </div>
    </>
  );
}

export default App;
