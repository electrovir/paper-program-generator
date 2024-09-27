import {copyThroughJson, getEnumTypedValues, isEnumValue} from '@augment-vir/common';
import {css, defineElement, html, listen} from 'element-vir';
import {AgendaSectionByType} from '../../../../data/agenda/agenda-section';
import {TextAlignment} from '../../../../data/agenda/agenda-sections/text.section';
import {SectionEditEvent} from '../../../events/section-edit.event';
import {VirSelect} from '../../common-elements/vir-select.element';
import {VirTextArea} from '../../common-elements/vir-text-area.element';

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
    renderCallback({inputs, dispatch}) {
        return html`
            <${VirSelect.assign({
                label: 'align',
                options: getEnumTypedValues(TextAlignment),
                value: inputs.section.alignment,
            })}
                ${listen(VirSelect.events.valueChange, (event) => {
                    const newTextSection = copyThroughJson(inputs.section);

                    const newAlignment = event.detail;

                    if (!isEnumValue(newAlignment, TextAlignment)) {
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
