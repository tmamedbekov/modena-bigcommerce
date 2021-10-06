import { compose, EnhancerBuilder } from '@uniformdev/upm';
import getConfig from 'next/config';

import { UPM_CONTENTFUL_PARAMETER_TYPES } from '@uniformdev/upm-contentful';
import { contentfulEnhancer } from './contentful/contentfulEnhancer';
import { contentfulModelConverter } from './contentful/contentfulModelConverter';

import { bigCommerceEnhancer } from './bigcommerce/bigCommerceEnhancer';
import { UPM_BIGCOMMERCE_PARAMETER_TYPES } from '@uniformdev/upm-bigcommerce';

import { UPM_CONTENTSTACK_PARAMETER_TYPES } from '@uniformdev/upm-contentstack';
import { contentstackEnhancer } from './contentstack/contentstackEnhancer';
import { contentstackModelConverter } from './contentstack/contentstackModelConverter';

import { sanityEnhancer } from './sanity/sanityEnhancer';
import { UPM_SANITY_PARAMETER_TYPES } from '@uniformdev/upm-sanity';
import { sanityModelConverter } from './sanity/sanityModelConverter';

import { commercetoolsEnhancer } from './commercetools/commerceToolsEnhancer';
import { UPM_COMMERCETOOLS_PARAMETER_TYPES } from '@uniformdev/upm-commercetools';
import { commercetoolsModelConverter } from './commercetools/commercetoolsModelConverter';
import { bigCommerceModelConverter } from './bigcommerce/bigCommerceModelConverter';

const { serverRuntimeConfig } = getConfig();
const {
  commercetoolsAuthUrl,
  commercetoolsProjectKey,
  commercetoolsClientId,
  commercetoolsClientSecret,
  commercetoolsApiUrl,
  sanityProjectId,
  sanityToken,
  bigCommerceStoreHash,
  bigCommerceToken,
  contentfulSpaceId,
  contentfulDeliveryToken,
  contentstackApiKey,
  contentstackDeliveryToken,
  contentstackEnvironment,
} = serverRuntimeConfig;

const commerceToolsConfigured: boolean =
  commercetoolsAuthUrl !== undefined &&
  commercetoolsProjectKey !== undefined &&
  commercetoolsClientId !== undefined &&
  commercetoolsClientSecret !== undefined &&
  commercetoolsApiUrl !== undefined;

const contentfulConfigured: boolean =
  contentfulSpaceId !== undefined && contentfulDeliveryToken !== undefined;

const contentstackConfigured: boolean =
  contentstackApiKey !== undefined &&
  contentstackDeliveryToken !== undefined &&
  contentstackEnvironment !== undefined;

const sanityConfigured: boolean =
  sanityProjectId !== undefined && sanityToken !== undefined;

const bigCommerceConfigured: boolean =
  bigCommerceStoreHash !== undefined && bigCommerceToken !== undefined;

console.warn(
  contentfulConfigured
    ? '✅  Contentful enhancer is configured and enabled.'
    : '⚠️   Contentful enhancer is not configured and therefore disabled. If that\'s unexpected, please check your env vars.'
);
console.warn(
  contentstackConfigured
    ? '✅  Contentstack enhancer is configured and enabled.'
    : '⚠️   Contentstack enhancer is not configured and therefore disabled. If that\'s unexpected, please check your env vars.'
);

console.warn(
  bigCommerceConfigured
    ? '✅  BigCommerce enhancer is configured and enabled.'
    : '⚠️   BigCommerce enhancer is not configured and therefore disabled. If that\'s unexpected, please check your env vars.'
);

console.warn(
  commerceToolsConfigured
    ? '✅  Commercetools enhancer is configured and enabled.'
    : '⚠️   Commercetools enhancer is not configured and therefore disabled. If that\'s unexpected, please check your env vars.'
);

console.warn(
  sanityConfigured
    ? '✅  Sanity enhancer is configured and enabled.'
    : '⚠️  Sanity enhancer is not configured and therefore disabled. If that\'s unexpected, please check your env vars.'
);

export const enhancers = new EnhancerBuilder()
  .parameterType(
    UPM_SANITY_PARAMETER_TYPES,
    sanityConfigured
      ? compose(sanityEnhancer(), sanityModelConverter)
      : undefined
  )
  .parameterType(
    UPM_CONTENTFUL_PARAMETER_TYPES,
    contentfulConfigured
      ? compose(contentfulEnhancer(), contentfulModelConverter)
      : undefined
  )
  .parameterType(
    UPM_CONTENTSTACK_PARAMETER_TYPES,
    contentstackConfigured
      ? compose(contentstackEnhancer(), contentstackModelConverter)
      : undefined
  )
  .parameterType(
    UPM_BIGCOMMERCE_PARAMETER_TYPES,
    bigCommerceConfigured
      ? compose(bigCommerceEnhancer(), bigCommerceModelConverter)
      : undefined
  )
  .parameterType(
    UPM_COMMERCETOOLS_PARAMETER_TYPES,
    commerceToolsConfigured
      ? compose(commercetoolsEnhancer(), commercetoolsModelConverter)
      : undefined
  );