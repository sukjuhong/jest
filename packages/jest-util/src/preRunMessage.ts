/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {WriteStream} from 'tty';
import {JestLogger} from '@jest/logger';
import clearLine from './clearLine';
import isInteractive from './isInteractive';

export function print(stream: WriteStream): void {
  if (isInteractive) {
    stream.write(JestLogger.bold.dim('Determining test suites to run...'));
  }
}

export function remove(stream: WriteStream): void {
  if (isInteractive) {
    clearLine(stream);
  }
}
