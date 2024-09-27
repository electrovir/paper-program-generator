import {extractEventTarget} from '@augment-vir/browser';
import {extractErrorMessage, parseJson, wrapInTry} from '@augment-vir/common';
import {css, defineElement, html, listen, onDomCreated} from 'element-vir';
import {assertValidShape} from 'object-shape-tester';
import {assertInstanceOf} from 'run-time-assertions';
import {agendaConfigShape} from '../../../data/agenda/agenda-config';
import {AgendaEditEvent} from '../../events/agenda-edit.event';
import {VirButton} from '../common-elements/vir-button.element';
import {VirErrorMessage} from '../common-elements/vir-error-message.element';

export const VirRawJsonEditor = defineElement<{agendaConfig: unknown}>()({
    tagName: 'vir-raw-json-editor',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        textarea {
            flex-grow: 1;
            font-size: 1.2em;
            font-family: monospace;
            resize: none;
        }

        .bottom-buttons {
            display: flex;
            align-items: center;
            gap: 16px;
        }
    `,
    stateInitStatic: {
        textAreaElement: undefined as undefined | HTMLTextAreaElement,
        inputJson: '',
    },
    renderCallback({inputs, state, updateState, dispatch}) {
        const json = state.inputJson || JSON.stringify(inputs.agendaConfig, null, 4);

        const parsedJson = parseJson({
            jsonString: json,
            errorHandler() {
                return {};
            },
        });

        const configError = wrapInTry(() => assertValidShape(parsedJson, agendaConfigShape));

        return html`
            <textarea
                .value=${json}
                ${onDomCreated((element) => {
                    assertInstanceOf(element, HTMLTextAreaElement);
                    updateState({textAreaElement: element});
                })}
                ${listen('input', (event) => {
                    const element = extractEventTarget(event, HTMLTextAreaElement);
                    updateState({
                        inputJson: element.value,
                    });
                })}
            ></textarea>

            <div class="bottom-buttons">
                <${VirButton.assign({
                    label: '',
                    text: 'Save',
                    disabled: !!configError,
                    omitLabelSpace: true,
                })}
                    ${listen('click', () => {
                        assertValidShape(parsedJson, agendaConfigShape);
                        dispatch(new AgendaEditEvent(parsedJson));
                    })}
                ></${VirButton}>
                <${VirErrorMessage}>
                    ${configError
                        ? extractErrorMessage(configError)
                        : html`
                              &nbsp;
                          `}
                </${VirErrorMessage}>
            </div>
        `;
    },
});
