import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: 'https://loan-sub.apne2a.algorix.cloud/openapi.json',
    output: {
      mode: 'tags-split',
      baseUrl: process.env.NEXT_PUBLIC_LENDERS_BASE_URL,
      target: './entities/api',
      schemas: './entities/const',
      client: 'react-query',
      headers: true,
      override: {
        useTypeOverInterfaces: true,
        mutator: {
          path: './shared/axios/lib/customInstanceLenders.ts',
          name: 'customInstanceLenders',
        },
      },
      // clean: true,
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write "./entities/**/*.{ts,tsx}"',
    },
  },
})
