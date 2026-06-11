import z from "zod";
import { Effect } from "effect";
import { server } from "./index.js";
import { getAllJobs, SearchJob } from "./api.js";

server.addTool({
  name: "search-all-jobs",
  description: "Search all the jobs",
  execute: async () => {
    const result = await Effect.runPromise(getAllJobs());
    return JSON.stringify(result);
  }
});

server.addTool({
  name: "search-jobs",
  description: "Search jobs with keyword, location, country, remote type, job function, seniority, employment type, skills, and salary filters",
  parameters: z.object({
    keyword: z.string(),
    location: z.string().optional(),
    countries: z.string().optional(),
    remote_type: z.enum(["any", "fully_rmeote", "hybrid", "in_office"]).optional(),
    job_function: z.enum(["any", "eng", "data", "design", "product", "sales", "marketing", "ops", "security", "finance", "hr", "legal", "other"]).optional(),
    level: z.enum(["Entry", "Senior", "Mid+Level", "Staff", "Manager"]).optional(),
    employment_type: z.enum(["fully_time", "part_time", "contract", "internship"]).optional(),
    skills: z.array(z.string()).optional(),
    salary_min: z.number().optional(),
  }),
  execute: async (args) => {
    const result = await Effect.runPromise(SearchJob(args));
    return JSON.stringify(result);
  }
});
