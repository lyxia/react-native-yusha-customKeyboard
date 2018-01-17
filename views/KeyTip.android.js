import React, { Component, PureComponent } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

export default class KeyTip extends Component {
    render() {
        const {x,y,width,height} = this.props.layout
        const keyValue = this.props.keyValue
        const bw = width * 1.3
        const bh = height * 1.3
        return (
            <View style={{ position: "absolute", left: x-(bw - width) / 2, top: y-bh - 10 }}>
                <View style={[styles.keyBorder, {width:bw, height:bh}]}>
                    <Text style={styles.keyText}>{keyValue}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBorder: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {
        color: 'black',
        fontSize: 22,
        backgroundColor:'#00000000'
    },
})