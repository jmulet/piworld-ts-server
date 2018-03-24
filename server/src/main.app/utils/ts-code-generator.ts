import * as fs from 'fs';

function printParameters(parameters: TsGenParam[]): string {
    const bloc1 = parameters.filter( p => !p.optional).map( p => p.toString());
    const bloc2 = parameters.filter( p => p.optional).map( p => p.toString());
    return [...bloc1, ...bloc2].join(", ");
}

export class TsGenSource {
    private path: string;
    private imports: Array<TsGenImport>;  
    private classes: Array<TsGenClass>;
    private functions: Array<TsGenFunc>;

    constructor(path: string) {
        this.path = path;
        this.imports = new Array<TsGenImport>();
        this.classes = new Array<TsGenClass>();
        this.functions = new Array<TsGenFunc>();
    }
    addImport(tsGenImport: TsGenImport) {
        // Check if not already defined
        const found = this.imports.filter((imp) => tsGenImport.importable === imp.importable).length;
        if (found === 0) {
            this.imports.push(tsGenImport);
        } else {
            console.log("Error: TsGenSource.addImport ", tsGenImport.importable, " already imported." );
        }
    }

    addClass(tsGenClass: TsGenClass) {
        // Check if not already defined
        const found = this.classes.filter((c) => tsGenClass.name === c.name).length;
        if (found === 0) {
            this.classes.push(tsGenClass);
        } else {
            console.log("Error: TsGenSource.addClass ", tsGenClass.name, " already defined." );
        }
    }

    addFunction(tsGenFunc: TsGenFunc) {
        // Check if not already defined
        const found = this.functions.filter((c) => tsGenFunc.name === c.name).length;
        if (found === 0) {
            this.functions.push(tsGenFunc);
        } else {
            console.log("Error: TsGenSource.addFunction ", tsGenFunc.name, " already defined." );
        }
    }

    toString(): string {
        const bloc1 = this.imports.map( (imp) => imp.toString() );
        const bloc2 = this.functions.map( (c) => c.toString() + "\n" );
        const bloc3 = this.classes.map( (c) => c.toString()  + "\n" );
        const blocs = [... bloc1, ...[""], ...bloc2, ...bloc3];
        return blocs.join("\n");
    }

    save(): void {
        fs.writeFileSync(this.path, this.toString());
    }
}

export interface TsGenClassOptions {
    exportable?: boolean; 
}

export class TsGenClass {
    options: TsGenClassOptions;
    name: string;
    private declarations: TsGenDeclaration[];
    private methods: TsGenMethod[];
    private constructorDef: TsGenConstructor;
    private decorators: string[] = [];

    constructor(name: string, options?: TsGenClassOptions) {
        this.declarations = new Array<TsGenDeclaration>();
        this.methods = new Array<TsGenMethod>();
        this.name = name;
        this.options = options || {}; 
    }

    setConstructor(constructorDef: TsGenConstructor) {
        this.constructorDef = constructorDef;
    }

    addDeclaration(declaration: TsGenDeclaration) {
         // Check if not already defined
         const found = this.declarations.filter((c) => declaration.name === c.name).length;
         if (found === 0) {
             this.declarations.push(declaration);
         } else {
             console.log("Error: TsGenClass.addDeclaration ", declaration.name, " already defined." );
         }
    }

    addMethod(method: TsGenMethod) {
        // Check if not already defined
        const found = this.methods.filter((m) => method.name === m.name).length;
        if (found === 0) {
            this.methods.push(method);
        } else {
            console.log("Error: TsGenClass.addMethod ", method.name, " already defined." );
        }
   }

   addDecorator(decorator: string) {
       this.decorators.push(decorator);
   }

   toString(): string { 
        const bloc2 = [
            (this.options.exportable? "export ": "") +
            "class " + this.name + " { "
        ];
        const bloc3 = this.declarations.map((dec) => dec.toString() );
        let bloc4 = [];
        if (this.constructorDef) {
            bloc4 = [ this.constructorDef.toString() ];
        } 
        const bloc5 = this.methods.map((m) => m.toString() + "\n");
        const blocn = ["}"];

        return [...this.decorators, ...bloc2, ...bloc3, ...bloc4, ...bloc5, ...blocn].join("\n");
    }
}

export class TsGenConstructor {
    private parameters = new Array<TsGenParam>();
    private body = [];
    addParameter(param: TsGenParam) {
        // Check if not already defined
        const found = this.parameters.filter((p) => param.name === p.name).length;
        if (found === 0) {
            this.parameters.push(param);
        } else {
            console.log("Error: TsGenConstructor.addParameter ", param.name, " already defined." );
        }
    }
    addToBody(sentence: any) {
        this.body.push(sentence);
    } 
    toString() {
        const bloc1 = [ "constructor(" + printParameters(this.parameters) + ") {"
        ]; 
        
        return [...bloc1, ...this.body.map(s=>s.toString() || s), ...["}"]].join("\n");
    }
}

export class TsGenMethod {
    name: string;
    visibility: "" | "public" | "private";
    private parameters: TsGenParam[];
    private body = [];
    private decorators: string[] = [];

    constructor(name, visibility?: "" | "public" | "private") {
        this.parameters = new Array<TsGenParam>();
        this.name = name;
        this.visibility = visibility || "";
    }

    addParameter(param: TsGenParam) {
        // Check if not already defined
        const found = this.parameters.filter((p) => param.name === p.name).length;
        if (found === 0) {
            this.parameters.push(param);
        } else {
            console.log("Error: TsGenMethod.addParameter ", param.name, " already defined." );
        }
    }

    addToBody(sentence: any) {
        this.body.push(sentence);
    }

    addToDecorator(decorator: any) {
        this.decorators.push(decorator);
    }

    toString() {
        const bloc1 = [ (this.visibility? this.visibility: "") 
                        + this.name + "(" + printParameters(this.parameters) + ") {"
        ]; 
        
        return [...this.decorators, ...bloc1, ...this.body.map(s=>s.toString() || s), ...["}"]].join("\n");
    }
}

export class TsGenFunc extends TsGenMethod {
    exportable: boolean;

    constructor(name: string, visibility?: "" | "public" | "private", exportable?: boolean) {
        super(name, visibility);  
        this.exportable = exportable;
    }

    toString(): string {
         return (this.exportable? "export ": "") + super.toString();
    }
}

export class TsGenParam {
    name: string;
    type: string;
    optional: boolean;
    visibility: "" | "public" | "private"

    constructor(name: string, type?: string, optional?: boolean, visibility?: "" | "public" | "private"){
        this.name = name;
        this.type = type || "any";
        this.optional = optional;
        this.visibility = visibility || "";
    }

    toString(): string {
        return (this.visibility? (this.visibility + " "):"") + this.name + (this.optional?"?":"") + ": "+ this.type;
    }
}

export class TsGenImport {
    importable: string;
    fromSource: string;

    constructor(importable: string, fromSource: string) {
        this.importable = importable;
        this.fromSource = fromSource; 
    }

    toString(): string {
        if (this.importable.indexOf("*") >= 0) {
            return "import " + this.importable + " from '" + this.fromSource + "'"; 
        } else {
            return "import { " + this.importable + " } from '" + this.fromSource + "'"; 
        }
        
    }
}

export class TsGenDeclaration {
    name: string;
    type: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    toString(): string {
        return this.name + ": " + (this.type? this.type : "any") + ";"
    }
}