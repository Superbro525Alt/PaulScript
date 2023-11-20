import * as readline from 'readline/promises';
import { readFileSync } from "fs";

import Parser from './frontend/parser';
import { createGlobalEnv } from "./runtime/enviroment";
import { evaluate } from "./runtime/interpreter";

const file = process.argv[2];

if (file) {
    let data;
    try {
        data = readFileSync(file, 'utf8');
    } catch (err) {
        console.error(err)
        // quit
        process.exit(1);
    }

    const parser = new Parser();
    const env = createGlobalEnv();

    const program = parser.produceAST(data);
    const result = evaluate(program, env);

    console.log(result);
} else {
    console.error('No file specified')
    process.exit(1);
}