declare module "react-native-yusha-customkeyboard" {
    import React from 'react'
    import {
        ComponentType,
        ComponentClass,
    } from 'react'
    import {
        NativeMethodsMixin,
        Constructor,
        ScrollViewProps,
        TextInputProps,
        EmitterSubscription
    } from 'react-native'

    //keyBoardAPI
    type ShowTipDataType = {
        isShow: boolean, //是否显示tip
        ref: React.Component<any, any>, //显示tip的元素
        keyValue: string, //要tip的值
    }
    interface InjectedKeyboardApiProps {
        onKeyPress?: (key: string) => void,
        onDelete?: () => void,
        onClearAll?: () => void,
        showTip?: (showTipData: ShowTipDataType) => void
    }
    interface WrapedCustomKeyboardViewConfig {
        customKeyboardTop?: boolean, //是否自定义键盘头部
        getKeyBoardIcon?: () => JSX.Element, //键盘图标
        getKeyBoardName?: () => string, //返回键盘名称
    }
    type CustomKeyboardViewProps<P> = ComponentType<P & InjectedKeyboardApiProps> & WrapedCustomKeyboardViewConfig;
    type KeyboardDecorator<P> = (component: CustomKeyboardViewProps<P>) => ComponentType<any>;
    export function keyBoardAPI<P>(customKeyboardType: string): KeyboardDecorator<P>;

    //NumberKeyBoardView
    interface NumberKeyBoardViewProps {
        keyboardType: 'decimal-pad' | 'number-pad', //可切换为ABC的键盘 | 单纯的数字键盘
        disableDot: boolean, //是否有小数点
    }
    class NumberKeyBoardViewComponent extends React.Component<NumberKeyBoardViewProps> { }
    const NumberKeyBoardViewBase: Constructor<NativeMethodsMixin> & typeof NumberKeyBoardViewComponent;
    export class NumberKeyBoardView extends NumberKeyBoardViewBase { }

    //SafeKeyBoardView
    class SafeKeyBoardViewComponent extends React.Component<{}> { }
    const SafeKeyBoardViewBase: Constructor<NativeMethodsMixin> & typeof SafeKeyBoardViewComponent;
    export class SafeKeyBoardView extends SafeKeyBoardViewBase { }

    //AwareCusKeyBoardScrollView
    type ScrollViewStatic = React.ComponentClass<ScrollViewProps>
    export var AwareCusKeyBoardScrollView: ScrollViewStatic;
    export type AwareCusKeyBoardScrollView = ScrollViewStatic;

    //CustomTextInput
    type CustomTextInputProps = { customKeyboardType: string }
    type CustomTextInputStatic = React.ComponentClass<TextInputProps & CustomTextInputProps>
    export var CustomTextInput: CustomTextInputStatic;
    export type CustomTextInput = CustomTextInputStatic;

    //currentHeight
    export const currentHeight: number;

    //listener
    type iOSKeyBoardSubscription = 'keyboardDidShow' | 'keyboardDidHide'
    type KeyBoardSubscription = EmitterSubscription | iOSKeyBoardSubscription
    export function addKeyBoardHideListener(): KeyBoardSubscription
    export function addKeyBoardShowListener(): KeyBoardSubscription
    export function removeKeyBoardListener(subscription: KeyBoardSubscription): void
}