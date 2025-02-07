import {copyThroughJson} from '@augment-vir/common';
import {css, defineElement, html, listen} from 'element-vir';
import {ViraButton} from 'vira';
import {AgendaTemplate} from '../../../../data/agenda/agenda-config.js';
import {AgendaEditEvent} from '../../../events/agenda-edit.event.js';
import {SaveAsTemplateEvent} from '../../../events/save-as-template.event.js';
import {TemplatesEditEvent} from '../../../events/templates-edit.event.js';
import {VirInput} from '../../common-elements/vir-input.element.js';
import {VirAgendaTemplateEntry} from './vir-agenda-template-entry.element.js';

export const VirAgendaTemplates = defineElement<{
    userTemplates: ReadonlyArray<AgendaTemplate>;
    defaultTemplates: ReadonlyArray<AgendaTemplate>;
}>()({
    tagName: 'vir-agenda-templates',
    stateInitStatic: {
        newTemplateName: '',
    },
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .new-template-entry {
            display: flex;
            align-items: flex-end;
            gap: 8px;
        }

        .new-template-entry ${VirInput} {
            flex-grow: 1;
        }

        .templates {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
    `,
    render({state, inputs, dispatch, updateState}) {
        function modifyTemplates(callback: (newTemplates: AgendaTemplate[]) => void) {
            const newTemplates = copyThroughJson(inputs.userTemplates as AgendaTemplate[]);
            callback(newTemplates);

            dispatch(new TemplatesEditEvent(newTemplates));
        }

        const userTemplateEntries = inputs.userTemplates.map((agendaTemplate, templateIndex) => {
            return html`
                <${VirAgendaTemplateEntry.assign({
                    agendaTemplate,
                    isDefault: false,
                })}
                    ${listen(VirAgendaTemplateEntry.events.changeTemplateName, (event) => {
                        modifyTemplates((newTemplates) => {
                            const templateToEdit = newTemplates[templateIndex];

                            if (!templateToEdit) {
                                throw new Error('failed to find template to edit');
                            }

                            templateToEdit.name = event.detail;
                        });
                    })}
                    ${listen(VirAgendaTemplateEntry.events.deleteTemplate, () => {
                        modifyTemplates((newTemplates) => {
                            newTemplates.splice(templateIndex, 1);
                        });
                    })}
                    ${listen(VirAgendaTemplateEntry.events.useTemplate, () => {
                        dispatch(new AgendaEditEvent(agendaTemplate.config));
                    })}
                ></${VirAgendaTemplateEntry}>
            `;
        });
        const defaultTemplateEntries = inputs.defaultTemplates.map((agendaTemplate) => {
            return html`
                <${VirAgendaTemplateEntry.assign({
                    agendaTemplate,
                    isDefault: true,
                })}></${VirAgendaTemplateEntry}>
            `;
        });

        return html`
            <div class="new-template-entry">
                <${VirInput.assign({
                    value: state.newTemplateName,
                    label: 'Template Name',
                })}
                    ${listen(VirInput.events.valueChange, (event) => {
                        updateState({
                            newTemplateName: event.detail,
                        });
                    })}
                ></${VirInput}>
                <${ViraButton.assign({text: 'Save New Template'})}
                    title="Create a new template form the current config"
                    ${listen('click', () => {
                        dispatch(new SaveAsTemplateEvent({name: state.newTemplateName}));
                        updateState({newTemplateName: ''});
                    })}
                ></${ViraButton}>
            </div>
            <div class="templates">${defaultTemplateEntries} ${userTemplateEntries}</div>
        `;
    },
});
