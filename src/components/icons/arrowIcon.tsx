import { FC, SVGProps } from "react";

export const ArrowIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="43"
      height="42"
      viewBox="0 0 43 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.5 5.25L7.5 12.25M7.5 12.25L14.5 19.25M7.5 12.25H35.5M28.5 36.75L35.5 29.75M35.5 29.75L28.5 22.75M35.5 29.75H7.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
