import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import { FONTS } from '../../constants/theme';

interface AppButtonProps {
  title: any;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: any;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  containerStyle,
}) => {
  const Button = (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.shadowWrapper,
        disabled && styles.disabled,
        containerStyle,
      ]}
    >
      <View style={styles.clipWrapper}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 10,
  },

  clipWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: FONTS.GilroySemiBold,
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
