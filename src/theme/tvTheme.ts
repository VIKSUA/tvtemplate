import { Dimensions } from 'react-native';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const getScreenScale = () => {
    const { width, height } = Dimensions.get('window');
    const safeWidth = width > 0 ? width : DESIGN_WIDTH;
    const safeHeight = height > 0 ? height : DESIGN_HEIGHT;
    return {
        scaleW: safeWidth / DESIGN_WIDTH,
        scaleH: safeHeight / DESIGN_HEIGHT,
    };
};

export const convertPxToVw = (px: number) => {
    const { scaleW } = getScreenScale();
    return px * scaleW;
};

export const convertPxToVh = (px: number) => {
    const { scaleH } = getScreenScale();
    return px * scaleH;
};

export const tvTheme = {
    colorAccent: 'rgba(62,112,234,1)',
    colorAccentDark: 'rgba(32,72,168,1)',
    colorAccentLight: 'rgba(89,136,250,1)',
    colorBlackGlass: 'rgba(33, 34, 40, 0.8)',
    colorGray: 'rgba(141, 146, 159, 1)',
    colorGrayBlue: 'rgba(59, 62, 82, 1)',
    colorGrayLight: 'rgba(242, 242, 242, 1)',
    colorGraySecond: 'rgba(67, 71, 80, 1)',
    colorBg: '#1B1C23',
};
