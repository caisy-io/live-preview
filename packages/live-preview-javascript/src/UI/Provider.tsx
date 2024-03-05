// import { CaisyLivePreviewElement } from "./PreviewElement";
import { SPreviewElementWrapper } from "./styles/SPreviewElementWrapper";

export const CaisyLivePreviewProvider = ({ children }) => {
  return (
    <div>
      <SPreviewElementWrapper>
        {/* <CaisyLivePreviewElement /> */}
      </SPreviewElementWrapper>
      <div>{children}</div>
    </div>
  );
};
