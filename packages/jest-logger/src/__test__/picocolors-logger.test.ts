import pc from 'picocolors';
import {describe, expect, it} from '@jest/globals';
import {PicocolorsLogger} from '../logger/picocolors-logger';

describe('PicocolorsLogger', () => {
  it('should cover all jest logger styles', () => {
    const message = 'test message';
    expect(PicocolorsLogger.bold(message)).toBe(
      `\u001B[1m${message}\u001B[22m`,
    );
    expect(PicocolorsLogger.red(message)).toBe(
      `\u001B[31m${message}\u001B[39m`,
    );
    expect(PicocolorsLogger.dim(message)).toBe(`\u001B[2m${message}\u001B[22m`);
    expect(PicocolorsLogger.inverse(message)).toBe(
      `\u001B[7m${message}\u001B[27m`,
    );
    expect(PicocolorsLogger.yellow(message)).toBe(
      `\u001B[33m${message}\u001B[39m`,
    );
    expect(PicocolorsLogger.reset(message)).toBe(
      `\u001B[0m${message}\u001B[0m`,
    );
  });

  it('should cover chain styles', () => {
    const message = 'test message';
    expect(PicocolorsLogger.bold.yellow(message)).toBe(
      pc.bold(pc.yellow(message)),
    );
    expect(PicocolorsLogger.dim.yellow(message)).toBe(
      pc.dim(pc.yellow(message)),
    );
    expect(PicocolorsLogger.dim.yellow.reset(message)).toBe(
      pc.dim(pc.yellow(pc.reset(message))),
    );
    expect(PicocolorsLogger.dim.yellow.inverse(message)).toBe(
      pc.dim(pc.yellow(pc.inverse(message))),
    );
  });
});
