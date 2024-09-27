import localForage from 'localforage-esm';
import {ShapeDefinition, assertValidShape, defineShape} from 'object-shape-tester';
import {
    AgendaConfig,
    AgendaTemplate,
    agendaConfigShape,
    agendaTemplateShape,
} from '../data/agenda/agenda-config';

const agendaEditorStore = localForage.createInstance({
    description: 'Stores created agendas',
    name: 'agenda-editor-storage',
    storeName: 'agenda-editor-storage',
});

export enum StorageKey {
    AgendaConfig = 'stored-config',
    AgendaTemplates = 'stored-templates',
}

export type DataPerKey = {
    [StorageKey.AgendaConfig]: AgendaConfig;
    [StorageKey.AgendaTemplates]: AgendaTemplate[];
};

const shapeDefinitions: Record<StorageKey, ShapeDefinition<any, any>> = {
    [StorageKey.AgendaConfig]: agendaConfigShape,
    [StorageKey.AgendaTemplates]: defineShape([agendaTemplateShape]),
};

export async function storeEditorData<const Key extends StorageKey>(
    key: Key,
    newData: Readonly<DataPerKey[Key]>,
) {
    assertValidShape(newData, shapeDefinitions[key]);
    return await agendaEditorStore.setItem(key, newData);
}

export async function loadEditorData<const Key extends StorageKey>(key: Key): Promise<unknown> {
    return (await agendaEditorStore.getItem(key)) || agendaConfigShape.defaultValue;
}
