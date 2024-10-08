import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const Card = (todo) => {
    const data = todo?.todo;
    console.log("data is :  ",data)
    const [isUpdate , setIsUpdate] = useState(false)
    const [newTitle , setNewTitle] = useState();
    const [newDesc , setNewDesc] = useState();
    const DeleteTodo = (id) => {
        console.log("Id is here: " , id-1);
        fetch(`http://localhost:8000/delete?todoId=${id}` , {
          method: "Delete",
        }).then((res)=>{
          return res.json();
        }).then((resp) => {
          console.log("Delete resp",resp);
          location.reload();
        }).catch((error) => {
          console.log("Error occured : " , error);
        })
    }
    const handelUpdateevent = () => {
        setIsUpdate(!isUpdate);
    }
    const handelSaveEvent = () => {
        if(!newTitle || !newDesc){
            alert("Cannot post empty Todo");
            return;
        }
        const UpdatedData = {title : newTitle , desc: newDesc};
        fetch(`http://localhost:8000/UpdateTodo?todoId=${data?.id}` , {
            method: "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(UpdatedData)
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            setIsUpdate(!isUpdate);
            location.reload();
        }).catch((e) => {
            console.log("Error occured " , e);
        })
    }
  return (
    <div
      className="flex justify-center rounded-md items-center gap-16 border"
      key={data?.id}
    >
      <div className="flex flex-col shadow-md gap-4 p-4">
        {isUpdate == false ? <span className="text-xl font-extrabold">Title: {data?.title}</span> : <TextField onChange={(e)=>setNewTitle(e.target.value)} label={'New Todo Title'}></TextField>}
        {isUpdate == false ? <span className="font-semibold">Description: {data?.desc}</span> : <TextField onChange={(e)=>setNewDesc(e.target.value)} label={'New Todo Title'}></TextField>}
        <div className="flex gap-4">
          {isUpdate == false && <Button onClick={handelUpdateevent} variant="outlined">
            Update Todo
          </Button>}
          {isUpdate && <Button onClick={handelSaveEvent} variant="outlined">
            Save Todo
          </Button>}
          <Button
            onClick={() => DeleteTodo(data?.id)}
            variant={"outlined"}
            color={"error"}
          >
            Remove / Completed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
