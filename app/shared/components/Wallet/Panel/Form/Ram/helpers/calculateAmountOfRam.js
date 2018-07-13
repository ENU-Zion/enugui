import { Decimal } from 'decimal.js';

export default function calculateAmountOfRam(baseBalance, quoteBalance, ENUAmount) {
  const R = baseBalance;
  const C = quoteBalance.plus(ENUAmount);
  const F = 1.0;

  const base = ENUAmount.dividedBy(C).plus(Decimal(1.0));
  const multiplier = Decimal(1.0).minus(Decimal.pow(base, F));

  return Decimal(0).minus(R.times(multiplier));
}
