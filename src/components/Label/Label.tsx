import React from 'react';
import { Text, TextStyle } from 'react-native';
import { dynamicStyles } from '../../constants/genericStyles';

interface LabelProps {
  underLine?: boolean;
  disabled?: boolean;
  labelContent: any;
  numberOfLines?: number;
  onPress?: () => void;
  size?: number;
  color?: string;
  family?: string;
  align?: 'left' | 'center' | 'right' | any;
  mv?: number;
  mh?: number;
  lh?: number;
  mt?: number;
  mb?: number;
  fw?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  textStyle?: TextStyle;
}

const Label: React.FC<LabelProps> = ({
  underLine,
  disabled = false,
  labelContent,
  numberOfLines,
  onPress,
  size,
  color,
  family,
  align,
  mv,
  mh,
  lh,
  mt,
  mb,
  fw,
  textStyle,
}) => {
  return (
    <Text
      onPress={onPress}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      disabled={disabled}
      style={[
        dynamicStyles.customTitle(
          size,
          color,
          family,
          align,
          mv,
          mh,
          lh,
          mt,
          mb,
          fw,
        ),
        {
          textDecorationLine: underLine ? 'underline' : 'none',
          ...textStyle,
        },
      ]}
    >
      {labelContent}
    </Text>
  );
};

export default Label;
