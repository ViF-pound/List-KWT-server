from sqlalchemy import create_engine
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///src/tasks.db")

Base = declarative_base()

class Task(Base):
    __tablename__ = "tasks"
    
    id:Mapped[int] = mapped_column(primary_key = True)
    description_task:Mapped[str]
    status_task:Mapped[str]

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session_tasks = Session()