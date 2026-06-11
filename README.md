# Job Search MCP 

Its Employment time now, so we are at some good times where we should'nt manually goand find jobs on various sites and apply to those jobs. We should Let our agents find the right job for us , so here we are.

I have a broad scope in mind for this project so i will try to upsert things as go and pretty much this is also an attempt of mine to get familiar with effect as i started exploring it with my last [Apple MCP](https://github.com/DeepanshuMishra/apple-music-mcp-effect) project. 

Stack : Typescript , effect for all. 

## Shipped

- [x] **JobDataLake search** — search with keyword, location, remote type, function, level, skills, salary
- [x] **Pagination** — generic paginate helper, loops pages till exhausted
- [x] **User profile** — structured from resume (skills, experience, education, target roles)
- [x] **GitHub analysis** — fetches user + repos via Octokit in parallel

## In Progress

- [ ] **Company details** — tools return job info but no company profile/repos. Add that.

## On Hold

- [ ] **Daily cron monitor** — scan for new postings matching your profile
- [ ] **Auto-apply pipeline** — fill and submit applications on your behalf
- [ ] **Cold email** — draft and send to founders/recruiters

## Data Sources

| Source | Type | Access | Cost | Coverage |
|---|---|---|---|---|
| **Greenhouse** | ATS API | `boards-api.greenhouse.io/v1/boards/{company}/jobs` | Free | Most tech startups/mid-size |
| **Lever** | ATS API | `api.lever.co/v0/postings/{company}` | Free | Tech companies |
| **Ashby** | ATS API | `jobs.ashbyhq.com/api/non-user-graphql` | Free | Modern startups |
| **JobsPipe** | Aggregator | REST API (30+ ATS sources) | 5K req/month free | Greenhouse/Lever/Workday/Indeed/Glassdoor etc |
| **JobDataLake** | Aggregator | REST API (40+ ATS sources, 1M+ jobs) | 500 calls/day free | 20K+ companies, hourly updates |

**Plan**: Hit Greenhouse/Lever/Ashby directly first (free, no setup). Use JobsPipe or JobDataLake REST API for broader coverage when needed.

## Setup

```env
JDL_API_KEY=jdl_your_key
GITHUB_TOKEN=ghp_your_token
```

```json
{
  "mcpServers": {
    "job-board": {
      "command": "node",
      "args": ["build/index.js"],
      "env": {
        "JDL_API_KEY": "jdl_...",
        "GITHUB_TOKEN": "ghp_..."
      }
    }
  }
}
```
