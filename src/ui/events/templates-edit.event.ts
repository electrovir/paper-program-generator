import {defineTypedEvent} from 'element-vir';
import {AgendaTemplate} from '../../data/agenda/agenda-config';

export const TemplatesEditEvent = defineTypedEvent<AgendaTemplate[]>()('templates-edit');
