// Функция, которая принимает массив целых чисел и возвращает сериализованную строку
function serialize(numbers) {
  const blockSize = 100 // Размер блока
  const blocks = [] // Массив блоков закодированных чисел
  // Цикл по массиву чисел с шагом равным размеру блока
  for (let i = 0; i < numbers.length; i += blockSize) {
    // Вырезаем блок чисел из массива
    const block = numbers.slice(i, i + blockSize)
    // Кодируем блок чисел в base64 и добавляем его в массив блоков
    blocks.push(btoa(String.fromCharCode(...block)))
  }
  // Возвращаем сериализованную строку, склеивая массив блоков через запятую
  return blocks.join(',')
}
// Функция, которая принимает сериализованную строку и возвращает массив целых чисел
function deserialize(str) {
  const blockSize = 100 // Размер блока
  const blocks = str.split(',') // Разбиваем строку на массив блоков
  const numbers = [] // Массив десериализованных чисел
  // Цикл по массиву блоков
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i] // Получаем текущий блок
    // Декодируем блок из base64 и преобразуем его в массив чисел
    const bytes = atob(block)
      .split('')
      .map((c) => c.charCodeAt(0))
    // Добавляем числа в массив десериализованных чисел
    numbers.push(...bytes)
  }
  // Возвращаем массив десериализованных чисел
  return numbers
}

module.exports = {
  serialize,
  deserialize,
}
