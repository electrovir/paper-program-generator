import {getObjectTypedKeys, mapObjectValues} from '@augment-vir/common';
import {CSSResult, unsafeCSS} from 'element-vir';
import {defineCssVars} from 'lit-css-vars';

const defaultFontSizes = {
    'vir-font-h1': 48,
    'vir-font-h2': 40,
    'vir-font-h3': 32,
    'vir-font-h4': 27,
    'vir-font-h5': 24,
    'vir-font-h6': 20,
    'vir-font-regular': 20,
    'vir-font-small': 16,
    'vir-font-tiny': 14,
} as const satisfies Readonly<Record<string, number>>;

export const fontSizeCssVars = defineCssVars(
    mapObjectValues(defaultFontSizes, (key, value) => {
        return `${value}px`;
    }),
);

export function generateFontSizes(factor: number): CSSResult {
    const fontSizeLines = getObjectTypedKeys(defaultFontSizes).map((fontSizeKey) => {
        const fontSize = defaultFontSizes[fontSizeKey] * factor;
        return `${fontSizeCssVars[fontSizeKey].name}: ${fontSize}px;`;
    });

    return unsafeCSS(fontSizeLines.join('\n'));
}
