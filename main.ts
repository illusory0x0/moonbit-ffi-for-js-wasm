enum Backend {
  js = "js",
  wasm = "wasm"
}

let moonbit_ffi = async (
  backend: Backend,
  package_path: string,
  import_object: (dest: any) => void) : Promise<any>  => {
    let import_path = `target/${backend}/release/build/${package_path}/${package_path}.js`

    if (backend === Backend.js) {
      import_object(globalThis)
      return import(import_path)
    } if (backend === Backend.wasm) {
      let importObject = {}
      import_object(importObject)
      let instance = await WebAssembly.instantiateStreaming(fetch(import_path),importObject)
      return instance.instance.exports
    } else {
      throw Error("panic")
    }
} 
export {}

let {hello} = await moonbit_ffi(Backend.js,"hello",(o) => {
  o["illusory0x0_console"] = console.log
})


hello()