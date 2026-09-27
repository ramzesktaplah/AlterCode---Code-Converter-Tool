import { CodeSnippet } from '../types';

export const DEMO_SNIPPETS: CodeSnippet[] = [
  {
    id: 'convert-kotlin-to-python',
    title: 'Concurrent Task Dispatcher',
    action: 'convert',
    sourceLang: 'Kotlin',
    targetLang: 'Python',
    inputCode: `// Kotlin: Asynchronous pipeline with Coroutines & Flow
suspend fun fetchAndProcessMetrics(deviceIds: List<String>): List<DeviceSummary> = 
    coroutineScope {
        deviceIds.map { id ->
            async(Dispatchers.IO) {
                val raw = telemetryClient.fetchLatest(id)
                val normalized = MetricsEngine.normalize(raw)
                DeviceSummary(id = id, score = normalized.healthScore, online = true)
            }
        }.awaitAll()
    }`,
    outputCode: `# Python: Asynchronous pipeline using asyncio and dataclasses
import asyncio
from dataclasses import dataclass

@dataclass
class DeviceSummary:
    id: str
    score: float
    online: bool

async def fetch_and_process_metrics(device_ids: list[str]) -> list[DeviceSummary]:
    async def process_one(device_id: str) -> DeviceSummary:
        raw = await telemetry_client.fetch_latest(device_id)
        normalized = MetricsEngine.normalize(raw)
        return DeviceSummary(id=device_id, score=normalized.health_score, online=True)

    return await asyncio.gather(*(process_one(d_id) for d_id in device_ids))`,
    explanation: 'Converted Kotlin Coroutines `async/awaitAll` idiomatically into Python `asyncio.gather`. Preserves non-blocking I/O semantics, strong typing with Python dataclasses, and follows PEP 8 snake_case conventions.',
    metrics: {
      latency: '240ms',
      engine: 'Google Gemini 2.5',
      tokens: 284,
    },
  },
  {
    id: 'fix-goroutine-leak',
    title: 'Race Condition & Resource Leak',
    action: 'fix',
    sourceLang: 'Go',
    inputCode: `// Go: Broken worker loop with unbuffered channel deadlock
func StartWorkerPool(jobs <-chan Job, results chan<- Result) {
    for job := range jobs {
        go func() {
            // BUG: job variable captured by reference in closure
            res := executeTask(job)
            // BUG: potential deadlock if caller stops reading results
            results <- res
        }()
    }
}`,
    outputCode: `// Go: Fixed with sync.WaitGroup, closure parameter, and context cancellation
func StartWorkerPool(ctx context.Context, jobs <-chan Job, results chan<- Result) {
    var wg sync.WaitGroup
    for job := range jobs {
        wg.Add(1)
        go func(j Job) { // FIX: Pass job value as explicit closure argument
            defer wg.Done()
            res := executeTask(j)
            select {
            case results <- res: // FIX: Prevent indefinite hang on full channel
            case <-ctx.Done():
                return
            }
        }(job)
    }
    wg.Wait()
}`,
    explanation: 'Fixed two critical bugs: (1) Loop variable capture by reference in goroutine closure (passed as explicit argument `j Job`); (2) Unbounded hanging on unread channel write by wrapping dispatch in a `select` block keyed on `ctx.Done()`.',
    metrics: {
      latency: '142ms',
      engine: 'Groq (Llama 3.3)',
      tokens: 198,
    },
  },
  {
    id: 'refactor-typescript-nested',
    title: 'Clean Functional Pipeline',
    action: 'refactor',
    sourceLang: 'TypeScript',
    inputCode: `// TypeScript: Imperative nested loop with mutation
function filterAndGroupUsers(users: User[]): Record<string, number[]> {
    let result: Record<string, number[]> = {};
    for (let i = 0; i < users.length; i++) {
        let u = users[i];
        if (u.isActive && u.tier !== 'free') {
            if (u.scores && u.scores.length > 0) {
                let highScores: number[] = [];
                for (let j = 0; j < u.scores.length; j++) {
                    if (u.scores[j] >= 80) {
                        highScores.push(u.scores[j]);
                    }
                }
                if (highScores.length > 0) {
                    result[u.orgId] = (result[u.orgId] || []).concat(highScores);
                }
            }
        }
    }
    return result;
}`,
    outputCode: `// TypeScript: Idiomatic declarative pipeline with Map/Record reduce
export function filterAndGroupUsers(users: readonly User[]): Record<string, number[]> {
    return users
        .filter((u): u is User & { scores: number[] } => u.isActive && u.tier !== 'free' && Boolean(u.scores?.length))
        .reduce<Record<string, number[]>>((acc, u) => {
            const highScores = u.scores.filter(score => score >= 80);
            if (highScores.length === 0) return acc;
            
            acc[u.orgId] = [...(acc[u.orgId] ?? []), ...highScores];
            return acc;
        }, {});
}`,
    explanation: 'Eliminated nested mutable arrays and indexed for-loops. Replaced with immutable type predicates, concise filter predicates, and null-coalescing spread operations with linear $O(N)$ execution.',
    metrics: {
      latency: '210ms',
      engine: 'Google Gemini 2.5',
      tokens: 220,
    },
  },
  {
    id: 'explain-rust-lifetimes',
    title: 'Zero-Copy Ring Buffer & Lifetimes',
    action: 'explain',
    sourceLang: 'Rust',
    inputCode: `pub struct TokenStream<'source> {
    buffer: &'source [u8],
    cursor: usize,
}

impl<'source> TokenStream<'source> {
    pub fn next_token(&mut self) -> Option<&'source [u8]> {
        if self.cursor >= self.buffer.len() {
            return None;
        }
        let start = self.cursor;
        while self.cursor < self.buffer.len() && self.buffer[self.cursor] != b' ' {
            self.cursor += 1;
        }
        let slice = &self.buffer[start..self.cursor];
        if self.cursor < self.buffer.len() {
            self.cursor += 1; // skip delimiter
        }
        Some(slice)
    }
}`,
    outputCode: `## Code Explanation: Zero-Copy Token Stream in Rust

1. **Lifetime Annotation (\`'source\`):**
   - Ties the returned slice \`&'source [u8]\` directly to the lifetime of the underlying raw input buffer, not to the ephemeral mutable reference \`&mut self\`.
   - **Why this matters on mobile:** Enables zero-allocation tokenization with 0 bytes of heap reallocation, essential for high-throughput parsing on Android devices.

2. **State & Cursor Mechanism:**
   - \`buffer\`: Immutable byte slice borrowed from parent source.
   - \`cursor\`: Current scanning pointer position.

3. **Slice Windowing:**
   - \`&self.buffer[start..self.cursor]\` produces an exact memory subslice without copying memory.
   - Advances cursor past space delimiters (\`b' '\`) in a single pass.`,
    explanation: 'Deconstructs the zero-copy lifetime contract in Rust, contrasting borrow-checker invariants with heap allocation penalties on resource-constrained mobile hardware.',
    metrics: {
      latency: '155ms',
      engine: 'Groq (Llama 3.3)',
      tokens: 312,
    },
  },
];
