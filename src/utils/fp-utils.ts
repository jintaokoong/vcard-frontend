const matched = <T>(x: T) => ({
  on: () => matched(x),
  otherwise: () => x,
});

const match = <T>(x: T) => ({
  on: <U>(pred: (i: T) => boolean, fn: (i: T) => U) =>
    pred(x) ? matched(fn(x)) : match(x),
  otherwise: <U>(fn: (i: T) => U) => fn(x),
});

const fpUtils = {
  match,
};

export default fpUtils;
