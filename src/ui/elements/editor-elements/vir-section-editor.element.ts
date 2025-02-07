import {check} from '@augment-vir/assert';
import {copyThroughJson, getEnumValues} from '@augment-vir/common';
import {
    DeclarativeElementDefinition,
    css,
    defineElement,
    defineElementEvent,
    html,
    listen,
    nothing,
} from 'element-vir';
import {
    AgendaSection,
    AgendaSectionType,
    allSectionTypes,
    ensureValidAgendaSectionType,
    sectionShapesByType,
} from '../../../data/agenda/agenda-section.js';
import {FontSize} from '../../../data/font-size.js';
import {SectionEditEvent} from '../../events/section-edit.event.js';
import {VirButton} from '../common-elements/vir-button.element.js';
import {VirSectionTypeHeader} from '../common-elements/vir-section-type-header.element.js';
import {VirSelect} from '../common-elements/vir-select.element.js';
import {VirTableEditor} from './sections-editors/table/vir-table-editor.element.js';
import {VirChronologyEditor} from './sections-editors/vir-chronology-editor.element.js';
import {VirHeadingEditor} from './sections-editors/vir-heading-editor.element.js';
import {VirPhotosEditor} from './sections-editors/vir-photos-editor.element.js';
import {VirTextEditor} from './sections-editors/vir-text-editor.element.js';

const sectionEditorElementByType: Readonly<{
    [SectionType in AgendaSectionType]: DeclarativeElementDefinition<
        any,
        {section: Extract<AgendaSection, {sectionType: SectionType}>}
    >;
}> = {
    chronology: VirChronologyEditor,
    heading: VirHeadingEditor,
    photos: VirPhotosEditor,
    table: VirTableEditor,
    text: VirTextEditor,
};

export const VirSectionEditor = defineElement<{
    section: AgendaSection;
}>()({
    tagName: 'vir-section-editor',
    events: {
        sectionEdit: defineElementEvent<Readonly<AgendaSection>>(),
        newSection: defineElementEvent<AgendaSectionType>(),
        sectionDelete: defineElementEvent<void>(),
    },
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            padding: 4px 0;
        }
        .section-edit {
            display: flex;
            opacity: 0.5;
            justify-content: space-between;
        }

        .section-edit > * {
            flex-basis: 0;
        }
    `,
    render({inputs, dispatch, events}) {
        const sectionElementDefinition = sectionEditorElementByType[inputs.section.sectionType];

        const sectionInputs: {section: AgendaSection} = {section: inputs.section} as const;

        const fontSizeTemplate =
            'size' in inputs.section
                ? html`
                      <${VirSelect.assign({
                          label: 'size',
                          options: getEnumValues(FontSize),
                          value: inputs.section.size,
                      })}
                          ${listen(VirSelect.events.valueChange, (event) => {
                              if (
                                  !('size' in inputs.section) ||
                                  !check.isEnumValue(event.detail, FontSize)
                              ) {
                                  return;
                              }

                              const newSection = copyThroughJson(inputs.section);
                              newSection.size = event.detail;

                              dispatch(new events.sectionEdit(newSection));
                          })}
                      ></${VirSelect}>
                  `
                : nothing;

        return html`
            <${VirSectionTypeHeader.assign({
                section: inputs.section,
            })}></${VirSectionTypeHeader}>
            <${sectionElementDefinition.assign(sectionInputs as any)}
                ${listen(SectionEditEvent, (event) => {
                    dispatch(new events.sectionEdit(event.detail));
                })}
            ></${sectionElementDefinition}>
            <div class="section-edit">
                <${VirButton.assign({
                    text: 'x',
                    label: '',
                })}
                    ${listen('click', () => {
                        dispatch(new events.sectionDelete());
                    })}
                ></${VirButton}>
                <${VirSelect.assign({
                    label: 'type',
                    options: allSectionTypes,
                    value: inputs.section.sectionType,
                })}
                    ${listen(VirSelect.events.valueChange, (event) => {
                        const newSectionType: AgendaSectionType = ensureValidAgendaSectionType(
                            event.detail,
                        );
                        if (newSectionType !== inputs.section.sectionType) {
                            const newAgendaSection = copyThroughJson(
                                sectionShapesByType[newSectionType].defaultValue,
                            );
                            dispatch(new events.sectionEdit(newAgendaSection as AgendaSection));
                        }
                    })}
                ></${VirSelect}>
                ${fontSizeTemplate}
                <${VirButton.assign({
                    text: '+',
                    label: '',
                })}
                    ${listen('click', () => {
                        dispatch(new events.newSection(inputs.section.sectionType));
                    })}
                ></${VirButton}>
            </div>
        `;
    },
});
