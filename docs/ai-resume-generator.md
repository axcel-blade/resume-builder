# 🤖 AI Resume & Cover Letter Generator

## Overview

This is the AI-powered resume summary and cover letter generation module for VitaForge, designed to work with LM Studio as a local LLM server.

## What's Been Implemented

### Backend (NestJS)

1. **AI Controller** (`src/core/api/ai/ai.controller.ts`)
   - `POST /api/ai/resume-summary` - Generate resume summary
   - `POST /api/ai/cover-letter` - Generate cover letter  
   - `POST /api/ai/config` - Get LM Studio configuration

2. **AI Service** (`src/services/ai.service.ts`)
   - Handles AI prompt generation and API calls to LM Studio
   - Supports configurable model endpoints

3. **DTOs** 
   - `GenerateResumeSummaryDto` - For resume summary requests
   - `GenerateCoverLetterDto` - For cover letter requests

4. **AI Module** (`src/core/ai.module.ts`)
   - Integrates AI service and LM Studio config into app module

5. **Prompt Builders** (`src/core/services/prompt-builders.ts`)
   - Pre-built prompt templates for resume summaries and cover letters

### Frontend (React)

1. **AI API Client** (`frontend/src/core/api/ai.ts`)
   - TypeScript client for AI endpoints
   - Type-safe requests with error handling

2. **Component** (`frontend/src/components/ai-resume-generator.tsx`)
   - Reusable React component for generating resumes

3. **Environment Variables** (`.env.example`)
   - LM Studio API URL configuration
   - Model name settings

## How to Configure LM Studio

### 1. Start LM Studio

Download and run LM Studio from: https://lmstudio.ai/

Default API endpoint: `http://localhost:1234/v1`

### 2. Choose a Model

In LM Studio:
- Go to "Models" tab
- Download a suitable model (e.g., Mistral, Llama)
- Note the exact model name from the model list

### 3. Configure Environment Variables

Edit `frontend/.env`:

```env
VITE_LM_STUDIO_API_URL=http://localhost:1234/v1
VITE_LM_STUDIO_MODEL_NAME=your-model-name-here
```

### 4. Backend Configuration

In the backend, you can configure via:

```typescript
// In ai.service.ts or constructor
new AIService({
  apiUrl: 'http://localhost:1234/v1',
  chatEndpoint: '/chat/completions',
  modelName: 'your-model-name-here', // IMPORTANT: use exact model name from LM Studio
  maxTokens: 500,
  temperature: 0.7
})
```

## Usage

### Backend API Endpoints

```bash
# Generate Resume Summary
curl -X POST http://localhost:3000/api/ai/resume-summary \
  -H "Content-Type: application/json" \
  -d '{
    "profileData": {
      "fullName": "John Doe",
      "skills": ["JavaScript", "TypeScript"],
      "yearsOfExperience": 5,
      "objective": "Seeking challenging roles..."
    },
    "targetRole": "Senior JavaScript Developer"
  }'

# Generate Cover Letter
curl -X POST http://localhost:3000/api/ai/cover-letter \
  -H "Content-Type: application/json" \
  -d '{
    "profileData": {...},
    "jobDescription": "Job description text...",
    "companyName": "Tech Company",
    "targetPosition": "Frontend Engineer"
  }'
```

### Frontend Usage

```javascript
import { AIApiClient } from './core/api/ai';

// Generate resume summary
const response = await AIApiClient.generateResumeSummary(
  profileData,
  'Senior Developer'
);
console.log(response.content);

// Generate cover letter  
const coverResponse = await AIApiClient.generateCoverLetter(
  profileData,
  jobDescription,
  companyName,
  targetPosition
);
```

## Model Recommendations

For resume generation, consider these models:

- **Mistral-7B-Instruct-v0.1** - Good balance of quality and speed
- **Llama-3-8B** - Excellent for creative writing
- **Gemma-7b-it** - Professional and concise output
- **Phi-3-mini** - Lightweight and fast

## Troubleshooting

### Connection Issues

```
Error: connect ECONNREFUSED 127.0.0.1:1234
```

**Solution:** Ensure LM Studio is running and accessible at the configured URL.

### Invalid Model Name

```json
{ "error": "model not found" }
```

**Solution:** Use the exact model name from LM Studio's model list.

## Next Steps

To add an AI agent that uses these features:

1. Configure LM Studio with your preferred model
2. Update `VITE_LM_STUDIO_MODEL_NAME` in `.env`
3. Restart both frontend and backend servers
4. The AI agent can now call `/api/ai/resume-summary` and `/api/ai/cover-letter` endpoints

## Architecture Diagram

```
┌─────────────┐          ┌──────────────┐
│  Frontend   │◄──────►  │  Backend API │
│  (React)    │  HTTP    │  (NestJS)    │
└─────────────┘          └──────────────┘
                               │
                               │ HTTP Requests
                               ▼
                    ┌─────────────────────────┐
                    │   LM Studio Server      │
                    │   (Local LLM)           │
                    └─────────────────────────┘
```

## Files Created

- ✅ `backend/src/core/api/ai/ai.controller.ts`
- ✅ `backend/src/core/dto/ai/generate-resume-summary.dto.ts`
- ✅ `backend/src/core/dto/ai/generate-cover-letter.dto.ts`
- ✅ `backend/src/core/ai.module.ts`
- ✅ `backend/src/services/ai.service.ts` (pre-existed)
- ✅ `backend/src/core/services/prompt-builders.ts`
- ✅ `frontend/src/core/api/ai.ts`
- ✅ `frontend/src/components/ai-resume-generator.tsx`
- ✅ `frontend/.env.example`

## Ready to Use! 🚀

All infrastructure is in place. Just configure LM Studio and you're ready to generate AI-powered resume summaries and cover letters!
