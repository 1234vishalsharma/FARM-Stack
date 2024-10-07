import {Button, TextField, Typography} from '@mui/material';
import React , {useState} from 'react';
import { useEffect } from 'react';
function App() {
  const [Todos , setTodos] = useState([]);
  const [title , setTitle] = useState();
  const [desc , setDesc] = useState();
  const handelAddTodo = () => {
    if(!title || !desc){
      alert("Cannot post empty data");
      return;
    }
    const Tododata = {
      title : `${title}`,
      desc: `${desc}`
    }
    setTodos(Tododata);

    fetch('http://localhost:8000/AddTodo' , {
      method: "POST",
      headers: {
        'conntent-type' : 'application/json'
      },
      body : JSON.stringify(Tododata)
      }).then((res)=>{
        return res.json();
      }).then((resp) => {
        console.log("Responce from backend is : " , resp);
      }).catch((error) => {
        console.log("Error occured : " , error);
      })
  }

  useEffect(() => {
    fetch('http://localhost:8000/GetTodo' , {
      method: "GET",
    }).then((res)=>{
      return res.json();
    }).then((resp) => {
      console.log("Responce from backend is : " , resp);
      console.log(resp);
      // setTodos(resp);
    }).catch((error) => {
      console.log("Error occured : " , error);
    })
  } , []);  

  return (
    <>
      <div className='flex justify-start pl-32 items-center h-screen w-full gap-10'>
          <div className='text-black bg-white shadow-xl font-extrabold rounded-lg w-96 h-96 flex flex-col justify-center items-center gap-4'>
            <Typography variant='h5'>Todo APP</Typography>
            <div className='flex gap-3 flex-col'>
              <TextField onChange={(e)=>setTitle(e.target.value)} id="standard-basic" label="Todo Title" variant="outlined"/>
              <TextField onChange={(e)=>setDesc(e.target.value)} id="standard-basic" label="Todo Description" variant="outlined" />
            </div>
            <Button onClick={handelAddTodo} variant={'outlined'}>Add Todo</Button>
          </div>
          
          <div className='w-full mr-32 h-96 bg-white p-8 rounded-lg overflow-auto'>
            <Typography variant='h5' style={{'textAlign': 'center'}}>Todo List</Typography>
            {
              Todos && 
                Todos.map((data) => {
                  return (<div className="flex justify-center items-center gap-4" key = {data?.id}>
                  <li className='flex list-none gap-4'>
                    <span>{data?.title}</span>
                    <span>{data?.desc}</span>
                    <span className='hover:cursor-pointer'>&#10060;</span>
                  </li>
                </div>)
                })
              }
          </div>
      </div>
    </>
  )
}

export default App
