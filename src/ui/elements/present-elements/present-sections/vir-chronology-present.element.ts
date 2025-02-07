import {css, defineElement, html} from 'element-vir';
import {AgendaSectionByType} from '../../../../data/agenda/agenda-section.js';
import {formatTextForPresentation} from '../../../../util/presentation-text.js';

export const VirChronologyPresent = defineElement<{
    section: AgendaSectionByType<'chronology'>;
}>()({
    tagName: 'vir-chronology-present',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .row {
            display: flex;
            position: relative;
            justify-content: space-between;
        }

        span {
            background-color: white;
            z-index: 10;
        }

        span:last-of-type {
            padding-left: 4px;
            text-align: end;
        }

        span:first-of-type {
            padding-right: 4px;
        }

        .dots {
            position: absolute;
            z-index: 4;
            top: 0;
            left: 0;
            width: calc(100% - 20px);
            margin: 0 10px;
            border-bottom: 2px dotted black;
            box-sizing: border-box;
            height: calc(1em - 2px);
        }
    `,
    render({inputs}) {
        const rowTemplates = inputs.section.rows.map((row) => {
            return html`
                <div class="row">
                    <span>${formatTextForPresentation(row.left)}</span>
                    <span>${formatTextForPresentation(row.right)}</span>
                    <div class="dots"></div>
                </div>
            `;
        });
        return rowTemplates;
    },
});
