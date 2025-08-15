# NovaCRM Backend API

This document describes the backend API endpoints added to the NovaCRM application.

## API Base URL

All API endpoints are accessible at `/api/` relative to the application base URL.

## Endpoints

### Employees API

#### GET `/api/employees`
Returns a list of all employees.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "EMP-001",
      "name": "Alice Johnson",
      "avatar": "A",
      "email": "alice@novacrm.com",
      "phone": "+1 555 300 0101",
      "role": "Project Manager",
      "dept": "Projects",
      "status": "Active",
      "joined": "2023-05-14",
      "salary": 92000
    }
  ]
}
```

#### POST `/api/employees`
Creates a new employee.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@novacrm.com",
  "role": "Marketing Manager",
  "dept": "Marketing",
  "phone": "+1 555 300 0106",
  "salary": 75000,
  "status": "Active" // Optional, defaults to "Active"
}
```

### Projects API

#### GET `/api/projects`
Returns a list of all projects.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Website Redesign",
      "description": "Revamping corporate presence",
      "status": "Active",
      "priority": "High",
      "progress": 68,
      "due": "2025-09-10",
      "spend": 42000,
      "budget": 60000,
      "team": ["A", "B", "C", "D"]
    }
  ]
}
```

#### POST `/api/projects`
Creates a new project.

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description",
  "status": "Active",
  "priority": "High",
  "progress": 0,
  "due": "2025-12-31",
  "spend": 0,
  "budget": 100000,
  "team": []
}
```

### Dashboard API

#### GET `/api/dashboard`
Returns dashboard data including KPIs, sales data, and team directory.

**Response:**
```json
{
  "success": true,
  "data": {
    "kpis": [
      {
        "title": "Payrolls Cost",
        "value": "$120,400",
        "delta": "+4.2%",
        "type": "positive",
        "subtitle": "This month"
      }
    ],
    "salesData": [
      {
        "month": "Jan",
        "sales": 4200
      }
    ],
    "teamDirectory": [
      {
        "name": "Alice Johnson",
        "avatar": "A",
        "email": "alice@novacrm.com",
        "role": "Project Manager",
        "dept": "Projects",
        "status": "Active"
      }
    ]
  }
}
```

### Recruitment API

#### GET `/api/recruitment`
Returns recruitment data including job openings and candidates.

**Response:**
```json
{
  "success": true,
  "data": {
    "openings": [
      {
        "title": "Senior Frontend Engineer",
        "status": "Open",
        "department": "Engineering",
        "applicants": 24
      }
    ],
    "candidates": [
      {
        "name": "Anna Smith",
        "score": 92,
        "stage": "Offer",
        "status": "Offer"
      }
    ]
  }
}
```

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error

## Data Storage

Currently, the API uses in-memory data storage. In a production environment, this should be replaced with a proper database solution like PostgreSQL, MongoDB, or similar.

## Frontend Integration

The frontend components have been updated to use these APIs through:
- API client utility (`lib/api-client.ts`)
- React hooks for data fetching (`hooks/use-employees.ts`, `hooks/use-projects.ts`, `hooks/use-dashboard.ts`)
- Updated page components to consume API data instead of hardcoded data