import {classMap, css, defineElement, html} from 'element-vir';
import {AgendaConfig, PageSpacing, PaperFill, PaperSize} from '../../../data/agenda/agenda-config';
import {generateFontSizes} from '../../styles/font-css-vars';
import {VirSectionPresent} from './vir-section-present.element';

export const VirAgendaPresent = defineElement<{agendaConfig: Readonly<AgendaConfig>}>()({
    tagName: 'vir-agenda-present',
    cssVars: {
        /** Directly interpolated into the CSS. Can be a comma separated list of fonts. */
        'vir-agenda-present-font': 'Times New Roman',
    },
    hostClasses: {
        'vir-agenda-present-letter': ({inputs}) =>
            inputs.agendaConfig.paperSize === PaperSize.Letter,
        'vir-agenda-present-half-sheet': ({inputs}) =>
            inputs.agendaConfig.paperFill === PaperFill.HalfSheet,
        'vir-agenda-present-full-sheet': ({inputs}) =>
            inputs.agendaConfig.paperFill === PaperFill.FullSheet,
    },
    styles: ({hostClasses, cssVars}) => css`
        :host {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            justify-content: center;
            font-family: ${cssVars['vir-agenda-present-font'].value}, serif;
            box-sizing: border-box;
        }

        .page-present {
            box-sizing: border-box;
            flex-shrink: 0;
            border: 1px solid #ccc;
            overflow: hidden;
        }

        ${VirSectionPresent} {
            max-width: 100%;
            box-sizing: border-box;
        }

        .padding-marker {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: space-between;
            border: 1px solid #ccc;
        }

        .page-present.space-start .padding-marker {
            justify-content: center;
            gap: 32px;
        }

        .page-present {
            display: flex;
        }

        ${hostClasses['vir-agenda-present-letter'].selector}${hostClasses[
            'vir-agenda-present-half-sheet'
        ].selector} .page-present {
            padding: 0.2in 0.25in 0.3in;
            width: 5.5in;
            height: 8.5in;
        }

        ${hostClasses['vir-agenda-present-letter'].selector}${hostClasses[
            'vir-agenda-present-full-sheet'
        ].selector} .page-present {
            padding: 0.3in 0.5in;
            width: 8.5in;
            height: 11in;
            ${generateFontSizes(1.4)};
        }

        .page-present.duplicate {
            display: none;
        }

        .photos {
            margin: 4px 0;
        }

        .chronology {
            margin-top: 8px;
        }

        .chronology + .heading {
            margin-top: 8px;
        }

        .text + .chronology {
            margin-top: 0;
        }

        .table + .heading {
            margin-top: 16px;
        }

        .table + .text {
            margin-top: 8px;
        }

        @media print {
            :host {
                gap: 0;
            }

            .page-present.duplicate {
                display: flex;
            }

            .padding-marker {
                border: none;
            }

            .page-present {
                border-color: transparent;
            }

            .page-present:nth-child(2n) {
                border-left-color: #f8f8f8 !important;
            }

            ${hostClasses['vir-agenda-present-half-sheet'].selector} .page-present {
                width: 50% !important;
                height: 100% !important;
            }

            ${hostClasses['vir-agenda-present-full-sheet'].selector} .page-present {
                width: 100% !important;
                height: 100% !important;
            }
        }
    `,
    renderCallback({inputs}) {
        const pageTemplates = inputs.agendaConfig.pages.map((page) => {
            const sectionTemplates = page.sections.map((section) => {
                return html`
                    <${VirSectionPresent.assign({section})}
                        class=${section.sectionType}
                    ></${VirSectionPresent}>
                `;
            });

            const duplicateCount =
                inputs.agendaConfig.paperFill === PaperFill.HalfSheet &&
                inputs.agendaConfig.duplicateForPrinting
                    ? 2
                    : 1;

            const pageTemplates = Array(duplicateCount)
                .fill(0)
                .map((value, index) => {
                    return html`
                        <section
                            class="page-present ${classMap({
                                duplicate: index > 0,
                                'space-start': page.spacing === PageSpacing.Start,
                            })}"
                        >
                            <div class="padding-marker">${sectionTemplates}</div>
                        </section>
                    `;
                });

            return pageTemplates;
        });

        return pageTemplates;
    },
});
