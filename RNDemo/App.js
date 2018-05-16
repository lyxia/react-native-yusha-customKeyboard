/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

require('./js/RegisterKeyboard')
import * as CustomKeyboard from 'react-native-yusha-customkeyboard'

export default class App extends Component<{}> {
  render() {
    return (
      <CustomKeyboard.AwareCusKeyBoardScrollView style={{flex: 1}}>
        <CustomKeyboard.CustomTextInput
            customKeyboardType="numberKeyBoard"
            placeholder="numberKeyBoard"
            style={{marginTop: 20}}
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