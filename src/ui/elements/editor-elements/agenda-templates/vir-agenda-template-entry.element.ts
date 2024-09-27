import {classMap, css, defineElement, defineElementEvent, html, listen} from 'element-vir';
import {
    CloseX24Icon,
    Options24Icon,
    ViraButton,
    ViraIcon,
    ViraInput,
    noNativeFormStyles,
} from 'vira';
import {AgendaTemplate} from '../../../../data/agenda/agenda-config';

export const VirAgendaTemplateEntry = defineElement<{
    agendaTemplate: Readonly<AgendaTemplate>;
    isDefault: boolean;
}>()({
    tagName: 'vir-agenda-template-entry',
    stateInitStatic: {
        isEditing: false,
    },
    hostClasses: {
        'vir-agenda-template-entry-disabled': ({inputs}) => inputs.isDefault,
    },
    events: {
        useTemplate: defineElementEvent<void>(),
        deleteTemplate: defineElementEvent<void>(),
        changeTemplateName: defineElementEvent<string>(),
    },
    styles: ({hostClasses}) => css`
        :host {
            display: flex;
            gap: 8px;
        }

        ${hostClasses['vir-agenda-template-entry-disabled'].selector} .icons {
            visibility: hidden;
        }

        .icons {
            display: flex;
            align-items: center;
            align-self: stretch;
        }

        .delete:hover {
            color: red;
        }

        .use:hover {
            color: dodgerblue;
        }

        button {
            ${noNativeFormStyles};
            cursor: pointer;
            color: #999;
            display: flex;
            align-items: center;
        }

        ${ViraInput} {
            flex-grow: 1;
        }

        .template-name {
            flex-grow: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 1.5em;
        }
    `,
    renderCallback({state, inputs, updateState, dispatch, events}) {
        const iconTemplates = [
            {
                icon: Options24Icon,
                action: () => {
                    updateState({
                        isEditing: !state.isEditing,
                    });
                },
                title: 'Edit template name',
                htmlClass: 'use',
                isDisabled: inputs.isDefault,
            },
            {
                icon: CloseX24Icon,
                action: () => {
                    dispatch(new events.deleteTemplate());
                },
                title: 'Delete this template',
                htmlClass: 'delete',
                isDisabled: inputs.isDefault,
            },
        ].map((icon) => {
            return html`
                <button
                    class=${classMap({
                        'disabled-icon': icon.isDisabled,
                        [icon.htmlClass]: true,
                    })}
                >
                    <${ViraIcon.assign({
                        icon: icon.icon,
                    })}
                        title=${icon.title}
                        ${listen('click', () => {
                            if (!icon.isDisabled) {
                                icon.action();
                            }
                        })}
                    ></${ViraIcon}>
                </button>
            `;
        });

        const nameTemplate = state.isEditing
            ? html`
                  <${ViraInput.assign({value: inputs.agendaTemplate.name})}
                      ${listen(ViraInput.events.valueChange, (event) => {
                          dispatch(new events.changeTemplateName(event.detail));
                      })}
                  ></${ViraInput}>
              `
            : html`
                  <div class="template-name">${inputs.agendaTemplate.name}</div>
              `;

        return html`
            ${nameTemplate}
            <${ViraButton.assign({text: 'Use'})}
                ${listen('click', () => {
                    dispatch(new events.useTemplate());
                })}
            ></${ViraButton}>
            <div class="icons">${iconTemplates}</div>
        `;
    },
});
