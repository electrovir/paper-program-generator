import {css, defineElement, html} from 'element-vir';
import {noNativeSpacing} from 'vira';
import {AgendaSection} from '../../../data/agenda/agenda-section.js';

export const VirSectionTypeHeader = defineElement<{
    section: Pick<AgendaSection, 'sectionType'>;
}>()({
    tagName: 'vir-section-type-header',
    styles: css`
        :host {
            display: block;
        }

        h4 {
            ${noNativeSpacing};
        }
    `,
    render({inputs}) {
        return html`
            <h4>${inputs.section.sectionType}</h4>
        `;
    },
});
