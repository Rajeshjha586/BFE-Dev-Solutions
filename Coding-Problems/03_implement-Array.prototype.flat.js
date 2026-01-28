/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */

//Iterative Solution with stack
function flat(arr, depth = 1) {
  const flatArray = [];

  let stack = [...arr.map((item) => [item, depth])];

  while (stack.length > 0) {
    const [item, depth] = stack.pop();
    if (Array.isArray(item) && depth > 0) {
      stack.push(...item.map((el) => [el, depth - 1]));
    } else {
      flatArray.push(item);
    }
  }

  return flatArray.reverse();
}

// Recursive solution with reduce
// function flat(arr, depth = 1) {
//   return arr.reduce(
//     (acc, item) =>
//       Array.isArray(item) && depth > 0
//         ? acc.concat(flat(item, depth - 1))
//         : [...acc, item],
//     []
//   );
// }

//Recursive solution
// function flat(arr, depth = 1) {
//   let flatArray = [];

//   for (const item of arr) {
//     if (Array.isArray(item) && depth > 0) {
//       flatArray = flatArray.concat(flat(item, depth - 1));
//     } else {
//       flatArray.push(item);
//     }
//   }

//   return flatArray;
// }

const arr = [1, [2], [3, [4]]];

console.log(flat(arr)); // [1, 2, 3, [4]]
console.log(flat(arr, 1)); // [1, 2, 3, [4]]
console.log(flat(arr, 2)); // [1, 2, 3, 4]
