# LLM Wrapper 
A simple LLM wrapper with open-meteo integration, for dev purposes it uses gpt2 model, a very lightweight model to test responses, for better quality responses use a bigger and better model.

# How to run this?
1. You need to have docker installed in your computer.
2. Modify .env file in backend folder and configure your Hugging Face token and hash key there (eg. HASHING_KEY=random_secret_key)
3. Execute command `docker compose up` in  terminal
4. We should be able to use the web-app as usual
- localhost:4200

# How it works
The core system operates through the following components:

## 1. Frontend (Angular + Angular Material)
Very simple UI for:
- Register and log in
- Ask questions to the chatbot
- View their chat history
- Automatically handle token-based authentication (JWT)

## 2. Backend (FastAPI)
The API handles the core logic, including:
- User authentication (JWT tokens + password hashing)
- Secure endpoints for question generation and history retrieval
- Integration with external APIs to enrich responses
- Automatic Swagger documentation generation

## 3. LLM Integration
The backend forwards user prompts to a Hugging Face-hosted LLM using a secure token. The model responds with context-aware answers.

## 4. Database (SQLite + SQLAlchemy ORM)
User accounts and chat interactions are stored persistently

## 5. Authentication and Security
- Passwords are hashed using bcrypt
- JWT tokens are used for session management
- Backend routes are protected with FastAPI dependency injection



# Dependencies?
All the dependencies are already defined in the requirements.txt inside the backend folder.
- fastapi
- uvicorn
- python-jose
- passlib
- pydantic
- requests
- transformers
- SQLAlchemy
- email-validator
- torch
- python-multipart
- dotenv

