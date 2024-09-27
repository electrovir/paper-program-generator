import {
    copyThroughJson,
    filterOutIndexes,
    getEnumTypedValues,
    isEnumValue,
} from '@augment-vir/common';
import {css, defineElement, html, listen, nothing} from 'element-vir';
import {assertDefined} from 'run-time-assertions';
import {
    AgendaConfig,
    AgendaPage,
    PageSpacing,
    agendaPageShape,
} from '../../../data/agenda/agenda-config';
import {
    AgendaSection,
    ensureValidAgendaSectionType,
    sectionShapesByType,
} from '../../../data/agenda/agenda-section';
import {AgendaEditEvent} from '../../events/agenda-edit.event';
import {VirButton} from '../common-elements/vir-button.element';
import {VirSelect} from '../common-elements/vir-select.element';
import {VirSectionEditor} from './vir-section-editor.element';

export const VirPagesEditor = defineElement<{agendaConfig: AgendaConfig}>()({
    tagName: 'vir-pages-editor',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 64px;
        }

        ${VirSectionEditor} + ${VirSectionEditor} {
            border-top: 2px solid dodgerblue;
        }

        .page-editor {
            display: flex;
            flex-direction: column;
        }

        .page-controls {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 2px solid #ccc;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    `,
    renderCallback({inputs, dispatch}) {
        function mutateAgendaConfig(
            mutateCallback: (newAgendaConfig: AgendaConfig) => void | AgendaConfig,
        ) {
            const newAgendaConfig = copyThroughJson(inputs.agendaConfig);
            mutateCallback(newAgendaConfig);

            dispatch(new AgendaEditEvent(newAgendaConfig));
        }

        if (!inputs.agendaConfig.pages.length) {
            mutateAgendaConfig((newAgendaConfig) => {
                newAgendaConfig.pages.push(
                    copyThroughJson(agendaPageShape.defaultValue as AgendaPage),
                );
            });
            return nothing;
        }

        const pageTemplates = inputs.agendaConfig.pages.map((page, pageIndex) => {
            const sectionEditorTemplates = page.sections.map((section, sectionIndex) => {
                return html`
                    <${VirSectionEditor.assign({
                        section,
                    })}
                        ${listen(VirSectionEditor.events.sectionEdit, (event) => {
                            mutateAgendaConfig((newAgendaConfig) => {
                                const editedPage = newAgendaConfig.pages[pageIndex];
                                assertDefined(editedPage);

                                editedPage.sections[sectionIndex] = event.detail;
                            });
                        })}
                        ${listen(VirSectionEditor.events.newSection, (event) => {
                            mutateAgendaConfig((newAgendaConfig) => {
                                const editedPage = newAgendaConfig.pages[pageIndex];
                                assertDefined(editedPage);

                                const newSection = copyThroughJson(
                                    sectionShapesByType[ensureValidAgendaSectionType(event.detail)]
                                        .defaultValue as AgendaSection,
                                );

                                const newSections = [
                                    ...editedPage.sections.slice(0, sectionIndex + 1),
                                    newSection,
                                    ...editedPage.sections.slice(sectionIndex + 1),
                                ];

                                editedPage.sections = newSections;
                            });
                        })}
                        ${listen(VirSectionEditor.events.sectionDelete, () => {
                            mutateAgendaConfig((newAgendaConfig) => {
                                const editedPage = newAgendaConfig.pages[pageIndex];
                                assertDefined(editedPage);
                                const newSections = filterOutIndexes(editedPage?.sections, [
                                    sectionIndex,
                                ]);

                                editedPage.sections = newSections;
                            });
                        })}
                    ></${VirSectionEditor}>
                `;
            });

            return html`
                <section class="page-editor">
                    ${sectionEditorTemplates}
                    <div class="page-controls">
                        <${VirButton.assign({
                            label: '',
                            omitLabelSpace: true,
                            text: 'x',
                        })}
                            ${listen('click', () => {
                                mutateAgendaConfig((newAgendaConfig) => {
                                    newAgendaConfig.pages = filterOutIndexes(
                                        newAgendaConfig.pages,
                                        [
                                            pageIndex,
                                        ],
                                    );
                                });
                            })}
                        ></${VirButton}>
                        <${VirSelect.assign({
                            label: 'spacing',
                            options: getEnumTypedValues(PageSpacing),
                            value: page.spacing,
                        })}
                            ${listen(VirSelect.events.valueChange, (event) => {
                                mutateAgendaConfig((newAgendaConfig) => {
                                    const pageToEdit = newAgendaConfig.pages[pageIndex];
                                    assertDefined(pageToEdit);
                                    if (!isEnumValue(event.detail, PageSpacing)) {
                                        throw new Error(
                                            `Invalid page spacing selected: '${event.detail}'`,
                                        );
                                    }
                                    pageToEdit.spacing = event.detail;
                                });
                            })}
                        ></${VirSelect}>
                        Page ${pageIndex + 1}
                        <${VirButton.assign({
                            label: '',
                            omitLabelSpace: true,
                            text: '+',
                        })}
                            ${listen('click', () => {
                                mutateAgendaConfig((newAgendaConfig) => {
                                    newAgendaConfig.pages.push(
                                        copyThroughJson(agendaPageShape.defaultValue as AgendaPage),
                                    );
                                });
                            })}
                        ></${VirButton}>
                    </div>
                </section>
            `;
        });

        return pageTemplates;
    },
});
