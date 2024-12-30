from fastapi import APIRouter
from src.tasks_models import session_tasks

status_task_router = APIRouter()

@status_task_router.put("/status_task")
def status_task(new_status_task:str):
    session_tasks.status_task = new_status_task
    session_tasks.commit()