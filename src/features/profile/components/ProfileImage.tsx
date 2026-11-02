import { cn } from "@/lib/utils";

export default function ProfileImage({
  imageUrl,
  className,
}: {
  imageUrl: string;
  className?: string;
}) {
  return (
    <div className={cn(`rounded-full overflow-hidden`, className)}>
      <img src={imageUrl} className="object-cover w-full h-full" />
    </div>
  );
}
