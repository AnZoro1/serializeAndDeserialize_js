const assert = require('assert')
const { serialize, deserialize } = require('./SerializeAndDeserialize.js')

// Тестовые наборы данных
const testCases = [
  { input: [], expectedOutput: [], expectedRatio: 100 },
  { input: [1, 2, 3], expectedOutput: [1, 2, 3], expectedRatio: 100 },
  {
    input: [1, 2, 3, 4, 5],
    expectedOutput: [1, 2, 3, 4, 5],
    expectedRatio: 100,
  },
  {
    input: Array.from(
      { length: 50 },
      () => Math.floor(Math.random() * 300) + 1
    ),
    expectedRatio: 50,
  },
  {
    input: Array.from(
      { length: 100 },
      () => Math.floor(Math.random() * 300) + 1
    ),
    expectedRatio: 50,
  },
  {
    input: Array.from(
      { length: 500 },
      () => Math.floor(Math.random() * 300) + 1
    ),
    expectedRatio: 50,
  },
  {
    input: Array.from(
      { length: 1000 },
      () => Math.floor(Math.random() * 300) + 1
    ),
    expectedRatio: 50,
  },
  { input: Array.from({ length: 1000 }, () => 1), expectedRatio: 12.5 },
  {
    input: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100)),
    expectedRatio: 50,
  },
  { input: Array.from({ length: 900 }, () => 111), expectedRatio: 16.7 },
]

// Тесты для функции serialize
testCases.forEach(({ input, expectedOutput, expectedRatio }) => {
  const serialized = serialize(input)
  const compressedSize = serialized.length
  const originalSize = input.length * 2 // Предполагаем, что каждое число занимает 2 байта
  const ratio = (1 - compressedSize / originalSize) * 100
  assert.strictEqual(
    deserialize(serialized).toString(),
    expectedOutput.toString()
  )
  assert.strictEqual(ratio.toFixed(1), expectedRatio.toFixed(1))
})

// Тесты для функции deserialize
testCases.forEach(({ input, expectedOutput }) => {
  const serialized = serialize(input)
  assert.strictEqual(
    deserialize(serialized).toString(),
    expectedOutput.toString()
  )
})
