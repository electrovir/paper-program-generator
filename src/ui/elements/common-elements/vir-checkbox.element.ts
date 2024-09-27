import {css, defineElement, defineElementEvent, html, listen, onDomCreated} from 'element-vir';
import {assertInstanceOf} from 'run-time-assertions';
import {VirLabel} from './vir-label.element';

export const VirCheckbox = defineElement<{
    checked: boolean;
    label: string;
    omitLabelSpace?: boolean | undefined;
}>()({
    tagName: 'vir-checkbox',
    events: {
        checkedChange: defineElementEvent<boolean>(),
    },
    styles: css`
        :host {
            display: inline-flex;
            flex-direction: column;
        }

        ${VirLabel} {
            max-width: 100%;
        }

        * {
            cursor: pointer;
        }
    `,
    stateInitStatic: {
        inputElement: undefined as undefined | HTMLInputElement,
    },
    renderCallback({inputs, dispatch, events, state, updateState}) {
        if (state.inputElement && state.inputElement.checked !== inputs.checked) {
            state.inputElement.checked = inputs.checked;
        }

        return html`
            <${VirLabel.assign({
                label: '',
                omitLabelSpace: inputs.omitLabelSpace,
            })}
                ${listen('click', () => {
                    dispatch(new events.checkedChange(!inputs.checked));
                })}
            >
                <input
                    type="checkbox"
                    .checked=${inputs.checked}
                    ${onDomCreated((element) => {
                        assertInstanceOf(element, HTMLInputElement);
                        updateState({
                            inputElement: element,
                        });
                    })}
                />
                <span>${inputs.label}</span>
            </${VirLabel}>
        `;
    },
});
