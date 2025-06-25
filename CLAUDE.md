# Claude Code Project Information

## Project Overview

This is a TypeScript project implementing Domain Modeling Made Functional (DMMF) concepts using valibot and fp-ts. The project focuses on type-safe domain modeling and functional programming patterns.

## Project Structure

```
src/
├── index.ts          # Main implementation of DMMF concepts
└── index.test.ts     # Test files
```

## Key Technologies

- **TypeScript**: Primary language for type safety
- **valibot**: Schema-based validation library
- **fp-ts**: Functional programming library (Either, etc.)
- **vitest**: Testing framework

## Development Commands

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Run tests
pnpm test

# Build project
pnpm build

# Run built project
pnpm start
```

## Code Architecture

The project implements concepts from "Domain Modeling Made Functional" Chapter 5:

### 1. Simple Value Modeling (5.3)

- Brand types for `CustomerId`, `OrderId`
- Type-level distinctions using valibot's brand function

### 2. Complex Data Modeling (5.4)

- Product types (records) for data composition
- Sum types (unions) for choice modeling
- `ProductCode = WidgetCode | GizmoCode` pattern

### 3. Function-based Workflow Modeling (5.5)

- Validation functions with proper signatures
- Effect documentation in function types
- Error handling using fp-ts Either

## Testing Strategy

The project uses vitest for testing. Tests are located in `src/index.test.ts` and cover:

- Schema validation
- Type transformations
- Error handling scenarios

## Type Safety Approach

- Extensive use of branded types for domain modeling
- Union types for modeling choices
- Either monad for error handling
- Schema-first validation with valibot

## Development Notes

- Follow functional programming principles
- Use branded types to prevent primitive obsession
- Document effects in function signatures
- Prefer composition over inheritance
- Use Either for error handling instead of exceptions
