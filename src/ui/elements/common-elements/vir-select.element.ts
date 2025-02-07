import {assert} from '@augment-vir/assert';
import {extractEventTarget} from '@augment-vir/web';
import {defineElement, defineElementEvent, html, listen, onDomCreated, repeat} from 'element-vir';
import {VirLabel} from './vir-label.element.js';

export const VirSelect = defineElement<{
    value: string;
    options: ReadonlyArray<string>;
    label: string;
}>()({
    tagName: 'vir-select',
    events: {
        valueChange: defineElementEvent<string>(),
    },
    stateInitStatic: {
        selectElement: undefined as undefined | HTMLSelectElement,
    },
    render({inputs, dispatch, events, state, updateState}) {
        assertValidOptions(inputs.options);

        if (state.selectElement && inputs.value !== state.selectElement.value) {
            state.selectElement.value = inputs.value;
        }

        return html`
            <${VirLabel.assign({
                label: inputs.label,
            })}>
                <select
                    .value=${inputs.value}
                    ${onDomCreated((element) => {
                        assert.instanceOf(element, HTMLSelectElement);

                        updateState({
                            selectElement: element,
                        });
                    })}
                    ${listen('change', (event) => {
                        const element = extractEventTarget(event, HTMLSelectElement);

                        dispatch(new events.valueChange(element.value));
                    })}
                >
                    ${repeat(
                        inputs.options,
                        (option) => option,
                        (option) => {
                            return html`
                                <option value=${option}>${option}</option>
                            `;
                        },
                    )}
                </select>
            </${VirLabel}>
        `;
    },
});

function assertValidOptions(options: ReadonlyArray<string>) {
    const optionSet = new Set(options);
    if (optionSet.size !== options.length) {
        throw new Error('Duplicate options found.');
    }
}
