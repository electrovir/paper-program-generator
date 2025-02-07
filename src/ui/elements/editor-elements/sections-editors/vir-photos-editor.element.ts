import {copyThroughJson, filterOutIndexes, toEnsuredNumber} from '@augment-vir/common';
import {css, defineElement, html, listen, nothing} from 'element-vir';
import {ViraImage} from 'vira';
import {AgendaSection, AgendaSectionByType} from '../../../../data/agenda/agenda-section.js';
import {SectionEditEvent} from '../../../events/section-edit.event.js';
import {VirButton} from '../../common-elements/vir-button.element.js';
import {VirInput} from '../../common-elements/vir-input.element.js';

export const VirPhotosEditor = defineElement<{
    section: AgendaSectionByType<'photos'>;
}>()({
    tagName: 'vir-photos-editor',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .photo-row {
            display: flex;
        }

        ${VirInput} {
            flex-grow: 1;
        }

        ${ViraImage} {
            max-height: 32px;
            max-width: 32px;
            min-height: 32px;
            min-width: 32px;
            align-self: flex-end;
            margin: 0 2px;
        }

        .dimensions-input {
            display: flex;
        }
    `,
    render({inputs, dispatch}) {
        if (!inputs.section.photoUrls.length) {
            const newPhotosSection: AgendaSectionByType<'photos'> = copyThroughJson(inputs.section);
            newPhotosSection.photoUrls.push('');

            dispatch(new SectionEditEvent(newPhotosSection));
            return nothing;
        }
        const rowTemplates = inputs.section.photoUrls.map((photoUrl, rowIndex) => {
            return html`
                <div class="photo-row">
                    <${VirButton.assign({
                        label: '',
                        text: 'x',
                    })}
                        ${listen('click', () => {
                            const newPhotosSection: Extract<
                                AgendaSection,
                                {sectionType: 'photos'}
                            > = copyThroughJson(inputs.section);

                            newPhotosSection.photoUrls = filterOutIndexes(
                                newPhotosSection.photoUrls,
                                [
                                    rowIndex,
                                ],
                            );

                            dispatch(new SectionEditEvent(newPhotosSection));
                        })}
                    ></${VirButton}>
                    <${ViraImage.assign({
                        imageUrl: photoUrl,
                    })}>
                        <div slot=${ViraImage.slotNames.error}></div>
                    </${ViraImage}>
                    <${VirInput.assign({
                        label: 'photo url',
                        value: photoUrl,
                    })}
                        ${listen(VirInput.events.valueChange, (event) => {
                            const newPhotosSection: Extract<
                                AgendaSection,
                                {sectionType: 'photos'}
                            > = copyThroughJson(inputs.section);

                            newPhotosSection.photoUrls[rowIndex] = event.detail;

                            dispatch(new SectionEditEvent(newPhotosSection));
                        })}
                    ></${VirInput}>
                    <${VirButton.assign({
                        label: '',
                        text: '+',
                    })}
                        ${listen('click', () => {
                            const newPhotosSection: Extract<
                                AgendaSection,
                                {sectionType: 'photos'}
                            > = copyThroughJson(inputs.section);

                            newPhotosSection.photoUrls = [
                                ...newPhotosSection.photoUrls.slice(0, rowIndex + 1),
                                '',
                                ...newPhotosSection.photoUrls.slice(rowIndex + 1),
                            ];

                            dispatch(new SectionEditEvent(newPhotosSection));
                        })}
                    ></${VirButton}>
                </div>
            `;
        });

        const dimensionsTemplate = html`
            <div class="dimensions-input">
                <${VirInput.assign({
                    label: 'width',
                    value: String(inputs.section.dimensions.width),
                })}
                    ${listen(VirInput.events.valueChange, (event) => {
                        const newPhotosSection = copyThroughJson(inputs.section);
                        newPhotosSection.dimensions.width = toEnsuredNumber(event.detail);
                        dispatch(new SectionEditEvent(newPhotosSection));
                    })}
                ></${VirInput}>
                <${VirInput.assign({
                    label: 'height',
                    value: String(inputs.section.dimensions.height),
                })}
                    ${listen(VirInput.events.valueChange, (event) => {
                        const newPhotosSection = copyThroughJson(inputs.section);
                        newPhotosSection.dimensions.height = toEnsuredNumber(event.detail);
                        dispatch(new SectionEditEvent(newPhotosSection));
                    })}
                ></${VirInput}>
            </div>
        `;

        return [
            dimensionsTemplate,
            rowTemplates,
        ];
    },
});
