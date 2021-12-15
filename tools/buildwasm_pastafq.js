const ModuleBuilder = require("wasmbuilder").ModuleBuilder;
const buildPastaFq = require("../src/pasta/build_pastafq.js");
const fs = require("fs");
const path = require("path");

function buildWasm() {
    const moduleBuilder = new ModuleBuilder();
    moduleBuilder.setMemory(25);
    buildPastaFq(moduleBuilder);

    const code = moduleBuilder.build();

    fs.writeFileSync(
        path.join( __dirname, "..", "build", "pastafq_wasm.js"),
        `
            exports.code = "${Buffer.from(code).toString("base64")}";
            exports.pq = ${moduleBuilder.modules.f1m.pq};
            exports.n8q = 32;
            exports.q = "${moduleBuilder.modules.pastafq.q}";
        `
    );

    fs.writeFileSync(
        path.join( __dirname, "..", "build", "pastafq.wasm"),
        Buffer.from(code)
    );
}

buildWasm();
