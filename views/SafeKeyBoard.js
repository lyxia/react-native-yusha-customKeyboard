import React, { Component } from 'react';
import {
    Dimensions,
  View,
  StyleSheet,
  findNodeHandle,
} from 'react-native';

//数字键盘
import NumberKeyBoard from './NumberKeyBoard';
//ABC键盘
import ABCKeyBoard from './ABCKeyBoard'
//符号键盘
import CharKeyBoard from './CharKeyBoard'

import DisplayView from './DisplayView'

export default class MyKeyboard extends Component {
  constructor(props) {
      super(props)
      this.state = {
          curKeyBoard: 'ABC',
      }
  }

  _handerChangeABC = () => {
      this._handleChangeKeyboard('ABC')
  }

  _handleChangeKeyboard = (type) => {
      this.chageKeyboardRequest = requestAnimationFrame(() => {
          this.setState({ ...this.state, curKeyBoard: type })
      })
  }

  componentWillUnmount() {
      this.chageKeyboardRequest && cancelAnimationFrame(this.chageKeyboardRequest)
  }

  _renderNumberKeyBoard = (width) => {
      return (
          <DisplayView
              keepAlive={true}
              enable={this.state.curKeyBoard === 'number'}
          >
            <NumberKeyBoard
                keyboardType={"decimal-pad"}
                onDelete={this.props.onDelete}
                onKeyPress={this.props.onKeyPress}
                onChangeABC={this._handerChangeABC}
                disableOtherText={true}
                onClearAll={this.props.onClearAll}
            />
          </DisplayView>
      )
  }

  _renderABCKeyBoard = (width) => {
      return (
          <DisplayView
              keepAlive={true}
              enable={this.state.curKeyBoard === 'ABC'}
          >
            <ABCKeyBoard
                width={width}
                changeKeyboard={this._handleChangeKeyboard}
                onKeyPress={this.props.onKeyPress}
                onDelete={this.props.onDelete}
                onClearAll={this.props.onClearAll}
                showTip={this.props.showTip}
            />
          </DisplayView>
      )
  }

  _renderCharKeyBoard = (width) => {
      return (
          <DisplayView
              keepAlive = {true}
              enable = {this.state.curKeyBoard === 'char'}
          >
            <CharKeyBoard
                width={width}
                changeKeyboard={this._handleChangeKeyboard}
                onKeyPress={this.props.onKeyPress}
                onDelete={this.props.onDelete}
                onClearAll={this.props.onClearAll}
                showTip={this.props.showTip}
            />
          </DisplayView>
      )
  }

  render() {
      let {width} = Dimensions.get('window')
      return (
          <View style={styles.root}>
              {this._renderNumberKeyBoard(width)}
              {this._renderABCKeyBoard(width)}
              {this._renderCharKeyBoard(width)}
          </View>
      )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})