import { unstable_cache } from "next/cache";

type Callback = (...args: any[]) => Promise<any>;

export const cacheData = <T extends Callback>(
  cb: T,
  tags: string[],
  revalidate?: number | false
) => {
  return unstable_cache(cb, tags, {
    revalidate,
    tags,
  });
};
