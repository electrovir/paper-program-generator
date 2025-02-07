import {extractEventTarget} from '@augment-vir/web';
import {css, defineElement, defineElementEvent, html, listen} from 'element-vir';
import {VirLabel} from './vir-label.element.js';

export const VirTextArea = defineElement<{value: string; label: string; blockResize?: boolean}>()({
    tagName: 'vir-text-area',
    events: {
        valueChange: defineElementEvent<string>(),
    },
    hostClasses: {
        'vir-text-area-block-resize': ({inputs}) => !!inputs.blockResize,
    },
    styles: ({hostClasses}) => css`
        ${hostClasses['vir-text-area-block-resize'].selector} textarea {
            resize: none;
        }

        textarea {
            flex-grow: 1;
            font-family: monospace;
            width: 100%;
            max-width: 100%;
            min-width: 100%;
            min-height: 50px;
            box-sizing: border-box;
        }
    `,
    render({inputs, dispatch, events}) {
        return html`
            <${VirLabel.assign({
                label: inputs.label,
            })}>
                <textarea
                    .value=${inputs.value}
                    ${listen('input', (event) => {
                        const element = extractEventTarget(event, HTMLTextAreaElement);
                        dispatch(new events.valueChange(element.value));
                    })}
                ></textarea>
            </${VirLabel}>
        `;
    },
});
