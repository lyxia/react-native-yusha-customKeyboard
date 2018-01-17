//@flow

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
} from 'react-native';

const screen = Dimensions.get('window');
const WIDTH = screen.width;
const HEIGHT = screen.height;

export default class Display extends Component {

  view: Object
  state: Object

  constructor() {
    super(...arguments);
    
    this.state = { enable: this.props.enable };
  }

  componentWillUpdate(nextProps: Object, nextState: Object) {

    if (nextProps.enable != this.props.enable) {
      if (nextProps.enable == false)
          nextState.enable = false;
      else
        nextState.enable = true;
    }
  }

  enableStyle() {
    if (this.state.enable)
      return {};

    return {
      position: 'absolute',
      top: HEIGHT,
      left: WIDTH,
      height: 0,
      width: 0,
    };
  }

  _onRef = (ref) => {
    this.view = ref
  }

  render() {
    
    if (this.state.enable == false) {
      if (this.props.keepAlive != true) return null
      //懒加载
      if( this.view === undefined) {
        return null
      }
    }
      
    return (
      <View ref={this._onRef} style={[this.props.style, this.enableStyle.bind(this)()]}>
        {this.props.children}
      </View>
    );
  }

}