const devCerts = require("office-addin-dev-certs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const webpack = require("webpack");

module.exports = async (env, options) => {
  const dev = options.mode === "development";
  const config = {
    devtool: "source-map",
    entry: {
      polyfill: "@babel/polyfill",
      taskpane: "./src/taskpane/taskpane.js",
      commands: "./src/commands/commands.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".html", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader", 
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: "html-loader"
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: "file-loader"
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "taskpane.html",
        template: "./src/taskpane/taskpane.html",
        chunks: ["polyfill", "taskpane"]
      }),
      new HtmlWebpackPlugin({
        filename: "mass_molarity.html",
        template: "./src/calculators/mass_molarity.html",
        chunks: ["polyfill", "mass_molarity"]
      }),
      new HtmlWebpackPlugin({
        filename: "solution_dilution.html",
        template: "./src/calculators/solution_dilution.html",
        chunks: ["polyfill", "solution_dilution"]
      }),
      new HtmlWebpackPlugin({
        filename: "pcr_primer_stats.html",
        template: "./src/manipulation_suite/pcr_primer_stats.html",
        chunks: ["polyfill", "pcr_primer_stats"]
      }),
      new HtmlWebpackPlugin({
        filename: "combine_fasta.html",
        template: "./src/manipulation_suite/combine_fasta.html",
        chunks: ["polyfill", "combine_fasta"]
      }),
      new HtmlWebpackPlugin({
        filename: "dna_stats.html",
        template: "./src/manipulation_suite/dna_stats.html",
        chunks: ["polyfill", "dna_stats"]
      }),
      new HtmlWebpackPlugin({
        filename: "protein_stats.html",
        template: "./src/manipulation_suite/protein_stats.html",
        chunks: ["polyfill", "protein_stats"]
      }),
      new HtmlWebpackPlugin({
        filename: "dna_pattern_find.html",
        template: "./src/manipulation_suite/dna_pattern_find.html",
        chunks: ["polyfill", "dna_pattern_find"]
      }),
      new HtmlWebpackPlugin({
        filename: "protein_pattern_find.html",
        template: "./src/manipulation_suite/protein_pattern_find.html",
        chunks: ["polyfill", "protein_pattern_find"]
      }),
      new HtmlWebpackPlugin({
        filename: "blast.html",
        template: "./src/blast/blast.html",
        chunks: ["polyfill", "blast"]
      }),
      new CopyWebpackPlugin([
        {
          to: "pcr_primer_stats.js",
          from: "./src/manipulation_suite/pcr_primer_stats.js"
        }
      ]),
      new CopyWebpackPlugin([
        {
          to: "js/html2canvas.js",
          from: "./src/blast/html2canvas.min.js"
        }
      ])
    ],
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },      
      https: (options.https !== undefined) ? options.https : await devCerts.getHttpsServerOptions(),
      port: process.env.npm_package_config_dev_server_port || 3000
    }
  };

  return config;
};
