import {defineShape, enumShape, exact} from 'object-shape-tester';
import {FontSize} from '../../font-size';

export enum TextAlignment {
    Center = 'center',
    Left = 'left',
    Justify = 'justify',
}

export const textSectionShape = defineShape({
    sectionType: exact('text'),
    alignment: enumShape(TextAlignment),
    text: '',
    size: enumShape(FontSize),
});
