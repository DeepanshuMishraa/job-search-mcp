# JobDataLake API Reference

Base URL: `https://api.jobdatalake.com`

Source: [docs.jobdatalake.com](https://www.jobdatalake.com/docs) | [Pricing](https://www.jobdatalake.com/#pricing) | [Register (1,000 free credits)](https://www.jobdatalake.com/register)

---

## Overview

JobDataLake indexes **1M+ enriched job listings** from **20,000+ companies** across **40+ ATS sources** (Greenhouse, Lever, Workday, Ashby, etc). Data is scraped directly from company career pages, updated **hourly** — new jobs indexed within ~3 hours of posting.

Each job is AI-enriched with structured fields: salary (USD), required skills, seniority level, remote policy, job function, and more. Responses are sub-100ms (Typesense-powered).

---

## Authentication

All requests require an API key in the `X-API-Key` header:

```
curl "https://api.jobdatalake.com/v1/jobs" \
  -H "X-API-Key: jdl_your_key_here"
```

Get a free key at [jobdatalake.com/register](https://www.jobdatalake.com/register) — 1,000 credits included.

---

## Endpoints

### Search Jobs

```
GET /v1/jobs
```

Search and filter all listings. **1 credit per request.**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `q` | string | Keyword search (title, company, skills) | `*` |
| `page` | int | Page number | `1` |
| `per_page` | int | Results per page (max 100) | `20` |
| `sort_by` | string | `posted_at:desc` / `posted_at:asc` / `salary_max_usd:desc` / `salary_min_usd:asc` | `posted_at:desc` |
| `remote_type` | string | `fully_remote` / `hybrid` / `on_site` | — |
| `countries` | string | Comma-separated ISO codes (e.g. `IN,US,GB,DE`) | — |
| `states` | string | Comma-separated US state codes (e.g. `CA,NY`) | — |
| `job_function` | string | `eng` / `data` / `design` / `sales` / `ops` / `marketing` / `security` / `product` / `finance` / `hr` / `legal` / `other` | — |
| `seniority` | string | Comma-separated: `Entry, Mid Level, Senior, Staff, Principal, Manager, Director, Lead, C Level, Internship` | — |
| `employment_type` | string | `full_time` / `part_time` / `contract` / `internship` | — |
| `salary_min` | int | Min salary in thousands USD (e.g. `150` = $150k) | — |
| `salary_max` | int | Max salary in thousands USD | — |
| `skills` | string | Comma-separated, AND mode (e.g. `Python,AWS,Kubernetes`) | — |
| `domain` | string | Company domain (e.g. `stripe.com`) | — |
| `location` | string | Free-text (e.g. `Remote`, `San Francisco`, `Europe`, `Asia`) | — |
| `posted_after` | int | Unix timestamp (ms) — only jobs posted after this time | — |
| `facets` | string | Comma-separated facet fields for aggregated counts | — |

### Get Job

```
GET /v1/jobs/:handle
```

Full details for a specific job including description, requirements, salary, and apply link. **1 credit.**

### Get Company

```
GET /v1/companies/:handle
```

Company profile — industry, size, funding, career page. Accepts domain or handle. **1 credit.**

---

## Response Format

### Search Response

```json
{
  "found": 3800,
  "page": 1,
  "per_page": 10,
  "jobs": [
    {
      "title": "Senior Backend Engineer",
      "company_name": "Stripe",
      "domain_name": "stripe.com",
      "posted_at": 1775520869,
      "locations": ["San Francisco, CA", "Remote"],
      "countries": ["US"],
      "remote_type": "fully_remote",
      "job_function": "eng",
      "seniority": ["Senior"],
      "salary_min_usd": 180,
      "salary_max_usd": 250,
      "required_skills": ["Python", "AWS", "Kubernetes"],
      "employment_type": "full_time",
      "url": "https://stripe.com/jobs/...",
      "job_handle": "stripe-senior-backend-engineer-abc123"
    }
  ],
  "stats": {
    "total_jobs": 1080000,
    "new_last_24h": 1100
  }
}
```

### Job fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Job title |
| `company_name` | string | Hiring company |
| `domain_name` | string | Company domain |
| `posted_at` | int | Unix timestamp (seconds) |
| `locations` | string[] | Location strings |
| `countries` | string[] | ISO country codes |
| `remote_type` | string | `fully_remote` / `hybrid` / `on_site` |
| `job_function` | string | Department/function |
| `seniority` | string[] | Experience levels |
| `salary_min_usd` | int | Min salary (thousands USD) |
| `salary_max_usd` | int | Max salary (thousands USD) |
| `required_skills` | string[] | Extracted skills |
| `employment_type` | string | `full_time` / `part_time` / `contract` / `internship` |
| `url` | string | Apply URL |
| `job_handle` | string | Unique job ID |

---

## Facets

Use `facets` parameter to get aggregated counts for filter UIs. Available facet fields:

- `remote_type` — Remote policy breakdown
- `job_function` — Department/function counts
- `seniority` — Seniority level distribution
- `countries` — Country distribution
- `states` — US state distribution
- `required_skills` — Top skills with counts
- `employment_type` — Full-time, part-time, contract, internship
- `employee_count` — Company size ranges
- `funding` — Company funding stages
- `industry` — Company industries

```
GET /v1/jobs?q=*&per_page=0&facets=remote_type,seniority,required_skills
```

---

## Example Queries

### Remote backend jobs in India

```
GET /v1/jobs?q=backend+engineer&countries=IN&remote_type=fully_remote
```

### Senior React jobs in Europe, posted this week

```
GET /v1/jobs?q=react&seniority=Senior&location=Europe&posted_after=<7_days_ago_ms>
```

### High-paying remote jobs over $150k

```
GET /v1/jobs?remote_type=fully_remote&salary_min=150&sort_by=salary_max_usd:desc
```

### Jobs at a specific company

```
GET /v1/jobs?domain=stripe.com
```

### Data science roles, any location

```
GET /v1/jobs?q=data+scientist&countries=IN,US,GB,sort_by=posted_at:desc
```

### Contract DevOps in US

```
GET /v1/jobs?q=devops&employment_type=contract&countries=US
```

### Python + AWS roles, remote

```
GET /v1/jobs?skills=Python,AWS&remote_type=fully_remote
```

### Newest jobs (last 24h)

Use `posted_after` with current timestamp minus 24h:

```
GET /v1/jobs?posted_after=1747000000000&sort_by=posted_at:desc
```

For the MCP interface, use `posted_within=24h` instead.

---

## Error Codes

| Code | Meaning |
|------|---------|
| `401` | Invalid or missing API key |
| `402` | Insufficient credits |
| `404` | Job or company not found |
| `429` | Rate limit exceeded (10 req/s) or daily MCP limit |

---

## Rate Limits

- **10 requests/second** per API key
- Contact mg@jobdatalake.com for higher limits

---

## Pricing

| Tier | Cost | Credits |
|------|------|---------|
| Free | $0 | 1,000 (one-time) |
| Starter | $200 | 1,000,000 |
| Growth | $300 | 2,000,000 |
| Business | $400 | 4,000,000 |

1 credit = 1 API request. Credits never expire.

---

## MCP Server (bonus)

We'll use the **REST API** directly in our MCP server, but JobDataLake also ships its own MCP server for direct use from Claude/Cursor:

- **Remote (no key):** `https://mcp.jobdatalake.com` — 500 calls/day free, no signup
- **Local (with key):** `npx -y @jobdatalake/mcp-server` with `JDL_API_KEY` env

Available MCP tools: `search_jobs`, `get_job`, `get_company`, `get_filter_options`, `find_similar_jobs`
