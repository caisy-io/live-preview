import React from "react";
import { useCaisyUpdates } from "@repo/live-preview-react/useCaisyUpdates";
import Link from "next/link";

export const PageHeaderLogo: React.FC<any> = ({ logo, logoDark }) => {
  const logoLive = useCaisyUpdates(logo);
  const logoDarkVersionLive = useCaisyUpdates(logoDark);

  if (!logoLive?.src) {
    return null;
  }

  return (
    <Link href={"/"} legacyBehavior>
      <a>
        <img src={logoLive.src} alt={"Logo"} />
        {logoDarkVersionLive?.src && (
          <img src={logoDarkVersionLive?.src} alt={"Logo"} />
        )}
      </a>
    </Link>
  );
};
