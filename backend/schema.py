from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime, UTC

# Define the base class
Base = declarative_base()

# User table
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(128), nullable=False)
    created_at = Column(DateTime, default=datetime.now(UTC))
    
    query_relation = relationship("Query", back_populates="user_relation")

# Chatbot Query table, stores user interactions with the chatbot
class Query(Base):
    __tablename__ = "queries"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user_input = Column(Text, nullable=False)
    bot_response = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.now(UTC))  # To track interaction time

    user_relation = relationship("User", back_populates="query_relation")

# SQLite connection
DATABASE_URL = "sqlite:///./database/chatbot_data.db"
engine = create_engine(DATABASE_URL, echo=True)

# Create the tables if they don't exist
Base.metadata.create_all(engine)

# Session factory to interact with the database
SessionLocal = sessionmaker(bind=engine)
