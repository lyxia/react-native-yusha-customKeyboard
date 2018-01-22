
import React, { Component } from 'react';

import PropTypes from 'prop-types'

import {
  Keyboard,
  Platform,
  NativeAppEventEmitter,
  NativeModules,
  TextInput,
  findNodeHandle,
  AppRegistry,
    DeviceInfo,
    AppState,
} from 'react-native';

import CustomKeyBoardView from './CustomKeyBoardView'

const { CustomKeyboard} = NativeModules;

const {
  install, uninstall,
  insertText, backSpace, doDelete,
  moveLeft, moveRight,
  switchSystemKeyboard,
  clearAll,
} = CustomKeyboard;

export {
  install, uninstall,
  insertText, backSpace, doDelete,
  moveLeft, moveRight,
  switchSystemKeyboard,
  clearAll,
};

const keyboardTypeRegistry = {};

export const currentHeight = DeviceInfo.isIPhoneX_deprecated ? 286 : 252

export function addKeyBoardShowListener(listener) {
  if(Platform.OS === 'android') {
    return NativeAppEventEmitter.addListener('showCustomKeyboard', (data) => {
      listener(data)
    })
  } else {
    Keyboard.addListener('keyboardDidShow', () => {
      listener()
    });
    return 'keyboardDidShow'
  }
}

export function addKeyBoardHideListener(listener) {
  if(Platform.OS === 'android') {
    return NativeAppEventEmitter.addListener('hideCustomKeyboard', (data) => {
      listener(data)
    })
  } else {
    Keyboard.addListener('keyboardDidHide', () => {
      listener()
    });
    return 'keyboardDidHide'
  }
}

export function removeKeyBoardListener(subscribtion) {
  if(Platform.OS === 'android') {
    NativeAppEventEmitter.removeSubscription(subscribtion)
  } else {
    Keyboard.removeListener(subscribtion)
  }
}

export function register(type, factory) {
  keyboardTypeRegistry[type] = factory;
}

export function clearFocus(tag) {
    TextInput.State.blurTextInput(tag)
}

class CustomKeyboardContainer extends Component {
  render() {
    const {tag, type} = this.props;
    const factory = keyboardTypeRegistry[type];
    if (!factory) {
      console.warn(`Custom keyboard type ${type} not registered.`);
      return null;
    }
    const Comp = factory();
    return <Comp tag={tag} />;
  }
}

AppRegistry.registerComponent("CustomKeyboard", ()=>CustomKeyboardContainer);

export class CustomTextInput extends Component {
  static propTypes = {
    ...TextInput.propTypes,
    customKeyboardType: PropTypes.string,
  };
  constructor() {
    super(...arguments);
    this.state = {text: this.props.defaultValue || ''}
  }
  componentDidMount() {
    this.installTime = setTimeout(()=>{
        install(findNodeHandle(this.input), this.props.customKeyboardType);

        if(Platform.OS === 'android') {
            this.showSub = addKeyBoardShowListener(this._showKeyboard);
            this.hideSub = addKeyBoardHideListener(this._hideKeyboard);
        }

        AppState.addEventListener('change', this._handleAppStateChange);
    }, 300)
  }
  componentWillUnmount() {
    this.showSub && removeKeyBoardListener(this.showSub);
    this.hideSub && removeKeyBoardListener(this.hideSub);
    this.installTime && clearTimeout(this.installTime)
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

_handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'background') {
        //检查键盘
        if (TextInput.State.currentlyFocusedField() === findNodeHandle(this.input)) {
            TextInput.State.blurTextInput(TextInput.State.currentlyFocusedField())
            return true
        }
    }
}

  componentWillReceiveProps(newProps) {
    if (newProps.customKeyboardType !== this.props.customKeyboardType) {
      install(findNodeHandle(this.input), newProps.customKeyboardType);
    }
    if (newProps.value !== null && newProps.value !== undefined && newProps.value !== this.state.text) {
      this.setState({text: newProps.value})
    }
  }
  onRef = ref => {
    this.input = ref;
    this.props.textInputRef && this.props.textInputRef(ref)
  };
  _showKeyboard = (data) => {
    if(data.tag !== findNodeHandle(this.input)) return ;
    this.props.onFocus && this.props.onFocus()
  }
  _hideKeyboard = (data) => {
      if(data.tag !== findNodeHandle(this.input)) return ;
      this.props.onBlur && this.props.onBlur()
      if (this.props.onEndEditing) {
        this.props.onEndEditing({nativeEvent:{text: this.state.text}});
      }
  }

  _onChangeText = (text) => {
      this.setState({text})
      this.props.onChangeText && this.props.onChangeText(text)
  }

  render() {
    const { customKeyboardType, ...others } = this.props;
    return <TextInput {...others}
                      ref={this.onRef}
                      onChangeText={this._onChangeText}
                      value={this.state.text}
    />;
  }
}

export function keyBoardAPI(keyBoardName) {
    return function(KeyBoardView) {
      class KeyBoard extends Component {
          render() {
              return (
                  <CustomKeyBoardView
                      insertText = {insertText}
                      clearFocus = {clearFocus}
                      clearAll = {clearAll}
                      backSpace = {backSpace}
                      KeyBoardView = {KeyBoardView}
                      {...this.props}
                  />
              )
          }
      }
      register(keyBoardName, ()=>KeyBoard);
      return KeyBoard
    }
}