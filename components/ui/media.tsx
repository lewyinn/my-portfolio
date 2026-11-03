import Image from "next/image";
import { PixelR } from "./pixel-r";

/**
 * Project or article image. Until the owner adds a real `src`, it shows a labelled
 * placeholder so the layout stays honest about what is missing.
 */
export function Media({
  src,
  alt,
  label,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  // `className` positions the outer box (it may be `absolute`); the inner box is the
  // positioning context for the layers, so the two never fight over `position`.
  if (src) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="relative size-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent"
          />
        </div>
      </div>
    );
  }

  return (
    <div role="img" aria-label={alt} className={`overflow-hidden bg-ink ${className}`}>
      <div className="relative size-full">
        {/* Dot grid and the pixel mark as a watermark. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] [background-size:18px_18px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center opacity-15"
        >
          <PixelR size={7} gap={3} />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent"
        />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-ink/85 px-3 py-1 text-[10px] tracking-[0.08em] text-muted">
          [{label}]
        </span>
      </div>
    </div>
  );
}
