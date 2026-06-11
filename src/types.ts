import { Schema } from "effect";
import z from "zod";

export enum RemoteType {
  ANY = "any",
  FULLY_REMOTE = "fully_rmeote",
  HYBRID = "hybrid",
  OFFICE = "in_office"
}

export enum JobFunction {
  ANY = "any",
  ENGINEERING = "eng",
  DATA = "data",
  DESIGN = "design",
  PRODUCT = "product",
  SALES = "sales",
  MARKETING = "marketing",
  OPERATIONS = "ops",
  SECURITY = "security",
  FINANCE = "finance",
  HR = "hr",
  LEGAL = "legal",
  OTHER = "other"
}

enum JobLevel {
  ENTRY = "Entry",
  SENIOR = "Senior",
  MID = "Mid+Level",
  STAFF = "Staff",
  MANAGER = "Manager"
}

enum EmploymentType {
  FULL_TIME = "fully_time",
  PART_TIME = "part_time",
  CONTRACT = "contract",
  INTERNSHIP = "internship",
}

export const JobSearchParams = Schema.Struct({
  keyword: Schema.String,
  location: Schema.String,
  countries: Schema.String,
  remote_type: Schema.Enums(RemoteType),
  job_function: Schema.Enums(JobFunction),
  level: Schema.Enums(JobLevel),
  employement_type: Schema.Enums(EmploymentType),
  skills: Schema.Array(Schema.String),
  salary_min: Schema.Number.pipe(
    Schema.int(),
    Schema.greaterThan(0),
    Schema.optionalWith({ default: () => 0 })
  )
});

export const SearchJobsSchema = z.object({
  keyword: z.string(),
  location: z.string().optional(),
  countries: z.string().optional(),
  remote_type: z.enum(["any", "fully_rmeote", "hybrid", "in_office"]).optional(),
  job_function: z.enum(["any", "eng", "data", "design", "product", "sales", "marketing", "ops", "security", "finance", "hr", "legal", "other"]).optional(),
  level: z.enum(["Entry", "Senior", "Mid+Level", "Staff", "Manager"]).optional(),
  employment_type: z.enum(["fully_time", "part_time", "contract", "internship"]).optional(),
  skills: z.array(z.string()).optional(),
  salary_min: z.number().optional(),
});

export const SearchJobsForMeSchema = z.object({
  keyword: z.string().optional(),
  location: z.string().optional(),
  countries: z.string().optional(),
  remote_type: z.enum(["any", "fully_rmeote", "hybrid", "in_office"]).optional(),
  level: z.enum(["Entry", "Senior", "Mid+Level", "Staff", "Manager"]).optional(),
  employment_type: z.enum(["fully_time", "part_time", "contract", "internship"]).optional(),
  salary_min: z.number().optional(),
});

export type SearchJobsArgs = z.infer<typeof SearchJobsSchema>;
export type SearchJobsForMeArgs = z.infer<typeof SearchJobsForMeSchema>;

