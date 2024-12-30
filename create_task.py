from fastapi import APIRouter
from tasks_models import session_tasks, Task

create_task_router = APIRouter()

@create_task_router.post("/create_task")
def create_task(name_task:str, description_task:str):
    session_tasks.add(Task(name_task = name_task, description_task = description_task))
    session_tasks.commit()