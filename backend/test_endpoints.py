import pytest
from fastapi.testclient import TestClient

#Solve import issues
import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from main import app, hashPassword, isValidPassword, createAccessToken

from sqlalchemy.orm import Session
from schema import SessionLocal, User

client = TestClient(app)

@pytest.fixture(scope="module")
def test_user():
    """Creates a test user."""
    db: Session = SessionLocal()
    username = "testuser"
    email = "testuser@example.com"
    password = hashPassword("testpass")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        user = User(username=username, email=email, password=password)
        db.add(user)
        db.commit()
        db.refresh(user)
    db.close()
    return {"username": username, "password": "testpass"}

def test_login_success(test_user):
    response = client.post("/login", data={
        "username": test_user["username"],
        "password": test_user["password"]
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    test_user["token"] = data["access_token"]

def test_login_failure():
    response = client.post("/login", data={
        "username": "wronguser",
        "password": "wrongpass"
    })
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"

def test_generate_prompt(test_user):
    headers = {"Authorization": f"Bearer {test_user['token']}"}
    response = client.post("/generate", json={
        "username": test_user["username"],
        "prompt": "What is the capital of France?"
    }, headers=headers)
    assert response.status_code == 200

def test_generate_invalid_prompt(test_user):
    headers = {"Authorization": f"Bearer {test_user['token']}"}
    response = client.post("/generate", json={
        "username": test_user["username"],
        "prompt": "hi"
    }, headers=headers)
    assert response.status_code == 400
    assert "detail" in response.json()

def test_get_history(test_user):
    headers = {"Authorization": f"Bearer {test_user['token']}"}
    response = client.get("/history/", headers=headers)
    assert response.status_code == 200
    assert "history" in response.json()
    assert response.json()["username"] == test_user["username"]

# -----------------------
# Helper functions
# -----------------------
def test_hash_and_verify_password():
    raw = "supersecure123"
    hashed = hashPassword(raw)
    assert hashed != raw
    assert isValidPassword(raw, hashed) is True
    assert isValidPassword("wrongpass", hashed) is False

def test_create_access_token():
    token = createAccessToken(data={"sub": "demo"})
    assert isinstance(token, str)
