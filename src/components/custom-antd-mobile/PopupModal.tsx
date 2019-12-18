import React from 'react';
import { Modal } from 'antd-mobile';
import { ModalProps } from 'antd-mobile/lib/modal/Modal';

export interface PopupModalProps extends ModalProps {
  children: any;
}

export default function PopupModal(props: PopupModalProps) {
  const { children, ...rest } = props;
  return (
    <Modal
      transparent
      {...rest}
    >
      {children}
    </Modal>
  );
}
