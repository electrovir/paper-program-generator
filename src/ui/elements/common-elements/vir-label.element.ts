import {css, defineElement, html} from 'element-vir';
import {noNativeSpacing} from 'vira';

export const VirLabel = defineElement<{
    label: string;
    omitLabelSpace?: boolean | undefined;
}>()({
    tagName: 'vir-label',
    styles: css`
        :host {
            position: relative;
            display: flex;
            flex-direction: column;
            max-height: 100%;
            max-width: 100%;
            height: 100%;
            width: 100%;
        }

        p {
            ${noNativeSpacing};
        }

        label {
            display: flex;
            flex-direction: column;
            position: relative;
            max-height: 100%;
            max-width: 100%;
            height: 100%;
            width: 100%;
        }

        .slot-wrapper {
            position: relative;
            max-height: 100%;
            max-width: 100%;
            height: 100%;
            width: 100%;
        }

        .label {
            font-weight: bold;
            font-size: 0.5em;
        }
    `,
    renderCallback({inputs}) {
        return html`
            <label>
                <p class="label">
                    ${inputs.label ||
                    (inputs.omitLabelSpace
                        ? ''
                        : html`
                              &nbsp;
                          `)}
                </p>
                <div class="slot-wrapper">
                    <slot></slot>
                </div>
            </label>
        `;
    },
});
