import { githubStorageClient } from "@divops/utils-github-storage";
import { ensureEnv } from "./ensureEnv";

const githubContext = {
  auth: ensureEnv("GITHUB_STORAGE_TOKEN"),
  baseUrl: ensureEnv("GITHUB_BASE_URL"),
};

const repository = {
  owner: ensureEnv("GITHUB_STORAGE_OWNER"),
  repo: ensureEnv("GITHUB_STORAGE_REPO"),
};

export const githubStorage = githubStorageClient
  .of(githubContext)
  .storage(repository);
