import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:80',
  documents: ['src/**/*.{ts,tsx,graphql}'], 
  generates: {
    './src/gql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations'
      ],
      config: {
        scalars: {
          // Mappez vos scalaires personnalis�s ici
          DateTime: 'string',
          Date: 'Date',
          UUID: 'string',
          Void: 'void',
          // Si vous avez d'autres scalaires (ex: JSON), ajoutez-les ici
          JSON: 'any' 
        }
      }
    }
  }
}

export default config
