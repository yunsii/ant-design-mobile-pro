import * as React from 'react';
import classNames from 'classnames';
import CustomIcon from '@/components/CustomIcon';
import { pxToRem } from '@/utils/customUtils';
import { useStyles } from '../_util/style';
import styles from './index.less';

function useAvatarStyles(className: string) {
  return useStyles(styles)(className);
}

// ref: https://github.com/ant-design/ant-design/blob/master/components/avatar/index.tsx
export interface AvatarProps {
  /** Shape of avatar, options:`circle`, `square` */
  shape?: 'circle' | 'square';
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size?: 'large' | 'small' | 'default' | number;
  /** Src of image avatar */
  src?: string;
  /** Srcset of image avatar */
  srcSet?: string;
  /** Type of the Icon to be used in avatar */
  icon?: string | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  alt?: string;
  /* callback when img load error */
  /* return false to prevent Avatar show default fallback behavior, then you can do fallback by your self */
  onError?: () => boolean;
}

export interface AvatarState {
  scale: number;
  mounted: boolean;
  isImgExist: boolean;
}

export default class Avatar extends React.Component<AvatarProps, AvatarState> {
  static defaultProps = {
    shape: 'circle' as AvatarProps['shape'],
    size: 'default' as AvatarProps['size'],
  };

  state = {
    scale: 1,
    mounted: false,
    isImgExist: true,
  };

  private avatarNode: HTMLElement | undefined;

  private avatarChildren: HTMLElement | undefined;

  private lastChildrenWidth: number | undefined;

  private lastNodeWidth: number | undefined;

  componentDidMount() {
    this.setScale();
    this.setState({ mounted: true });
  }

  componentDidUpdate(prevProps: AvatarProps) {
    this.setScale();
    if (prevProps.src !== this.props.src) {
      this.setState({ isImgExist: true, scale: 1 });
    }
  }

  setScale = () => {
    if (!this.avatarChildren || !this.avatarNode) {
      return;
    }
    const childrenWidth = this.avatarChildren.offsetWidth; // offsetWidth avoid affecting be transform scale
    const nodeWidth = this.avatarNode.offsetWidth;
    // denominator is 0 is no meaning
    if (
      childrenWidth === 0 ||
      nodeWidth === 0 ||
      (this.lastChildrenWidth === childrenWidth && this.lastNodeWidth === nodeWidth)
    ) {
      return;
    }
    this.lastChildrenWidth = childrenWidth;
    this.lastNodeWidth = nodeWidth;
    // add 4px gap for each side to get better performance
    this.setState({
      scale: nodeWidth - 8 < childrenWidth ? (nodeWidth - 8) / childrenWidth : 1,
    });
  };

  handleImgLoadError = () => {
    const { onError } = this.props;
    const errorFlag = onError ? onError() : undefined;
    if (errorFlag !== false) {
      this.setState({ isImgExist: false });
    }
  };

  renderAvatar = () => {
    const {
      shape,
      size,
      src,
      srcSet,
      icon,
      className,
      alt,
      ...others
    } = this.props;

    const { isImgExist, scale, mounted } = this.state;

    const prefixCls = 'avatar';

    const sizeCls = classNames({
      [useAvatarStyles(`${prefixCls}-lg`)]: size === 'large',
      [useAvatarStyles(`${prefixCls}-sm`)]: size === 'small',
    });


    const classString = classNames(useAvatarStyles(prefixCls), className, sizeCls, {
      [useAvatarStyles(`${prefixCls}-${shape}`)]: shape,
      [useAvatarStyles(`${prefixCls}-image`)]: src && isImgExist,
      [useAvatarStyles(`${prefixCls}-icon`)]: icon,
    });

    const sizeStyle: React.CSSProperties =
      typeof size === 'number'
        ? {
          width: pxToRem(size),
          height: pxToRem(size),
          lineHeight: pxToRem(size),
          fontSize: icon ? pxToRem(size / 2) : pxToRem(18),
        }
        : {};

    let { children } = this.props;
    if (src && isImgExist) {
      children = <img src={src} srcSet={srcSet} onError={this.handleImgLoadError} alt={alt} />;
    } else if (icon) {
      if (typeof icon === 'string') {
        children = <CustomIcon type={icon} />;
      } else {
        children = icon;
      }
    } else {
      const childrenNode = this.avatarChildren;
      if (childrenNode || scale !== 1) {
        const transformString = `scale(${scale}) translateX(-50%)`;
        const childrenStyle: React.CSSProperties = {
          msTransform: transformString,
          WebkitTransform: transformString,
          transform: transformString,
        };

        const sizeChildrenStyle: React.CSSProperties =
          typeof size === 'number'
            ? {
              lineHeight: pxToRem(size),
            }
            : {};
        children = (
          <span
            className={useAvatarStyles(`${prefixCls}-string`)}
            ref={(node: HTMLElement) => (this.avatarChildren = node)}
            style={{ ...sizeChildrenStyle, ...childrenStyle }}
          >
            {children}
          </span>
        );
      } else {
        const childrenStyle: React.CSSProperties = {};
        if (!mounted) {
          childrenStyle.opacity = 0;
        }

        children = (
          <span
            className={useAvatarStyles(`${prefixCls}-string`)}
            style={{ opacity: 0 }}
            ref={(node: HTMLElement) => (this.avatarChildren = node)}
          >
            {children}
          </span>
        );
      }
    }
    return (
      <span
        {...others}
        style={{ ...sizeStyle, ...others.style }}
        className={classString}
        ref={(node: HTMLElement) => (this.avatarNode = node)}
      >
        {children}
      </span>
    );
  };

  render() {
    return this.renderAvatar();
  }
}
