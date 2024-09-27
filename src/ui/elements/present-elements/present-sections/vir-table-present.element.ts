import {HTMLTemplateResult, css, defineElement, html} from 'element-vir';
import {AgendaSectionByType} from '../../../../data/agenda/agenda-section';
import {formatTextForPresentation} from '../../../../util/presentation-text';

export const VirTablePresent = defineElement<{
    section: AgendaSectionByType<'table'>;
}>()({
    tagName: 'vir-table-present',
    styles: css`
        :host {
            display: flex;
            justify-content: center;
            width: 100%;
        }

        table {
            max-width: 100%;
        }

        th {
            text-align: left;
        }

        th,
        td {
            vertical-align: top;
            padding: 4px;
            white-space: nowrap;
        }
    `,
    renderCallback({inputs}) {
        const rows = inputs.section.rows.map((row) => {
            const cells = row.map((cell) => {
                const content: HTMLTemplateResult = formatTextForPresentation(cell.text);

                if (cell.isHeader) {
                    return html`
                        <th>${content}</th>
                    `;
                } else {
                    return html`
                        <td>${content}</td>
                    `;
                }
            });

            return html`
                <tr>${cells}</tr>
            `;
        });

        return html`
            <table><tbody>${rows}</tbody></table>
        `;
    },
});
