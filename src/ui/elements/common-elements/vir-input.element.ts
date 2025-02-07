import {css, defineElement, defineElementEvent, html, listen} from 'element-vir';
import {ViraInput} from 'vira';
import {VirLabel} from './vir-label.element.js';

export const VirInput = defineElement<{
    value: string;
    label: string;
    omitLabelSpace?: boolean | undefined;
}>()({
    tagName: 'vir-input',
    events: {
        valueChange: defineElementEvent<string>(),
    },
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        ${VirLabel}, ${ViraInput} {
            max-width: 100%;
        }

        ${ViraInput} {
            width: 100%;
        }
    `,
    render({inputs, dispatch, events}) {
        return html`
            <${VirLabel.assign({
                label: inputs.label,
                omitLabelSpace: inputs.omitLabelSpace,
            })}>
                <${ViraInput.assign({
                    value: inputs.value,
                    placeholder: inputs.label,
                })}
                    ${listen(ViraInput.events.valueChange, (event) => {
                        dispatch(new events.valueChange(event.detail));
                    })}
                ></${ViraInput}>
            </${VirLabel}>
        `;
    },
});
