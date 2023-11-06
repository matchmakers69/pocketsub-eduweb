import { SUBSCRIPTION_CURRENCY } from "@prisma/client";

type SingleStateProps = {
  sum: number | string;
  currency?: SUBSCRIPTION_CURRENCY;
  subtitle: string;
};

function SingleStat({
  sum,
  currency = SUBSCRIPTION_CURRENCY.GBP,
  subtitle,
}: SingleStateProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold leading-5 tracking-wide">
        {sum} <span className="ml-1 text-[8px] uppercase">{currency}</span>
      </h2>
      <p className="text-xs text-zinc-500">{subtitle}</p>
    </div>
  );
}

export default SingleStat;
