import {ShapeDefinition, defineShape, or} from 'object-shape-tester';
import {chronologySectionShape} from './agenda-sections/chronology.section.js';
import {headingSectionShape} from './agenda-sections/heading.section.js';
import {photosSectionShape} from './agenda-sections/photos.section.js';
import {tableSectionShape} from './agenda-sections/table.section.js';
import {textSectionShape} from './agenda-sections/text.section.js';

const possibleSections = [
    chronologySectionShape,
    headingSectionShape,
    photosSectionShape,
    tableSectionShape,
    textSectionShape,
] as const;

export const agendaSectionShape = defineShape(or(...possibleSections));

export type AgendaSection = typeof agendaSectionShape.runtimeType;

export type AgendaSectionType = AgendaSection['sectionType'];

export type AgendaSectionByType<SectionType extends AgendaSectionType> = Extract<
    AgendaSection,
    {sectionType: SectionType}
>;

export const sectionShapesByType: Readonly<{
    [SectionType in AgendaSectionType]: ShapeDefinition<
        Extract<AgendaSection, {sectionType: SectionType}>,
        true
    >;
}> = possibleSections.reduce(
    (accum, sectionShape) => {
        const sectionType: AgendaSectionType = sectionShape.defaultValue.sectionType;
        accum[sectionType] = sectionShape as any;
        return accum;
    },
    {} as {
        [SectionType in AgendaSectionType]: ShapeDefinition<
            Extract<AgendaSection, {sectionType: SectionType}>,
            true
        >;
    },
);

export const allSectionTypes: ReadonlyArray<AgendaSectionType> = possibleSections
    .map((section) => section.defaultValue.sectionType)
    .sort();

export function ensureValidAgendaSectionType(input: string): AgendaSectionType {
    if (input in sectionShapesByType) {
        return input as AgendaSectionType;
    } else {
        throw new Error(`Invalid section type received: '${input}'`);
    }
}
