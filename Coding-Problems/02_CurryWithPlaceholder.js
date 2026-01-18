/**
 * @param { Function } func
 */

function curry(func) {
  return function curried(...args) {
    const sanitizedArgs = args.slice(0, func.length);
    const hasPlaceholder = sanitizedArgs.some(
      (arg) => arg === curry.placeholder
    );

    if (!hasPlaceholder && sanitizedArgs.length === func.length) {
      return func.apply(this, sanitizedArgs);
    } else {
      return function (...newArgs) {
        return curried.apply(this, mergeArgs(args, newArgs));
      };
    }
  };
}

function mergeArgs(oldArgs, newArgs) {
  const mergedArgs = [];

  let i = 0;
  let j = 0;

  while (i < oldArgs.length && j < newArgs.length) {
    if (oldArgs[i] === curry.placeholder) {
      mergedArgs.push(newArgs[j]);
      i++;
      j++;
    } else {
      mergedArgs.push(oldArgs[i]);
      i++;
    }
  }

  while (i < oldArgs.length) {
    mergedArgs.push(oldArgs[i]);
    i++;
  }

  while (j < newArgs.length) {
    mergedArgs.push(newArgs[j]);
    j++;
  }

  return mergedArgs;
}

curry.placeholder = Symbol();

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
const curriedJoin = curry(join);
const _ = curry.placeholder;
console.log(curriedJoin(1, 2, 3)); // '1_2_3'
console.log(curriedJoin(_, 2)(1, 3)); // '1_2_3'
console.log(curriedJoin(_, _, _)(1)(_, 3)(2)); // '1_2_3'
