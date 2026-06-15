"""Backend tests for SYSTEM O-JDEV API: contact endpoints + health check."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback: read from frontend/.env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip()
                break

BASE_URL = (BASE_URL or "").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health Check ----
class TestHealth:
    def test_root_health(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "message" in data
        assert "online" in data["message"].lower()


# ---- Contact CRUD ----
class TestContact:
    def test_create_contact_valid(self, session):
        payload = {
            "name": "TEST_Usuario Pytest",
            "phone": "+55 11 91234-5678",
            "company": "TEST_Empresa",
            "message": "Olá, gostaria de informações sobre o serviço de automação.",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code in (200, 201), f"unexpected {r.status_code}: {r.text}"
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert data["company"] == payload["company"]
        assert data["message"] == payload["message"]
        # store for verification
        pytest.created_contact_id = data["id"]
        pytest.created_contact_name = data["name"]

    def test_create_contact_no_company(self, session):
        # company is optional
        payload = {
            "name": "TEST_SemEmpresa",
            "phone": "9999-0000",
            "message": "Mensagem de teste sem empresa preenchida.",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code in (200, 201), r.text
        data = r.json()
        assert data["company"] == "" or data["company"] is None
        assert data["name"] == payload["name"]

    def test_create_contact_missing_name_returns_422(self, session):
        payload = {"name": "", "phone": "12345", "message": "mensagem ok aqui"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422, f"expected 422, got {r.status_code}: {r.text}"

    def test_create_contact_missing_phone_returns_422(self, session):
        payload = {"name": "Nome ok", "phone": "", "message": "mensagem ok aqui"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_create_contact_short_message_returns_422(self, session):
        payload = {"name": "Nome ok", "phone": "12345", "message": "oi"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_create_contact_missing_required_field_returns_422(self, session):
        # completely missing 'message'
        r = session.post(f"{API}/contact", json={"name": "A", "phone": "12345"}, timeout=15)
        assert r.status_code == 422

    def test_list_contacts_includes_created(self, session):
        # small wait for persistence
        time.sleep(0.5)
        r = session.get(f"{API}/contact", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert isinstance(data, list)
        ids = [c.get("id") for c in data]
        assert getattr(pytest, "created_contact_id", None) in ids, (
            "previously created contact id was not found in GET /contact list"
        )
        # verify field shape on at least one record
        sample = next(c for c in data if c.get("id") == pytest.created_contact_id)
        assert sample["name"] == pytest.created_contact_name
        assert "_id" not in sample  # ObjectId must not leak
        assert "created_at" in sample
