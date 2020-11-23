import { resolve } from "path";
function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}
module.exports = {
  root: "./",
  alias: {
    "/@/": pathResolve("src"),
  },
  proxy:{
    "/api":{
      target:"http://127.0.0.1:7778",
      changeOrigin:true,
      rewrite: path => path.replace("/^\/api/","")
    }
  }
};
