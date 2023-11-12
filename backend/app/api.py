from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pandas as pd
from typing import List
import io
import numpy as np
import json
import os


app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
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
    id: str
    name: str
    unit: str

class ImpactArea(BaseModel):
    id: str
    value: str
    metrics: List[Metric]

class CompanyData(BaseModel):
    companyName: str
    address: str
    impactAreas: List[ImpactArea]




@app.post("/add-company/")
async def add_company(company_data: CompanyData):
    """
    Create a new company entry.

    Parameters:
    - company_data: JSON payload containing company information.
    """
    
    with open('data/'+company_data.companyName+".json", "a") as file:
        json.dump(company_data.dict(), file, indent=2)

    d_company = {'name': [company_data.companyName], 'address': [company_data.address]}
    df_company = pd.DataFrame(data=d_company)
    df_company.to_csv('data/'+company_data.companyName+'.csv')

    d_impact = {'impact_id': [area.id for area in company_data.impactAreas], 'impact_metric': [area.value for area in company_data.impactAreas]}
    df_impact = pd.DataFrame(data=d_impact)
    df_impact.to_csv('data/'+company_data.companyName+'_impact.csv')

    for area in company_data.impactAreas:
        d_metrics = {'metric_id': [metric.id for metric in area.metrics], 'impact_metric': [metric.name for metric in area.metrics],
                     'metric_unit': [metric.unit for metric in area.metrics]}
        
        df_metric = pd.DataFrame(data=d_metrics)
        df_metric.to_csv('data/'+company_data.companyName+'_'+area.value+'_metric.csv')
    
    return {"message": "Company created successfully", "company_data": company_data}

@app.get("/company-details/")
async def get_company(name: str):
    """
    Get data for a specific company by name.

    Parameters:
    - name: The name of the company to retrieve.
    """
    filename = name+'.json'
    if os.path.exists(filename):
        
        with open('data/'+filename, 'r') as f:
            company_data = f.read().replace("\n", "")
        return {"company_data": company_data}
    else:
        raise HTTPException(status_code=404, detail="Company not found")
    
@app.get("/get_barplot")
async def get_svg(name: str):
    svg_path = name+"_barplot.svg"
    return FileResponse(svg_path, media_type="image/svg+xml")



@app.get("/get_piechart")
async def get_svg(name: str):
    svg_path = name+"_piechart.svg"
    return FileResponse(svg_path, media_type="image/svg+xml")