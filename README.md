# react-native-yusha-customKeyboard
react native自定义键盘

iOS，Android双平台使用，适配iPhoneX，博文地址：https://www.jianshu.com/p/6b6879323069

RN版本0.50及以上

### 安装：

```
yarn add react-native-yusha-customkeyboard
react-native link react-native-yusha-customkeyboard
react-native link react-native-svg
```

### 使用：

```
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import * as CustomKeyboard from 'react-native-yusha-customKeyboard'

export default class App extends Component<{}> {
  render() {
    return (
      <CustomKeyboard.AwareCusKeyBoardScrollView style={{flex: 1}}>
        <CustomKeyboard.CustomTextInput
            customKeyboardType="numberKeyBoard"
            placeholder="numberKeyBoard"
        />
        <CustomKeyboard.CustomTextInput
          customKeyboardType="numberKeyBoardWithDot"
          placeholder="numberKeyBoardWithDot"
        />
        <CustomKeyboard.CustomTextInput
          customKeyboardType="safeKeyBoard"
          placeholder="safeKeyBoard"
        />
      </CustomKeyboard.AwareCusKeyBoardScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 700,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
```

### 参数说明：

- CustomKeyboard.CustomTextInput：带自定义键盘的输入框
  - customKeyboardType：自定义键盘类型，numberKeyBoard（数字键盘，不带小数点），numberKeyBoardWithDot（数字键盘，带小数点），safeKeyBoard（字母、数字、符号组合键盘，可切换）
  - 其他属性同TextInput所用的属性
- AwareCusKeyBoardScrollView：自适应键盘区域，防止输入框被键盘遮住（自定义键盘、系统键盘）
- currentHeight：自定义键盘高度
- addKeyBoardShowListener：监听键盘显示
- addKeyBoardHideListener：监听键盘隐藏
- removeKeyBoardListener：移除键盘监听
