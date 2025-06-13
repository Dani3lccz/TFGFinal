# backend/Dockerfile
FROM python:3.11
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

# Copia todo el contenido de la carpeta backend al contenedor
COPY . .