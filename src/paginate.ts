import { Effect } from "effect";

export interface Page<T> {
  items: T[];
  total?: number;
}

export function paginate<T>(
  fetchPage: (page: number, perPage: number) => Effect.Effect<Page<T>, Error, never>,
  options?: { perPage?: number; maxPages?: number }
): Effect.Effect<T[], Error, never> {
  const perPage = options?.perPage ?? 100;
  const maxPages = options?.maxPages ?? 100;

  return Effect.gen(function* () {
    const all: T[] = [];

    for (let page = 1; page <= maxPages; page++) {
      const { items, total } = yield* fetchPage(page, perPage);
      all.push(...items);

      const collected = all.length;
      if (items.length < perPage) break;
      if (total !== undefined && collected >= total) break;
    }

    return all;
  });
}
