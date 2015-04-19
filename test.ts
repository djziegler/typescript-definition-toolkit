/**
 * Tests for the typescript-definition-parser
 *
 */
/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./typescript_definition.d.ts" />
"use strict";

import nodeunit = require("nodeunit");
import toolkit = require("./TypeScriptDefinitionToolkit");

function roundTrip(test: nodeunit.Test, text: string): void {
  try {
    const defs = toolkit.parse(text);
    console.log(JSON.stringify(defs));
    console.log("-IN---------------------------------------------------------");
    console.log(text);
    console.log("-OUT--------------------------------------------------------");
    console.log(toolkit.listToString(defs));
    console.log("------------------------------------------------------------");
    // const newText = toolkit.toString(defs);
    // test.equal(newText, text);
  } catch(e) {
    console.log("------------------------------------------------------------");
    console.log("Failed to parse input: ");
    console.log(text);
    console.log("----------");
    console.log(e);
    test.equals(false, true, "Exception thrown during parse.");
    test.done();
    return;
  }
  test.equals(true, true, "");
  test.done();
}

export function testEmpty(test: nodeunit.Test): void {
  roundTrip(test, "");
}

export function testComment(test: nodeunit.Test): void {
  roundTrip(test, `// A line comment
`);
}

export function test2Comment(test: nodeunit.Test): void {
  roundTrip(test, `// A line comment 1

// A line comment 2
`);
}

export function testMultiComment(test: nodeunit.Test): void {
  roundTrip(test, `/*  Red fish,
  Blue fish,
  one fish,
  two fish
*/
`);
}

export function testExport(test: nodeunit.Test): void {
  roundTrip(test, `export = Foobar;
`);
}

export function testAmbientModule(test: nodeunit.Test): void {
  roundTrip(test, `declare module FooBarMod {
    
  }
`);
}

export function testAmbientModule2(test: nodeunit.Test): void {
  roundTrip(test, `declare module FooBarMod {
    
  }
`);
}

export function testImport(test: nodeunit.Test): void {
  roundTrip(test, `import otherModule = require('otherModule');`);
}

export function testInterface(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz extends smeg.Foo{
    }
`);
}

export function testInterface2(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      aMethod(): void;
      
      // Just a comment
      
      anotherMethod(): void;
    }
`);
}

export function testInterface3(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      aMethod(): void;
      anotherMethod(): void;
      // Just a comment
    }
`);
}

export function testInterface4(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      // Just a comment
      // Just a comment
      aMethod(): void;
      anotherMethod(): void;
      // Just a comment
      // Just a comment
    }
`);
}

export function testTuple(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
    	pair: [string, number];
    }    
`);
}

export function testGenerics(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz<T,X> {
    	pair(): T;
      xxor(): X;
    }    
`);
}

export function testGenerics2(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
    	pair<T,X>(x: X): T;
    }    
`);
}

export function testInterfaceMethod(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      bop();
    }
`);
}

export function testInterfaceMethod2(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      bop();
      pop();
    }
`);
}

export function testInterfaceMethod2Args(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      bop(times, message);
    }
`);
}

export function testInterfaceMethod3(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      bop(times: number): void;
    }
`);
}

export function testInterfaceMethod4(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      bop(times?: number): void;
    }
`);
}

export function testInterfaceMethod5(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      bop(...times: number[]): void;
    }
`);
}

export function testInterfaceNew(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      new();
    }
`);
}

export function testInterfaceNew2(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      new(baz);
    }
`);
}

export function testInterfaceNew3(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      new(baz?);
    }
`);
}

export function testInterfaceNew4(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      new(baz?: number);
    }
`);
}

export function testInterfaceDefault(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      ();
    }
`);
}

export function testInterfaceDefault2(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      (baz);
    }
`);
}

export function testInterfaceDefault3(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      (baz?);
    }
`);
}

export function testInterfaceDefault4(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      (baz?: number);
    }
`);
}

export function testInterfaceIndex(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      [i: number]: string;
    }
`);
}

export function testInterfaceIndex2(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
      [i: string]: string;
    }
`);
}

export function testTypeAlias(test: nodeunit.Test): void {
  roundTrip(test, `type foo = bar;`);
}

export function testImportDeclaration(test: nodeunit.Test): void {
  roundTrip(test, `import foo = bar;`);
}

export function testAmbientFunction(test: nodeunit.Test): void {
  roundTrip(test, `declare function bop(times: number): void;`);
}

export function testAmbientFunction2(test: nodeunit.Test): void {
  roundTrip(test, `declare function bop(times, blah?): void;`);
}

export function testAmbientFunction3(test: nodeunit.Test): void {
  roundTrip(test, `declare function bop(times, blah?: number): void;`);
}

export function testAmbientFunction4(test: nodeunit.Test): void {
  roundTrip(test, `declare function bop(blah?: number);`);
}

export function testDeclareModule(test: nodeunit.Test): void {
  roundTrip(test, `declare module 'foo' {

}`);
}

export function testCommentsInsideModule(test: nodeunit.Test): void {
  roundTrip(test, `declare module 'foo' {
  // This is just a comment.
}`);
}

export function testOptionalParameters(test: nodeunit.Test): void {
  roundTrip(test, `
  declare module 'foobar' {
  	interface Test {
  		baz(block: any, error?: any, message?: string): void;
  	}
  }
`);
}

export function testTypeRefInBrackets(test: nodeunit.Test): void {
  roundTrip(test, `
    export interface Baz {
    	(callback: Test): void;
    }    
`);
}

export function testArrow(test: nodeunit.Test): void {
  roundTrip(test, `export interface Foo {
    baz: () => void;
  }
`);
}
