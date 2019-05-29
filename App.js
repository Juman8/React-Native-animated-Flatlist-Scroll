import React from 'react'
import { View, FlatList, Text, StyleSheet, Animated, Dimensions } from 'react-native'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 21, 22, 23, 24, 25, 26]

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const { height } = Dimensions.get('window')
const pt = height/832
export default class AnimatedHeader extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      animatedValue: new Animated.Value(0),
    }
    this.onHide = ()=>{alert('hide')}
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.nonsenseItem}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    )
  }

  render() {
    const translateY = this.state.animatedValue.interpolate({
      inputRange: [-100, 0],
      outputRange: [600, 0],
      extrapolate: 'clamp',
    })
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.headerWrapper, { transform: [{ translateY }], bottom: 0 }]}>
          <AnimatedFlatList
            onEndReachedThreshold={0}
            // contentContainerStyle={{ marginTop: 200 }}
            onScrollEndDrag={evt => {
                  if (evt.nativeEvent.contentOffset.y < -60*pt) {
                    this.onHide()
                  }
                }}
            scrollEventThrottle={16} // <-- Use 1 here to make sure no events are ever missed
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.animatedValue } } }],
              { useNativeDriver: true } // <-- Add this
            )}
            data={data}
            renderItem={this._renderItem}
            keyExtractor={(item, i) => i}
          />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  nonsenseItem: {
    backgroundColor: 'green',
    margin: 8,
  },
  itemText: {
    backgroundColor: 'gray',
    fontSize: 20,
    padding: 20,
  },
  headerWrapper: {
    position: 'absolute',
    backgroundColor: 'pink',
    height: height - 150,
    left: 0,
    right: 0,
  },
})
