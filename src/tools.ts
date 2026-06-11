import z from "zod";
import { Effect as effect } from "effect";
import { server } from "./index.js";
import { getAllJobs, SearchJob } from "./api.js";
import { getGithubData } from "./profile.js";
import { userProfile, targetKeywords } from "./userProfile.js";

server.addTool({
  name: "search-all-jobs",
  description: "Search all the jobs",
  execute: async () => {
    const result = await effect.runPromise(getAllJobs());
    return JSON.stringify(result);
  }
});

server.addTool({
  name: "analyze-profile",
  description: "Analyze the user's github profile for skills, projects etc",
  execute: async () => {
    const github = await effect.runPromise(getGithubData());
    return JSON.stringify({ github, profile: userProfile });
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
    const result = await effect.runPromise(SearchJob(args));
    return JSON.stringify(result);
  }
});

server.addTool({
  name: "search-jobs-for-me",
  description: "Search jobs tailored to the user's profile (skills, experience, target roles)",
  parameters: z.object({
    keyword: z.string().optional(),
    location: z.string().optional(),
    countries: z.string().optional(),
    remote_type: z.enum(["any", "fully_rmeote", "hybrid", "in_office"]).optional(),
    level: z.enum(["Entry", "Senior", "Mid+Level", "Staff", "Manager"]).optional(),
    employment_type: z.enum(["fully_time", "part_time", "contract", "internship"]).optional(),
    salary_min: z.number().optional(),
  }),
  execute: async (args) => {
    const params = {
      keyword: args.keyword ?? targetKeywords.join(" "),
      location: args.location ?? userProfile.location,
      countries: args.countries ?? "",
      remote_type: (args.remote_type ?? userProfile.targetRemoteType) as any,
      job_function: "eng" as const,
      level: args.level ?? "Entry",
      employement_type: (args.employment_type ?? "fully_time") as any,
      skills: userProfile.skills.languages.concat(userProfile.skills.frontend, userProfile.skills.backend, userProfile.skills.ai),
      salary_min: args.salary_min ?? 0,
    };
    const result = await effect.runPromise(SearchJob(params));
    return JSON.stringify(result);
  }
});
