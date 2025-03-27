import fs from 'node:fs/promises';

enum Backend {
  js = "js",
  wasm = "wasm"
}

let moonbit_ffi = async (
  backend: Backend,
  package_path: string,
  import_object: (dest: any) => void) : Promise<any>  => {
    let import_path = `./target/${backend}/release/build/${package_path}/${package_path}.${backend}`

    if (backend === Backend.js) {
      import_object(globalThis)
      return import(import_path)
    } if (backend === Backend.wasm) {
      let importObject = {}
      import_object(importObject)
      let instance = await WebAssembly.instantiate(await fs.readFile(import_path),importObject)
      return instance.instance.exports
    } else {
      throw Error("panic")
    }
} 


let import_object = (o) => {
  o["illusory0x0_console"] = {
    log : console.log
  }
}


let run_js = async () => {
  let {hello} = await moonbit_ffi(Backend.js,"hello",import_object)
  hello()
}


let run_wasm = async () => {
  let {hello} = await moonbit_ffi(Backend.wasm,"hello",import_object)
  hello()
}

run_js()
// run_wasm()
