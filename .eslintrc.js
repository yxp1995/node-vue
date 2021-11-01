module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    indent: ["error", 2],
    "vue/html-indent": ["error",],
    "vue/require-v-for-key": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-irregular-whitespace": "off",
    // 单双引号
    "quotes": [1, "double"],
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [1, "always-multiline"],
    "semi": [2, "always"],//语句强制分号结尾
    "generator-star-spacing": 0,//生成器函数*的前后空格
    "comma-spacing": 0,//逗号前后的空格
    "no-trailing-spaces": 1,//一行结束后面不要有空格
    "no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
    "generator-star-spacing": 0,//生成器函数*的前后空格
    "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
  }
}
