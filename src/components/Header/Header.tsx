import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Label from '../Label/Label';
import { COLORS, FONTS } from '../../constants';

interface Props {
  title: string;
  showBack?: boolean;
  showLogout?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<Props> = ({
  title,
  showBack = false,
  showLogout = false,
  onLogout,
}) => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#fff" />
            </TouchableOpacity>
          )}

          <Label
            labelContent={title}
            size={20}
            color="#fff"
            family={FONTS.GilroyBold}
            mh={showBack ? 8 : 0}
          />
        </View>

        {showLogout && (
          <TouchableOpacity
            onPress={onLogout}
            style={styles.iconBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: COLORS.primary,
  },
  container: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBtn: {
    width: 30,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
