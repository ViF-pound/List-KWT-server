from fastapi import FastAPI
from create_task import create_task_router

app = FastAPI()

app.include_router(create_task_router)
