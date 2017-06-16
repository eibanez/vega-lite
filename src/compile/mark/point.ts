import {UnitModel} from '../unit';
import * as mixins from './mixins';

import {Config} from '../../config';
import {VgEncodeEntry} from '../../vega.schema';
import {getMarkConfig} from '../common';
import {MarkCompiler} from './base';
import * as ref from './valueref';

import {Field, FieldDef, isFieldDef, isProjection} from '../../fielddef';
import {contains, keys} from '../../util';

function encodeEntry(model: UnitModel, fixedShape?: 'circle' | 'square') {
  const {config, encoding, width, height} = model;

  return {
    ...encoding.x && isFieldDef(encoding.x) && isProjection(encoding.x) ? {
      x: {'field': `${(encoding.x as FieldDef<Field>).field as string}_geo`},
    } : mixins.pointPosition('x', model, ref.midX(width, config)),
    ...encoding.y && isFieldDef(encoding.y) && isProjection(encoding.y) ? {
      y: {'field': `${(encoding.y as FieldDef<Field>).field as string}_geo`},
    } : mixins.pointPosition('y', model, ref.midY(height, config)),
    ...mixins.nonPosition('size', model),
    ...mixins.color(model),
    ...mixins.text(model, 'tooltip'),
    ...shapeMixins(model, config, fixedShape),
    ...mixins.nonPosition('opacity', model),
  };
}

export function shapeMixins(model: UnitModel, config: Config, fixedShape?: 'circle' | 'square'): VgEncodeEntry {
  if (fixedShape) {
    return {shape: {value: fixedShape}};
  }
  return mixins.nonPosition('shape', model, {
    defaultValue: getMarkConfig('shape', 'point', config) as string
  });
}

export const point: MarkCompiler = {
  vgMark: 'symbol',
  defaultRole: 'point',
  encodeEntry: (model: UnitModel) => {
    return encodeEntry(model);
  }
};

export const circle: MarkCompiler = {
  vgMark: 'symbol',
  defaultRole: 'circle',
  encodeEntry: (model: UnitModel) => {
    return encodeEntry(model, 'circle');
  }
};

export const square: MarkCompiler = {
  vgMark: 'symbol',
  defaultRole: 'square',
  encodeEntry: (model: UnitModel) => {
    return encodeEntry(model, 'square');
  }
};
