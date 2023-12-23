// const myWebpackLoader = (content) => {
//     console.log("execute myWebpackLoader", content);
//     return content;
// };

// module.exports = { 
//     myWebpackLoader
// };


module.exports = function myWebpackLoader (content) {
    /**
     * webpack.config.js의 module.rules property에 test propertry와 매칭되는 파일들의 내용을 content에 넣어줌
     * index.js의 파일 내용이 console.log("hello");이면 content 변수의 값은 console.log("hello"); 문자열임 
     */
    // console.log("execute myWebpackLoader", content);
    return content;
    // return content.replace("console.log(", "alert(");
};