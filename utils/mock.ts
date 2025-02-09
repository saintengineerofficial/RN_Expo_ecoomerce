export const mockFetch = <T>(data: T, delay = 1000) => {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};
