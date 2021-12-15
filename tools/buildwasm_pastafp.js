const ModuleBuilder = require("wasmbuilder").ModuleBuilder;
const buildPastaFp = require("../src/pasta/build_pastafp.js");
const fs = require("fs");
const path = require("path");

function buildWasm() {
    const moduleBuilder = new ModuleBuilder();
    moduleBuilder.setMemory(25);
    buildPastaFp(moduleBuilder);

    const code = moduleBuilder.build();

    fs.writeFileSync(
        path.join( __dirname, "..", "build", "pastafp_wasm.js"),
        `
            exports.code = "${Buffer.from(code).toString("base64")}";
            exports.pq = ${moduleBuilder.modules.f1m.pq};
            exports.n8q = 32;
            exports.q = "${moduleBuilder.modules.pastafp.q}";
        `
    );

    fs.writeFileSync(
        path.join( __dirname, "..", "build", "pastafp.wasm"),
        Buffer.from(code)
    );
}

buildWasm();
