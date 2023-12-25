# 김정환_프론트엔드-개발환경의-이해와-실습

nvm을 사용해 버전을 변경함.

# node: 13.14.1
REPL[Read Eval Print Loop]

# npm: 6.13.6
1. npm i -g npm@6.13.6
i는 install의 축약어고 -g 옵션은 global의 약자다.
2. npm init으로 프로젝트 생성
3. npm의 버전 관리 방식
유의적 버전(Sementic Version) 방식으로 패키지 버전을 관리한다.
    > 주(Major).부(Minor).수(Patch) 세 가지 숫자를 조합해 버전을 관리한다.
    > * Major: 기존 버전과 호환되지 않게 변경한 경우
    > * Minor: 기존 버전과 호환되면서 기능이 추가된 경우
    > * Patch: 기존 버전과 호환되면서 버그를 수정한 경우

    버전의 범위
    > 어떤 특수문자를 사용하냐에 따라 방식이 달라진다.
    > * 16.12.2 고정값으로 설정
    > * \> 16.12.2 버전보다 큰 버전을 설정
    > * \>= 16.12.2 같은 버전이거나 큰 버전을 설정
    > * \< 16.12.2 버전보다 작은 버전을 설정
    > * \<= 16.12.2 같은 버전이거나 작은 버전을 설정
    > * \~16.12.2는 16.13.0 미만 까지 포함하고 ~16은 17.0.0 미만 까지 포함한다.
    > * \^16.12.2는 17.0.0 미만 까지 포함하고 ^16은 16.0.0부터 16.1.0 미만 까지 포함한다.

# webpack
bundling을 하기 위한 도구이며, 강의에서 사용하는 버전은 4을 사용함.
```sh
npm i -D webpack@4.41.5 webpack-cli@3.3.10
```
node_modules의 .bin directory가 생기고 그 안에 webpack를 사용할 수 있는 스크립트가 생김.
실행할 때 인자로 필수 옵션이 필요함.
1. -&nbsp;-mode [development | production | none]
2. -&nbsp;-entry [index.js와 같은 애플리케이션의 시작점]
3. -&nbsp;-output [bundling의 결과를 출력할 경로]

```sh
./node_modules/.bin/webpack --mode development --entry ./src/index.js --output ./dist/index.js
```
**webpack.config.js** 파일을 생성해 관리하기.
cli로 실행하기 보다 편리하고 확장에 용이하도록 webpack.config.js를 사용함.

```js
const path = require("path");
module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].js"
    }
};
```
(node는 CommonJS를 따르기 때문에 module과 require 함수를 사용함.)
위 코드를 간단하게 설명하면
1. require 함수를 사용해 path module을 가져온다. (import)
2. webpack에서 사용할 정보를 저장하는 객체를 내보낸다. (export)
3. cli로 실행했을 때 처럼 필수 인자인 mode와 entry, output property를 설정한다.
4. entry property의 key(지금은 index만 있음)가 output property의 filename property의 값인 \"[name].js\"에 mapping된다.

*package.json* 파일에 build 스크립트를 추가
```json
...
"scripts": {
...
    "build": "webpack"
},
...
```

실습 정보
[예제 및 문제](https://github.com/jeonghwan-kim/lecture-frontend-dev-env)
> * 1-webpack/1-entry: 웹팩 엔트리/아웃풋 실습
> * 1-webpack/2-loader: 웹팩 로더 실습
> * 1-webpack/3-plugin: 웹팩 플러그인 실습
> * 2-babel/1-babel: 바벨 실습
> * 2-babel/2-sass: 사스 실습
> * 3-lint/1-eslint: 린트 실습
> * 3-lint/2-prettier: 프리티어 실습
> * 4-webpack/1-dev-server: 웹팩 개발 서버 실습
> * 4-webpack/2-hot: 웹팩 핫로딩 실습
> * 4-webpack/3-optimazation: 웹팩 최적화 실습
> * 5-sample/1-react: 리액트 샘플 실습
> * master: 최종 결과물

위는 실습할 때 사용할 브랜치다.

## webpack loader
**webpack은 모든 파일을 module 취급**한다.
즉 stylesheet, image, font 등들 여러 형식의 파일들은 module이기 때문에 import가 가능하다.

이것을 가능하게 해주는 것이 **webpack loader**의 역할이다.

### css file loader
```sh
npm i -D css-loader@3.4.2
```
**css-loader**만 사용하면 js에 import된 내용은 추가되지만 DOM에 반영되지 않는다.    
이 때 필요한 loader가 **style-loader**다.
```sh
npm i -D style-loader@1.1.3
```
webpack.config.js 파일에 있는 module.rules property의 중 일부다.    
use property의 인자로 array type의 데이터를 바인딩 하는데 index가 0에 가까울 수록 마지막에 호출된다.    
즉 css-loader가 먼저 호출되고 다음으로 style-loader가 호출된다.
```js
...
{
    "test": /\.css$/,
    "use": [
        "style-loader",
        "css-loader"
    ]
}
...
```
### resource(image) file loader
webpack을 사용해 bundling할 때 image, video, font 등과 같은 파일들을 import하거나 css 파일에서 사용하고 있다면 file loader가 필요하다.    
```sh
npm i -D file-loader@5.0.2
```
**file-loader**는 resource가 browser에 caching 기능 때문에 생기는 문제를 해결하기 위해 resource의 이름을 hash 값으로 변경해주는 기능이 있음.    
이전에 설정했던 방식으로 설정하면 빌드의 결과를 사용할 때 image file을 불러오는 데 문제가 있음.
```js
...
// 이렇게 하면 힘들어짐.
{
    test: /\.(png|jpg)$/,
    use: [
        "file-loader"
    ]
}
...
```
빌드의 결과를 쉽게 사용하기 위해 다른 loader들과 조금 다른 방식으로 구성.
```js
...
{
    test: /\.(png|jpg)$/,
    loader: "file-loader",
    options: {
        publicPath: "./dist/",
        name: "[name].[ext]?[hash]"
    }
}
...
```
위 코드블럭에서 options property가 추가됐고 간단하게 설명하면    
1. publicPath    
    빌드의 결과로 생성된 이미지를 불러오는 entryPoint를 설정하는 것이라 생각하면 된다.
2. name    
    resource를 bundling할 때 사용할 이름 규칙을 정한 것이다.
    * name: resource name을 그대로 사용
    * ext: extension의 약자로 확장자
    * hash: 기존에는 빌드의 결과로 resource name이였는데 queryParamter로 붙여서 caching기능을 유지하게 도와줌

### url loader
**file-loader**를 사용할 때 최적화할 수 있게 도와주는 **url-loader**이다.    
resource들을 매번 network을 사용해 다운받아 사용하는 것은 비효율일 수도 있기 때문에 [data url scheme](https://en.wikipedia.org/wiki/Data_URI_scheme)를 사용하여 효율적으로 사용할 수 있게 도와준다.    
쉽게 말하면 resource를 base64로 encoding해서 사용한다 생각하면 된다.
```sh
npm i -D url-loader@3.0.0
```
기존의 **file-loader** 설정을 그대로 사용하며, loader를 **url-loader**로 수정하고 options.limit property만 추가했다.
```js
...
{
    test: /\.(png|jpg)$/,
    loader: "url-loader",
    options: {
        publicPath: "./dist/",
        name: "[name].[ext]?[hash]",
        limit: 500 // 500byte로 설정 (1024 = 1k)
    }
}
...
```
여기에서 중요한건 options.limit인데 limit으로 설정한 byte(500)보다 큰 file이면 **file-loader**를 사용하고 같거나 작으면 **url-loader**가 base64 enconding해서 사용한다.    
빌드의 결과 파일인 index.js의 내용을 보면 bg.jpg 파일은 
```
./dist/bg.jpg?b45cff0c372984a336aa25f24b9f3e76
```
위와 같은데 이유는 bg.jpg file은 500 byte보다 크기 때문이다.
반면 hamburger_btn.png인 경우 500 byte보다 작기 때문에
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP...
```
위와 같이 encoding되어 사용하는 것을 확인할 수 있다.

> 강의 예제와 다른 방식으로도 동작하는지 알고 싶어 위 처럼 테스트했지만 강의에서는 image file을 import해서 사용하는 예제를 사용했다.
```js
import hanmburgerBtn from "./hamburger_btn.png";

document.addEventListener("DOMContentLoaded", () => {
    const imageTag = document.createElement("IMG");
    imageTag.src = hanmburgerBtn;
    imageTag.alt = "hanmburger button";
    document.body.appendChild(imageTag);   
});
```
위와 같이 추가로 테스트해볼 수 있다.


1-webpack/2-loader를 해결하면서 알게된 내용    
url-loader가 file-loader를 갖고 있지 않아 url-loader만 install하고 빌드하면 file-loader를 찾을 수 없다는 에러가 발생한다.    
file-loader도 install 하니 해결됐다.

### webpack plugin
**webpack loader**의 목적은 여러 파일들을 bundling할 때 묶을 수 있도록 도와주는 목적이라면 **webpack plugin**의 목적은 빌드의 결과인 자바스크립트 파일을 난독화 하거나 특정 텍스트를 추출하는 용도로 사용한다.    
즉 **webpack loader**는 전처리기, **webpack plugin**은 후처리기라 생각해도 괜찮을 것 같다.

webpack.config.js 파일에 plugins property name을 사용하고 값으론 array type을 사용한다.
```js
...
plugins: [
    new webpack.BannerPlugin({
        banner: `
            Build Date: ${new Date().toLocaleString()}
            Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        `
    }),
    new webpack.DefinePlugin({
        TWO: "1+1",
        TWOStr: JSON.stringify("1+1"),
        "api.url": JSON.stringify("https://app.api.com")
    })
]
...
```
위 코드블럭처럼 사용하는데 Plugin들은 class형태로 만들고 생성자를 통해 instance하는 형식으로 Plugin을 장착한다.

webpack이 기본으로 지원해주는 plugin
1. BannerPlugin
2. DefinePlugin    
환경마다 다르게 사용하는 데이터들을 구성할 때 좋음.    
객체 형태로도 사용할 수 있음.    
문자열 데이터를 전달하기 위해서는 json.stringify 함수를 사용해야함.

third part plugin
1. html-webpack-plugin    
webpack build 시 html 파일도 포함하여 관리하게 도와주는 plugin.    
즉 빌드의 결과인 bundling file들을 *.html 파일에 내용을 동적으로 추가해줘서 자동화하기 좋음. (의존성을 제거하기 좋음.)    
주의할 점은 이 plugin을 사용하면 file-loader의 publicPath를 지워야 한다.    
(예를 들면 index.html 파일을 src diretory에서 관리한다는 의미.)    
```sh
npm -D install html-webpack-plugin@3.2.0
```
코드는 아래와 같다.
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
...
    plugins: [
        ...,
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            templateParameters: { // html file에서 변수처럼 사용할 수 있음. ex) <%= env %>
                env: process.env.NODE_ENV === "development" ? "(개발용)": ""
            },
            minify: process.env.NODE_ENV === "development"? false: {
                collapseWhitespace: true, // bundling 결과인 index.html 에 있는 공백 제거
                removeComments: true // bundling 결과인 index.html 에 있는 주석 제거
            }
        })
    ]
}
```
강의를 따라하다 OS가 달라서 NODE_ENV를 설정하는 부분에서 막혔었다.    
windows인 경우
```sh
set NODE_ENV=development && npm run build
```
linux인 경우
```sh
NODE_ENV=development npm run build
```
위와 같이 하면되는 것 같다.

2. clean-webpack-plugin    
webpack build 시 이전 build와 관련된 파일들을 제거해준다. (이전 build 시 생긴 dist diretory를 삭제한 후 build를 시작한다.)
```sh
npm -D i clean-webpack-plugin@3.0.0
```
3. mini-css-extract-plugin    
빌드의 결과물인 bundling된 자바스크립트 파일에서 css 내용을 별도의 파일로 추출해 자바스크립트 파일과 css file을 각각 다운받을 수 있도록 도와주는 plugin이다.    
이 plugin을 사용하면 **style-loader**가 아닌 plugin에서 지원하는 loader를 사용해야함.
```sh
npm -D i mini-css-extract-plugin@0.9.0
```

# babeljs
babeljs를 사용하는 목적은 브라우저마다 javascript를 해석하여 실행하는 interpreter들이 다르기 때문에 브라우저들끼리 호환성이 좋지 않다. 이런 단점을 해결하는 것을 cross-browsing이라 하고 babeljs를 이용해 해결할 수 있다. babeljs로 cross-browsing을 지원하기 위해선 transpiling을 해야한다. transpiling은 ES6 이상의 문법 또는 typescript, jsx와 같은 vanilla javascript가 아닌 문법들을 vanilla javascript로 변환해서 그나마 호환성이 좋은 ES5 문법으로 변환하는 것이다.    
babel는 세 단계로 transpiling을 진행한다.
1. Parsing (파싱)    
파일을 읽어 *추상 구문 트리*(**AST**)를 만드는 과정
2. Transforming (변환)    
Parsing의 결과물인 **AST**를 사용해 원하는 형태로 변경하는 과정 (필수 단계는 아님)
3. Printing (출력)    
Parsing만 하거나 아님 Parsing과 Transforming을 하던 결과를 출력하는 과정

실행 스크립트

```sh
npm i -D @babel/core@7.8.4 @babel/cli@7.8.4
```
(강의에선 babel를 실행할 때 npx로 하는데 본인은 npm으로 할거임.)    
실행 스크립트
```sh
./node_modules/.bin/babel .\src\index.js
```
결과
```js
import "./index.css";
import hanmburgerBtn from "./hamburger_btn.png";
document.addEventListener("DOMContentLoaded", () => {
  const imageTag = document.createElement("IMG");
  imageTag.src = hanmburgerBtn;
  imageTag.alt = "hanmburger button";
  document.body.appendChild(imageTag);
});
console.log(process.env);
console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(TWOStr);
console.log(api.url);
console.log(api);
```
위 결과를 보면 const나 arrow function를 보면 1번과 3번만 진행된 것을 확인할 수 있다.    
Transforming 단계를 실행하기 위해선 babeljs의 plugin이 필요하다.

동작 방식을 이해하기 위해 custom plugin을 만들어 적용해보자.
```js
// my-bebel-plugin.js
module.exports = function myBabelPlugin() {
  return {
    visitor: {
        Identifier(path) {
            const name = path.node.name;
            console.log(name);
        }
    }
  }  
};
```
위 처럼 파일을 만든 후 아래 스크립트를 실행

```sh
./node_modules/.bin/babel .\src\index.js --plugins ./my-babel-plugin.js
```
결과를 확인해보면 file의 내용 중 변수처럼 사용하는 모든 내용이 출력된다.
```
hanmburgerBtn
document
addEventListener
imageTag
document
createElement
imageTag
src
hanmburgerBtn
imageTag
alt
...
```
visitor.Identifier property가 아닌 visitor.VariableDeclaration property는 const, let, var와 같은 변수를 선언할 때 필요한 예약어를 parameter를 받을 수 있다.
```js
...
visitor: {
    ...
    VariableDeclaration(path) {
        console.log("VariableDeclaration", path.node.kind);
    }
...
```
결과를 보면
```
Identifier hanmburgerBtn
Identifier document
Identifier addEventListener
VariableDeclaration const
Identifier imageTag
```
imageTag 변수를 선언하는 코드에 사용된 const 예약어가 순서에 맞게 출력된다.
```js
const imageTag = document.createElement("IMG");
```
이제 어떤식으로 동작하는지 이해했으니 const 예약어를 var로 변경하는 코드로 수정해보자.
```js
...
visitor: {
    ...
    VariableDeclaration(path) {
        console.log("VariableDeclaration", path.node.kind);
        if (path.node.kind !== "var") {
            console.log(path.node.kind, "=> var");
            path.node.kind = "var";
        }
    }
...
```
결과를 보면
```js
import "./index.css";
import hanmburgerBtn from "./hamburger_btn.png";
document.addEventListener("DOMContentLoaded", () => {
  var imageTag = document.createElement("IMG");
  imageTag.src = hanmburgerBtn;
  imageTag.alt = "hanmburger button";
  document.body.appendChild(imageTag);
});
console.log(process.env);
console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(TWOStr);
console.log(api.url);
console.log(api);
```
위 처럼 const imageTag가 var imageTag로 변경됐다.

visitor관련 내용은 [문서](https://babeljs.io/docs/babel-types)에서 확인할 수 있다. ([github](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/ko/plugin-handbook.md))

실무에서 특별한 이유가 아니면 custom plugin을 쓰는 상황은 없을 것 같다.    
babeljs에서 지원하는 plugin을 알아보자.
1. block-scoping    
ES6에서 추가된 const나 let과 같은 변수 선언 예약어를 var로 변경해 주는 plugin이다.
```sh
# 설치
npm i -D @babel/plugin-transform-block-scoping
# 실행
./node_modules/.bin/babel .\src\index.js --plugins @babel/plugin-transform-block-scoping
```
2. arrow-functions    
ES6에서 추가된 화살표 함수를 ES5의 함수로 변경해 주는 plugin이다.
```sh
# 설치
npm i -D @babel/plugin-transform-arrow-functions
# 실행
./node_modules/.bin/babel .\src\index.js --plugins @babel/plugin-transform-block-scoping --plugins @babel/plugin-transform-arrow-functions
```
3. strict-mode    
use strict mode를 추가해주는 plugin이다.
```sh
# 설치
npm i -D @babel/plugin-transform-strict-mode
# 실행
./node_modules/.bin/babel .\src\index.js --plugins @babel/plugin-transform-block-scoping --plugins @babel/plugin-transform-arrow-functions --plugins @babel/plugin-transform-strict-mode
```

위에 있는 plugin들을 전부 사용하여 결과를 확인해보면
```js
"use strict";

import "./index.css";
import hanmburgerBtn from "./hamburger_btn.png";
document.addEventListener("DOMContentLoaded", function () {
  var imageTag = document.createElement("IMG");
  imageTag.src = hanmburgerBtn;
  imageTag.alt = "hanmburger button";
  document.body.appendChild(imageTag);
});
console.log(process.env);
console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(TWOStr);
console.log(api.url);
console.log(api);
```
위와 같은 결과를 얻을 수 있다.