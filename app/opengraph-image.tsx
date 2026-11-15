import { t } from "@/lib/dictionary";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = t.meta.ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ label: t.meta.ogLabel, title: t.meta.ogTitle });
}
