/* eslint-disable react/display-name */
import { ReactNode, Ref, forwardRef } from 'react';
import { Switch as AntSwitch, SwitchProps } from 'antd';
import './Switch.scss';
import {twJoin} from "tailwind-merge";

type Colors =
  | 'vividTangelo'
  | 'vermilion'
  | 'dodgerBlue'
  | 'minionYellow'
  | 'munsellPurple'
  | 'limeGreen';

type SwitchPropsCustom = SwitchProps & {
  className?: string;
  children?: ReactNode;
  inOneLine?: boolean;
  color?: Colors;
  required?: boolean;
  classNameLabel?: string;
  classNameInputWrapper?: string;
  name: string;
  label: string;
  extraLabel?: string | ReactNode;
};

export const Switch = forwardRef<HTMLInputElement, SwitchPropsCustom>(
  (
    {
      inOneLine,
      required,
      classNameLabel,
      size,
      color = 'dodgerBlue',
      classNameInputWrapper,
      extraLabel,
      ...props
    }: SwitchPropsCustom,
    ref
  ) => {
    const styleInOneLineWrapper = inOneLine ? 'flex-row justify-between items-center' : '';
    const styleInOneLineLabel = inOneLine ? 'pt-[1.2rem]' : '';
    return (
      <div
        className="D7-Switch w-full"
        data-testid={`${props.name}-input-container`}
      >
        <div
          className={twJoin(
            'flex w-full flex-col',
            size === 'small' && 'small',
            styleInOneLineWrapper,
            classNameLabel
          )}
        >
          <label
            htmlFor={props.name}
            className={styleInOneLineLabel}
          >
            {props.label && (
              <span className={twJoin('text-1424 font-semibold', required && 'field-required')}>
                {props.label}
              </span>
            )}
          </label>
          <div className={twJoin('max-w-[41.2rem] grow', classNameInputWrapper)}>
            <span
              className={twJoin(
                'text-1420 font-medium font-normal',
                extraLabel ? 'visible' : 'invisible'
              )}
            >
              {extraLabel}
            </span>
            <AntSwitch
              {...props}
              ref={ref as unknown as Ref<HTMLInputElement>}
              id={props.name}
              className={twJoin(color, props.className)}
            />
          </div>
        </div>
      </div>
    );
  }
);
