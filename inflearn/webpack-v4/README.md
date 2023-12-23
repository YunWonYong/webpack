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
