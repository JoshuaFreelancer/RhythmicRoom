const path = require('path');
const Dotenv = require('dotenv-webpack'); // Importar dotenv-webpack

module.exports = {
  mode: 'production', // Cambia a 'development' si estás en modo de desarrollo
  entry: './src/index.js', // Cambia la entrada a tu archivo principal
  output: {
    filename: 'bundle.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    clean: true, // Limpia la carpeta de salida en cada compilación
  },
  resolve: {
    extensions: ['.js'], // Permite omitir la extensión al importar archivos JS
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Regla para manejar archivos CSS
        use: ['style-loader', 'css-loader'], // Cargadores para CSS
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/, // Regla para manejar imágenes
        type: 'asset/resource', // Cargar como recursos
        generator: {
          filename: 'images/[name][ext]', // Carpeta y formato de salida para imágenes
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/, // Regla para manejar fuentes
        type: 'asset/resource', // Cargar como recursos
        generator: {
          filename: 'fonts/[name][ext]', // Carpeta y formato de salida para fuentes
        },
      },
    ],
  },
  plugins: [
    new Dotenv(), // Cargar variables de entorno desde .env
  ],
  devtool: 'source-map', // Genera un archivo de mapa de fuente
  devServer: {
    static: path.resolve(__dirname, 'public'), // Servir archivos estáticos desde la carpeta 'public'
    open: true, // Abre el navegador al iniciar el servidor
    port: 3000, // Puerto para el servidor de desarrollo
  },
};
