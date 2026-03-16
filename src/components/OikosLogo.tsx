import Image from "next/image";
import { cn } from "@/lib/utils";

interface OikosLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "dark";
}

export function OikosLogo({ className, size = "md", variant = "default" }: OikosLogoProps) {
  const sizeMap = {
    sm: { width: 80, height: 27 },
    md: { width: 120, height: 40 },
    lg: { width: 160, height: 53 },
    xl: { width: 200, height: 66 }
  };

  const dimensions = sizeMap[size];

  return (
    <div className={cn("relative flex items-center", className)}>
      <Image
        src="/oikos-logo.jpg"
        alt="Oikos Energy - Panouri Fotovoltaice & Pompe Caldura"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className="object-contain"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}