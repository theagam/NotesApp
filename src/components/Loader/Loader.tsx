import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS, genericStyles } from '../../constants';

const Loader = () => {
  return (
    <View style={genericStyles.flexWithMidCenter}>
      <ActivityIndicator color={COLORS.primary} size="large" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
