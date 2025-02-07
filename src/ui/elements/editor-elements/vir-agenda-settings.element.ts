import {check} from '@augment-vir/assert';
import {copyThroughJson, getEnumValues} from '@augment-vir/common';
import {defineElement, html, listen} from 'element-vir';
import {AgendaConfig, PaperFill} from '../../../data/agenda/agenda-config.js';
import {AgendaEditEvent} from '../../events/agenda-edit.event.js';
import {VirCheckbox} from '../common-elements/vir-checkbox.element.js';
import {VirSelect} from '../common-elements/vir-select.element.js';

export const VirAgendaSettings = defineElement<{agendaConfig: AgendaConfig}>()({
    tagName: 'vir-agenda-settings',
    render({inputs, dispatch}) {
        function mutateAgenda(
            mutateCallback: (
                newAgendaConfig: AgendaConfig,
            ) => void | undefined | AgendaConfig | false,
        ) {
            const newAgenda = copyThroughJson(inputs.agendaConfig);

            if (mutateCallback(newAgenda) === false) {
                return;
            }

            dispatch(new AgendaEditEvent(newAgenda));
        }

        return html`
            <${VirSelect.assign({
                label: 'Paper fill',
                options: getEnumValues(PaperFill),
                value: inputs.agendaConfig.paperFill,
            })}
                ${listen(VirSelect.events.valueChange, (event) => {
                    mutateAgenda((newAgenda) => {
                        if (!check.isEnumValue(event.detail, PaperFill)) {
                            return false;
                        }

                        newAgenda.paperFill = event.detail;
                        return undefined;
                    });
                })}
            ></${VirSelect}>
            <${VirCheckbox.assign({
                checked: inputs.agendaConfig.duplicateForPrinting,
                label: 'duplicate half pages',
            })}
                ${listen(VirCheckbox.events.checkedChange, (event) => {
                    mutateAgenda((newAgenda) => {
                        newAgenda.duplicateForPrinting = event.detail;
                    });
                })}
            ></${VirCheckbox}>
        `;
    },
});
