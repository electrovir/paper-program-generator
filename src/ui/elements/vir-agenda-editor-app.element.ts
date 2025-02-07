import {check} from '@augment-vir/assert';
import {randomString, wrapInTry} from '@augment-vir/common';
import {asyncProp, css, defineElement, html, isAsyncError, isResolved, listen} from 'element-vir';
import {assertValidShape, isValidShape} from 'object-shape-tester';
import {LoaderAnimated24Icon, ViraIcon} from 'vira';
import {
    AgendaConfig,
    AgendaTemplate,
    agendaConfigShape,
    agendaTemplateShape,
} from '../../data/agenda/agenda-config.js';
import {StorageKey, loadEditorData, storeEditorData} from '../../services/agenda-editor-store.js';
import {setPageOrientation} from '../../util/set-page-orientation.js';
import {AgendaEditEvent} from '../events/agenda-edit.event.js';
import {SaveAsTemplateEvent} from '../events/save-as-template.event.js';
import {TemplatesEditEvent} from '../events/templates-edit.event.js';
import {VirErrorMessage} from './common-elements/vir-error-message.element.js';
import {VirAgendaEditor} from './editor-elements/vir-agenda-editor.element.js';
import {VirRawJsonEditor} from './editor-elements/vir-raw-json-editor.element.js';
import {VirAgendaPresent} from './present-elements/vir-agenda-present.element.js';

export const VirAgendaEditorApp = defineElement<{
    defaultAgendaConfig?: Readonly<AgendaConfig> | undefined;
    defaultAgendaTemplates?: ReadonlyArray<AgendaTemplate> | undefined;
}>()({
    tagName: 'vir-agenda-editor-app',
    styles: css`
        :host {
            display: flex;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
        }

        ${VirRawJsonEditor} {
            flex-grow: 1;
        }

        ${VirAgendaEditor} {
            width: 800px;
            max-width: 40%;
        }

        .presentation {
            flex-grow: 1;
            display: flex;
            position: relative;
            justify-content: center;
            overflow-y: auto;
            margin: 10px 0;
            padding: 0 32px;
        }

        .fix-error-editor {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        @media print {
            ${VirAgendaEditor} {
                display: none;
            }

            ${VirAgendaPresent} {
                height: 100%;
            }

            .presentation {
                display: block;
                overflow: visible;
                margin: 0;
                padding: 0;
            }
        }
    `,
    stateInitStatic: {
        agendaConfig: asyncProp({defaultValue: loadEditorData(StorageKey.AgendaConfig)}),
        userAgendaTemplates: asyncProp({
            defaultValue: loadEditorData(StorageKey.AgendaTemplates).then(
                (templates): AgendaTemplate[] => {
                    if (!check.isArray(templates)) {
                        return [];
                    }

                    const validTemplates: AgendaTemplate[] = templates.filter(
                        (agendaTemplate): agendaTemplate is AgendaTemplate =>
                            isValidShape(agendaTemplate, agendaTemplateShape),
                    ); /** The filter type guard isn't working. */

                    return validTemplates;
                },
            ),
        }),
    },
    render({state, inputs}) {
        if (state.agendaConfig.value == undefined || isAsyncError(state.agendaConfig.value)) {
            state.agendaConfig.setValue(inputs.defaultAgendaConfig);
        }

        if (!isResolved(state.agendaConfig.value)) {
            return html`
                <${ViraIcon.assign({
                    icon: LoaderAnimated24Icon,
                })}></${ViraIcon}>
            `;
        } else if (!isValidShape(state.agendaConfig.value, agendaConfigShape)) {
            const shapeError = wrapInTry(() =>
                assertValidShape(state.agendaConfig.value, agendaConfigShape),
            );

            console.error(shapeError);

            const error = html`
                Invalid saved config: ${shapeError?.message || ''}
                <br />
                Please edit and fix below.
            `;
            return html`
                <div class="fix-error-editor">
                    <${VirErrorMessage}>${error}</${VirErrorMessage}>
                    <${VirRawJsonEditor.assign({
                        agendaConfig: state.agendaConfig.value,
                    })}
                        ${listen(AgendaEditEvent, async (event) => {
                            state.agendaConfig.setValue(event.detail);
                            await storeEditorData(StorageKey.AgendaConfig, event.detail);
                        })}
                    ></${VirRawJsonEditor}>
                </div>
            `;
        }

        const agendaConfig: AgendaConfig = state.agendaConfig.value;

        setPageOrientation(agendaConfig.paperFill);

        const userTemplates: AgendaTemplate[] =
            isResolved(state.userAgendaTemplates.value) &&
            !isAsyncError(state.userAgendaTemplates.value)
                ? state.userAgendaTemplates.value
                : [];

        return html`
            <${VirAgendaEditor.assign({
                agendaConfig,
                defaultTemplates: inputs.defaultAgendaTemplates || [
                    agendaTemplateShape.defaultValue,
                ],
                userTemplates,
            })}
                ${listen(AgendaEditEvent, async (event) => {
                    state.agendaConfig.setValue(event.detail);
                    await storeEditorData(StorageKey.AgendaConfig, event.detail);
                })}
                ${listen(TemplatesEditEvent, async (event) => {
                    state.userAgendaTemplates.setValue(event.detail);
                    await storeEditorData(StorageKey.AgendaTemplates, event.detail);
                })}
                ${listen(SaveAsTemplateEvent, async (event) => {
                    const newTemplates: AgendaTemplate[] = [
                        ...userTemplates,
                        {
                            name: event.detail.name,
                            id: randomString(8),
                            config: agendaConfig,
                        },
                    ];

                    state.userAgendaTemplates.setValue(newTemplates);
                    await storeEditorData(StorageKey.AgendaTemplates, newTemplates);
                })}
            ></${VirAgendaEditor}>
            <div class="presentation">
                <${VirAgendaPresent.assign({
                    agendaConfig,
                })}></${VirAgendaPresent}>
            </div>
        `;
    },
});
