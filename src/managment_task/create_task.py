from fastapi import APIRouter
from src.tasks_models import session_tasks, Task
from sqlalchemy import select
create_task_router = APIRouter()

tasks = []

@create_task_router.post("/create_task")
def create_task(description_task:str):
    global tasks
    session_tasks.add(Task(description_task = description_task, status_task = "not completed"))
    session_tasks.commit()
    for task in (session_tasks.query(Task).all()):
        tasks.append(task)
    return tasks