import React from 'react';
import { StyleSheet, DeviceInfo } from 'react-native';

const hairlineWidth = StyleSheet.hairlineWidth;

export const BG_COLOR = '#bcc0c6';


export default StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        backgroundColor: '#f4f4f4'
    },
    main: {
        flex: 1,
        alignSelf: 'flex-end',
    },
    row: {
        flexDirection: 'row'
    }
});


export const keyStyle = StyleSheet.create({
    wrapper: {
        flex: 1,
        height: 54,
        backgroundColor: '#fff',
    },
    bd: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: hairlineWidth,
        borderBottomWidth: hairlineWidth,
        borderColor: '#a5a5a5'
    },
    border: {
      borderColor: '#FFF'
    },
    mainText: {
        fontSize: 20,
        color: '#000'
    },
    otherText: {
        fontSize: 10,
        color: '#333',
    },
    bg_d2d5dc: {
        backgroundColor: BG_COLOR
    },
    bgLessL: {
      backgroundColor: '#fff'
    },
    dot: {
        height: 30,
        fontSize: 30,
        lineHeight: 25
    }
});
