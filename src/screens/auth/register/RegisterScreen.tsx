import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useToast } from 'react-native-toast-notifications';
import useUser from '../../../hooks/useUser';
import renderToast from '../../../helper/renderToast';
import Label from '../../../components/Label/Label';
import { COLORS, FONTS } from '../../../constants';
import TextBox from '../../../components/Label/TextBox';
import AppButton from '../../../components/Button/AppButton';
import gradientColors from '../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterScreen: React.FC<any> = ({ navigation }) => {
  const { signUp } = useUser();
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        renderToast(toast, 'Passwords do not match', 'danger');
        return;
      }

      setLoading(true);

      await signUp(data.email.trim(), data.password, data.name.trim());

      renderToast(toast, 'Account created successfully', 'success');

      navigation.navigate('Login');
    } catch (err: any) {
      renderToast(toast, err?.message || 'Registration failed', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={gradientColors('PRIMARY')}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <View style={styles.formContainer}>
          <View style={styles.formCard}>
            <Label
              labelContent="Create Account"
              size={28}
              family={FONTS.GilroyBold}
              color={COLORS.textSecondary}
              align="center"
              mb={20}
            />

            <TextBox
              name="name"
              control={control}
              label="Full Name"
              placeholder="Enter your name"
              errors={errors}
              required
              containerStyle={styles.inputContainer}
            />

            <TextBox
              name="email"
              control={control}
              label="Email"
              placeholder="Enter email"
              errors={errors}
              required
              email
              toLowercase
              containerStyle={styles.inputContainer}
            />

            <TextBox
              name="password"
              control={control}
              label="Password"
              placeholder="Enter password"
              errors={errors}
              required
              typePassword
              containerStyle={styles.inputContainer}
            />

            <TextBox
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              placeholder="Re-enter password"
              errors={errors}
              required
              typePassword
              rules={{
                validate: (value: any) =>
                  value === password || 'Passwords do not match',
              }}
              containerStyle={styles.inputContainer}
            />

            <AppButton
              title="Register"
              loading={loading}
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
            />

            <View style={styles.footer}>
              <Label
                labelContent="Already have an account?"
                size={14}
                color={COLORS.gray}
                family={FONTS.GilroyRegular}
                mh={4}
              />

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Label
                  labelContent="Login"
                  size={14}
                  color={COLORS.primary}
                  family={FONTS.GilroyBold}
                  underLine
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  formContainer: {
    // flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 30,
    marginTop: -150,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 16,
  },
  header: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
