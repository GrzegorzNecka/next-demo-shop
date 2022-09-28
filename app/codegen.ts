
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api-eu-central-1.hygraph.com/v2/cl5s794280vvm01tbegxz5w9c/master",
  documents: "graphQL/*.graphql",
  generates: {
    "graphQL/generated": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
