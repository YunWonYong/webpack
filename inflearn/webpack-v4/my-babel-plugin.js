module.exports = function myBabelPlugin() {
  return {
    visitor: {
        Identifier(path) {
            // console.log(path);
            const name = path.node.name;
            console.log("Identifier", name);
        },
        VariableDeclaration(path) {
            console.log("VariableDeclaration", path.node.kind);
            if (path.node.kind !== "var") {
                console.log(path.node.kind, "=> var");
                path.node.kind = "var";
            }
        },
        FunctionDeclaration(path) {
            // console.log("FunctionDeclaration", path);
        },
        ArrowFunctionExpression(path) {
            // console.log("ArrowFunctionExpression", path);
            // console.log(path.node);
            // console.log(path.node.body);
        }
    }
  }  
};