import React, { useRef } from "react";
import { Dash } from "../../../constants/svgs/Dash";
import { Plus } from "../../../constants/svgs/Plus";
import { IGenCompFaqItem } from "../../../utils/types_gen";
import { Text } from "../../text/Text";
import { SCompFaqItem } from "./styles/SCompFaqItem";
import { SCompFaqItemTitle } from "./styles/SCompFaqItemTitle";
import { SCompFaqItemContent } from "./styles/SCompFaqItemContent";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-react/useCaisyUpdates";
import { getCaisyInspectProps } from "@nicolasshiken/live-preview-react/getCaisyInspectProps";

export interface ICompFaqItem {
  item: IGenCompFaqItem;
  handleActiveFaq: (id: string) => () => void;
  activeId: string;
}

export const CompFaqItem: React.FC<React.PropsWithChildren<ICompFaqItem>> = ({
  handleActiveFaq,
  activeId,
  ...props
}) => {
  const item = useCaisyUpdates({ ...props.item });

  const contentRef = useRef<HTMLDivElement>();
  return (
    <SCompFaqItem>
      <SCompFaqItemTitle
        {...getCaisyInspectProps({
          id: props.item.id,
          fieldName: "title",
        })}
        onClick={handleActiveFaq(item?.id)}
      >
        <p>{item?.title ?? ""}</p>
        {item?.id === activeId ? <Dash /> : <Plus />}
      </SCompFaqItemTitle>
      <SCompFaqItemContent
        {...getCaisyInspectProps({
          id: props.item.id,
          fieldName: "description",
        })}
        ref={contentRef}
        isActive={activeId === item?.id}
        contentHeight={contentRef?.current?.scrollHeight}
      >
        {item?.description?.json && <Text json={item?.description?.json} />}
      </SCompFaqItemContent>
    </SCompFaqItem>
  );
};
