/** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true
// };
// module.exports = nextConfig;
const withTM = require("next-transpile-modules")([
    "lodash-es",
    "react-d3-speedometer"
]);

module.exports = withTM();
