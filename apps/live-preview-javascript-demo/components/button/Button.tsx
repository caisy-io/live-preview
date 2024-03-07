import { Arrow } from "../../constants/svgs/Arrow";
import { SCompImageWithTextButtonContent } from "../comp-image-with-text/styles/SCompImageWithTextButtonContent";
import { IGenCompButtonExternalLinks } from "../../utils/types_gen";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-javascript/useCaisyUpdates";

export const Button = (props: any) => {
  const button = useCaisyUpdates({ ...props });
  const link = useCaisyUpdates({ ...(button?.link?.[0] ?? null) });

  const linkIntern =
    link?.__typename === "Page" && link?.slug
      ? `/${link?.slug}`
      : "#noslugincaisy";

  return (
    <>
      {button?.__typename === "CompButton" ? (
        <a href={`${linkIntern}`}>
          <SCompImageWithTextButtonContent>
            {`${button.title}`}
            <Arrow />
          </SCompImageWithTextButtonContent>
        </a>
      ) : (
        <a
          href={
            "https://" +
            `${(button as IGenCompButtonExternalLinks)?.url}`.replace(
              "https://",
              ""
            )
          }
          target="_blank"
        >
          <SCompImageWithTextButtonContent>
            {`${(button as IGenCompButtonExternalLinks)?.title}`}
            <Arrow />
          </SCompImageWithTextButtonContent>
        </a>
      )}
    </>
  );
};
