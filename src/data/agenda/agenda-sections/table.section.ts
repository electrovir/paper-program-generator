import {defineShape, enumShape, exact} from 'object-shape-tester';
import {FontSize} from '../../font-size';

export const tableCellShape = defineShape({
    text: '',
    isHeader: false,
});

export type TableCell = typeof tableCellShape.runTimeType;

export const tableRowShape = defineShape([tableCellShape]);

export type TableRow = typeof tableRowShape.runTimeType;

export const tableShape = defineShape([tableRowShape]);

export const tableSectionShape = defineShape({
    sectionType: exact('table'),
    rows: tableShape,
    size: enumShape(FontSize),
});
