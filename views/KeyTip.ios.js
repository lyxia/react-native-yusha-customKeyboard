import React, { Component, PureComponent } from 'react';
import {
    Text,
    View,
} from 'react-native';
import * as StyleSheet from './MyStyleSheet'
import Svg, {
    Path,
    G,
} from 'react-native-svg';

const r = 8 //半径
const vs = 15
const radio = 0.6
export default class KeyTip extends Component {
    render() {
        const sw = this.props.layout.width
        const sh = this.props.layout.height
        const x = this.props.layout.x
        const y = this.props.layout.y
        const bw = sw * 2
        const bh = bw
        const sx = 0
        const sy = 0
        const brectl = `q ${-r} 0 ${-r} ${r} l 0 ${bh - r - vs} c 0 ${vs * radio} ${(bw - sw) / 2} ${vs * (1 - radio)} ${(bw - sw) / 2} ${vs} l 0 ${sh - r}`
        const srect = `q 0 ${r / 2} ${r / 2} ${r / 2} l ${sw - r} 0 q ${r / 2} 0 ${r / 2} ${-r / 2} l 0 ${-(sh - r)}`
        const brectr = `c 0 ${-vs * radio} ${(bw - sw) / 2} ${-vs * (1 - radio)} ${(bw - sw) / 2} ${-vs} l 0 ${-bh + r + vs} q 0 ${-r} ${-r} ${-r} Z`
        const keyValue = this.props.keyValue
        return (
            <View style={{ position: "absolute", left: x-(bw - sw) / 2, top: y-bh + 4 }}>
                <Svg
                    height={sh + bh}
                    width={bw}
                    style={[styles.keyBorder]}
                >
                    <G scale="1">
                        <Path
                            d={`M ${sx + r} ${sy} ${brectl} ${srect} ${brectr}`}
                            fill="white"
                        />
                    </G>
                </Svg>
                <View style={{position:"absolute", left:0, top:-vs/2, width:bw, height:bh, justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.keyText}>{keyValue}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBorder: {
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    keyText: {
        color: 'black',
        fontSize: 25,
        backgroundColor:'#00000000'
    },
})