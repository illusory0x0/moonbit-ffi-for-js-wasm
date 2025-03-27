dev: 
	npx tsx \
	--watch-path=.\main.ts \
	--watch-path=target/wasm/release/build/hello/hello.wasm \
	--watch-path=target/js/release/build/hello/hello.js \
	.\main.ts


js:
	moon build --watch --target js

wasm:
	moon build --watch --target wasm