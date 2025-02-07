import {DeclarativeElementDefinition, css, defineElement, html} from 'element-vir';
import {AgendaSection, AgendaSectionType} from '../../../data/agenda/agenda-section.js';
import {VirFont} from '../common-elements/vir-font.element.js';
import {VirChronologyPresent} from './present-sections/vir-chronology-present.element.js';
import {VirHeadingPresent} from './present-sections/vir-heading-present.element.js';
import {VirPhotosPresent} from './present-sections/vir-photos-present.element.js';
import {VirTablePresent} from './present-sections/vir-table-present.element.js';
import {VirTextPresent} from './present-sections/vir-text-present.element.js';

const sectionPresentElementByType: Readonly<{
    [SectionType in AgendaSectionType]: DeclarativeElementDefinition<
        any,
        {section: Extract<AgendaSection, {sectionType: SectionType}>}
    >;
}> = {
    chronology: VirChronologyPresent,
    heading: VirHeadingPresent,
    photos: VirPhotosPresent,
    table: VirTablePresent,
    text: VirTextPresent,
};

export const VirSectionPresent = defineElement<{section: AgendaSection}>()({
    tagName: 'vir-section-present',
    styles: css`
        * {
            width: 100%;
        }
    `,
    render({inputs}) {
        const sectionElement = sectionPresentElementByType[inputs.section.sectionType];

        const sectionInputs: {section: AgendaSection} = {section: inputs.section} as const;

        const sectionTemplate = html`
            <${sectionElement.assign(sectionInputs as any)}></${sectionElement}>
        `;

        if ('size' in inputs.section) {
            return html`
                <${VirFont.assign({size: inputs.section.size})}>${sectionTemplate}</${VirFont}>
            `;
        } else {
            return sectionTemplate;
        }
    },
});
