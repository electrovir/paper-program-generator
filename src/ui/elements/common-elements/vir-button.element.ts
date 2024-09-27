import {css, defineElement, html} from 'element-vir';
import {ViraButton, ViraIconSvg} from 'vira';
import {VirLabel} from './vir-label.element';

export const VirButton = defineElement<{
    text: string;
    icon?: ViraIconSvg | undefined;
    label: string;
    disabled?: boolean | undefined;
    omitLabelSpace?: boolean | undefined;
}>()({
    tagName: 'vir-button',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        ${ViraButton} {
            max-height: 100%;
        }
    `,
    renderCallback({inputs}) {
        return html`
            <${VirLabel.assign({
                label: inputs.label,
                omitLabelSpace: inputs.omitLabelSpace,
            })}>
                <${ViraButton.assign({
                    icon: inputs.icon,
                    text: inputs.text,
                    disabled: inputs.disabled,
                })}></${ViraButton}>
            </${VirLabel}>
        `;
    },
});
