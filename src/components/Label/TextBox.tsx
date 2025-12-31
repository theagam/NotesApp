import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../../constants';

interface TextBoxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  typePassword?: boolean;
  errors?: any;
  required?: boolean;
  email?: boolean;
  containerStyle?: any;
  editable?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  rules?: any;
  toLowercase?: boolean;
  datePicker?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const TextBox = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  typePassword = false,
  errors,
  required = false,
  email = false,
  containerStyle,
  editable = true,
  multiline = false,
  disabled = false,
  rules,
  toLowercase = false,
  datePicker = false,
}: TextBoxProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={{
          ...(required && {
            required: `${label || 'This field'} is required`,
          }),
          ...(email && {
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please enter a valid email address',
            },
          }),
          ...rules,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  multiline && styles.multilineInput,
                  errors?.[name] && styles.inputError,
                  disabled && styles.disabledInput,
                  typePassword && styles.passwordInput,
                ]}
                pointerEvents={datePicker ? 'none' : 'auto'}
                placeholder={placeholder}
                placeholderTextColor="#A0A0A0"
                value={value}
                secureTextEntry={typePassword && !showPassword}
                editable={!disabled && editable}
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
                textAlignVertical={multiline ? 'top' : 'center'}
                keyboardType={email ? 'email-address' : 'default'}
                autoCapitalize={email ? 'none' : 'sentences'}
                onChangeText={onChange}
                onBlur={() => {
                  if (toLowercase && typeof value === 'string') {
                    onChange(value.toLowerCase());
                  }
                  onBlur();
                }}
              />

              {typePassword && !disabled && (
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(p => !p)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color="#888"
                  />
                </TouchableOpacity>
              )}
            </View>

            {errors?.[name] && (
              <Text style={styles.errorText}>{errors[name]?.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: FONTS.GilroyBold,
    color: COLORS.textSecondary,
  },

  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },

  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    fontFamily: FONTS.GilroyMedium,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  passwordInput: {
    paddingRight: 50,
  },

  eyeIcon: {
    position: 'absolute',
    right: 15,
  },

  inputError: {
    borderColor: 'red',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    fontFamily: FONTS.GilroyMedium,
  },

  disabledInput: {
    backgroundColor: '#F0F0F0',
    color: '#A0A0A0',
  },
  multilineInput: {
    minHeight: 120,
    paddingTop: 12,
  },
});
