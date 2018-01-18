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
- 导入react-native-yusha-customkeyboard
```
import * as CustomKeyboard from 'react-native-yusha-customKeyboard'
```
- 注册键盘：
```
//注册没有小数点的数字键盘
CustomKeyboard.keyBoardAPI('numberKeyBoard')(class extends Component{
    static getKeyBoardIcon = () => {
        return <Image source={require('./images/anquanbaohu.png')}/>
    }

    static getKeyBoardName = () => {
        return "安全键盘"
    }

    render() {
        return (
            <CustomKeyboard.NumberKeyBoardView
                keyboardType={"number-pad"}
                disableOtherText={true}
                disableDot={true}
                {...this.props}
            />
        )
    }
})
//注册有小数点的数字键盘
CustomKeyboard.keyBoardAPI('numberKeyBoardWithDot')(class extends Component{
    render() {
        return (
            <CustomKeyboard.NumberKeyBoardView
                keyboardType={"number-pad"}
                disableOtherText={true}
                {...this.props}
            />
        )
    }
})
//注册数字，字母，符号切换键盘
CustomKeyboard.keyBoardAPI('safeKeyBoard')(CustomKeyboard.SafeKeyBoardView)
//注册自定义视图键盘
CustomKeyboard.keyBoardAPI('testKeyboard')(class extends Component{
    static customKeyboardTop = true

    render() {
        return <View style={{flex:1, backgroundColor: 'red'}}/>
    }
})
```
- 使用键盘：
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
        <CustomKeyboard.CustomTextInput
              customKeyboardType="testKeyboard"
              placeholder="testKeyboard"
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
- CustomKeyboard.keyBoardAPI：注册键盘
    - CustomKeyboard.keyBoardAPI(键盘名称)(键盘组件)
- 键盘组件：
    - getKeyBoardIcon: 静态方法，提供键盘标识的小图标。
    - getKeyBoardName：静态方法，提供图标右方显示的键盘名称。
    - customKeyboardTop: 静态属性，是否使用自定义头部，如果为true，则getKeyBoardIcon和getKeyBoardName不会显示。
    - props：键盘组件会有以下属性
        - onKeyPress：当前位置输入字符this.props.onKeyPress(key)
        - onDelete: 当前位置删除一个字符this.props.onDelete()
        - onClearAll: 删除当前光标前所有字符this.props.onClearAll()
- CustomKeyboard.CustomTextInput：带自定义键盘的输入框
  - customKeyboardType：自定义键盘类型，numberKeyBoard（数字键盘，不带小数点），numberKeyBoardWithDot（数字键盘，带小数点），safeKeyBoard（字母、数字、符号组合键盘，可切换）
  - 其他属性同TextInput所用的属性
- AwareCusKeyBoardScrollView：自适应键盘区域，防止输入框被键盘遮住（自定义键盘、系统键盘）
- currentHeight：自定义键盘高度
- addKeyBoardShowListener：监听键盘显示
- addKeyBoardHideListener：监听键盘隐藏
- removeKeyBoardListener：移除键盘监听
