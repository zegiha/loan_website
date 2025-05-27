import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: 'https://loan.apne2a.algorix.cloud/api-docs-json',
    // input: (process.env.NEXT_PUBLIC_LENDERS_BASE_URL ?? '') + '/openapi.json',
    output: {
      mode: 'tags-split',
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      // baseUrl: process.env.NEXT_PUBLIC_LENDERS_BASE_URL,
      target: './entities/api',
      schemas: './entities/const',
      client: 'react-query',
      headers: true,
      override: {
        useTypeOverInterfaces: true,
        mutator: {
          // path: './shared/axios/lib/customInstanceLenders.ts',
          // name: 'customInstanceLenders',
          path: './shared/axios/lib/customInstance.ts',
          name: 'customInstance',
        },
      },
      // clean: true,
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write "./entities/**/*.{ts,tsx}"',
    },
  },
})
