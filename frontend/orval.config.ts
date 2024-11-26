import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: './src/api/swagger.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/api',
      schemas: './src/api/model',
      client: 'react-query',
      override: {
        query: {
          useQuery: true,
          useInfinite: false,
        },
        mutator: {
          path: './src/lib/axios.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
