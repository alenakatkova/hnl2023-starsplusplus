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

data_path = 'data/'


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


class Option(BaseModel):
    id: str
    value: str

class Field(BaseModel):
    id: str
    type: str
    label: str
    options: List[Option]

class Event(BaseModel):
    event: str
    fields: List[Field]

class Goal(BaseModel):
    area: str
    metric: str
    year: int
    target: int
    currentValue: int
    unit: str


@app.post("/add-company/")
async def add_company(company_data: CompanyData):
    """
    Create a new company entry.

    Parameters:
    - company_data: JSON payload containing company information.
    """
    company_dir = company_data.companyName+'/'

    if ~os.path.exists(data_path+company_dir):
        os.mkdir(data_path+company_dir)

    with open(data_path+company_dir+"company.json", "a") as file:
        json.dump(company_data.dict(), file, indent=2)

    d_company = {'name': [company_data.companyName], 'address': [company_data.address]}
    df_company = pd.DataFrame(data=d_company)
    df_company.to_csv(data_path+company_dir+'company.csv')

    d_impact = {'impact_id': [area.id for area in company_data.impactAreas], 'impact_metric': [area.value for area in company_data.impactAreas]}
    df_impact = pd.DataFrame(data=d_impact)
    df_impact.to_csv(data_path+company_dir+'company_impact.csv')

    for area in company_data.impactAreas:
        d_metrics = {'metric_id': [metric.id for metric in area.metrics], 'impact_metric': [metric.name for metric in area.metrics],
                     'metric_unit': [metric.unit for metric in area.metrics]}
        
        df_metric = pd.DataFrame(data=d_metrics)
        df_metric.to_csv(data_path+company_dir+area.value+'_metric.csv')
    
    return {"message": "Company created successfully", "company_data": company_data}

@app.get("/company-details/")
async def get_company(name: str):
    """
    Get data for a specific company by name.

    Parameters:
    - name: The name of the company to retrieve.
    """
    filename = data_path+name+'/company.json'
    
    try:    
        with open(filename, 'r') as f:
            company_data = f.read().replace("\n", "")
        return {"company_data": company_data}
    except:
        raise HTTPException(status_code=404, detail="Company not found")
    
@app.post("/add-event/")
async def add_event(name: str, event_data: Event):
    """
    Create a new event entry.

    Parameters:
    - company_data: JSON payload containing company information.
    """
    try:
        with open(data_path+name+'/'+event_data.event+".json", "a") as file:
            json.dump(event_data.dict(), file, indent=2)
    except:
        raise HTTPException(status_code=404, detail="Company not found")


@app.get("/get-event/")
async def get_event(name:str, event: str):
    """
    Get data for a specific event by event name.

    Parameters:
    - name: The name of the event to retrieve.
    """
    try:
        with open(data_path+name+'/'+event+'.json', 'r') as f:
            event_data = f.read().replace("\n", "")
        return {"event_data": event_data}
    except:
        raise HTTPException(status_code=404, detail="Company event not found")
    
@app.post("/add-goal/")
async def add_goal(name: str, goal_data: Goal):
    """
    Create a new goal entry.

    Parameters:
    - goal_data: JSON payload containing goal information.
    """
    try:
        with open(data_path+name+'/'+goal_data.metric+"_goal.json", "a") as file:
            json.dump(goal_data.dict(), file, indent=2)
    except:
        raise HTTPException(status_code=404, detail="Company not found")


@app.get("/get-goal/")
async def get_goal(name:str, metric: str):
    """
    Get data for a specific event by event name.

    Parameters:
    - name: The name of the company to retrieve.
    """
    try:
        with open(data_path+name+'/'+metric+'_goal.json', 'r') as f:
            goal_data = f.read().replace("\n", "")
        return {"goal_data": goal_data}
    except:
        raise HTTPException(status_code=404, detail="Company event not found")
    
    
@app.get("/get_barplot")
async def get_svg(name: str):
    svg_path = "test_progressbar.svg"
    return FileResponse(svg_path, media_type="image/svg+xml")



@app.get("/get_piechart")
async def get_svg(name: str):
    svg_path ="test_piechart.svg"
    return FileResponse(svg_path, media_type="image/svg+xml")