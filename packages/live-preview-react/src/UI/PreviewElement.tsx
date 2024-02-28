import { useEffect } from "react";
import { CaisyIcon } from "./CaisyIcon";
import { SPreviewElement } from "./styles/SPreviewElement";

export const CaisyLivePreviewElement = () => {
  useEffect(() => {}, []);

  return (
    <SPreviewElement>
      <div>
        <CaisyIcon />
      </div>
    </SPreviewElement>
  );
};
