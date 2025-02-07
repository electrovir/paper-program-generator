import {css, defineElementNoInputs, html} from 'element-vir';

export const VirErrorMessage = defineElementNoInputs({
    tagName: 'vir-error-message',
    styles: css`
        :host {
            color: red;
        }
    `,
    render() {
        return html`
            <slot></slot>
        `;
    },
});
