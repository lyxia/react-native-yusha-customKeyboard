import React, { Component, PureComponent } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
    DeviceInfo,
} from 'react-native';

import * as StyleSheet from './MyStyleSheet'
import DisplayView from './DisplayView'
import KeysRow from './KeysRow'

class UPKeyBoard extends PureComponent {
  render() {
    return (
      <View>
        {this.props.rows}
      </View>
    )
  }
}

class DownKeyBoard extends PureComponent {
  render() {
    return (
      <View>
        {this.props.rows}
      </View>
    )
  }
}

export default class ABCKeyBoard extends PureComponent {
  constructor() {
    super(...arguments)

    this.state = { isUP: false }
    this.keyWidth = 0;
  }

  componentWillUnmount() {
    this.changeUpOrDownRequest && cancelAnimationFrame(this.changeUpOrDownRequest)
  }

  _changeUPOrDown = () => {
    //大小写转换
      this.changeUpOrDownRequest && cancelAnimationFrame(this.changeUpOrDownRequest)
    this.changeUpOrDownRequest = requestAnimationFrame(() => {
      this.setState({ ...this.state, isUP: !this.state.isUP })
    })
  }

  _renderUpDown = (type) => {
    //绘制大小写转换
    return (
      <TouchableOpacity onPress={this._changeUPOrDown}>
        <View style={[styles.key, styles.otherKey, { width: rowHeight - vSpacing * 2 }]}>
          {type === 'UP' ? <Image source={require('./images/shouzimudaxie.png')}/> : <Image source={require('./images/xiaoxie.png')}/>}
        </View>
      </TouchableOpacity>
    )
  }

  _renderDel = () => {
    //绘制删除键
    return (
      <TouchableOpacity onPress={this.props.onDelete} onLongPress={this.props.onClearAll}>
        <View style={[styles.key, styles.otherKey, { width: rowHeight - vSpacing * 2 }]}>
          <Image source={require('./images/back.png')}/>
        </View>
      </TouchableOpacity>
    )
  }

  _renderNumber = (accessWidth) => {
    //转换数字键盘
    return (
      <TouchableOpacity onPress={() => this.props.changeKeyboard('number')}>
        <View style={[styles.key, styles.otherKey, { width: accessWidth }]}>
          <Text style={styles.keyText}>123</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderChar = (accessWidth) => {
    //转换为符号键盘
    return (
      <TouchableOpacity onPress={() => this.props.changeKeyboard('char')}>
        <View style={[styles.key, styles.otherKey, { width: accessWidth }]}>
          <Text style={styles.keyText}>#+=</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderSpacing = (spaceWidth) => {
    //绘制空格键
    return (
      <TouchableOpacity onPress={() => this.props.onKeyPress(' ')}>
        <View style={[styles.key, { width: spaceWidth }]} />
      </TouchableOpacity>
    )
  }

  _renderKeys = (keys, width) => {
    return (
      <KeysRow
        keys={keys}
        width={width}
        keyWidth={this.keyWidth}
        onKeyPress={this.props.onKeyPress}
        showTip = {this.props.showTip}
      />
    )
  }

  _renderKeyBoard = (type) => {
    if(type === 'UP') {
      if(this.upRows === undefined) {
        this.upRows = this._cacultateRows(type)
      }
      return <UPKeyBoard rows={this.upRows}/>
    } else {
      if(this.downRows === undefined) {
        this.downRows = this._cacultateRows(type)
      }
      return <DownKeyBoard rows={this.downRows}/>
    }
  }

  _cacultateRows = (type) => {
    let curKeys = []
    if (type === 'UP') {
      //渲染大写
      curKeys = upKeys
    } else {
      //渲染小写
      curKeys = keys
    }

    let rows = []

    let rowWidth = curKeys[0].length * this.keyWidth + hSpacing * (curKeys[0].length - 1)
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={1}>
        {this._renderKeys(curKeys[0], rowWidth)}
      </View >
    )

    rowWidth = curKeys[1].length * this.keyWidth + hSpacing * (curKeys[1].length - 1)
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={2}>
        {this._renderKeys(curKeys[1], rowWidth)}
      </View >
    )

    rowWidth = curKeys[2].length * this.keyWidth + hSpacing * (curKeys[2].length - 1)
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={3}>
        <View style={{ justifyContent: 'space-between', width: this.props.width - hSpacing * 2, flexDirection: 'row' }}>
          {this._renderUpDown(type)}
          {this._renderKeys(curKeys[2], rowWidth)}
          {this._renderDel()}
        </View>
      </View >
    )

    let spaceWidth = rowWidth - (2 * this.keyWidth + 2 * hSpacing)
    let accessWidth = (this.props.width - hSpacing * 4 - spaceWidth) / 2
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={4}>
        <View style={{ justifyContent: 'space-between', width: this.props.width - hSpacing * 2, flexDirection: 'row' }}>
          {this._renderNumber(accessWidth)}
          {this._renderSpacing(spaceWidth)}
          {this._renderChar(accessWidth)}
        </View>
      </View>
    )

    return rows
  }

  render() {
    console.log('render ABCKeyboard')
    const width = this.props.width;
    this.keyWidth = (width - (keys[0].length + 1) * hSpacing) / keys[0].length;
    return (
      <View style={styles.keyboard}>
        <DisplayView
          keepAlive={true}
          enable={this.state.isUP}
        >
          {this._renderKeyBoard('UP')}
        </DisplayView>
        <DisplayView
          keepAlive={true}
          enable={!this.state.isUP}
        >
          {this._renderKeyBoard("Down")}
        </DisplayView>
      </View>
    )
  }
}

const rowHeight = 54
const vSpacing = 6
const hSpacing = 8
const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']]
const upKeys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']]

const styles = StyleSheet.create({
  keyboard: {
    backgroundColor: '#d8dbdf',
      paddingBottom: DeviceInfo.isIPhoneX_deprecated ? 34 : 0,
  },
  row: {
    height: rowHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  abcRow: {
    justifyContent: 'center',
  },
  key: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: rowHeight - vSpacing * 2,
    justifyContent: 'center',
    alignItems: 'center',
    ios: {
      shadowColor: 'gray',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 1,
    },
    android: {
      borderColor: 'black',
      borderWidth: StyleSheet.hairlineWidth,
    }
  },
  otherKey: {
    backgroundColor: '#babdc2',
  },
  keyText: {
    color: 'black',
    fontSize: 18,
  },
})