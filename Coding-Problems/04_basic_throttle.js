/**
 * @param {Function} func
 * @param {number} wait
 */

function throttle(func, wait) {
  // Track if we are waiting. Initially, we are not.
  let isWaiting = false;

  // Track arguments of last call
  let lastCallArgs = null;

  return function throttled(...args) {
    // If we are waiting,
    if (isWaiting) {
      // ...store arguments of last call
      lastCallArgs = args;
      return;
    }

    // If we are not waiting, execute 'func' with passed arguments
    func.apply(this, args);

    // Prevent future execution of 'func'
    isWaiting = true;

    // After wait time
    setTimeout(() => {
      // ...allow execution of 'func'
      isWaiting = false;

      // If arguments of last call exists,
      if (lastCallArgs) {
        // ...execute function throttled and pass last call's arguments
        // to it. Since now we are not waiting, 'func' will be executed
        // and isWaiting will be reset to true.
        throttled.apply(this, lastCallArgs);

        // ...reset arguments of last call to null.
        lastCallArgs = null;
      }
    }, wait);
  };
}

const throttledLog = throttle(console.log, 1000);
throttledLog(1); // logs 1 immediately
throttledLog(2); // is ignored
throttledLog(3); // is ignored
setTimeout(() => throttledLog(4), 500); // logs 4 after 500ms
setTimeout(() => throttledLog(5), 1000); // logs 5 after 1000ms
