# Job Search MCP 

Its Employment time now, so we are at some good times where we should'nt manually goand find jobs on various sites and apply to those jobs. We should Let our agents find the right job for us , so here we are.

I have a broad scope in mind for this project so i will try to upsert things as go and pretty much this is also an attempt of mine to get familiar with effect as i started exploring it with my last [Apple MCP](https://github.com/DeepanshuMishra/apple-music-mcp-effect) project. 

Scope: 

- [ ]  Go to various job portals and find relevant jobs 
- [ ]  Define my profiles and relevant links , based on which an llm would go and explore the relevant jobs 
- [ ]  find the relevant job and return to the user. 
- [ ]  Run a cron job which keeps an eye on these portals and gives you daily new job postings based on your profile. 
- [ ]  Apply to these jobs on my behalf 
- [ ]  Find Companies , their repos if they are opensource and give report and analysis of the company 
- [ ]  Cold email Founders on my behalf. 


These are some of the ideas i have in mind at the moment , depending upon the situation things might be added or removed. 

Stack : Typescript , effect for all. 

## Data Sources

The essential ones that give daily fresh jobs with full info (title, description, salary, company, location, apply link):

| Source | Type | Access | Cost | Coverage |
|---|---|---|---|---|
| **Greenhouse** | ATS API | `boards-api.greenhouse.io/v1/boards/{company}/jobs` | Free | Most tech startups/mid-size |
| **Lever** | ATS API | `api.lever.co/v0/postings/{company}` | Free | Tech companies |
| **Ashby** | ATS API | `jobs.ashbyhq.com/api/non-user-graphql` | Free | Modern startups |
| **JobsPipe** | Aggregator | REST API (30+ ATS sources) | 5K req/month free | Greenhouse/Lever/Workday/Indeed/Glassdoor etc |
| **JobDataLake** | Aggregator | REST API (40+ ATS sources, 1M+ jobs) | 500 calls/day free | 20K+ companies, hourly updates |

**Plan**: Hit Greenhouse/Lever/Ashby directly first (free, no setup). Use JobsPipe or JobDataLake REST API for broader coverage when needed.


