from fastapi import FastAPI
from .managment_task.create_task import create_task_router
from .managment_task.delete_task import delete_task_router
from .managment_task.edit_task import edit_task_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(create_task_router)
app.include_router(delete_task_router)
app.include_router(edit_task_router)

origins = ["http://localhost:8000/",]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "PUT"],
    allow_headers=["Content-Type",
                   "Set-Cookie",
                   "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)