// rollup.config.js
import json from 'rollup-plugin-json' // 支持json
import nodeResolve from 'rollup-plugin-node-resolve' // 识别node_modules包
import commonjs from 'rollup-plugin-commonjs' // 将非ES6语法的包转为ES6可用
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser' // 压缩js

const extensions = ['.js', '.ts']

const config = {
  input: 'src/main.ts',
  // external: ['react', 'redux'], // 告诉rollup，不打包react,redux;将其视为外部依赖
  output: {
    name: 'dhtAjax',
    file: 'dist/index.js',
    format: 'umd', // 输出umd格式，各种模块规范通用
    sourcemap: true, //生成bundle.map.js文件，方便调试
    // globals: {
    //   react: 'React', // 这跟external 是配套使用的，指明global.React即是外部依赖react
    //   redux: 'Redux'
    // }
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
    terser(),
  ],
}
export default config
