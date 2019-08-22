import React from 'react';
import { Modal } from 'antd-mobile';
import { ModalProps } from 'antd-mobile/lib/modal/Modal';

export interface CustomModalProps extends ModalProps {
  children: any;
}

export default function CustomModal(props: CustomModalProps) {
  const { children, ...rest } = props;
  return (
    <Modal
      popup
      animationType='slide-up'
      {...rest}
    >
      {children}
    </Modal>
  );
}
