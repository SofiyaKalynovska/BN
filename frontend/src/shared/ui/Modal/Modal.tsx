import React, { FC } from 'react';
import Button from '../Button/Button.tsx';
import { twJoin } from "tailwind-merge";

export type CustomModalProps = {
  titleClassName?: string;
  okClassName?: string;
  cancelClassName?: string;
  okProps?: React.ComponentProps<typeof Button>;
  cancelProps?: React.ComponentProps<typeof Button>;
};

export type ModalProps = {
  centered?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  maskClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  title: string | React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
  cancelText?: string;
  okText?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

export const Modal: FC<ModalProps & CustomModalProps> = props => {
  const {
    title,
    centered,
    className,
    headerClassName,
    contentClassName,
    maskClassName,
    bodyClassName,
    footerClassName,
    onCancel,
    onOk,
    cancelText,
    okText,
    footer,
    okProps,
    cancelProps,
    titleClassName
  } = props;

  return (
    <div className={twJoin('fixed inset-0 z-50 overflow-y-auto', maskClassName)}>
      <div className={twJoin('flex items-center justify-center min-h-screen', className)}>
        <div className={twJoin('relative bg-white w-full max-w-lg rounded-lg', contentClassName)}>
          <div className={twJoin('p-5', bodyClassName)}>
            <h2 className={twJoin('text-1824 text-center font-medium text-black', titleClassName)}>
              {title}
            </h2>
            {props.children}
          </div>
          {footer !== undefined && (
            <div className={twJoin('flex justify-between pt-3 mt-[3.2rem] gap-3', footerClassName)}>
              <Button
                onClick={onCancel}
                size="large"
                {...cancelProps}
              >
                {cancelText ?? 'Cancel'}
              </Button>
              <Button
                onClick={onOk}
                size="large"
                {...okProps}
              >
                {okText ?? 'Ok'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
