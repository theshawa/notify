import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import colors from 'tailwindcss/colors';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};

export const CONSTANTS = {
  defaultTheme: '#FFD699',
  dark: colors.slate['950'],
  light: colors.slate['50'],
  themes: [
    '#FFD699', // Light Orange
    '#AEEEEE', // Light Turquoise
    '#FFE4B5', // Light Cream
    '#FFA07A', // Light Salmon
    '#98FB98', // Light Mint
    '#F08080', // Light Coral
    '#FFD700', // Light Gold
    '#FFDAB9', // Light Apricot
    '#E6E6FA', // Light Lavender
    '#87CEFA', // Light Sky Blue
    '#20B2AA', // Light Sea Green
    '#DA70D6', // Light Orchid
    '#778899', // Light Slate Gray
    '#B0C4DE', // Light Steel Blue
    '#FAFAD2', // Light Goldenrod Yellow
    '#E0FFFF', // Light Cyan
    '#FFC972', // Original Color
  ],
};
