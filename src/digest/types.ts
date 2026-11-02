// Plan morning-digest § 1. The contract every part of § 2 builds against.

export type RunStatus = 'ok' | 'retry' | 'fail';

// One line of runs/<night>.jsonl, after parsing at the edge.
export type RunLine = {
  at: string;
  job: string;
  status: RunStatus;
  owner: string | null;
  error?: string;
};

// One row per job. Times keep the offset from the log (styleguide).
export type DigestRow = {
  job: string;
  owner: string | null; // null renders as —
  runs: number;
  retries: number;
  lastStatus: RunStatus;
  lastError: string | null; // most recent error seen for the job, even if a later run was ok
  first: string;
  last: string;
};

export type Night = {
  night: string; // YYYY-MM-DD
  rows: DigestRow[]; // sorted by job, so the page and the JSON never disagree
  badLines: number; // lines that didn't parse: counted, never thrown
};

// null = no file for that night (or a name that isn't a night). An empty file is a Night with no rows.
export type ReadNight = (runsDir: string, night: string) => Night | null;
