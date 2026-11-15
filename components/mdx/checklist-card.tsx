import { CheckIcon } from "@/components/ui/icons";

export type ChecklistItem = {
  title: string;
  desc?: string;
};

/** Styled checklist card usable directly inside any `.mdx` article. */
export function ChecklistCard({ items }: { items: ChecklistItem[] }) {
  if (!items?.length) return null;

  return (
    <div className="not-prose my-6 rounded-2xl border border-line bg-surface p-5 md:p-6">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
              <CheckIcon strokeWidth={2.4} className="size-3.5" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[15px] font-semibold text-fg">{item.title}</p>
              {item.desc ? <p className="text-sm leading-relaxed text-muted">{item.desc}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
