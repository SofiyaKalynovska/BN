import React, { FC } from 'react';
import './Radio.scss';
import AntRadio, { RadioProps as AntRadioProps } from 'antd/es/radio';
import { twMerge } from 'tailwind-merge';

type Colors =
  | 'vividTangelo'
  | 'vermilion'
  | 'dodgerBlue'
  | 'minionYellow'
  | 'munsellPurple'
  | 'limeGreen';

type RadioProps = AntRadioProps & {
  className?: string;
  color?: Colors;
  children?: React.ReactNode;
};

export const Radio: FC<RadioProps> = ({ className, color = 'dodgerBlue', ...props }) => {
  return (
    <AntRadio
      className={twMerge('D7-Radio', color, className)}
      {...props}
    />
  );
};
