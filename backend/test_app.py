from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

# Import your FastAPI app and models
from app.api_sql import app, Base, Company, ImpactArea, Metric, DATABASE_URL

# Override the database URL for testing
TEST_DATABASE_URL = "sqlite:///./test_test.db"

# Helper function to create a test company
def create_test_company(db: Session):
    test_company = Company(
        companyName="Test Company",
        address="Test Address",
        impactAreas=[
            ImpactArea(
                value="Test Impact Area",
                metrics=[
                    Metric(name="Test Metric", unit="Test Unit")
                ]
            )
        ]
    )
    db.add(test_company)
    db.commit()
    db.refresh(test_company)
    return test_company

# Tests
def test_create_company():
    client = TestClient(app)
    with TestDatabase(TEST_DATABASE_URL) as test_db:
        response = client.post(
            "/create_company/",
            json={
                "companyName": "Test Company",
                "address": "Test Address",
                "impactAreas": [
                    {
                        "value": "Test Impact Area",
                        "metrics": [
                            {"name": "Test Metric", "unit": "Test Unit"}
                        ]
                    }
                ]
            }
        )
        assert response.status_code == 200
        assert response.json()["message"] == "Company created successfully"
        assert response.json()["company_data"]["companyName"] == "Test Company"
        assert response.json()["company_data"]["impactAreas"][0]["value"] == "Test Impact Area"

def test_get_company():
    client = TestClient(app)
    with TestDatabase(TEST_DATABASE_URL) as test_db:
        # Create a test company
        test_company = create_test_company(test_db)
        # Retrieve the test company
        response = client.get(f"/get_company/?name={test_company.companyName}")
        assert response.status_code == 200
        assert response.json()["company_data"]["companyName"] == "Test Company"
        assert response.json()["company_data"]["impactAreas"][0]["value"] == "Test Impact Area"

def test_update_company():
    client = TestClient(app)
    with TestDatabase(TEST_DATABASE_URL) as test_db:
        # Create a test company
        test_company = create_test_company(test_db)
        # Update the test company
        response = client.put(
            f"/update_company/{test_company.id}",
            json={
                "companyName": "Updated Company",
                "address": "Updated Address",
                "impactAreas": [
                    {
                        "id": test_company.impactAreas[0].id,
                        "value": "Updated Impact Area",
                        "metrics": [
                            {"id": test_company.impactAreas[0].metrics[0].id, "name": "Updated Metric", "unit": "Updated Unit"}
                        ]
                    }
                ]
            }
        )
        assert response.status_code == 200
        assert response.json()["message"] == "Company updated successfully"
        assert response.json()["company_data"]["companyName"] == "Updated Company"
        assert response.json()["company_data"]["impactAreas"][0]["value"] == "Updated Impact Area"
        assert response.json()["company_data"]["impactAreas"][0]["metrics"][0]["name"] == "Updated Metric"
