const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  serverRuntimeConfig: {
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET,
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
    contentfulEnvironment: process.env.CONTENTFUL_ENVIRONMENT,
    contentfulPreviewToken: process.env.CONTENTFUL_CPA_ACCESS_TOKEN,
    contentfulDeliveryToken: process.env.CONTENTFUL_CDA_ACCESS_TOKEN,
    contentstackApiKey: process.env.CONTENTSTACK_API_KEY,
    contentstackDeliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    contentstackEnvironment: process.env.CONTENTSTACK_ENVIRONMENT,
    // note: we only define UNIFORM_CLI_BASE_URL in development.
    // In production, it can be undefined and `uniformApiHost` will default to uniform.app
    // in the Canvas client.
    uniformApiHost: process.env.UNIFORM_CLI_BASE_URL,
    uniformApiKey: process.env.UNIFORM_API_KEY,
    uniformProjectId: process.env.UNIFORM_PROJECT_ID,
    bigCommerceStoreHash: process.env.BIGCOMMERCE_STORE_HASH,
    bigCommerceToken: process.env.BIGCOMMERCE_TOKEN,
  },
  images: {
    loader: 'cloudinary',
    domains: ['res.cloudinary.com'],
    path: 'https://res.cloudinary.com/uniformdev/image/fetch',
  },
  publicRuntimeConfig: {
    gaTrackingId: process.env.GA_UA_ID || '',
    previewEnabled: process.env.UNIFORM_PREVIEW_ENABLED || false,
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET || '',
  },
  future: {
    webpack5: false,
  },
  target: 'serverless',
  trailingSlash: true,
  webpack: (config, { dev }) => {
    // disable sourcemaps of webpack
    config.devtool = false;

    // disable soucemaps of babel-loader
    for (const r of config.module.rules) {
      if (r.loader === 'babel-loader') {
        r.options.sourceMaps = false;
      }
    }

    return config;
  },
});
