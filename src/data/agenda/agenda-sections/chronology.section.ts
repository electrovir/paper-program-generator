import {defineShape, enumShape, exact} from 'object-shape-tester';
import {FontSize} from '../../font-size.js';

export const chronologyRowShape = defineShape({
    left: '',
    right: '',
});

export type ChronologyRow = typeof chronologyRowShape.runtimeType;

export const chronologyTableShape = defineShape([chronologyRowShape]);

export type ChronologyTable = typeof chronologyTableShape.runtimeType;

export const chronologySectionShape = defineShape({
    sectionType: exact('chronology'),
    rows: chronologyTableShape,
    size: enumShape(FontSize),
});
