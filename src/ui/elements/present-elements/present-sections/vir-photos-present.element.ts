import {addPx} from '@augment-vir/common';
import {css, defineElement, html} from 'element-vir';
import {setCssVarValue} from 'lit-css-vars';
import {ViraImage} from 'vira';
import {AgendaSectionByType} from '../../../../data/agenda/agenda-section';

export const VirPhotosPresent = defineElement<{
    section: AgendaSectionByType<'photos'>;
}>()({
    tagName: 'vir-photos-present',
    cssVars: {
        'vir-photos-present-image-height': '100px',
        'vir-photos-present-image-width': '100px',
    },
    styles: ({cssVars}) => css`
        :host {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
        }

        ${ViraImage} {
            max-height: ${cssVars['vir-photos-present-image-height'].value};
            max-width: ${cssVars['vir-photos-present-image-width'].value};
        }
    `,
    renderCallback({inputs, host, cssVars}) {
        setCssVarValue({
            forCssVar: cssVars['vir-photos-present-image-height'],
            onElement: host,
            toValue: addPx(inputs.section.dimensions.height),
        });
        setCssVarValue({
            forCssVar: cssVars['vir-photos-present-image-width'],
            onElement: host,
            toValue: addPx(inputs.section.dimensions.width),
        });

        const photoTemplates = inputs.section.photoUrls.map((photoUrl) => {
            return html`
                <${ViraImage.assign({
                    imageUrl: photoUrl,
                })}></${ViraImage}>
            `;
        });

        return photoTemplates;
    },
});
