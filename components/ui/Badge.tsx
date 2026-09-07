import { cn } from "@/lib/utils";

export default function Badge({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "green" | "red" | "gray";
}) {
  const tones = {
    brand: "bg-brand/10 text-brand",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}
