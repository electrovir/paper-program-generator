import {addPrefix} from '@augment-vir/common';
import {CSSResult, css} from 'element-vir';
import {isInstanceOf} from 'run-time-assertions';
import {PaperFill} from '../data/agenda/agenda-config';

const orientationStyleId = 'vir-agenda-editor-orientation-style';
const orientationStyleSelector = addPrefix({value: orientationStyleId, prefix: '#'});

const orientations: Record<PaperFill, CSSResult> = {
    [PaperFill.FullSheet]: css`portrait`,
    [PaperFill.HalfSheet]: css`landscape`,
};

export function setPageOrientation(paperFill: PaperFill) {
    const styleElement = getOrCreatePageOrientationStyle();

    styleElement.innerHTML = String(css`
        @page {
            size: ${orientations[paperFill]};
        }
    `);
}

function getOrCreatePageOrientationStyle(): HTMLStyleElement {
    const existingElement = document.head.querySelector(orientationStyleSelector);
    if (isInstanceOf(existingElement, HTMLStyleElement)) {
        return existingElement;
    }

    const newElement = document.createElement('style');
    newElement.setAttribute('id', orientationStyleId);
    document.head.appendChild(newElement);

    return newElement;
}
