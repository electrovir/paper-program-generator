import {defineTypedEvent} from 'element-vir';
import {AgendaTemplate} from '../../data/agenda/agenda-config.js';

export const TemplatesEditEvent = defineTypedEvent<AgendaTemplate[]>()('templates-edit');
