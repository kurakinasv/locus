export const logError = (err: unknown) => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};
