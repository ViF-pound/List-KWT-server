from fastapi import APIRouter
from tasks_models import session_tasks

delete_task_router = APIRouter()

@delete_task_router.delete("/delete_task")
def delete_task(name_task:str):
    session_tasks.delete(name_task)
    session_tasks.commit()