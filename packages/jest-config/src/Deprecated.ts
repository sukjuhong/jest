/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {JestLogger} from '@jest/logger';
import type {DeprecatedOptions} from 'jest-validate';

function formatDeprecation(message: string): string {
  const lines = [
    message.replaceAll(/\*(.+?)\*/g, (_, s) => JestLogger.bold(`"${s}"`)),
    '',
    'Please update your configuration.',
  ];
  return lines.map(s => `  ${s}`).join('\n');
}

const deprecatedOptions: DeprecatedOptions = {
  browser: () =>
    `  Option ${JestLogger.bold(
      '"browser"',
    )} has been deprecated. Please install "browser-resolve" and use the "resolver" option in Jest configuration as shown in the documentation: https://jestjs.io/docs/configuration#resolver-string`,

  collectCoverageOnlyFrom: (_options: {
    collectCoverageOnlyFrom?: Record<string, boolean>;
  }) => `  Option ${JestLogger.bold(
    '"collectCoverageOnlyFrom"',
  )} was replaced by ${JestLogger.bold('"collectCoverageFrom"')}.

    Please update your configuration.`,

  extraGlobals: (_options: {
    extraGlobals?: string;
  }) => `  Option ${JestLogger.bold(
    '"extraGlobals"',
  )} was replaced by ${JestLogger.bold('"sandboxInjectedGlobals"')}.

  Please update your configuration.`,

  init: () =>
    `  Option ${JestLogger.bold(
      '"init"',
    )} has been deprecated. Please use "create-jest" package as shown in the documentation: https://jestjs.io/docs/getting-started#generate-a-basic-configuration-file`,

  moduleLoader: (_options: {
    moduleLoader?: string;
  }) => `  Option ${JestLogger.bold(
    '"moduleLoader"',
  )} was replaced by ${JestLogger.bold('"runtime"')}.

  Please update your configuration.`,

  preprocessorIgnorePatterns: (_options: {
    preprocessorIgnorePatterns?: Array<string>;
  }) => `  Option ${JestLogger.bold(
    '"preprocessorIgnorePatterns"',
  )} was replaced by ${JestLogger.bold(
    '"transformIgnorePatterns"',
  )}, which support multiple preprocessors.

  Please update your configuration.`,

  scriptPreprocessor: (_options: {
    scriptPreprocessor?: string;
  }) => `  Option ${JestLogger.bold(
    '"scriptPreprocessor"',
  )} was replaced by ${JestLogger.bold(
    '"transform"',
  )}, which support multiple preprocessors.

  Please update your configuration.`,

  setupTestFrameworkScriptFile: (_options: {
    setupTestFrameworkScriptFile?: string;
  }) => `  Option ${JestLogger.bold(
    '"setupTestFrameworkScriptFile"',
  )} was replaced by configuration ${JestLogger.bold(
    '"setupFilesAfterEnv"',
  )}, which supports multiple paths.

  Please update your configuration.`,

  testPathDirs: (_options: {
    testPathDirs?: Array<string>;
  }) => `  Option ${JestLogger.bold('"testPathDirs"')} was replaced by ${JestLogger.bold(
    '"roots"',
  )}.

  Please update your configuration.
  `,

  testPathPattern: () =>
    formatDeprecation(
      'Option *testPathPattern* was replaced by *testPathPatterns*.',
    ),

  testURL: (_options: {testURL?: string}) => `  Option ${JestLogger.bold(
    '"testURL"',
  )} was replaced by passing the URL via ${JestLogger.bold(
    '"testEnvironmentOptions.url"',
  )}.

  Please update your configuration.`,

  timers: (_options: {timers?: string}) => `  Option ${JestLogger.bold(
    '"timers"',
  )} was replaced by ${JestLogger.bold('"fakeTimers"')}.

  Please update your configuration.`,
};

export default deprecatedOptions;
