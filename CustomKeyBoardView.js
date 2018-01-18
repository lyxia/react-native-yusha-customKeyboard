//@flow

import React, { Component } from 'react';

import PropTypes from 'prop-types'

import {
    TouchableOpacity,
    Text,
    Image,
    View,
    StyleSheet,
    findNodeHandle,
    DeviceInfo,
} from 'react-native';

//提示
import {KeyTip} from './views'

export default class KeyBoard extends Component{
    state: Object
    backSpaceRequest: number
    insertTextRequest: number
    clearFocusRequest: number
    clearAllRequest: number

    static propTypes = {
        insertText: PropTypes.func.isRequired,
        clearFocus: PropTypes.func.isRequired,
        clearAll: PropTypes.func.isRequired,
        KeyBoardView: PropTypes.any.isRequired,
    }

    constructor() {
        super(...arguments)
        this.state = {
            width: 0,
            showTip: {isShow:false, layout:{x:0,y:0,width:0,height:0}, keyValue:""}
        }
    }

    _handleDelete = () => {
        this.backSpaceRequest && cancelAnimationFrame(this.backSpaceRequest)
        this.backSpaceRequest = requestAnimationFrame(() => {
            this.props.backSpace(this.props.tag);
        })
    };

    _handleKeyPress = (key) => {
        this.insertTextRequest && cancelAnimationFrame(this.insertTextRequest)
        this.insertTextRequest = requestAnimationFrame(() => {
            this.props.insertText(this.props.tag, key);
        })
    }

    _clearFocus = () => {
        this.clearFocusRequest && cancelAnimationFrame(this.clearFocusRequest)
        this.clearFocusRequest = requestAnimationFrame(() => {
            this.props.clearFocus(this.props.tag)
        })
    }

    _handlerClearAll = () => {
        this.clearAllRequest && cancelAnimationFrame(this.clearAllRequest)
        this.clearAllRequest = requestAnimationFrame(() => {
            this.props.clearAll(this.props.tag)
        })
    }

    //{isShow, ref, keyValue}
    _showTip = (showTipData) => {
        if(showTipData.isShow) {
            showTipData.ref.measureLayout(findNodeHandle(this.refs.keyboard), (left, top, width, height) => {
                console.log(`key: ${showTipData.keyValue} left:${left} top:${top} width:${width} height:${height}`)
                //{isShow:false, layout:{x:0,y:0,width:0,height:0}, keyValue:""}
                this.setState({...this.state, showTip:{...showTipData, layout:{x:left, y:top, width, height}}})
            })
        } else {
            this.setState({...this.state, showTip:showTipData})
        }
    }

    _onLayout = ({ nativeEvent }) => {
        const width = nativeEvent.layout.width
        let height = nativeEvent.layout.height
        if (width > 0 && width !== this.state.width) {
            this.setState({ ...this.state, width })
        }
    }

    _renderTip = () => {
        const {isShow, layout, keyValue} = this.state.showTip
        return isShow ?
            (
                <KeyTip
                    layout = {layout}
                    keyValue = {keyValue}
                />
            )
            :
            null
    }

    componentWillUnmount() {
        this.clearFocusRequest && cancelAnimationFrame(this.clearFocusRequest)
        this.insertTextRequest && cancelAnimationFrame(this.insertTextRequest)
        this.backSpaceRequest && cancelAnimationFrame(this.backSpaceRequest)
        this.clearAllRequest && cancelAnimationFrame(this.clearAllRequest)
    }

    render() {
        const {KeyBoardView} = this.props

        return (
            <View onLayout={this._onLayout} style={styles.container} ref="keyboard" pointerEvents="box-none">
                <View style={styles.keyBoard} key="keyboard">
                    {
                        !KeyBoardView.customKeyboardTop && (
                            <View style={styles.top}>
                                <View style={styles.topLeft}>
                                    {
                                        KeyBoardView.getKeyBoardIcon && KeyBoardView.getKeyBoardIcon()
                                    }
                                    <Text style={styles.topDesText}>{KeyBoardView.getKeyBoardName && KeyBoardView.getKeyBoardName()}</Text>
                                </View>
                                <TouchableOpacity onPress={this._clearFocus}>
                                    <Text style={styles.topCompleteText}>完成</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    <KeyBoardView
                        {...this.props}
                        onKeyPress={this._handleKeyPress}
                        onDelete={this._handleDelete}
                        onClearAll={this._handlerClearAll}
                        showTip={this._showTip}
                    />
                </View>
                {this._renderTip()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    keyBoard: {
        backgroundColor: '#f6f5f2',
        height: DeviceInfo.isIPhoneX_deprecated ? 286 : 252,
    },
    top: {
        height: 36,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#a5a5a5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topLeft: {
        paddingLeft: 15,
        flexDirection: 'row',
    },
    topDesText: {
        color: '#adadad',
        fontSize: 15,
        paddingHorizontal: 8,
    },
    topCompleteText: {
        color: '#0297fa',
        fontSize: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
    }
})

