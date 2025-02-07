import {assert, assertWrap, check} from '@augment-vir/assert';
import {copyThroughJson, filterOutIndexes} from '@augment-vir/common';
import {classMap, css, defineElement, html, listen, nothing} from 'element-vir';
import {AgendaSectionByType} from '../../../../../data/agenda/agenda-section.js';
import {
    TableCell,
    TableRow,
    tableCellShape,
    tableRowShape,
} from '../../../../../data/agenda/agenda-sections/table.section.js';
import {SectionEditEvent} from '../../../../events/section-edit.event.js';
import {VirButton} from '../../../common-elements/vir-button.element.js';
import {VirInput} from '../../../common-elements/vir-input.element.js';
import {VirTableSize, VirTableSizeDirection} from './vir-table-size.element.js';

export const VirTableEditor = defineElement<{
    section: AgendaSectionByType<'table'>;
}>()({
    tagName: 'vir-table-editor',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .table-row {
            display: flex;
            align-items: center;
            gap: 2px;
        }

        ${VirInput} {
            flex-basis: 0;
            flex-grow: 1;
        }

        .bold {
            font-weight: bold;
        }
    `,
    render({inputs, dispatch}) {
        const rows = inputs.section.rows;

        if (!check.isLengthAtLeast(rows, 1)) {
            const newTableSection = copyThroughJson(inputs.section);
            newTableSection.rows.push([
                {isHeader: true, text: ''},
                {isHeader: true, text: ''},
            ]);

            dispatch(new SectionEditEvent(newTableSection));
            return nothing;
        }

        const rowTemplates = rows.map((tableRow, rowIndex) => {
            const cellTemplates = tableRow.map((cell, cellIndex) => {
                return html`
                    <${VirInput.assign({
                        label: '',
                        value: cell.text,
                        omitLabelSpace: true,
                    })}
                        class=${classMap({bold: cell.isHeader})}
                        ${listen(VirInput.events.valueChange, (event) => {
                            const newTableSection = copyThroughJson(inputs.section);

                            const rowToEdit = newTableSection.rows[rowIndex];
                            assert.isDefined(rowToEdit);
                            const cellToEdit = rowToEdit[cellIndex];
                            assert.isDefined(cellToEdit);

                            cellToEdit.text = event.detail;

                            dispatch(new SectionEditEvent(newTableSection));
                        })}
                        ${listen('click', (event) => {
                            if (event.altKey) {
                                makeHeader({
                                    cellIndex,
                                    currentTableSection: inputs.section,
                                    dispatch,
                                    rowIndex,
                                });
                            }
                        })}
                    ></${VirInput}>
                `;
            });

            return html`
                <div class="table-row">
                    <${VirButton.assign({
                        label: '',
                        text: 'x',
                        omitLabelSpace: true,
                    })}
                        ${listen('click', () => {
                            const newTableSection = copyThroughJson(inputs.section);

                            newTableSection.rows = filterOutIndexes(newTableSection.rows, [
                                rowIndex,
                            ]);

                            dispatch(new SectionEditEvent(newTableSection));
                        })}
                    ></${VirButton}>
                    ${cellTemplates}
                    <${VirButton.assign({
                        label: '',
                        text: '+',
                        omitLabelSpace: true,
                    })}
                        ${listen('click', () => {
                            const newTableSection = copyThroughJson(inputs.section);

                            const newRow: TableRow = new Array(
                                assertWrap.isDefined(newTableSection.rows[0]).length,
                            )
                                .fill(0)
                                .map(() => {
                                    return {text: '', isHeader: false};
                                });

                            newTableSection.rows = [
                                ...newTableSection.rows.slice(0, rowIndex + 1),
                                newRow,
                                ...newTableSection.rows.slice(rowIndex + 1),
                            ];

                            dispatch(new SectionEditEvent(newTableSection));
                        })}
                    ></${VirButton}>
                </div>
            `;
        });

        return html`
            <${VirTableSize.assign({
                direction: VirTableSizeDirection.Horizontal,
                size: rows[0].length,
                label: 'columns',
            })}
                ${listen(VirTableSize.events.sizeChange, (event) => {
                    adjustTableSize({
                        currentTableSection: inputs.section,
                        newSize: event.detail,
                        direction: 'columns',
                        dispatch,
                    });
                })}
            ></${VirTableSize}>
            ${rowTemplates}
        `;
    },
});

function adjustTableSize({
    currentTableSection,
    newSize,
    direction,
    dispatch,
}: {
    currentTableSection: AgendaSectionByType<'table'>;
    newSize: number;
    direction: 'columns' | 'rows';
    dispatch: (event: Event) => void;
}) {
    const newTableSection = copyThroughJson(currentTableSection);

    if (
        !check.isLengthAtLeast(newTableSection.rows, 1) ||
        !check.isLengthAtLeast(newTableSection.rows[0], 1)
    ) {
        return;
    }

    const columnCount = newTableSection.rows[0].length;
    const rowCount = newTableSection.rows.length;

    if (direction === 'columns') {
        const columnDiffCount = Math.abs(columnCount - newSize);

        if (newSize === columnCount) {
            return;
        } else if (newSize > columnCount) {
            newTableSection.rows.forEach((row) => {
                new Array(columnDiffCount).fill(0).forEach(() => {
                    row.push(copyThroughJson(tableCellShape.defaultValue as TableCell));
                });
            });
        } else {
            newTableSection.rows.forEach((row) => {
                row.splice(-columnDiffCount);
            });
        }
    } else {
        const rowDiffCount = Math.abs(rowCount - newSize);

        if (newSize === rowCount) {
            return;
        } else if (newSize > rowCount) {
            const newRow = copyThroughJson(tableRowShape.defaultValue as TableRow);
            new Array(columnCount - 1).fill(0).forEach(() => {
                newRow.push(copyThroughJson(tableCellShape.defaultValue as TableCell));
            });

            new Array(rowDiffCount).fill(0).forEach(() => {
                newTableSection.rows.push(copyThroughJson(newRow));
            });
        } else {
            newTableSection.rows.splice(-rowDiffCount);
        }
    }

    dispatch(new SectionEditEvent(newTableSection));
}

function makeHeader({
    currentTableSection,
    rowIndex,
    cellIndex,
    dispatch,
}: {
    currentTableSection: AgendaSectionByType<'table'>;
    rowIndex: number;
    cellIndex: number;
    dispatch: (event: Event) => void;
}) {
    const newTableSection = copyThroughJson(currentTableSection);

    const rowToEdit = newTableSection.rows[rowIndex];
    assert.isDefined(rowToEdit);
    const cellToEdit = rowToEdit[cellIndex];
    assert.isDefined(cellToEdit);

    cellToEdit.isHeader = !cellToEdit.isHeader;

    dispatch(new SectionEditEvent(newTableSection));
}
