from fastapi import APIRouter, HTTPException
from src.tasks_models import session_tasks, Task
from src.managment_task.create_task import tasks

delete_task_router = APIRouter()

@delete_task_router.delete("/delete_task")
def delete_task(id:int):
    try: 
        session_tasks.delete(id)
        session_tasks.commit()
        for task in (session_tasks.query(Task).all()):
            tasks.append(task)
        return tasks
    except ValueError:
        HTTPException(status_code=404, detail="fufu")
    