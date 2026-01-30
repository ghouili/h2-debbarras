# Express + DB CRUD Prompt (Leads)

```json
{
  "promptType": "express-crud-spec",
  "stack": "Express + Prisma or SQL",
  "resource": "Lead",
  "endpoints": [
    { "method": "POST", "path": "/api/leads", "description": "Create lead from contact or quote form" },
    { "method": "GET", "path": "/api/leads", "description": "List leads (admin)" },
    { "method": "GET", "path": "/api/leads/:id", "description": "Get lead by id" },
    { "method": "PATCH", "path": "/api/leads/:id", "description": "Update lead fields" },
    { "method": "DELETE", "path": "/api/leads/:id", "description": "Delete lead" }
  ],
  "schema": {
    "table": "leads",
    "fields": {
      "id": "string/uuid",
      "source": "enum: contact_form | quote_form",
      "name": "string?",
      "firstName": "string?",
      "lastName": "string?",
      "email": "string?",
      "phone": "string",
      "postalCode": "string?",
      "city": "string?",
      "requestType": "string?",
      "service": "string?",
      "timing": "string?",
      "localType": "string?",
      "propertyType": "string?",
      "rooms": "string?",
      "volume": "string?",
      "volumeEstimate": "string?",
      "floor": "string?",
      "elevator": "boolean?",
      "photos": "string[]?",
      "message": "string?",
      "consent": "boolean",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  },
  "validation": {
    "contact_form": {
      "required": ["name", "phone", "consent"],
      "optional": ["postalCode", "requestType", "message"],
      "postalCode": "If provided, must match Île-de-France: /^(75|77|78|91|92|93|94|95)\\d{3}$/",
      "phone": "FR phone regex after removing spaces",
      "consent": "must be true"
    },
    "quote_form": {
      "required": ["service", "postalCode", "firstName", "lastName", "email", "phone", "consent"],
      "optional": ["city", "timing", "localType", "propertyType", "rooms", "volume", "volumeEstimate", "floor", "elevator", "photos", "message"],
      "email": "must be valid email",
      "phone": "FR phone regex after removing spaces",
      "consent": "must be true"
    }
  },
  "notes": [
    "Accept multipart/form-data when photos are provided; otherwise JSON.",
    "Normalize phone by removing spaces before validation.",
    "Return 201 with created lead object; include source and id.",
    "Log source + createdAt for analytics." 
  ]
}
```
