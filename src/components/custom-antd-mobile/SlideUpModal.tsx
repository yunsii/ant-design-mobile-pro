import React from 'react';
import { Modal } from 'antd-mobile';
import { ModalProps } from 'antd-mobile/lib/modal/Modal';

export interface SlideUpModalProps extends ModalProps {
  children: any;
}

export default function SlideUpModal(props: SlideUpModalProps) {
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
