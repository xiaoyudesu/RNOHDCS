import React, { useCallback } from 'react';
import {
  Button,
  SectionList,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { View, Text, Animation } from 'react-native-animatable';
import AnimationCell from './AnimationCell';
import { animationTypes } from './groupedAnimationTypes';
import { Tester, TestSuite } from '@rnoh/testerino';

const COLORS = [
  '#65b237', // green
  '#346ca5', // blue
  '#a0a0a0', // light grey
  '#ffc508', // yellow
  '#217983', // cobolt
  '#435056', // grey
  '#b23751', // red
  '#333333', // dark
  '#ff6821', // orange
  '#e3a09e', // pink
  '#1abc9c', // turquoise
  '#302614', // brown
];

const NATIVE_INCOMPATIBLE_ANIMATIONS = [
  'jello',
  'lightSpeedIn',
  'lightSpeedOut',
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    textAlign: 'center',
    margin: 20,
  },
  instructions: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  instructions2: {
    textAlign: 'center',
    color: 'blue',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  slider: {
    height: 30,
    margin: 10,
  },
  toggle: {
    width: 120,
    backgroundColor: '#333',
    borderRadius: 3,
    padding: 5,
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 10,
    color: 'rgba(255, 255, 255, 1)',
  },
  toggledOn: {
    color: 'rgba(255, 33, 33, 1)',
    fontSize: 16,
    transform: [
      {
        rotate: '8deg',
      },
      {
        translateY: -20,
      },
    ],
  },
  sectionHeader: {
    backgroundColor: '#F5FCFF',
  },
  sectionHeaderText: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default function AnimatableExample() {
  const [duration, setDuration] = React.useState(1000);
  const [toggledOn, setToggledOn] = React.useState(false);
  const textRef = React.useRef<Text>(null);
  const [animationBegin, setAnimationBegin] = React.useState('');

  const handleRowPressed = useCallback(
    (componentRef: typeof View, animationType: Animation) => {
      componentRef.animate(animationType, duration);
      textRef.current?.animate(animationType, duration);
    },
    [duration],
  );

  return (
      <View style={styles.container}>
        <Tester style={{
          flex: 1
        }}>
          <TestSuite name='动画速度'>
            <View style={styles.slider}>
              <Button title='动画速度减缓' onPress={() => { setDuration(Math.round(Math.floor(Math.random() * 1000) + 1)) }}></Button>
            </View>

            <TouchableWithoutFeedback onPress={() => setToggledOn(prev => !prev)}>
              <Text
                style={[styles.toggle, toggledOn && styles.toggledOn]}
                transition={['color', 'rotate', 'fontSize']}
              >
                点击改变
              </Text>
            </TouchableWithoutFeedback>
            <Text animation="zoomInDown" delay={10000} direction='normal' style={styles.instructions}>
              当前动画速度 {duration} ms
            </Text>
            <Text animation="zoomInDown" delay={10000} direction='alternate-reverse' style={styles.instructions}>
              10秒到了,消失！！！！！
            </Text>
            <Text animation="zoomInDown" delay={5000} direction='normal' easing='linear' style={styles.instructions}>
              设置了easing匀速
            </Text>
            <Text animation="zoomInDown" delay={5000} direction='normal' easing='ease-in' style={styles.instructions2}>
              设置了easing缓慢加速
            </Text>
            <Text animation="fadeIn" delay={3000} iterationCount={8} style={styles.instructions}>
              淡化8次
            </Text>
            <Text animation="fadeIn" delay={3000} iterationCount={3} iterationDelay={3000} style={styles.instructions}>
              淡化3次,但是每次我会暂停3S
            </Text>
            <Text animation="fadeIn"
              iterationCount={5}
              direction="reverse"
              style={{ color: 'white', textAlign: 'center' }}
              duration={2000}
              onAnimationBegin={() => { setAnimationBegin('动画,启动！') }}
              onAnimationEnd={() => { setAnimationBegin('动画,结束！') }}
            >动画，启动！/动画，结束！</Text>
            <Text style={{ color: 'white', textAlign: 'center' }}>监听动画启动/结束状态：{animationBegin}</Text>
            <Text animation="bounce" easing="ease-out" iterationCount="infinite" iterationDelay={1500} style={{ textAlign: 'center' }} useNativeDriver={false} isInteraction={true}>❤️</Text>
            <Text animation="bounce" easing="ease-out" iterationCount="infinite" iterationDelay={1500} style={{ textAlign: 'center' }} useNativeDriver={true} isInteraction={true}>❤️</Text>
          </TestSuite>

          <ScrollView style={{ flex: 1 }}>
            <View
              animation="bounceInUp"
              duration={1100}
              delay={20000}
              style={styles.container}>
              <SectionList
                contentInsetAdjustmentBehavior="automatic"
                keyExtractor={item => item}
                sections={animationTypes}
                removeClippedSubviews={false}
                renderSectionHeader={({ section }) => (
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{section.title}</Text>
                  </View>
                )}
                renderItem={({ item, index }) => (
                  <AnimationCell
                    animationType={item}
                    color={COLORS[index % COLORS.length]}
                    onPress={handleRowPressed}
                    useNativeDriver={
                      NATIVE_INCOMPATIBLE_ANIMATIONS.indexOf(item) === -1
                    }
                  />
                )}
              />
            </View>
          </ScrollView>
        </Tester>
      </View >
  );
}