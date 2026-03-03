import type { FC } from "react";

interface SocialLinkProps {
  href: string;
  icon: string;
  label: string;
}

export const SocialLink: FC<SocialLinkProps> = ({
  href,
  icon,
  label,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-2 py-1 backdrop-blur-xl bg-indigo-500/20 border border-indigo-400/30 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 rounded-full bg-indigo-600/30 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-indigo-600/40">
        <img
          src={icon}
          alt={label}
          className="h-5 w-5 object-contain"
        />
      </div>

      <span className="relative z-10 text-sm font-medium text-indigo-100">
        {label}
      </span>
    </a>
  );
}
