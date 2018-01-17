//@flow

import {
    keyBoardAPI,
    addKeyBoardHideListener,
    addKeyBoardShowListener,
    removeKeyBoardListener,
    currentHeight,
    CustomTextInput,
} from './customKeyboard'

import React, {Component} from 'react'

import NumberKeyBoardView from './views/NumberKeyBoard'
import SafeKeyBoardView from './views/SafeKeyBoard'
import AwareCusKeyBoardScrollView from './AwareCusKeyBoardScrollView'

const NumberKeyBoard = keyBoardAPI('numberKeyBoard')(class extends Component{
    render() {
        return (
            <NumberKeyBoardView
                keyboardType={"number-pad"}
                disableOtherText={true}
                disableDot={true}
                {...this.props}
            />
        )
    }
})

const NumberKeyBoardWithDot = keyBoardAPI('numberKeyBoardWithDot')(class extends Component{
    render() {
        return (
            <NumberKeyBoardView
                keyboardType={"number-pad"}
                disableOtherText={true}
                {...this.props}
            />
        )
    }
})

const SafeKeyBoard = keyBoardAPI('safeKeyBoard')(SafeKeyBoardView)

export {
    addKeyBoardHideListener,
    removeKeyBoardListener,
    addKeyBoardShowListener,
    currentHeight,
    CustomTextInput,
    AwareCusKeyBoardScrollView,
}