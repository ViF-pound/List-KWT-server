from fastapi import APIRouter
from src.tasks_models import session_tasks

delete_task_router = APIRouter()

@delete_task_router.delete("/delete_task")
def delete_task(description_task:str):
    session_tasks.delete(description_task)
    session_tasks.commit()
    