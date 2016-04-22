module.exports = {
 entry: [],
 output: {
   filename: "bundle.js"
 },
 module: {
   loaders: [
     {
       test: /.jsx?$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015'] 
       }
     }
   ]
 },
 externals: {
   //don't bundle the 'react' npm package with our bundle.js
   //but get it from a global 'React' variable
   'react': 'React'
 },
 resolve: {
   extensions: ['', '.js', '.jsx', '.es6']
 }
};