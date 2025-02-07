import {defineTypedEvent} from 'element-vir';
import {AgendaSection} from '../../data/agenda/agenda-section.js';

export const SectionEditEvent = defineTypedEvent<AgendaSection>()('section-edit');
