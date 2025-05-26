/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as path from 'path';
import slash = require('slash');
import {JestLogger} from '@jest/logger';
import type {Config} from '@jest/types';
import relativePath from './relativePath';

export default function trimAndFormatPath(
  pad: number,
  config: Config.ProjectConfig | Config.GlobalConfig,
  testPath: string,
  columns: number,
): string {
  const maxLength = columns - pad;
  const relative = relativePath(config, testPath);
  const {basename} = relative;
  let {dirname} = relative;

  // length is ok
  if ((dirname + path.sep + basename).length <= maxLength) {
    return slash(
      JestLogger.dim(dirname + path.sep) + JestLogger.bold(basename),
    );
  }

  // we can fit trimmed dirname and full basename
  const basenameLength = basename.length;
  if (basenameLength + 4 < maxLength) {
    const dirnameLength = maxLength - 4 - basenameLength;
    dirname = `...${dirname.slice(dirname.length - dirnameLength)}`;
    return slash(
      JestLogger.dim(dirname + path.sep) + JestLogger.bold(basename),
    );
  }

  if (basenameLength + 4 === maxLength) {
    return slash(JestLogger.dim(`...${path.sep}`) + JestLogger.bold(basename));
  }

  // can't fit dirname, but can fit trimmed basename
  return slash(
    JestLogger.bold(`...${basename.slice(basename.length - maxLength - 4)}`),
  );
}
