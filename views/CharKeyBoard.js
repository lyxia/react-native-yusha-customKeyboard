import React, { Component, PureComponent } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    DeviceInfo,
} from 'react-native';
import * as StyleSheet from './MyStyleSheet'
import KeysRow from './KeysRow'

export default class CharKeyBoard extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {isUP: false }
        this.keyWidth = 0;
    }

    _renderDel = () => {
        //绘制删除键
        return (
            <TouchableOpacity onPress={this.props.onDelete} onLongPress={this.props.onClearAll}>
                <View style={[styles.key, styles.otherKey, { width: rowHeight - vSpacing * 2, marginLeft: hSpacing }]}>
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

    _renderABC = (accessWidth) => {
        //转换为ABC键盘
        return (
            <TouchableOpacity onPress={() => this.props.changeKeyboard('ABC')}>
                <View style={[styles.key, styles.otherKey, { width: accessWidth }]}>
                    <Text style={styles.keyText}>ABC</Text>
                </View>
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

    _renderKeyBoard = () => {
        let rows = []
        let rowKeys = keys.map((rows) => {
            return rows.map((key) => {
                return String.fromCharCode(key)
            })
        })

        let rowWidth = rowKeys[0].length * this.keyWidth + hSpacing * (rowKeys[0].length - 1)
        rows.push(
            <View style={[styles.row, styles.abcRow]} key={1}>
                {this._renderKeys(rowKeys[0], rowWidth)}
            </View >
        )

        rowWidth = rowKeys[1].length * this.keyWidth + hSpacing * (rowKeys[1].length - 1)
        rows.push(
            <View style={[styles.row, styles.abcRow]} key={2}>
                {this._renderKeys(rowKeys[1], rowWidth)}
            </View >
        )

        rowWidth = rowKeys[2].length * this.keyWidth + hSpacing * (rowKeys[2].length - 1)
        rows.push(
            <View style={[styles.row, styles.abcRow]} key={3}>
                <View style={{ justifyContent: 'flex-end', width: this.props.width - hSpacing * 2, flexDirection: 'row' }}>
                    {this._renderKeys(rowKeys[2], rowWidth)}
                    {this._renderDel()}
                </View>
            </View >
        )

        let spaceWidth = this.props.width - ((rowHeight - vSpacing * 2) * 2 + 4 * hSpacing)
        rows.push(
            <View style={[styles.row, styles.abcRow]} key={4}>
                <View style={{ justifyContent: 'space-between', width: this.props.width - hSpacing * 2, flexDirection: 'row' }}>
                    {this._renderNumber(rowHeight - vSpacing * 2)}
                    {this._renderKeys(rowKeys[3], spaceWidth)}
                    {this._renderABC(rowHeight - vSpacing * 2)}
                </View>
            </View>
        )

        return rows;
    }

    render() {
        const width = this.props.width;
        this.keyWidth = (width - (keys[0].length + 1) * hSpacing) / keys[0].length;
        return (
            <View style={styles.keyboard}>
                {this._renderKeyBoard()}
            </View>
        )
    }
}

const rowHeight = 54
const vSpacing = 6
const hSpacing = 8
const keys = [
    [33, 64, 35, 36, 37, 94, 38, 42, 40, 41],
    [39, 34, 61, 95, 58, 59, 63, 126, 124, 46],
    [43, 45, 92, 47, 91, 93, 123, 125],
    [44, 46, 60, 62, 96, 163, 165]
]

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
    }
})