import {assert} from '@augment-vir/assert';
import {copyThroughJson, filterOutIndexes} from '@augment-vir/common';
import {css, defineElement, html, listen, nothing} from 'element-vir';
import {AgendaSection, AgendaSectionByType} from '../../../../data/agenda/agenda-section.js';
import {chronologyRowShape} from '../../../../data/agenda/agenda-sections/chronology.section.js';
import {SectionEditEvent} from '../../../events/section-edit.event.js';
import {VirButton} from '../../common-elements/vir-button.element.js';
import {VirInput} from '../../common-elements/vir-input.element.js';

export const VirChronologyEditor = defineElement<{
    section: AgendaSectionByType<'chronology'>;
}>()({
    tagName: 'vir-chronology-editor',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .chronology-row {
            display: flex;
        }

        .chronology-row > ${VirInput} {
            flex-basis: 0;
            flex-grow: 1;
        }
    `,
    render({inputs, dispatch}) {
        if (!inputs.section.rows.length) {
            const newChronologySection: AgendaSectionByType<'chronology'> = copyThroughJson(
                inputs.section,
            );
            newChronologySection.rows.push(chronologyRowShape.defaultValue);

            dispatch(new SectionEditEvent(newChronologySection));
            return nothing;
        }

        const rowTemplates = inputs.section.rows.map((chronologyRow, rowIndex) => {
            return html`
                <div class="chronology-row">
                    <${VirButton.assign({
                        label: '',
                        text: 'x',
                    })}
                        ${listen('click', () => {
                            const newChronologySection: Extract<
                                AgendaSection,
                                {sectionType: 'chronology'}
                            > = copyThroughJson(inputs.section);

                            newChronologySection.rows = filterOutIndexes(
                                newChronologySection.rows,
                                [
                                    rowIndex,
                                ],
                            );

                            dispatch(new SectionEditEvent(newChronologySection));
                        })}
                    ></${VirButton}>
                    <${VirInput.assign({
                        label: 'left',
                        value: chronologyRow.left,
                    })}
                        ${listen(VirInput.events.valueChange, (event) => {
                            editChronologyRow({
                                currentChronologySection: inputs.section,
                                dispatch,
                                newValue: event.detail,
                                rowIndex,
                                side: 'left',
                            });
                        })}
                    ></${VirInput}>
                    <${VirInput.assign({
                        label: 'right',
                        value: chronologyRow.right,
                    })}
                        ${listen(VirInput.events.valueChange, (event) => {
                            editChronologyRow({
                                currentChronologySection: inputs.section,
                                dispatch,
                                newValue: event.detail,
                                rowIndex,
                                side: 'right',
                            });
                        })}
                    ></${VirInput}>
                    <${VirButton.assign({
                        label: '',
                        text: '+',
                    })}
                        ${listen('click', () => {
                            const newChronologySection: Extract<
                                AgendaSection,
                                {sectionType: 'chronology'}
                            > = copyThroughJson(inputs.section);

                            newChronologySection.rows = [
                                ...newChronologySection.rows.slice(0, rowIndex + 1),
                                chronologyRowShape.defaultValue,
                                ...newChronologySection.rows.slice(rowIndex + 1),
                            ];

                            dispatch(new SectionEditEvent(newChronologySection));
                        })}
                    ></${VirButton}>
                </div>
            `;
        });

        return rowTemplates;
    },
});

function editChronologyRow({
    currentChronologySection,
    rowIndex,
    side,
    newValue,
    dispatch,
}: {
    currentChronologySection: AgendaSectionByType<'chronology'>;
    rowIndex: number;
    side: 'left' | 'right';
    newValue: string;
    dispatch: (event: Event) => void;
}) {
    const newChronologySection: AgendaSectionByType<'chronology'> =
        copyThroughJson(currentChronologySection);

    const rowToEdit = newChronologySection.rows[rowIndex];
    assert.isDefined(rowToEdit);
    rowToEdit[side] = newValue;

    dispatch(new SectionEditEvent(newChronologySection));
}
