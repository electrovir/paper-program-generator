import {defineShape, enumShape} from 'object-shape-tester';
import {agendaSectionShape} from './agenda-section.js';

export enum PaperFill {
    HalfSheet = 'half-sheet',
    FullSheet = 'full-sheet',
}

export enum PaperSize {
    /** 8.5" x 11" */
    Letter = 'letter',
}

export enum PageSpacing {
    Fill = 'fill',
    Start = 'start',
}

export const agendaPageShape = defineShape({
    spacing: enumShape(PageSpacing),
    sections: [agendaSectionShape],
});

export type AgendaPage = typeof agendaPageShape.runtimeType;

export const agendaConfigShape = defineShape({
    pages: [agendaPageShape],
    paperFill: enumShape(PaperFill),
    paperSize: enumShape(PaperSize),
    duplicateForPrinting: false,
});

export type AgendaConfig = typeof agendaConfigShape.runtimeType;

export const agendaTemplateShape = defineShape({
    id: 'random string',
    name: 'template name',
    config: agendaConfigShape,
});

export type AgendaTemplate = typeof agendaTemplateShape.runtimeType;
