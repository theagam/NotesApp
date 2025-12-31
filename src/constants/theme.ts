export const COLORS = {
    primary: '#10B981', // Navy Blue - Headers, buttons, primary actions
      primary2: "#F3F3F3",
    secondary: '#10B981', // Emerald Green - Accents, success states, secondary buttons
    background: '#F9FAFB', // Soft White - Main backgrounds, cards
    neutral: '#6B7280', // Cool Gray - Secondary text, borders, icons
    error: '#EF4444', // Soft Red - Error messages, alerts
    highlight: '#60A5FA', // Light Blue - Hover effects, active states
    textPrimary: '#0791D0', // Navy Blue - Primary text
    textSecondary: '#333333', // Cool Gray - Secondary text
    white: '#FFFFFF', // Pure White - For text on dark backgrounds
    bg:"#F7F7F7",
    third: "#7C8BA0",
    black: "#000",
    black2: "#303030",
    black3: "#212121",
    lightBlack: "#2121211A",
    red: "#FF0000",
    blue: "#0000FF",
    RoyalBlue: "#2e64e5",
    MoodyBlue: "#7474d2",
    lightGray: "#F5F5F6",
    lightGray2: "#DCDCDC",
    transparent: "transparent",
    darkgray: "#898C95",
    opacity: "#f2f2f2",
    newColor: "#F4F5F7",
    lawngreen: "#00FF00",
    success: "#47b913",
    green: "#47b913",
    lightPrimary: "#fbcba6",
    regularText50: "#21212180",
    sickLeave: '#FF6B6B',
  casualLeave: '#4ECDC4',
  paidLeave: '#45B7D1',
  wfh: '#c1ce96ff',
  emergencyLeave: '#FFA07A',
  shadow: '#000',
  gray:"#666666",
  yellow: "#cd9900e0"

  };


// Gradient Colors
const primaryGradient = ['#0489C9', '#0CA4E8', '#10B2EC'];
const secondaryGradient = ['#10B981', '#059669']; // Emerald Green to Teal
const highlightGradient = ['#60A5FA', '#3B82F6']; // Light Blue to Sky Blue
const neutralGradient = ['#F9FAFB', '#E5E7EB']; // Soft White to Light Gray
const errorGradient = ['#EF4444', '#DC2626']; // Soft Red to Darker Red

const textPrimary = ['#1E3A8A', '#1E3A8A']; // Navy Blue
const textSecondary = ['#6B7280', '#6B7280']; // Cool Gray
const whiteColor = ['#FFFFFF', '#FFFFFF']; // Pure White
const backgroundColor = ['#F9FAFB', '#F9FAFB']; // Soft White

export const gradientColors = (changeColor: string) => {
  switch (changeColor) {
    case 'PRIMARY':
      return primaryGradient;
    case 'SECONDARY':
      return secondaryGradient;
    case 'HIGHLIGHT':
      return highlightGradient;
    case 'NEUTRAL':
      return neutralGradient;
    case 'ERROR':
      return errorGradient;
    case 'TEXT_PRIMARY':
      return textPrimary;
    case 'TEXT_SECONDARY':
      return textSecondary;
    case 'WHITE':
      return whiteColor;
    case 'BACKGROUND':
      return backgroundColor;
    default:
      return primaryGradient; 
  }
};

export default gradientColors;


export const FONTS = {
  GilroyBlack: 'Gilroy-Black',
  GilroyBlackItalic: 'Gilroy-BlackItalic',
  GilroyBold: 'Gilroy-Bold',
  GilroyBoldItalic: 'Gilroy-BoldItalic',
  GilroyExtraBold: 'Gilroy-ExtraBold',
  GilroyExtraBoldItalic: 'Gilroy-ExtraBoldItalic',
  GilroyHeavy: 'Gilroy-Heavy',
  GilroyHeavyItalic: 'Gilroy-HeavyItalic',
  GilroyLight: 'Gilroy-Light',
  GilroyLightItalic: 'Gilroy-LightItalic',
  GilroyMedium: 'Gilroy-Medium',
  GilroyMediumItalic: 'Gilroy-MediumItalic',
  GilroyRegular: 'Gilroy-Regular',
  GilroyRegularItalic: 'Gilroy-RegularItalic',
  GilroySemiBold: 'Gilroy-SemiBold',
  GilroySemiBoldItalic: 'Gilroy-SemiBoldItalic',
  GilroyThin: 'Gilroy-Thin',
  GilroyThinItalic: 'Gilroy-ThinItalic',
  GilroyUltraLight: 'Gilroy-UltraLight',
  GilroyUltraLightItalic: 'Gilroy-UltraLightItalic',
};
