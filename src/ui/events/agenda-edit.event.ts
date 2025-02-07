import {defineTypedEvent} from 'element-vir';
import {AgendaConfig} from '../../data/agenda/agenda-config.js';

export const AgendaEditEvent = defineTypedEvent<AgendaConfig>()('agenda-edit');
