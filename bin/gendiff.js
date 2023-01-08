#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')


  .description('Compares two configuration files and shows a difference.')

//  .action((str, options) => {
//    const limit = options.first ? 1 : undefined;
//    console.log(str.split(options.separator, limit));
//  });

program.parse();