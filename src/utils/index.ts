export const debounce = <T>(
  func: (...args: T[]) => void,
  timeout: number = 300
) => {
  let timer: number | null;
  return (...args: T[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      func.apply(null, args);
    }, timeout);
  };
};
