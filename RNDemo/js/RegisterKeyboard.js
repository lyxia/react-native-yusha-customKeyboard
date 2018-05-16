import * as CustomKeyboard from 'react-native-yusha-customkeyboard'
import {
    Image,
    View,
} from 'react-native'
import React, {Component} from 'react'

//注册没有小数点的数字键盘
CustomKeyboard.keyBoardAPI('numberKeyBoard')(class extends Component{
    static getKeyBoardIcon = () => {
        return <Image source={require('./images/anquanbaohu.png')}/>
    }

    static getKeyBoardName = () => {
        return "安全键盘"
    }

    render() {
        return (
            <CustomKeyboard.NumberKeyBoardView
                keyboardType={"number-pad"}
                disableOtherText={true}
                disableDot={true}
                {...this.props}
            />
        )
    }
})
//注册有小数点的数字键盘
CustomKeyboard.keyBoardAPI('numberKeyBoardWithDot')(class extends Component{
    render() {
        return (
            <CustomKeyboard.NumberKeyBoardView
                keyboardType={"number-pad"}
                disableOtherText={true}
                {...this.props}
            />
        )
    }
})
//注册数字，字母，符号切换键盘
CustomKeyboard.keyBoardAPI('safeKeyBoard')(CustomKeyboard.SafeKeyBoardView)
//注册自定义视图键盘
CustomKeyboard.keyBoardAPI('testKeyboard')(class extends Component{
    static customKeyboardTop = true

    render() {
        return <View style={{flex:1, backgroundColor: 'red'}}/>
    }
})