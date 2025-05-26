/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Color =
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white';

export type Style = Color | 'dim' | 'bold' | 'reset' | 'inverse';

export type Logger = {[K in Style]: Logger} & ((msg: string) => string);
