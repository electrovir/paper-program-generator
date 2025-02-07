import {check} from '@augment-vir/assert';
import {copyThroughJson, getEnumValues} from '@augment-vir/common';
import {css, defineElement, html, listen} from 'element-vir';
import {AgendaSectionByType} from '../../../../data/agenda/agenda-section.js';
import {TextAlignment} from '../../../../data/agenda/agenda-sections/text.section.js';
import {SectionEditEvent} from '../../../events/section-edit.event.js';
import {VirSelect} from '../../common-elements/vir-select.element.js';
import {VirTextArea} from '../../common-elements/vir-text-area.element.js';

export const VirTextEditor = defineElement<{
    section: AgendaSectionByType<'text'>;
}>()({
    tagName: 'vir-text-editor',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
    `,
    render({inputs, dispatch}) {
        return html`
            <${VirSelect.assign({
                label: 'align',
                options: getEnumValues(TextAlignment),
                value: inputs.section.alignment,
            })}
                ${listen(VirSelect.events.valueChange, (event) => {
                    const newTextSection = copyThroughJson(inputs.section);

                    const newAlignment = event.detail;

                    if (!check.isEnumValue(newAlignment, TextAlignment)) {
                        return;
                    }

                    newTextSection.alignment = newAlignment;
                    dispatch(new SectionEditEvent(newTextSection));
                })}
            ></${VirSelect}>
            <${VirTextArea.assign({
                label: 'text',
                value: inputs.section.text,
            })}
                ${listen(VirTextArea.events.valueChange, (event) => {
                    const newTextSection = copyThroughJson(inputs.section);
                    newTextSection.text = event.detail;
                    dispatch(new SectionEditEvent(newTextSection));
                })}
            ></${VirTextArea}>
        `;
    },
});
