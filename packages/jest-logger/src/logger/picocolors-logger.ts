/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pc from 'picocolors';
import type {Logger} from '@jest/types';

type PicocolorsStyle = keyof typeof pc;
type PicocolorsStyleFn = (text: string) => string;

export function createPicocolorsLogger(
  styles: Array<PicocolorsStyle> = [],
): Logger.Logger {
  const fn = (msg: string) => {
    if (styles.length === 0) return msg;
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
      const styledMsg = fn(args[0]);
      // eslint-disable-next-line no-console
      console.log(styledMsg);
      return styledMsg;
    },
    get(_target: any, prop: string | symbol) {
      if (typeof prop === 'string' && prop in pc) {
        return createPicocolorsLogger([...styles, prop as PicocolorsStyle]);
      }

      return fn;
    },
  };

  return new Proxy(fn, handler) as Logger.Logger;
}

export const PicocolorsLogger = createPicocolorsLogger();
