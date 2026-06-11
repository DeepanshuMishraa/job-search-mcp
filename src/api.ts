import { Effect as effect, Schema } from "effect";
import { JobFunction, JobSearchParams, RemoteType } from "./types.js";

const API_URL = "https://api.jobdatalake.com";
const API_KEY = process.env.API_KEY;


export const getAllJobs = () => effect.tryPromise({
  try: () => fetch(`${API_URL}/v1/jobs?per_page=100`, { headers: { "X-API-Key": API_KEY as string } }).then((r) => {
    if (!r.ok) throw new Error(`Request failed with ${r.status}`);
    return r.json() as unknown;
  }),
  catch: (error) => new Error(String(error))
});


export const SearchJob = (info: unknown) =>
  effect.gen(function* () {
    const params = yield* Schema.decodeUnknown(JobSearchParams)(info);

    const search = new URLSearchParams();
    search.set("q", params.keyword);
    search.set("per_page", "200");
    if (params.location) search.set("location", params.location);
    if (params.countries) search.set("countries", params.countries);
    if (params.remote_type !== RemoteType.ANY) search.set("remote_type", params.remote_type);
    if (params.job_function !== JobFunction.ANY) search.set("job_function", params.job_function);
    search.set("seniority", params.level);
    search.set("employment_type", params.employement_type);
    if (params.skills.length > 0) search.set("skills", params.skills.join(","));
    if (params.salary_min > 0) search.set("salary_min", String(params.salary_min));

    const req_url = `${API_URL}/v1/jobs?${search.toString()}`;
    const response = yield* effect.tryPromise({
      try: () => fetch(req_url, { headers: { "X-API-Key": API_KEY as string } }).then((r) => {
        if (!r.ok) throw new Error(`Request failed with ${r.status}`);
        return r.json() as unknown;
      }),
      catch: (error) => new Error(String(error))
    });

    return response;
  })
