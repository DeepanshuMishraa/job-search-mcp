import { Octokit } from "octokit";
import { Effect as effect } from "effect";
import { GITHUB_TOKEN } from "./config.js";

const octokit = new Octokit({ auth: GITHUB_TOKEN });


export const getGithubData = () =>
  effect.gen(function* () {
    const [user, repos] = yield* effect.all([
      effect.tryPromise({
        try: () => octokit.request('GET /user').then((r) => JSON.stringify(r.data)),
        catch: (err) => new Error(String(err))
      }),
      effect.tryPromise({
        try: () => octokit.paginate('GET /user/repos', { per_page: 100 }).then((r) => JSON.stringify(r)),
        catch: (err) => new Error(String(err))
      })
    ]);

    return {
      userInfo: user,
      repoInfo: repos
    };
  })
