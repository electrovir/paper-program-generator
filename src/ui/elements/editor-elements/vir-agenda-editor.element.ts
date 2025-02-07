import {css, defineElement, html, listen} from 'element-vir';
import {AgendaConfig, AgendaTemplate} from '../../../data/agenda/agenda-config.js';
import {VirAgendaTemplates} from './agenda-templates/vir-agenda-templates.element.js';
import {VirAgendaSettings} from './vir-agenda-settings.element.js';
import {EditorTab, VirEditorTabs} from './vir-editor-tabs.elements.js';
import {VirPagesEditor} from './vir-pages-editor.element.js';
import {VirRawJsonEditor} from './vir-raw-json-editor.element.js';

export const VirAgendaEditor = defineElement<{
    agendaConfig: Readonly<AgendaConfig>;
    userTemplates: ReadonlyArray<AgendaTemplate>;
    defaultTemplates: ReadonlyArray<AgendaTemplate>;
}>()({
    tagName: 'vir-agenda-editor',
    styles: css`
        :host {
            display: flex;
            padding: 0 4px 4px;
            flex-direction: column;
            gap: 12px;
            border-right: #eee solid 1px;
            height: 100%;
            box-sizing: border-box;
            overflow-y: auto;
        }

        ${VirRawJsonEditor} {
            flex-grow: 1;
        }

        ${VirEditorTabs} {
            position: sticky;
            top: 0;
            background-color: white;
            padding: 4px 0;
            z-index: 100;
        }
    `,
    stateInitStatic: {
        currentEditorTab: EditorTab.Edit,
    },
    render({inputs, state, updateState}) {
        const editorElement =
            state.currentEditorTab === EditorTab.Edit
                ? html`
                      <${VirPagesEditor.assign({
                          agendaConfig: inputs.agendaConfig,
                      })}></${VirPagesEditor}>
                  `
                : state.currentEditorTab === EditorTab.Raw
                  ? html`
                        <${VirRawJsonEditor.assign({
                            agendaConfig: inputs.agendaConfig,
                        })}></${VirRawJsonEditor}>
                    `
                  : state.currentEditorTab === EditorTab.Settings
                    ? html`
                          <${VirAgendaSettings.assign({
                              agendaConfig: inputs.agendaConfig,
                          })}></${VirAgendaSettings}>
                      `
                    : html`
                          <${VirAgendaTemplates.assign({
                              defaultTemplates: inputs.defaultTemplates,
                              userTemplates: inputs.userTemplates,
                          })}></${VirAgendaTemplates}>
                      `;

        return html`
            <${VirEditorTabs.assign({
                currentTab: state.currentEditorTab,
            })}
                ${listen(VirEditorTabs.events.tabChange, (event) => {
                    updateState({
                        currentEditorTab: event.detail,
                    });
                })}
            ></${VirEditorTabs}>
            ${editorElement}
        `;
    },
});
