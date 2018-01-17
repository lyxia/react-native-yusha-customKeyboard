import React, { Component, PureComponent } from 'react';

import PropTypes from 'prop-types'

import {
    View, Text, Image, TouchableHighlight,
} from 'react-native';

import styles, {
    keyStyle, BG_COLOR
} from './styles';

import InteractionManager from '../HFInteractionManager'

const numberKeys = [
    [
        { mainText: '1', otherText: '' },
        { mainText: '2', otherText: 'ABC' },
        { mainText: '3', otherText: 'DEF' }
    ],
    [
        { mainText: '4', otherText: 'GHI' },
        { mainText: '5', otherText: 'JKL' },
        { mainText: '6', otherText: 'MNO' }
    ],
    [
        { mainText: '7', otherText: 'PQRS' },
        { mainText: '8', otherText: 'TUV' },
        { mainText: '9', otherText: 'WXYZ' }
    ]
];


class Keyboard extends PureComponent {

    constructor(props) {
        super(props);
    }

    _clearAll() {
        InteractionManager.runAfterInteractions(()=>{ 
            this.props.onClearAll();
        })
    }

    _onPress(key) {
        InteractionManager.runAfterInteractions(()=>{
            if (key === 'ABC') {
                this.props.onChangeABC();

            // delete key
            } else if (key === 'del') {
                this.props.onDelete();

            // number key
            } else if (key !== '') {
                this.props.onKeyPress(key);
            }
        })
    }

    _renderOtherText(key) {
      if (this.props.disableOtherText !== true) {
        return (<Text style={keyStyle.otherText}>{key.otherText}</Text>);
      }

      return null;
    }

    _disableBorder() {
      if (this.props.disableBorder !== true) {
        return keyStyle.bd;
      }

      return keyStyle.border;
    }

    _disableClearButtonBackground() {
      if (this.props.disableClearButtonBackground !== true) {
        return keyStyle.bg_d2d5dc;
      }

      return keyStyle.bgLess;
    }

    _clearBtnUnderlayColor() {
      if (this.props.disableClearButtonBackground !== true) {
        return '#ffffff';
      }

      return '#d2d5dc';
    }

    _renderKey(key, index) {
        return (
            <TouchableHighlight
                key={index}
                underlayColor={BG_COLOR}
                style={keyStyle.wrapper}
                onPress={this._onPress.bind(this, key.mainText)}
            >
                <View style={[keyStyle.bd, this._disableBorder()]}>
                    <Text style={keyStyle.mainText}>{key.mainText}</Text>
                    {this._renderOtherText(key)}
                </View>
            </TouchableHighlight>
        );
    }

    _renderNumberKeys() {
        return numberKeys.map((group, groupIndex) => {
            return (
                <View key={groupIndex} style={styles.row}>
                    {group.map(this._renderKey.bind(this))}
                </View>
            );
        });
    }

    _isDecimalPad() {
        return this.props.keyboardType === 'decimal-pad';
    }

    _renderDotKey() {
      if (this.props.disableDot !== true) {
        let dotNode = <Text style={[keyStyle.mainText]}>.</Text>,
        dotText = '.';
        if (this._isDecimalPad()) {
            dotText = 'ABC';
            dotNode = <Text style={[keyStyle.mainText]}>ABC</Text>;
        }
        return (
            <TouchableHighlight
                underlayColor="#ffffff"
                style={[keyStyle.wrapper, keyStyle.bg_d2d5dc]}
                onPress={this._onPress.bind(this, dotText)}
            >
                <View style={[keyStyle.bd, this._disableBorder()]}>{dotNode}</View>
            </TouchableHighlight>
        );
      }

      return (
        <TouchableHighlight
          style={[keyStyle.wrapper, keyStyle.bg_d2d5dc]}
        >
          <View />
        </TouchableHighlight>
      );
    }

    render() {
        const props = this.props;
        return (
            <View style={styles.wrapper}>
                <View style={styles.main}>

                    {this._renderNumberKeys()}

                    <View style={styles.row}>
                        {this._renderDotKey()}

                        <TouchableHighlight
                            underlayColor={BG_COLOR}
                            style={keyStyle.wrapper}
                            onPress={this._onPress.bind(this, '0')}
                        >
                            <View style={[keyStyle.bd, this._disableBorder()]}>
                                <Text style={keyStyle.mainText}>0</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            underlayColor={this._clearBtnUnderlayColor()}
                            style={[keyStyle.wrapper, this._disableClearButtonBackground()]}
                            onPress={this._onPress.bind(this, 'del')}
                            onLongPress={this._clearAll.bind(this)}
                        >
                            <View style={[keyStyle.bd, this._disableBorder()]}>
                                <Image source={require('./images/back.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}


Keyboard.propTypes = {
    // 是否显示小数点符号
    keyboardType: PropTypes.oneOf(['number-pad', 'decimal-pad']),
    // 点击键盘按键
    onKeyPress: PropTypes.func,
    // 点击删除按钮
    onDelete: PropTypes.func,
    // 长按删除按钮
    onClear: PropTypes.func
};


Keyboard.defaultProps = {
    keyboardType: 'number-pad',
    onKeyPress: () => {},
    onDelete: () => {},
    onClear: () => {}
};


export default Keyboard;
