"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

function Heading({ title, subtitle, center }: HeadingProps) {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <h3 className="mt-2 font-light text-neutral-500">{subtitle}</h3>
    </div>
  );
}

export default Heading;
