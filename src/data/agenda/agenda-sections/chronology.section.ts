import {defineShape, enumShape, exact} from 'object-shape-tester';
import {FontSize} from '../../font-size';

export const chronologyRowShape = defineShape({
    left: '',
    right: '',
});

export type ChronologyRow = typeof chronologyRowShape.runTimeType;

export const chronologyTableShape = defineShape([chronologyRowShape]);

export type ChronologyTable = typeof chronologyTableShape.runTimeType;

export const chronologySectionShape = defineShape({
    sectionType: exact('chronology'),
    rows: chronologyTableShape,
    size: enumShape(FontSize),
});
