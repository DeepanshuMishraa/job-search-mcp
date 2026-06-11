import { Octokit } from "octokit";
import { Effect as effect } from "effect";

const token: string | undefined = process.env.GITHUB_TOKEN;

if (!token) throw new Error("Github Token Not Configured");

const octokit = new Octokit({ auth: token });


export const getGithubData = () => effect.gen(function* () {
  const user = yield* effect.tryPromise({
    try: () => octokit.request('GET /user').then((r) => {
      return JSON.stringify(r.data);
    }),
    catch: (err) => new Error(String(err))
  });

  const repos = yield* effect.tryPromise({
    try: () => octokit.request('GET /user/repos').then((r) => {
      return JSON.stringify(r.data);
    }),
    catch: (err) => new Error(String(err))
  });

  return {
    userInfo: user,
    repoInfo: repos
  };
})
