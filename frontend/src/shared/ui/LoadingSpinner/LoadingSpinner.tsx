import { FC } from 'react';
import {twJoin} from "tailwind-merge";

type LoadingSpinnerProps = {
  activeLoadingIcon: string | undefined;
  inActiveLoadingIcon: string | undefined;
  percent: number;
  className?: string;
};
export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  activeLoadingIcon,
  inActiveLoadingIcon,
  percent,
  className,
}) => {
  return (
    <div className={twJoin('relative bottom-1/2 flex items-center justify-center', className)}>
      <div className="h-full w-full ">
        <div
          style={{ backgroundImage: `url(${activeLoadingIcon})` }}
          className="absolute left-0 top-0 ml-[2.1rem] mt-[-2rem] h-[4rem] w-[4rem]"
        />
        <div
          style={{
            backgroundClip: 'content-box',
            backgroundImage: `url(${inActiveLoadingIcon})`,
            height: 40 - (40 * percent) / 100,
          }}
          className="absolute left-0 top-0 ml-[2.1rem] mt-[-2rem] h-[4rem] w-[4rem]"
        />
      </div>
    </div>
  );
};
