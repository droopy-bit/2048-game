function MagicFunction(...args) {
  const toNum = (val) => {
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
  };

  const sum = args.reduce((acc, val) => acc + toNum(val), 0);

  function createChainable(currentSum) {
    function chained(...nextArgs) {
      const nextSum = nextArgs.reduce(
        (acc, val) => acc + toNum(val),
        currentSum,
      );

      return createChainable(nextSum);
    }

    chained.valueOf = () => currentSum;
    chained.toString = () => String(currentSum);
    chained[Symbol.toPrimitive] = (hint) => {
      if (hint === 'string') {
        return String(currentSum);
      }
      return currentSum;
    };

    return chained;
  }

  return createChainable(sum);
}
