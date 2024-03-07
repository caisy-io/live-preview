import ImageWithAspectRatio from "../../base-components/image-with-aspect-ratio/ImageWithAspectRatio";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-javascript/useCaisyUpdates";

export const CompImageWithTextAsset = (props: any) => {
  const { __typename, src } = useCaisyUpdates({ ...props });

  if (!(__typename === "Asset" && src)) {
    return null;
  }

  return (
    <ImageWithAspectRatio
      src={src}
      resolution={{ width: 500, height: 800 }}
      bronze={{ ratio: 0.812 }}
      gold={{ ratio: 1.53 }}
    />
  );
};
