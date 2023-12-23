class MyWebpackPlugin {
    apply(complier) {
        // 아래와 같이 plugin을 변수로 선언해서 사용하면 문제가 생김.
        // const plugin = complier.plugin;
        complier.plugin("emit", function(compilation, callck) {
            const assets = compilation.assets;
            const indexFile = assets["index.js"];
            const indexFileSource = indexFile.source();

            assets["index.js"].source = function() {
                const banner = [
                    "/**",
                    " * hello",
                    " * world",
                    "*/\n"
                ];
                return banner.join("\n") + indexFileSource;
            };
            
            callck();
        });
        
        const hooks = complier.hooks;
        const done = hooks.done;
        done.tap("My Plugin", function (state) {
            // plugin의 행동이 제대로 동작했을 때 호출됨.
            // console.log("My Plugin: done", state);
            console.log("My Plugin: done");
        });

        
    }
};

module.exports = MyWebpackPlugin;