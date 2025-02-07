import {defineShape, enumShape, exact} from 'object-shape-tester';
import {FontSize} from '../../font-size.js';

export const tableCellShape = defineShape({
    text: '',
    isHeader: false,
});

export type TableCell = typeof tableCellShape.runtimeType;

export const tableRowShape = defineShape([tableCellShape]);

export type TableRow = typeof tableRowShape.runtimeType;

export const tableShape = defineShape([tableRowShape]);

export const tableSectionShape = defineShape({
    sectionType: exact('table'),
    rows: tableShape,
    size: enumShape(FontSize),
});
