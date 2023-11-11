from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, String, Integer, ForeignKey
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import declarative_base, Session, relationship
from sqlalchemy.ext.declarative import DeclarativeMeta


app = FastAPI()

DATABASE_URL = "sqlite:///./companies.db"

Base: DeclarativeMeta = declarative_base()

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

DATABASE_URL = "sqlite:///./test.db"

Base: DeclarativeMeta = declarative_base()

# SQLAlchemy models
class Metric(Base):
    __tablename__ = "metrics"
    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    unit = Column(String)
    impact_area_id = Column(String, ForeignKey("impact_areas.id"))
    impact_area = relationship("ImpactArea", back_populates="metrics")

class ImpactArea(Base):
    __tablename__ = "impact_areas"
    id = Column(String, primary_key=True, index=True)
    value = Column(String)
    metrics = relationship("Metric", back_populates="impact_area", cascade="all, delete-orphan")
    company_id = Column(String, ForeignKey("companies.id"))
    company = relationship("Company", back_populates="impactAreas")

class Company(Base):
    __tablename__ = "companies"
    id = Column(String, primary_key=True, index=True)
    companyName = Column(String)
    address = Column(String)
    impactAreas = relationship("ImpactArea", back_populates="company")

# Initialize the database engine and create tables
engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
from pydantic import BaseModel
from typing import List

class MetricResponse(BaseModel):
    id: str
    name: str
    unit: str

class ImpactAreaResponse(BaseModel):
    id: str
    value: str
    metrics: List[MetricResponse]

class CompanyResponse(BaseModel):
    id: str
    companyName: str
    address: str
    impactAreas: List[ImpactAreaResponse]

class CompanyUpdate(BaseModel):
    companyName: str
    address: str
    impactAreas: List[ImpactAreaResponse]


@app.post("/create_company/", response_model=CompanyResponse)
async def create_company(company_data: CompanyResponse, db: Session = Depends(get_db)):
    """
    Create a new company entry and save it to the database.

    Parameters:
    - company_data: JSON payload containing company information.
    - db: Database session dependency.
    """
    db.add(Company(**company_data.dict()))
    db.commit()
    db.refresh(company_data)
    return {"message": "Company created successfully", "company_data": company_data}

@app.get("/get_company/", response_model=CompanyResponse)
async def get_company(name: str, db: Session = Depends(get_db)):
    """
    Get data for a specific company by name from the database.

    Parameters:
    - name: The name of the company to retrieve.
    - db: Database session dependency.
    """
    company = db.query(Company).filter(Company.companyName == name).first()
    if company:
        return {"company_data": company}
    raise HTTPException(status_code=404, detail="Company not found")

@app.put("/update_company/{company_id}", response_model=CompanyResponse)
async def update_company(company_id: str, company_data: CompanyUpdate, db: Session = Depends(get_db)):
    """
    Update the company data of a specific company.

    Parameters:
    - company_id: The ID of the company to update.
    - company_data: JSON payload containing updated company information.
    - db: Database session dependency.
    """
    existing_company = db.query(Company).filter(Company.id == company_id).first()
    if existing_company:
        existing_company.companyName = company_data.companyName
        existing_company.address = company_data.address

        # Update impact areas
        for impact_area_data in company_data.impactAreas:
            existing_impact_area = db.query(ImpactArea).filter(ImpactArea.id == impact_area_data.id).first()
            if existing_impact_area:
                existing_impact_area.value = impact_area_data.value

                # Update metrics
                for metric_data in impact_area_data.metrics:
                    existing_metric = db.query(Metric).filter(Metric.id == metric_data.id).first()
                    if existing_metric:
                        existing_metric.name = metric_data.name
                        existing_metric.unit = metric_data.unit

        db.commit()
        db.refresh(existing_company)
        return {"message": "Company updated successfully", "company_data": existing_company}
    raise HTTPException(status_code=404, detail="Company not found")
