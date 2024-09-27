import {css, defineElement, html, nothing} from 'element-vir';
import {noNativeSpacing} from 'vira';
import {AgendaSectionByType} from '../../../../data/agenda/agenda-section';
import {VirFont} from '../../common-elements/vir-font.element';

export const VirHeadingPresent = defineElement<{
    section: AgendaSectionByType<'heading'>;
}>()({
    tagName: 'vir-heading-present',
    hostClasses: {
        'vir-heading-present-with-time': ({inputs}) => !!inputs.section.date,
    },
    styles: ({hostClasses}) => css`
        :host {
            display: flex;
            align-items: baseline;
            gap: 0.5em;
            justify-content: center;
        }

        ${hostClasses['vir-heading-present-with-time'].selector} {
            align-items: center;
        }

        * {
            ${noNativeSpacing};
        }

        h1 {
            font-size: 1em;
        }

        h2 {
            font-size: 1em;
            font-weight: normal;
        }
    `,
    renderCallback({inputs}) {
        const subtitleTemplate = inputs.section.subtitle
            ? html`
                  <h2>${inputs.section.subtitle}</h2>
              `
            : nothing;

        const titleTemplate = inputs.section.title
            ? html`
                  <h1>${inputs.section.title}</h1>
              `
            : nothing;

        const dateTemplate = inputs.section.date
            ? html`
                  <h2>${inputs.section.date}</h2>
              `
            : nothing;

        return html`
            ${titleTemplate}
            <${VirFont.assign({size: inputs.section.subtitleSize})}>
                ${subtitleTemplate}${dateTemplate}
            </${VirFont}>
        `;
    },
});
