import { Schema } from "effect";

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

