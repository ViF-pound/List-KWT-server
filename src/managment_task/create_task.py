from fastapi import APIRouter
from tasks_models import session_tasks, Task

create_task_router = APIRouter()

@create_task_router.post("/create_task")
def create_task(description_task:str):
    session_tasks.add(Task(description_task = description_task, status_task = "not completed"))
    session_tasks.commit()