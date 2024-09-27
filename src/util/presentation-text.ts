import {HTMLTemplateResult, html, unsafeHTML} from 'element-vir';

export function formatTextForPresentation(input: string): HTMLTemplateResult {
    return html`
        ${unsafeHTML(input.replace(/\\n /g, '<br>&nbsp;').replace(/\\n/g, '<br>'))}
    `;
}
