/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {JestLogger} from '@jest/logger';

export default function colorize(
  str: string,
  start: number,
  end: number,
): string {
  return (
    JestLogger.dim(str.slice(0, start)) +
    JestLogger.reset(str.slice(start, end)) +
    JestLogger.dim(str.slice(end))
  );
}
