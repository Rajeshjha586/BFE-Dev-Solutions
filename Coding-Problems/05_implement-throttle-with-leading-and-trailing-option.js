/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 */
function throttle(func, wait, option = { leading: true, trailing: true }) {
  let timeout = null;
  let lastCallContext = null;
  let lastCallArgs = null;

  const later = () => {
    if (option.trailing && lastCallArgs) {
      func.apply(lastCallContext, lastCallArgs);
      lastCallContext = null;
      lastCallArgs = null;

      // Set the timeout for trailing.
      // The func will execute only if the event was triggered again after
      // this execution, in other words, only if arguments of last function call
      // is stored.
      timeout = setTimeout(later, wait);
    } else {
      timeout = null;
    }
  };

  return function (...args) {
    if (timeout) {
      lastCallContext = this;
      lastCallArgs = args;
      return;
    }

    if (option.leading) {
      func.apply(this, args);
    } else {
      lastCallContext = this;
      lastCallArgs = args;
    }

    timeout = setTimeout(later, wait);
  };
}
