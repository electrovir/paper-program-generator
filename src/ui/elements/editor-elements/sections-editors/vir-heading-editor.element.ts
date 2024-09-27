import {copyThroughJson, getEnumTypedValues, isEnumValue} from '@augment-vir/common';
import {css, defineElement, html, listen} from 'element-vir';
import {AgendaSectionByType} from '../../../../data/agenda/agenda-section';
import {FontSize} from '../../../../data/font-size';
import {SectionEditEvent} from '../../../events/section-edit.event';
import {VirInput} from '../../common-elements/vir-input.element';
import {VirSelect} from '../../common-elements/vir-select.element';

export const VirHeadingEditor = defineElement<{
    section: AgendaSectionByType<'heading'>;
}>()({
    tagName: 'vir-heading-editor',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .bottom-config {
            display: flex;
            gap: 8px;
        }

        .bottom-config ${VirInput} {
            flex-grow: 1;
        }
    `,
    renderCallback({inputs, dispatch}) {
        return html`
            <${VirInput.assign({
                value: inputs.section.title,
                label: 'title',
            })}
                ${listen(VirInput.events.valueChange, (event) => {
                    const newHeadingSection = copyThroughJson(inputs.section);

                    newHeadingSection.title = event.detail;

                    dispatch(new SectionEditEvent(newHeadingSection));
                })}
            ></${VirInput}>
            <${VirInput.assign({
                value: inputs.section.subtitle,
                label: 'subtitle',
            })}
                ${listen(VirInput.events.valueChange, (event) => {
                    const newHeadingSection = copyThroughJson(inputs.section);

                    newHeadingSection.subtitle = event.detail;

                    dispatch(new SectionEditEvent(newHeadingSection));
                })}
            ></${VirInput}>
            <div class="bottom-config">
                <${VirSelect.assign({
                    label: 'subtitle size',
                    options: getEnumTypedValues(FontSize),
                    value: inputs.section.subtitleSize,
                })}
                    ${listen(VirSelect.events.valueChange, (event) => {
                        if (!isEnumValue(event.detail, FontSize)) {
                            return;
                        }

                        const newHeadingSection = copyThroughJson(inputs.section);
                        newHeadingSection.subtitleSize = event.detail;

                        dispatch(new SectionEditEvent(newHeadingSection));
                    })}
                ></${VirSelect}>
                <${VirInput.assign({
                    label: 'date',
                    value: inputs.section.date,
                })}
                    ${listen(VirInput.events.valueChange, (event) => {
                        const newHeadingSection = copyThroughJson(inputs.section);

                        newHeadingSection.date = event.detail;

                        dispatch(new SectionEditEvent(newHeadingSection));
                    })}
                ></${VirInput}>
            </div>
        `;
    },
});
