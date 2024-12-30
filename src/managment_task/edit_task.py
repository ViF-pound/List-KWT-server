from fastapi import APIRouter
from src.tasks_models import session_tasks

edit_task_router = APIRouter()

@edit_task_router.put("/edit_task")
def edit_task(new_description_task:str):
    session_tasks.descripyion_task = new_description_task
    session_tasks.commit()