function curry(func) {
  //Return a wrapper function to make it curry-able
  return function curried(...args) {
    // If passed arguments count is greater than or equal to original function 'func'
    // parameters count, directly call 'func' with passed arguments.
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      // Otherwise return another wrapper function to gather new argument
      // and pass it to `curried` function. This will continue until
      // arguments count >= parameters count.
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);
console.log(curriedJoin(1, 2, 3));
console.log(curriedJoin(1)(2, 3));
console.log(curriedJoin(1)(2)(3));
