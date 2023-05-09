import { isProduction } from '@/utils/get-environment';
import path from 'node:path';
import { createLogger, transports, format } from 'winston';
import { addColors, syslog } from 'winston/lib/winston/config';

type CallerModule = {
    functionName: string;
    file: string;
    line: string;
    column: string;
};

type LoggerFields = {
    [key: string]: any;
    timestamp: string;
    level: string;
    message: string;
};

/* eslint-disable unicorn/prefer-module */
const nodeModulesPath = path.resolve(__dirname, '..', '..', 'node_modules');

/*
 * This is a workaround to get the function caller, the file, the line and the
 * column.
 */
function getCallerFunction(): CallerModule | undefined {
    Error.stackTraceLimit = 20;
    const errorStack = new Error('foobar').stack!;
    const callerLine = errorStack
        .split('\n')
        .find(
            s =>
                !s.includes(nodeModulesPath) &&
                !s.includes(__dirname) &&
                s.startsWith('    at'),
        );

    if (!callerLine) {
        return undefined;
    }

    const regex =
        /at\s+(?<functionName>.+)\s+\((?<file>.+):(?<line>\d+):(?<column>\d+)\)/;
    const match = regex.exec(callerLine);

    if (!match) {
        return undefined;
    }

    const { functionName, file, line, column } = match.groups as CallerModule;
    return { functionName, file, line, column };
}
/* eslint-enable unicorn/prefer-module */

addColors(syslog.colors);

const colorizer = format.colorize();

const productionFormat = format.combine(
    format.timestamp(),
    format.printf(({ ...arguments_ }) => {
        const { timestamp, level, message, ...rest } =
            arguments_ as LoggerFields;
        const module = getCallerFunction();
        const logMessage = JSON.stringify(
            {
                timestamp,
                level,
                module,
                ...rest,
                message,
            },
            null,
            2,
        );

        return logMessage;
    }),
);

const developmentFormat = format.combine(
    format.timestamp(),
    format.printf(({ ...arguments_ }) => {
        const { timestamp, level, message, ...rest } =
            arguments_ as LoggerFields;
        const module = getCallerFunction();
        const logMessage = JSON.stringify(
            {
                timestamp,
                level,
                module,
                ...rest,
                message,
            },
            null,
            2,
        );

        return colorizer.colorize(level, logMessage);
    }),
);

const loggerConfig = isProduction
    ? {
          levels: syslog.levels,
          level: 'info',
          transports: [new transports.Console()],
          format: productionFormat,
      }
    : {
          levels: syslog.levels,
          level: 'debug',
          transports: [new transports.Console()],
          format: developmentFormat,
      };

export const logger = createLogger(loggerConfig);
