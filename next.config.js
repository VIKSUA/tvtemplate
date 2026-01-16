const { withRNVNext } = require('@rnv/adapter');

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const config = {
    compress: false,
    trailingSlash: true,
    basePath: basePath || undefined,
    assetPrefix: basePath || undefined,
};

module.exports = withRNVNext(config);
