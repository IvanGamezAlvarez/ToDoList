import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import axios, { Axios } from "axios";

export default function ToDoElement(data) {

  

  let deleteElement = ()=>{
    console.log(data.data.id)
    
  }


  return (
    <div className=" w-10/12 bg-amber-400 p-3 rounded-sm  my-2 flex  items-center justify-end">
      <h1 className="font-bold uppercase   w-10/12  rounded-sm m-auto"> {data.data.task}</h1>
      <button className=" bg-emerald-600 mx-2 p-3 rounded-sm"><FaPencil/></button>
      <button className ="bg-red-700 p-3" onClick={()=>{deleteElement()}}><FaTrash/></button>
    </div>
  );
}
