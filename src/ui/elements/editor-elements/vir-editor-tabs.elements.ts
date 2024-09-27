import {getEnumTypedValues} from '@augment-vir/common';
import {css, defineElement, defineElementEvent, html, listen} from 'element-vir';
import {VirButton} from '../common-elements/vir-button.element';

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
    renderCallback({inputs, events, dispatch}) {
        const tabTemplates = getEnumTypedValues(EditorTab).map((tab) => {
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
