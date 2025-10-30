import { cn } from "@/lib/cn";

type TagProps = {
  text: string;
  borderRadius?: number | string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeStyles = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export default function Tag({
  text,
  borderRadius,
  size = "md",
  className = "",
}: TagProps) {
  const borderRadiusValue =
    typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium uppercase whitespace-nowrap",
        sizeStyles[size],
        className
      )}
      style={
        borderRadiusValue !== undefined
          ? {
              borderRadius: borderRadiusValue,
            }
          : undefined
      }
    >
      {text}
    </span>
  );
}


