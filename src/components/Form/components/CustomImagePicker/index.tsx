import React from 'react';
import { ImagePicker } from 'antd-mobile';
import { ImagePickerPropTypes } from 'antd-mobile/lib/image-picker';

export interface ImagePickerFile {
  file: File;
  orientation: 1;
  url: string;
}

export interface ImagePickerProps extends Omit<ImagePickerPropTypes, 'onChange'> {
  filesCountLimit: number;
  onChange: (files: ImagePickerFile[]) => void;
}
export default class extends React.Component<ImagePickerProps> {
  static defaultProps = {
    filesCountLimit: 1,
    onChange: () => { },
  }

  /**
   * remove with index
   */
  onChange = (files: ImagePickerFile[], type: 'add' | 'remove', index: number) => {
    const { onChange } = this.props;
    console.log(files, type, index);
    onChange(files);
  }

  render() {
    const { onChange, filesCountLimit, ...rest } = this.props;
    return (
      <ImagePicker
        onChange={this.onChange as any}
        selectable={!rest.files || rest.files.length < (isNaN(filesCountLimit) ? 1 : filesCountLimit)}
        {...rest}
      />
    );
  }
}