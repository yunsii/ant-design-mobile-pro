import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { RouterTypes } from 'umi';
// import { GlobalModelState } from './global';
import { UserModelState } from './user';
import { LoginState } from './login';

export interface SettingModelState {
  primaryColor: string;
  primaryTapColor: string;
  iconfontUrl: string;
}

export { UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
  };
}

export interface ConnectState {
  // global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  login: LoginState;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> {
  dispatch?: Dispatch;
}
