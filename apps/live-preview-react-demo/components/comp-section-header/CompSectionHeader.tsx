import React from "react";
import { Img } from "../../base-components/img/Img";
import { BREAKPOINTS } from "../../constants/styles/mediaquerys";
import useImageMedia from "../../hooks/useImageMedia";
import {
  IGenAsset,
  IGenCompSectionHeader,
  // IGenVideo,
} from "../../utils/types_gen";
// import { Video } from "../video/Video";
import { SCompSectionHeader } from "./styles/SCompSectionHeader";
import { SCompSectionHeaderImage } from "./styles/SCompSectionHeaderImage";
import { SCompSectionHeaderText } from "./styles/SCompSectionHeaderText";
import { useCaisyUpdates } from "@repo/live-preview-react/useCaisyUpdates";
import { getInspectProps } from "@repo/live-preview-react/getInspectProps";

export const CompSectionHeader: React.FC<
  React.PropsWithChildren<IGenCompSectionHeader>
> = (props) => {
  const { image, title, id } = useCaisyUpdates({ ...props });

  const media = useImageMedia();

  const _imageForUpdates = image?.find(
    (image) => image?.__typename === "Asset"
  ) as IGenAsset;

  const _image = useCaisyUpdates(_imageForUpdates);

  // const _video = image.find(
  //   (image) => image?.__typename === "Video"
  // ) as IGenVideo;

  return (
    <SCompSectionHeader>
      <SCompSectionHeaderImage
        {...getInspectProps({ id, fieldName: "image" })}
        dominantColor={_image?.dominantColor}
      >
        {/* {_video ? (
          <Video id={_video.id} vimeoVideoId={_video.vimeoVideoId}></Video>
        ) : ( */}
        <>
          {_image && (
            <Img
              src={_image?.src}
              resolution={{
                width: media,
                height: ~~(media * (media >= BREAKPOINTS.SILVER ? 0.3 : 1)),
              }}
            />
          )}
        </>
        {/* )} */}
      </SCompSectionHeaderImage>
      <SCompSectionHeaderText {...getInspectProps({ id, fieldName: "title" })}>
        {title ?? ""}
      </SCompSectionHeaderText>
    </SCompSectionHeader>
  );
};
