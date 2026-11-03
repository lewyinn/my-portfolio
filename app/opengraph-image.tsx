import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Ridho — Software Developer portfolio";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    label: "Software Developer · Portfolio",
    title: "Building products that perform",
  });
}
