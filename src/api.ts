import { Effect as effect, Schema } from "effect";
import { JobFunction, JobSearchParams, RemoteType } from "./types.js";
import { paginate } from "./paginate.js";

const API_URL = "https://api.jobdatalake.com";
const API_KEY = process.env.API_KEY;
const YC_HIRING_API_URL = "https://yc-oss.github.io/api/companies/hiring.json";


export const getAllJobs = () => effect.gen(function* () {
  const [yc, api] = yield* effect.all([
    effect.tryPromise({
      try: () => fetch(YC_HIRING_API_URL).then((r) => {
        return r.json() as unknown;
      }),
      catch: (err) => new Error(String(err))
    }),
    effect.tryPromise({
      try: () => fetch(`${API_URL}/v1/jobs?per_page=100`, { headers: { "X-API-Key": API_KEY as string } }).then((r) => {
        if (!r.ok) throw new Error(`Request failed with ${r.status}`);
        return r.json() as unknown;
      }),
      catch: (error) => new Error(String(error))
    })
  ]);


  return {
    YC_JOBS: yc,
    Normal: api
  };
});


export const SearchJob = (info: unknown) =>
  effect.gen(function* () {
    const params = yield* Schema.decodeUnknown(JobSearchParams)(info);

    const search = new URLSearchParams();
    search.set("q", params.keyword);
    if (params.location) search.set("location", params.location);
    if (params.countries) search.set("countries", params.countries);
    if (params.remote_type !== RemoteType.ANY) search.set("remote_type", params.remote_type);
    if (params.job_function !== JobFunction.ANY) search.set("job_function", params.job_function);
    search.set("seniority", params.level);
    search.set("employment_type", params.employement_type);
    if (params.skills.length > 0) search.set("skills", params.skills.join(","));

    const baseParams = search.toString();

    const jobs = yield* paginate(
      (page, perPage) =>
        effect.tryPromise({
          try: () =>
            fetch(`${API_URL}/v1/jobs?${baseParams}&page=${page}&per_page=${perPage}`, {
              headers: { "X-API-Key": API_KEY as string }
            }).then((r) => {
              if (!r.ok) throw new Error(`Request failed with ${r.status}`);
              return r.json() as Promise<{ jobs: unknown[]; found: number; }>;
            }).then((data) => ({
              items: data.jobs,
              total: data.found,
            })),
          catch: (error) => new Error(String(error))
        }),
      { perPage: 200 }
    );

    return jobs;
  })
