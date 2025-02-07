import {css, defineElement} from 'element-vir';
import {AgendaSectionByType} from '../../../../data/agenda/agenda-section.js';
import {TextAlignment} from '../../../../data/agenda/agenda-sections/text.section.js';
import {formatTextForPresentation} from '../../../../util/presentation-text.js';

export const VirTextPresent = defineElement<{
    section: AgendaSectionByType<'text'>;
}>()({
    tagName: 'vir-text-present',
    hostClasses: {
        'vir-text-present-left': ({inputs}) => inputs.section.alignment === TextAlignment.Left,
        'vir-text-present-justify': ({inputs}) =>
            inputs.section.alignment === TextAlignment.Justify,
    },
    styles: ({hostClasses}) => css`
        :host {
            display: block;
            text-align: center;
        }

        ${hostClasses['vir-text-present-left'].selector} {
            text-align: left;
        }

        ${hostClasses['vir-text-present-justify'].selector} {
            text-align: justify;
            display: table-row;
            text-align-last: left;
        }
    `,
    render({inputs}) {
        return formatTextForPresentation(inputs.section.text);
    },
});
