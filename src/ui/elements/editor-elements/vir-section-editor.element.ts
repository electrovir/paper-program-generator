import {copyThroughJson, getEnumTypedValues, isEnumValue} from '@augment-vir/common';
import {
    DeclarativeElementDefinition,
    css,
    defineElement,
    defineElementEvent,
    html,
    listen,
    nothing,
} from 'element-vir';
import {ReadonlyDeep} from 'type-fest';
import {
    AgendaSection,
    AgendaSectionType,
    allSectionTypes,
    ensureValidAgendaSectionType,
    sectionShapesByType,
} from '../../../data/agenda/agenda-section';
import {FontSize} from '../../../data/font-size';
import {SectionEditEvent} from '../../events/section-edit.event';
import {VirButton} from '../common-elements/vir-button.element';
import {VirSectionTypeHeader} from '../common-elements/vir-section-type-header.element';
import {VirSelect} from '../common-elements/vir-select.element';
import {VirTableEditor} from './sections-editors/table/vir-table-editor.element';
import {VirChronologyEditor} from './sections-editors/vir-chronology-editor.element';
import {VirHeadingEditor} from './sections-editors/vir-heading-editor.element';
import {VirPhotosEditor} from './sections-editors/vir-photos-editor.element';
import {VirTextEditor} from './sections-editors/vir-text-editor.element';

const sectionEditorElementByType: Readonly<{
    [SectionType in AgendaSectionType]: DeclarativeElementDefinition<
        any,
        {section: Extract<AgendaSection, {sectionType: SectionType}>},
        any,
        any,
        any,
        any,
        any
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
    renderCallback({inputs, dispatch, events}) {
        const sectionElementDefinition = sectionEditorElementByType[inputs.section.sectionType];

        const sectionInputs: {section: AgendaSection} = {section: inputs.section} as const;

        const fontSizeTemplate =
            'size' in inputs.section
                ? html`
                      <${VirSelect.assign({
                          label: 'size',
                          options: getEnumTypedValues(FontSize),
                          value: inputs.section.size,
                      })}
                          ${listen(VirSelect.events.valueChange, (event) => {
                              if (!('size' in inputs.section)) {
                                  return;
                              } else if (!isEnumValue(event.detail, FontSize)) {
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
                            const newAgendaSection: ReadonlyDeep<AgendaSection> = copyThroughJson(
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
