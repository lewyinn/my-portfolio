import { Chip } from "@/components/ui/chip";

export type BentoItem = {
  title: string;
  desc: string;
};

/** 3-column bento feature or impact card grid usable directly inside `.mdx` case studies. */
export function BentoGrid({ items }: { items: BentoItem[] }) {
  if (!items?.length) return null;

  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-surface p-5"
        >
          <p className="text-[15px] font-semibold text-fg">{item.title}</p>
          <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

/** Stack chips strip usable inside `.mdx` files. */
export function StackChips({ items }: { items: string[] }) {
  if (!items?.length) return null;

  return (
    <ul className="not-prose my-5 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
