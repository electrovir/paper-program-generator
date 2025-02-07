import {css, defineElement, defineElementEvent, html, listen} from 'element-vir';
import {VirButton} from '../../../common-elements/vir-button.element.js';
import {VirLabel} from '../../../common-elements/vir-label.element.js';

export enum VirTableSizeDirection {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export const VirTableSize = defineElement<{
    size: number;
    direction: VirTableSizeDirection;
    label: string;
}>()({
    tagName: 'vir-table-size',
    events: {
        sizeChange: defineElementEvent<number>(),
    },
    hostClasses: {
        'vir-table-size-vertical': ({inputs}) =>
            inputs.direction === VirTableSizeDirection.Vertical,
    },
    styles: ({hostClasses}) => css`
        .controls-wrapper {
            display: flex;
            justify-content: space-between;
        }

        ${hostClasses['vir-table-size-vertical'].selector} .controls-wrapper {
            flex-direction: column;
            height: 100%;
        }

        ${hostClasses['vir-table-size-vertical'].selector} ${VirLabel} {
            height: 100%;
        }

        * {
            flex-basis: 0;
        }

        .size {
            font-family: monospace;
            margin: auto;
            font-size: 2em;
        }
    `,
    render({inputs, dispatch, events}) {
        return html`
            <${VirLabel.assign({
                label: inputs.label,
            })}>
                <div class="controls-wrapper">
                    <${VirButton.assign({
                        label: '',
                        text: inputs.direction === VirTableSizeDirection.Horizontal ? '◀' : '▲',
                        omitLabelSpace: true,
                    })}
                        ${listen('click', () => {
                            dispatch(new events.sizeChange(inputs.size - 1));
                        })}
                    ></${VirButton}>
                    <span class="size">${inputs.size}</span>
                    <${VirButton.assign({
                        label: '',
                        text: inputs.direction === VirTableSizeDirection.Horizontal ? '▶' : '▼',
                        omitLabelSpace: true,
                    })}
                        ${listen('click', () => {
                            dispatch(new events.sizeChange(inputs.size + 1));
                        })}
                    ></${VirButton}>
                </div>
            </${VirLabel}>
        `;
    },
});
