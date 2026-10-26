import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="text-gradient font-display text-[10rem] leading-none italic">404</p>
      <h1 className="mt-4 font-display text-4xl">This page wandered off</h1>
      <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/shop" className="mt-8 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg">
        Back to the shop
      </Link>
    </div>
  );
}
