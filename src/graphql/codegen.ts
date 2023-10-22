import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/**/*.graphql',
  generates: {
    './src/apollo/generated.ts': {
      config: {
        useIndexSignature: true,
        contextType: './context#ApolloContext',
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
  hooks: {
    afterAllFileWrite: ['eslint --fix', 'prettier --write'],
  },
};

export default config;
