# backend/Dockerfile
FROM python:3.11
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

# Copies backend folder content into container
COPY . .