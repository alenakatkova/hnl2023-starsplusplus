from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from typing import List


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to our amazing app."}

class Metric(BaseModel):
    def __init__(self, id: str, name: str, unit: str):
        self.id = id
        self.name = name
        self.unit = unit

class ImpactArea(BaseModel):
    def __init__(self, id: str, value: str, metrics: List[Metric]):
        self.id = id
        self.value = value
        self.metrics = metrics

class CompanyData(BaseModel):
    def __init__(self, companyName: str, address: str, impactAreas: List[ImpactArea]):
        self.companyName = companyName
        self.address = address
        self.impactAreas = impactAreas

# In-memory storage for demonstration purposes
companies_database = []

@app.post("/create_company/")
async def create_company(company_data: CompanyData):
    """
    Create a new company entry.

    Parameters:
    - company_data: JSON payload containing company information.
    """
    companies_database.append(company_data)
    return {"message": "Company created successfully", "company_data": company_data}

@app.get("/get_company/")
async def get_company(name: str):
    """
    Get data for a specific company by name.

    Parameters:
    - name: The name of the company to retrieve.
    """
    for company in companies_database:
        if company.companyName == name:
            return {"company_data": company}
    raise HTTPException(status_code=404, detail="Company not found")



