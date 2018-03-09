import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/pro-state.ts',
  output: {
    file: './dist/pro-state.js',
    format: 'es',
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
}
