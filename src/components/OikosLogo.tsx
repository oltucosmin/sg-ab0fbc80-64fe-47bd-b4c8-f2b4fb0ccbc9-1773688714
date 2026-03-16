import Image from "next/image";
import { cn } from "@/lib/utils";

interface OikosLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "dark";
}

export function OikosLogo({ className, size = "md", variant = "default" }: OikosLogoProps) {
  const sizeMap = {
    sm: { width: 120, height: 40 },
    md: { width: 160, height: 53 },
    lg: { width: 200, height: 66 },
    xl: { width: 280, height: 93 }
  };

  const dimensions = sizeMap[size];

  return (
    <div className={cn("relative", className)}>
      <Image
        src="/oikos-logo.jpg"
        alt="Oikos Energy - Panouri Fotovoltaice & Pompe Caldura"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className="object-contain"
      />
    </div>
  );
}