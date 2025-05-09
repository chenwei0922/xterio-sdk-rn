function sleep(time: number): Promise<number> {
  return new Promise((res) => {
    setTimeout(res, time, time);
  });
}
export const Utils = {
  pkgVersion: '0.1.3',
  sleep,
};
