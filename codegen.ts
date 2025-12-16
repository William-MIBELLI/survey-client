import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:80',
  // Il va scanner vos fichiers .ts, .tsx et .graphql pour trouver les requêtes gql`...`
  documents: ['src/**/*.{ts,tsx,graphql}'], 
  generates: {
    './src/gql/generated.ts': {
      plugins: [
        'typescript', // Génère les types de base (User, Survey...)
        'typescript-operations' // Génère les types des requêtes (SigninMutation, GetUserQuery...)
      ]
    }
  }
}

export default config