//@flow

import React, {Component, PureComponent} from 'react'

import {
    ScrollView,
    findNodeHandle,
    Dimensions,
    TextInput,
    View,
    Platform,
    Keyboard,
    UIManager,
} from 'react-native'

import * as CustomKeyboard from './customKeyboard'

export default class AwareCusKeyBoardScrollView extends PureComponent {
    state: Object

    //防止自定义键盘切换之间的闪跳
    showKeyBoard: boolean
    resetTimeout: number

    //监听系统键盘
    showKeyBoardSub: any
    hideKeyboardSub: any

    //监听自定义键盘
    showCustomKeyBoardSub: any
    hideCustomKeyboardSub: any

    //区分showSys->hideSys和showSys->showCus->hideSys之间的区别
    flag: number

    constructor() {
        super(...arguments)

        this.flag = 0
        this.state = {
            showKeyBoard: false,
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            this.showCustomKeyBoardSub = CustomKeyboard.addKeyBoardShowListener(this._onFocus)
            this.hideCustomKeyboardSub = CustomKeyboard.addKeyBoardHideListener(this._onReset)
            this.showKeyBoardSub = Keyboard.addListener('keyboardDidShow', this._showSysKeyborad)
            this.hideKeyboardSub = Keyboard.addListener('keyboardDidHide', this._hideSysKeyboard)
        }
    }

    componentDidUpdate(preProps: Object, preState: Object,) {
        if (preState.showKeyBoard != this.state.showKeyBoard) {
            this._updateScrollTo()
        }
    }

    componentWillUnmount() {
        this.showCustomKeyBoardSub && CustomKeyboard.removeKeyBoardListener(this.showCustomKeyBoardSub)
        this.hideCustomKeyboardSub && CustomKeyboard.removeKeyBoardListener(this.hideCustomKeyboardSub)
        this.showKeyBoardSub && this.showKeyBoardSub.remove()
        this.hideKeyboardSub && this.hideKeyboardSub.remove()

        this.scrollTimeout && clearTimeout(this.scrollTimeout)
        this.resetTimeout && clearTimeout(this.resetTimeout)
    }

    _showSysKeyborad = (frames: Object) => {
        console.log('show system keyboard')

        //防止自定义键盘跳到系统键盘出bug
        this.resetTimeout && clearTimeout(this.resetTimeout)

        this.flag++
    }

    _hideSysKeyboard = () => {
        this.flag--
        if(this.flag === 0) {
            //之间切换状态到键盘不显示
            this.showKeyBoard = false
            this._changeKeyBoardState()
        }
    }

    _onFocus = () => {
        this.showKeyBoard = true
        this.flag += 2

        this.resetTimeout && clearTimeout(this.resetTimeout)

        this._changeKeyBoardState()
    }

    _onReset = () => {
        this.showKeyBoard = false
        this.flag -= 2

        this.resetTimeout && clearTimeout(this.resetTimeout)

        this.resetTimeout = setTimeout(()=>{
            this._changeKeyBoardState()
        }, 200)
    }

    _changeKeyBoardState = () => {
        this.setState((preState) => {
            if (preState.showKeyBoard === this.showKeyBoard) {
                this._updateScrollTo()
                return preState
            }
            return {showKeyBoard: this.showKeyBoard}
        })
    }

    _onError = () => {}

    _updateScrollTo = () => {
        if(TextInput.State.currentlyFocusedField() == null) {
            return
        }

        const currentlyTfNode = TextInput.State.currentlyFocusedField()
        const scrollViewNode = findNodeHandle(this.refs.scrollView)

        //显示和隐藏键盘
        if (this.state.showKeyBoard) {
            UIManager.measureInWindow(scrollViewNode, (x, y, width, height) => {
                UIManager.measureLayout(
                    currentlyTfNode,
                    scrollViewNode,
                    this._onError,
                    (left, top, width, height) => {
                        const windowHeight = Dimensions.get('window').height
                        const subHeight = windowHeight - CustomKeyboard.currentHeight
                        const currentHeight = top + height + y + 30 //上下padding高度
                        if (subHeight < currentHeight) {
                            this.refs.scrollView.scrollTo({y: currentHeight - subHeight})
                        }
                    }
                )
            })
        } else {
            this.refs.scrollView.scrollTo({y: 0})
        }
    }

    render() {
        const {children, otherProps} = this.props
        return (
            <ScrollView
                ref="scrollView"
                key="scrollView"
                keyboardShouldPersistTaps="handled"
                {...otherProps}
            >
                {this.props.children}
                <View style={{height: this.state.showKeyBoard ? CustomKeyboard.currentHeight : 0}}/>
            </ScrollView>
        )
    }
}