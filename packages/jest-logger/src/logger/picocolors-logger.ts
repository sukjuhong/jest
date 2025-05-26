/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createColors} from 'picocolors';
import type {Logger} from '@jest/types';

type PicocolorsStyle = keyof ReturnType<typeof createColors>;
type PicocolorsStyleFn = (text: string) => string;

interface CreatePicocolorsLoggerStates {
  disableStyle?: boolean;
  styles?: Array<PicocolorsStyle>;
}

export function createPicocolorsLogger(
  state?: CreatePicocolorsLoggerStates,
): Logger.Logger {
  const {disableStyle = false, styles = []} = state ?? {};

  const pc = createColors(!disableStyle);

  const fn = (msg: string | undefined) => {
    if (!msg) return '';
    if (disableStyle || styles.length === 0) return msg;
    return msg
      .split('\n')
      .map(line => {
        return [...styles].reverse().reduce((acc, style) => {
          const styleFn = pc[style] as PicocolorsStyleFn;
          return styleFn(acc);
        }, line);
      })
      .join('\n');
  };

  const handler = {
    apply(_target: any, _thisArg: any, args: [string]) {
      return fn(args[0]);
    },
    get(_target: any, prop: string | symbol) {
      if (prop === 'supportsColor') {
        return pc.isColorSupported;
      }

      if (typeof prop === 'string' && prop in pc) {
        return createPicocolorsLogger({
          disableStyle,
          styles: [...styles, prop as PicocolorsStyle],
        });
      }

      return undefined;
    },
  };

  return new Proxy(fn, handler) as Logger.Logger;
}

export const PicocolorsLogger = createPicocolorsLogger();
