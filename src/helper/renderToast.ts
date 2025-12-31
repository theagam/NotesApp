import {COLORS, genericStyles} from '../constants';


const renderToast = (toast: any, msg: string, type?: string | null, duration?: number | null): any => {
  toast?.hideAll();
  return toast?.show(msg, {
    type: type === undefined || type === null ? 'normal' : type,
    placement: 'bottom',
    duration: duration === undefined || duration === null ? 3000 : duration,
    offset: 30,
    textStyle: [genericStyles.title600, {color: COLORS.white}],
    normalColor: COLORS.secondary,
    animationType: 'zoom-in',
    successColor: '#55BB62',
  });
};

export default renderToast;
