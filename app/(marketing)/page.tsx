import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-7xl">
        <h2 className="mx-auto mb-6 mt-10 max-w-3xl text-center text-5xl font-bold">
          Easiest way to manage your payments
        </h2>
        <h3 className="mx-auto max-w-3xl text-center text-xl font-medium text-zinc-700">
          Keep all your payments organized and easily accessible with
          PocketSub&apos;s simple and convinient tracking system.
        </h3>
        <Link
          className="mx-auto mt-4 flex max-w-[240px] items-center justify-center rounded-lg bg-zinc-900 px-12 py-3 font-semibold tracking-wide text-zinc-100"
          href="/login"
        >
          Get Pocketsub
        </Link>
        <div className="mx-auto mt-10 max-w-[960px] px-4">
          <Image
            src="/assets/hero_mock.png"
            alt="Hero image"
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="mx-auto h-auto w-full"
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl">
        <p className="mt-20 text-center text-xs font-bold uppercase tracking-[2.4px] text-zinc-500">
          What is pocketsub?
        </p>
        <h2 className="mx-auto mb-6 mt-4 max-w-2xl text-center text-3xl font-bold">
          Pocketsub redefines the way you manage recurring payments.
        </h2>
        <h3 className="mx-auto max-w-2xl text-center text-zinc-700">
          Instead of relying on manual methods such as spreedsheets or
          individual subscription accounts. Pocketsub provides a streamlined and
          user-friendly platform.
        </h3>
      </section>
    </>
  );
}
