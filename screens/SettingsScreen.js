import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import SelectColor from '../components/SelectColor';
import Layout from '../constants/Layout';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _baseScale = new Animated.Value(1);
  _pinchScale = new Animated.Value(1);
  _scale = Animated.multiply(this._baseScale, this._pinchScale);
  _lastScale = 1;
  _onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this._pinchScale } }],
    { useNativeDriver: true }
  );

  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      if (this._lastScale > this._baseScale._value) {
        this.props.setModalVisible(false);
      }
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
    }
  };
  render() {
    return (
      <PinchGestureHandler
      onGestureEvent={this._onPinchGestureEvent}
      onHandlerStateChange={this._onPinchHandlerStateChange}>
        <Animated.View style={styles.overlay} collapsable={false}>
          <Text style={styles.title}>SETTING</Text>
          <View style={styles.locateColors}>
            <SelectColor setLightColor={this.props.setLightColor}/>
          </View>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </Animated.View>
      </PinchGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  title:{
    textAlign: 'center',
    marginTop: 40,
    fontSize: 40,
  },
  locateColors : {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
    width: Layout.window.width,
    height: Layout.window.height,
  }  
})
