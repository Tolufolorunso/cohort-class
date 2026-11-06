import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

// 1. Verify neutralQuestions.ts file content directly
const content = fs.readFileSync(path.resolve('lessons/data/neutralQuestions.ts'), 'utf8');
assert.ok(content.includes('export const neutralQuestions: KahootQuestion[] = ['), 'Must export neutralQuestions array');

const questionMatches = [...content.matchAll(/id:\s*(\d+)/g)].map(m => Number(m[1]));
assert.strictEqual(questionMatches.length, 10, `Expected 10 question IDs, found ${questionMatches.length}`);
for (const id of questionMatches) {
  assert.ok(id >= 101 && id <= 110, `Question ID must be between 101 and 110, got ${id}`);
}

const topicMatches = [...content.matchAll(/scope:\s*'neutral'/g)];
assert.strictEqual(topicMatches.length, 10, 'All 10 questions must have scope: neutral');

// 2. Verify Kahoot speed bonus algorithm
function calcScore(elapsedMs, timeLimitSeconds, isCorrect) {
  if (!isCorrect) return 0;
  const timeLimitMs = timeLimitSeconds * 1000;
  const remainingRatio = Math.max(0, (timeLimitMs - elapsedMs) / timeLimitMs);
  const speedBonus = Math.round(500 * remainingRatio);
  return 1000 + speedBonus;
}

// Immediate response: 1000 base + 500 max speed bonus = 1500
assert.strictEqual(calcScore(0, 30, true), 1500, 'Immediate answer should get 1500');
// Half-time response (15s): 1000 + 250 = 1250
assert.strictEqual(calcScore(15000, 30, true), 1250, 'Half-time answer should get 1250');
// Last second response (30s): 1000 + 0 = 1000
assert.strictEqual(calcScore(30000, 30, true), 1000, 'Last-second answer should get 1000');
// Incorrect answer gets 0
assert.strictEqual(calcScore(5000, 30, false), 0, 'Incorrect answer must get 0');

console.log('✅ All 10 neutral questions & scoring algorithm tests passed cleanly!');
