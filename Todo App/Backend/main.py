from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import Response
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

todo = []
id = 0

class Item(BaseModel):
    id: int
    title: str
    desc: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (use specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get('/')
def Home():
    return {'status' : True , 'id': id,'message': "Hello to Home Page"}

@app.get('/GetTodo')
def getTodos():
    if(len(todo) > 0):    return todo
    else:    return {'success': False , 'message': 'No Todo Present'}

@app.post('/AddTodo')
def AddTodo(item : Item):
    global id
    id += 1    
    todo.append({'id' : id , 'title' : item.title , 'desc': item.desc})
    return {'success': True , 'message': 'Todo Added Successfully' , 'Todo' : todo}

@app.post('/UpdateTodo/{todoId}')
def UpdateTodo(todoId: int , item: Item):
    for i in todo:
        if todoId == i['id']:
            i['title'] = item.title
            i['desc'] = item.desc
            return {'success' : True , 'message' : 'Todo Updated Successfully' , 'Todo' : todo}
    
    raise HTTPException(status_code=404, detail="Todo not found")