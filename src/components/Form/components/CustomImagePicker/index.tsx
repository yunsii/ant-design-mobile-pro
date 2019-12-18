import React from 'react';
import { ImagePicker } from 'antd-mobile';
import { ImagePickerPropTypes } from 'antd-mobile/lib/image-picker';
import Image from '@/components/Image';
import PopupModal from '@/components/custom-antd-mobile/PopupModal';

export interface ImagePickerFile {
  file: File;
  orientation: 1;
  url: string;
}

export interface ImagePickerProps extends Omit<ImagePickerPropTypes, 'onChange'> {
  disabled?: boolean;
  filesCountLimit?: number;
  onChange?: (files: ImagePickerFile[]) => void;
}
interface ImagePickerState {
  visible: boolean;
  previewUrl: string;
}
export default class extends React.Component<ImagePickerProps, ImagePickerState> {

  state = {
    visible: false,
    previewUrl: '',
  }

  /**
   * remove with index
   */
  onChange = (files: ImagePickerFile[], type: 'add' | 'remove', index: number) => {
    const { onChange = () => { }, filesCountLimit } = this.props;
    console.log(files, type, index);
    onChange(filesCountLimit ? files.slice(0, filesCountLimit) : files);
  }

  render() {
    const { onChange, filesCountLimit = 1, disabled, ...rest } = this.props;
    const { visible, previewUrl } = this.state;
    return (
      <>
        <ImagePicker
          disableDelete={disabled}
          onChange={this.onChange as any}
          selectable={!rest.files || rest.files.length < (isNaN(filesCountLimit) ? 1 : filesCountLimit)}
          onImageClick={(index, files) => {
            if (index !== undefined && files) {
              // console.log(index, files);
              this.setState({
                visible: true,
                previewUrl: (files[index] as any).url,
              });
            }
          }}
          {...rest}
        />
        <PopupModal
          visible={visible}
          onClose={() => { this.setState({ visible: false }) }}
          footer={[
            {
              text: '关闭',
              onPress: () => {
                this.setState({ visible: false });
              }
            }
          ]}
        >
          <Image src={previewUrl} />
        </PopupModal>
      </>
    );
  }
}
