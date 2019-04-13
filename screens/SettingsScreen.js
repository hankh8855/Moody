import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import SelectColor from '../components/SelectColor';
import Layout from '../constants/Layout';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { Brightness } from 'expo';
import Slider from "react-native-slider";

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
          <View style={styles.sliderContainer}>
            <Slider
              value={this.props.state.brightness}
              minimumValue={0.1}
              maximumValue={1}
              minimumTrackTintColor={'blue'}
              thumbTintColor={'blue'}
              animationType={'spring'}
              onValueChange={brightness => Brightness.setBrightnessAsync(brightness)}
              onSlidingComplete={brightness => this.props.setBrightness(brightness)}
            />
          </View>
        </Animated.View>
      </PinchGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
    width: Layout.window.width,
    height: Layout.window.height,
  },
  title:{
    flex: 0.1,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 40,
  },
  locateColors : {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderContainer:{
    flex: 0.1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    alignItems: "stretch",
    justifyContent: "center",
  }
})
