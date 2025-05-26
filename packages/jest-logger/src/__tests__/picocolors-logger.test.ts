import {describe, expect, it} from '@jest/globals';
import {createPicocolorsLogger} from '../logger/picocolors-logger';

describe('PicocolorsLogger', () => {
  it('should cover all jest logger styles', () => {
    const logger = createPicocolorsLogger();
    const message = 'test message';
    expect(logger.bold(message)).toBe(`\u001B[1m${message}\u001B[22m`);
    expect(logger.dim(message)).toBe(`\u001B[2m${message}\u001B[22m`);
    expect(logger.inverse(message)).toBe(`\u001B[7m${message}\u001B[27m`);
    expect(logger.reset(message)).toBe(`\u001B[0m${message}\u001B[0m`);
  });

  it('should cover chain styles', () => {
    const logger = createPicocolorsLogger();
    const message = 'test message';
    expect(logger.bold.yellow(message)).toBe(
      `\u001B[1m\u001B[33m${message}\u001B[39m\u001B[22m`,
    );
    expect(logger.dim.yellow(message)).toBe(
      `\u001B[2m\u001B[33m${message}\u001B[39m\u001B[22m`,
    );
    expect(logger.dim.inverse.yellow(message)).toBe(
      `\u001B[2m\u001B[7m\u001B[33m${message}\u001B[39m\u001B[27m\u001B[22m`,
    );
    expect(logger.dim.inverse.yellow.reset(message)).toBe(
      '\u001B[2m\u001B[7m\u001B[33m\u001B[0mtest message\u001B[0m\u001B[39m\u001B[27m\u001B[22m',
    );
  });

  it('should not color when noColor is true', () => {
    const logger = createPicocolorsLogger({disableStyle: true});
    const message = 'test message';
    expect(logger.yellow(message)).toBe(message);
  });
});
