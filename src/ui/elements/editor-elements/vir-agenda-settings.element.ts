import {copyThroughJson, getEnumTypedValues, isEnumValue} from '@augment-vir/common';
import {defineElement, html, listen} from 'element-vir';
import {AgendaConfig, PaperFill} from '../../../data/agenda/agenda-config';
import {AgendaEditEvent} from '../../events/agenda-edit.event';
import {VirCheckbox} from '../common-elements/vir-checkbox.element';
import {VirSelect} from '../common-elements/vir-select.element';

export const VirAgendaSettings = defineElement<{agendaConfig: AgendaConfig}>()({
    tagName: 'vir-agenda-settings',
    renderCallback({inputs, dispatch}) {
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
                options: getEnumTypedValues(PaperFill),
                value: inputs.agendaConfig.paperFill,
            })}
                ${listen(VirSelect.events.valueChange, (event) => {
                    mutateAgenda((newAgenda) => {
                        if (!isEnumValue(event.detail, PaperFill)) {
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
