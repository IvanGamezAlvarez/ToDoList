export default function ToDoElement(props) {
  return (
    <div className="m-5 bg-amber-400 p-3 rounded-sm  mx-96 flex  gap-3 items-center ">
      <h1 className="font-bold uppercase  w-10/12"> {props.task}</h1>
      <button className="bg-green-700 p-3 w-40 rounded-sm ">edit</button>

      <button className="bg-red-700 p-3 w-40 rounded-sm">remove</button>
    </div>
  );
}
