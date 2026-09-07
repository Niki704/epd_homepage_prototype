import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function Button({ children, href, onClick, variant = "primary", className }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-light",
    secondary: "bg-white text-brand hover:bg-gray-50",
    outline: "border border-white text-white hover:bg-white/10",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
