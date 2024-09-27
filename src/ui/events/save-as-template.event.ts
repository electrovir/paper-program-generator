import {defineTypedEvent} from 'element-vir';

export const SaveAsTemplateEvent = defineTypedEvent<{name: string}>()('save-as-template');
