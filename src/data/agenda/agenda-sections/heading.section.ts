import {defineShape, enumShape, exact} from 'object-shape-tester';
import {FontSize} from '../../font-size.js';

export const headingSectionShape = defineShape({
    sectionType: exact('heading'),
    title: '',
    subtitle: '',
    date: '',
    size: enumShape(FontSize),
    subtitleSize: enumShape(FontSize),
});
