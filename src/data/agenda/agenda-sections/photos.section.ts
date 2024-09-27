import {defineShape, exact} from 'object-shape-tester';

export const photosSectionShape = defineShape({
    sectionType: exact('photos'),
    dimensions: {
        width: 100,
        height: 100,
    },
    photoUrls: [''],
});
