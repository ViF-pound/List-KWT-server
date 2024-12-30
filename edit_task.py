from fastapi import APIRouter
from tasks_models import session_tasks

edit_task_router = APIRouter()

@edit_task_router.delete("/edit_task")
def edit_task(name_task:str):
    session_tasks.name
    session_tasks.commit()