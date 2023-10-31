import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/**/*.graphql',
  generates: {
    './src/graphql/_generated/index.ts': {
      config: {
        useIndexSignature: true,
        contextType: '../context#ApolloContext',
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
  hooks: {
    afterAllFileWrite: ['eslint --fix', 'prettier --write'],
  },
};

export default config;
