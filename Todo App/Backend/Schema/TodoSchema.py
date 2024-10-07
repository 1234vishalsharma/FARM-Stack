from pydatic import BaseModel


class Todo(BaseModel):
    Id : int
    Title: str
    Description: str


class TodoUpdate(Todo):
    pass

class TodoDelete(Todo):
    pass

class TodoCreate(Todo):
    pass

