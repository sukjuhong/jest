/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ansiEscapes = require('ansi-escapes');
import stringLength = require('string-length');
import {JestLogger} from '@jest/logger';

export function printPatternCaret(
  pattern: string,
  pipe: NodeJS.WritableStream,
): void {
  const inputText = `${JestLogger.dim(' pattern \u203A')} ${pattern}`;

  pipe.write(ansiEscapes.eraseDown);
  pipe.write(inputText);
  pipe.write(ansiEscapes.cursorSavePosition);
}

export function printRestoredPatternCaret(
  pattern: string,
  currentUsageRows: number,
  pipe: NodeJS.WritableStream,
): void {
  const inputText = `${JestLogger.dim(' pattern \u203A')} ${pattern}`;

  pipe.write(
    ansiEscapes.cursorTo(stringLength(inputText), currentUsageRows - 1),
  );
  pipe.write(ansiEscapes.cursorRestorePosition);
}
