# Enterprise Fraud Risk Orchestration & ML Governance Platform

A production-grade simulated fraud detection, monitoring, and ML governance system built on the Kaggle Credit Card dataset.

---

## Overview

This project implements a real-time enterprise fraud monitoring and decision orchestration platform.  
It simulates how financial institutions deploy, monitor, govern, and retrain fraud detection models in production.

Key Capabilities:

- Real-time batch streaming simulation  
- Data drift detection (PSI, KS Test, Wasserstein Distance)  
- Concept drift monitoring (AUC / Recall degradation)  
- Deterministic transaction state machine  
- Decision automation (Approve / Block / Review)  
- Human-in-the-loop feedback system  
- Model versioning & lifecycle management  
- Financial impact tracking  
- Composite health scoring & retraining triggers  

---

## Dataset

Source: Kaggle – Credit Card Fraud Detection  

| Metric | Value |
|--------|--------|
| Total Transactions | 284,807 |
| Fraud Cases | 492 |
| Fraud Rate | 0.172% |
| Features | V1–V28 (PCA), Amount, Time |
| Target | Class |

The dataset is highly imbalanced (~1 fraud per 580 transactions), closely reflecting real-world fraud scenarios.

---

## System Architecture

```
Transaction Stream
        ↓
Model Inference Layer
        ↓
Decision Policy Engine
        ↓
Transaction State Machine
        ↓
Monitoring & Drift Detection
        ↓
Health Engine
        ↓
Alerting & Retraining Logic
        ↓
Dashboard & Governance Panel
```

---

## Core Components

### 1. Streaming Engine
- Chronological batch simulation
- Immutable baseline (first 50,000 rows)
- Deterministic drift injection after batch 5
- 5-second update cycle

---

### 2. Model Layer
- Logistic Regression / LightGBM
- Batch inference wrapper
- Baseline performance tracking
- Zero-downtime model switching

---

### 3. Drift Monitoring

| Drift Type | Method Used |
|------------|-------------|
| Data Drift | PSI + KS Test |
| Prediction Drift | Wasserstein Distance |
| Concept Drift | AUC / Recall degradation |

Drift severity is aggregated into a composite score.

---

### 4. Decision Engine

Threshold-based policy:

- Low Risk → Approve  
- Medium Risk → Review  
- High Risk → Block  

Supports idempotent transaction handling.

---

### 5. Transaction State Machine

```
Pending
   ├── Approved → Closed
   ├── Blocked → Confirmed Fraud
   └── Review → (Fraud | False Positive) → Closed
```

All transitions are logged in the audit system.

---

### 6. Human-in-the-Loop
- Analyst review queue
- Feedback persistence
- Feedback-driven retraining

---

### 7. Model Registry
- Version control for models
- Metadata storage
- Rollback capability
- Zero-downtime switching

---

### 8. Business Impact Engine

Tracks:

- Fraud Prevented
- False Positive Cost
- Customer Friction Cost
- Net Savings

---

### 9. Health Engine

Composite system health score (0–100):

- 30% Data Drift
- 30% Concept Drift
- 20% Fraud Stability
- 20% Latency / SLA

Retraining triggered when thresholds are breached.

---

## Technology Stack

### Backend
- Python
- FastAPI
- PostgreSQL
- Scikit-learn
- LightGBM
- SciPy
- Uvicorn

### Frontend
- React
- Real-time dashboard UI

### Monitoring Techniques
- PSI (Population Stability Index)
- KS Test
- Wasserstein Distance
- AUC / Recall tracking
- P95 latency monitoring

---

## API Endpoints

### Prediction
POST /predict

Returns:
- risk_score
- decision
- transaction_id
- model_version

---

### Monitoring State
GET /api/monitoring/state

Returns:
- Drift metrics
- Fraud rate
- TPS
- Latency
- Health score
- Retraining flag

---

### Review Feedback
POST /api/review/{transaction_id}

---

### Model Management
GET /api/models  
POST /api/models/switch  

---

### Retraining
POST /api/monitoring/retrain  

---

## Database Schema

### fraud_logs
- transaction_id
- prediction_score
- decision
- state
- feedback
- model_version
- timestamp

### model_versions
- version_id
- training_range
- performance_metrics
- activation_timestamp

### audit_logs
- event_type
- description
- actor
- timestamp

---

## How to Run

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Start backend:
   ```
   uvicorn main:app --reload
   ```

3. Start frontend:
   ```
   npm install
   npm start
   ```

4. Open dashboard and observe 5-second updates.

---

## Project Versions

- v1 – Basic fraud model  
- v2 – Drift monitoring dashboard  
- v3 – Enterprise ML governance simulation  

---

## What This Project Demonstrates

- ML Engineering
- MLOps principles
- Statistical drift detection
- API design
- Backend architecture
- Model governance
- Human-in-the-loop systems
- Business impact modeling

This system simulates how real-world banking fraud platforms are architected and monitored.
