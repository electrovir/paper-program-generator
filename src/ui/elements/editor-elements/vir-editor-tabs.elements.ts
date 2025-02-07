import {getEnumValues} from '@augment-vir/common';
import {css, defineElement, defineElementEvent, html, listen} from 'element-vir';
import {VirButton} from '../common-elements/vir-button.element.js';

export enum EditorTab {
    Edit = 'edit',
    Raw = 'raw',
    Templates = 'templates',
    Settings = 'settings',
}

export const VirEditorTabs = defineElement<{currentTab: EditorTab}>()({
    tagName: 'vir-editor-tabs',
    styles: css`
        :host {
            display: flex;
        }
    `,
    events: {
        tabChange: defineElementEvent<EditorTab>(),
    },
    render({inputs, events, dispatch}) {
        const tabTemplates = getEnumValues(EditorTab).map((tab) => {
            return html`
                <${VirButton.assign({
                    label: '',
                    text: tab,
                    disabled: inputs.currentTab === tab,
                    omitLabelSpace: true,
                })}
                    ${listen('click', () => {
                        dispatch(new events.tabChange(tab));
                    })}
                ></${VirButton}>
            `;
        });
        return tabTemplates;
    },
});
