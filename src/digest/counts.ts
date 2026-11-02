import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseLine } from './read.js';
import type { RunStatus } from './types.js';

export type Counts = Record<RunStatus, number>;

// Run lines per status across a night. Unparseable lines are not counted; a missing file is all zeros.
export function countNight(runsDir: string, night: string): Counts {
  const counts: Counts = { ok: 0, retry: 0, fail: 0 };
  let text: string;
  try {
    text = readFileSync(join(runsDir, `${night}.jsonl`), 'utf8');
  } catch {
    return counts;
  }
  for (const raw of text.split('\n')) {
    if (raw.trim() === '') continue;
    const l = parseLine(raw);
    if (l) counts[l.status] += 1;
  }
  return counts;
}
