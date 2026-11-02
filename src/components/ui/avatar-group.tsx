import { cn } from "@/lib/utils";

export default function AvatarGroup({
  avatars,
  className,
  size = 24,
}: {
  avatars: string[];
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("flex -space-x-2", className)}>
      {avatars.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="member"
          width={size}
          height={size}
          style={{ width: size, height: size }}
          className="rounded-full object-cover ring-2 ring-white"
        />
      ))}
    </div>
  );
}
