export default {
  roots: [
    "<rootDir>/src"
  ],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/**/index.{ts,tsx}",
    "!<rootDir>/src/**/main/**/*.{ts,tsx}",
    "!<rootDir>/src/**/*{.interface,.enum,-styles,.type}.ts",
    "!<rootDir>/**/{mui,icons}/**/*.{ts,tsx}",
    "!./pages/**",
    "!**/*.d.ts",
    "!<rootDir>/src/pages/**/*.{ts,tsx}",
    "!<rootDir>/src/styles/**/*.{ts,tsx}",
    "!<rootDir>/src/infra/utils/date/format.util.ts",
    "!<rootDir>/src/infra/utils/date/locale-pt-br.util.ts",
    "!<rootDir>/src/infra/utils/date/sub-days.util.ts",
    "!<rootDir>/src/infra/utils/date/add-days.util.ts"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|sass|scss)$": "identity-obj-proxy"
  }
}
