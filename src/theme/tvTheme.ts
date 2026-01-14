export const convertPxToVw = (px: number) => `${(px / 1920) * 100}vw`;
export const convertPxToVh = (px: number) => `${(px / 1080) * 100}vh`;

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
