import {css, defineElement, html} from 'element-vir';
import {FontSize} from '../../../data/font-size.js';
import {fontSizeCssVars} from '../../styles/font-css-vars.js';

export const VirFont = defineElement<{size: FontSize}>()({
    tagName: 'vir-font',
    hostClasses: {
        'vir-font-h1': ({inputs}) => inputs.size === FontSize.H1,
        'vir-font-h2': ({inputs}) => inputs.size === FontSize.H2,
        'vir-font-h3': ({inputs}) => inputs.size === FontSize.H3,
        'vir-font-h4': ({inputs}) => inputs.size === FontSize.H4,
        'vir-font-h5': ({inputs}) => inputs.size === FontSize.H5,
        'vir-font-h6': ({inputs}) => inputs.size === FontSize.H6,
        'vir-font-regular': ({inputs}) => inputs.size === FontSize.Regular,
        'vir-font-small': ({inputs}) => inputs.size === FontSize.Small,
        'vir-font-tiny': ({inputs}) => inputs.size === FontSize.Tiny,
    },
    styles: ({hostClasses}) => css`
        ${hostClasses['vir-font-h1'].selector} {
            font-size: ${fontSizeCssVars['vir-font-h1'].value};
            font-weight: bold;
        }
        ${hostClasses['vir-font-h2'].selector} {
            font-size: ${fontSizeCssVars['vir-font-h2'].value};
            font-weight: bold;
        }
        ${hostClasses['vir-font-h3'].selector} {
            font-size: ${fontSizeCssVars['vir-font-h3'].value};
            font-weight: bold;
        }
        ${hostClasses['vir-font-h4'].selector} {
            font-size: ${fontSizeCssVars['vir-font-h4'].value};
            font-weight: bold;
        }
        ${hostClasses['vir-font-h5'].selector} {
            font-size: ${fontSizeCssVars['vir-font-h5'].value};
            font-weight: bold;
        }
        ${hostClasses['vir-font-h6'].selector} {
            font-size: ${fontSizeCssVars['vir-font-h6'].value};
            font-weight: bold;
        }
        ${hostClasses['vir-font-regular'].selector} {
            font-size: ${fontSizeCssVars['vir-font-regular'].value};
        }
        ${hostClasses['vir-font-small'].selector} {
            font-size: ${fontSizeCssVars['vir-font-small'].value};
        }
        ${hostClasses['vir-font-tiny'].selector} {
            font-size: ${fontSizeCssVars['vir-font-tiny'].value};
        }
    `,
    render() {
        return html`
            <slot></slot>
        `;
    },
});
