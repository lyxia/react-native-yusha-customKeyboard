import React, { Component, PureComponent } from 'react';
import {
    TouchableWithoutFeedback,
    Text,
    View,
} from 'react-native';
import * as StyleSheet from './MyStyleSheet'

export default class KeysRow extends PureComponent {
    _onLayout = ({nativeEvent: { layout}})=>{
        this.layout = layout
    }

    _showTip = (data) =>{
        let {isShow, layout, keyValue} = {...data}
        let {x,y,width,height} = {...layout}
        this.props.showTip({...data, layout:{...layout, x:x+this.layout.x, y:this.layout.y+y}})
    }

    _renderKey = (key, index) => {
        return (
        <Key
            onKeyPress={this.props.onKeyPress}
            showTip={this.props.showTip}
            key={index}
            keyValue={key}
            keyWidth={this.props.keyWidth}
        />
        )
    }

    render() {
        let keys = this.props.keys.map((key, cloumn) => {
            return this._renderKey(key, cloumn)
        })
        return (
            <View onLayout={this._onLayout} style={{ width:this.props.width, flexDirection: 'row', justifyContent: 'space-between' }}>
                {keys}
            </View>
        )
    }
}

class Key extends PureComponent {

    _onPressIn = () => {
        this.props.showTip({isShow:true,ref:this.refs.keyView,keyValue:this.props.keyValue})
    }

    _onPressOut = () => {
        this.props.showTip({isShow:false,ref:this.refs.keyView,keyValue:this.props.keyValue})
    }

    _onLayout = ({nativeEvent: { layout: {x, y, width, height}}}) => {
        this.layout = {x, y, width:this.props.keyWidth, height:rowHeight - 2 * vSpacing}
    }

    render() {
        return (
            <TouchableWithoutFeedback onLayout={this._onLayout} onPress={() => this.props.onKeyPress(this.props.keyValue)} onPressIn={this._onPressIn} onPressOut={this._onPressOut}>
                <View ref={"keyView"} style={[styles.key, styles.keyBorder, { width: this.props.keyWidth }]}>
                    <Text style={styles.keyText}>{this.props.keyValue}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const rowHeight = 54
const vSpacing = 6
const styles = StyleSheet.create({
    key: {
        backgroundColor: 'white',
        borderRadius: 4,
        height: rowHeight - vSpacing * 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyBorder: {
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
    keyText: {
        color: 'black',
        fontSize: 18,
        backgroundColor:'#00000000'
    },
})