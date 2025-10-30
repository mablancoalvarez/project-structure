# Guía de Testing - Vitest y Testing Library

Esta es la guía completa para entender y ejecutar la suite de tests del proyecto usando **Vitest** y **Testing Library**.

## 📦 Dependencias Instaladas

- **vitest**: Framework de testing rápido y moderno
- **@testing-library/react**: Utilidades para testing de componentes React
- **@testing-library/user-event**: Simulación de eventos del usuario
- **@testing-library/jest-dom**: Matchers personalizados para DOM
- **@vitest/ui**: Interfaz gráfica para visualizar tests
- **@vitest/coverage-v8**: Reporte de cobertura de código
- **jsdom**: Simulador de ambiente DOM

## 🚀 Comandos Disponibles

### Ejecutar tests

```bash
npm run test
```

### Modo watch (ejecuta tests automáticamente cuando hay cambios)

```bash
npm run test -- --watch
```

### Interfaz gráfica de Vitest

```bash
npm run test:ui
```

### Reporte de cobertura

```bash
npm run test:coverage
```

### Tests específicos

```bash
# Ejecutar test de un archivo
npm run test src/context/__tests__/PostContext.test.ts

# Ejecutar tests que coincidan con un patrón
npm run test -- --grep "AddPost"
```

## 📁 Estructura de Tests

Los tests están organizados en carpetas `__tests__` junto al código:

```
src/
├── context/
│   ├── PostContext.tsx
│   └── __tests__/
│       └── PostContext.test.ts
├── components/
│   ├── posts/
│   │   ├── addPost/
│   │   │   ├── AddPost.tsx
│   │   │   └── __tests__/
│   │   │       └── AddPost.test.tsx
│   │   └── postList/
│   │       ├── PostList.tsx
│   │       └── __tests__/
│   │           └── PostList.test.tsx
└── test/
    ├── setup.ts (Configuración global)
    └── test-utils.tsx (Utilidades de test)
```

### 1. **PostContext.test.ts**

Tests unitarios del reducer de contexto:

- ✅ `SET_POSTS` - Establecer lista de posts
- ✅ `ADD_POST` - Agregar nuevo post
- ✅ `DELETE_POST` - Eliminar post
- ✅ `SET_LOADING` - Cambiar estado de carga
- ✅ `SET_ERROR` - Cambiar estado de error

**Ejecución:**

```bash
npm run test src/context/__tests__/PostContext.test.ts
```

### 2. **AddPost.test.tsx**

Tests del componente de agregar posts:

- ✅ Renderización del formulario
- ✅ Actualización de inputs (title y body)
- ✅ Limpieza de formulario después del envío
- ✅ Dispatch de acciones
- ✅ Prevención del comportamiento por defecto

**Ejecución:**

```bash
npm run test src/components/posts/addPost/__tests__/AddPost.test.tsx
```

### 3. **PostList.test.tsx**

Tests del componente de lista de posts:

- ✅ Estados de loading y error
- ✅ Renderización de lista de posts
- ✅ Checkbox functionality
- ✅ Estructura HTML correcta

**Ejecución:**

```bash
npm run test src/components/posts/postList/__tests__/PostList.test.tsx
```

## 📝 Ejemplo de Test Unitario

### Estructura básica:

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { MiComponente } from '../MiComponente'

describe('MiComponente', () => {
  it('debe renderizar correctamente', () => {
    render(<MiComponente />)
    expect(screen.getByText('Texto esperado')).toBeInTheDocument()
  })

  it('debe actualizar estado cuando se interactúa', async () => {
    const user = userEvent.setup()
    render(<MiComponente />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText('Nuevo texto')).toBeInTheDocument()
  })
})
```

## 🔧 Configuración

### `vitest.config.ts`

Configuración principal de Vitest:

- Environment: `jsdom` (para simular DOM del navegador)
- Setup: `src/test/setup.ts` (se ejecuta antes de cada test)
- Coverage: Configurado con provider `v8`

### `src/test/setup.ts`

Configuración global:

- Limpia el DOM después de cada test
- Mock de console para evitar spam
- Importa matchers de Testing Library

## 📊 Cobertura de Código

Para generar un reporte de cobertura:

```bash
npm run test:coverage
```

Esto generará:

- Reporte en terminal
- Reporte en HTML (abre `coverage/index.html`)

## 🐛 Debugging Tests

### Opción 1: Debug mode

```bash
npm run test -- --inspect-brk
```

### Opción 2: `screen.debug()`

```typescript
it('debe renderizar', () => {
  render(<MiComponente />)
  screen.debug() // Imprime el HTML renderizado
})
```

### Opción 3: Usar la UI de Vitest

```bash
npm run test:ui
```

## 📚 Recursos Útiles

- [Documentación de Vitest](https://vitest.dev/)
- [Documentación de Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
