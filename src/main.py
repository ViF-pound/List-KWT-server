from fastapi import FastAPI
from managment_task.create_task import create_task_router
from managment_task.delete_task import delete_task_router
from managment_task.edit_task import edit_task_router

app = FastAPI()

app.include_router(create_task_router)
app.include_router(delete_task_router)
app.include_router(edit_task_router)