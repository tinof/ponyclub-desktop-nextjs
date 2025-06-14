# Biome Code Quality Issues - Prioritized Analysis

Based on our Biome v2.0 beta scan, we found **448 errors** and **3 warnings** across 111 files. Here's a systematic breakdown prioritized by severity and impact.

## Summary

- **Total Issues**: 451 (448 errors + 3 warnings)
- **Files Scanned**: 111
- **Critical Issues**: 3-5 (security, accessibility)
- **High Priority**: 15-20 (performance, type safety)
- **Medium Priority**: 50-100 (code quality)
- **Low Priority**: 300+ (style issues)

---

## 🚨 CRITICAL Priority Issues (Fix Immediately)

### Security Issues

#### 1. `noDangerouslySetInnerHtml` (2 occurrences)
**Files**: `app/[locale]/river-village/page.tsx`
**Risk**: XSS vulnerability
**Description**: Using `dangerouslySetInnerHTML` can expose users to cross-site scripting attacks

```bash
# Fix command
npx biome check --write app/[locale]/river-village/page.tsx
```

#### 2. `noDocumentCookie` (1 occurrence)
**Files**: `components/ui/sidebar.tsx`
**Risk**: Security best practices
**Description**: Direct assignment to `document.cookie` is not recommended

```bash
# Fix command
npx biome check --write components/ui/sidebar.tsx
```

### Logic Errors

#### 3. `noShadowRestrictedNames` (1 occurrence)
**Files**: `app/[locale]/error.tsx`
**Risk**: Variable shadowing can cause confusion
**Description**: Component named "Error" shadows the global Error constructor

```bash
# Fix command
npx biome check --write app/[locale]/error.tsx
```

---

## ⚠️ HIGH Priority Issues (Fix This Week)

### Accessibility Issues

#### 1. `useButtonType` (1 occurrence)
**Files**: `app/[locale]/error.tsx`
**Impact**: Screen reader accessibility
**Description**: Button elements need explicit type attribute

#### 2. `useHtmlLang` (1 occurrence)
**Files**: `app/global-error.tsx`
**Impact**: Screen reader accessibility
**Description**: HTML elements need lang attribute for screen readers

### Performance Issues

#### 3. `noArrayIndexKey` (4+ occurrences)
**Files**: `app/[locale]/for-schools/page.tsx`
**Impact**: React performance and state management
**Description**: Using array index as React key can cause rendering issues

### Type Safety Issues

#### 4. `noNonNullAssertion` (1 occurrence)
**Files**: `components/DynamicGoogleMap.tsx`
**Impact**: Runtime errors
**Description**: Non-null assertion operator (!) can cause runtime errors

#### 5. `useUniqueElementIds` (1 occurrence)
**Files**: `app/[locale]/layout.tsx`
**Impact**: DOM integrity
**Description**: Hardcoded IDs can cause conflicts when components are reused

---

## 📋 MEDIUM Priority Issues (Fix This Month)

### Code Quality

#### 1. `useBlockStatements` (3+ occurrences)
**Files**: `components/DynamicBokunWidget.tsx`, `lib/use-bokun-language.ts`
**Impact**: Code readability and consistency
**Description**: Single-line if statements should use block statements

#### 2. `noUnusedFunctionParameters` (1 occurrence)
**Files**: `components/ui/script-loader.tsx`
**Impact**: Code cleanliness
**Description**: Unused parameters might indicate incomplete refactoring

#### 3. `useExhaustiveDependencies` (1 occurrence)
**Files**: `components/BokunWidget.tsx`
**Impact**: React hooks correctness
**Description**: useEffect has unnecessary dependencies

---

## 🎨 LOW Priority Issues (Fix When Time Permits)

### Style Issues

#### 1. `noUselessFragments` (300+ occurrences)
**Files**: Multiple activity pages
**Impact**: Code cleanliness only
**Description**: Empty React fragments `<></>` are unnecessary

**Bulk fix command:**
```bash
# Apply safe fixes to all files
npx biome check --write app/[locale]/
```

---

## 📊 File-by-File Breakdown

### Most Problematic Files (by issue count)

1. **`app/[locale]/for-schools/page.tsx`** - ~50+ issues
   - Multiple `noArrayIndexKey` violations
   - Various style issues

2. **`app/[locale]/river-village/page.tsx`** - ~10+ issues
   - Critical: `noDangerouslySetInnerHtml` (2 occurrences)
   - Style issues

3. **`app/[locale]/error.tsx`** - ~5+ issues
   - Critical: `noShadowRestrictedNames`
   - High: `useButtonType`

4. **Activity pages** - ~5-10 issues each
   - Mostly `noUselessFragments` (low priority)

---

## 🛠️ Recommended Action Plan

### Phase 1: Critical Issues (This Week)
```bash
# Fix security and logic errors
npx biome check --write app/[locale]/river-village/page.tsx
npx biome check --write components/ui/sidebar.tsx
npx biome check --write app/[locale]/error.tsx
```

### Phase 2: High Priority (Next Week)
```bash
# Fix accessibility and performance issues
npx biome check --write app/[locale]/error.tsx
npx biome check --write app/global-error.tsx
npx biome check --write app/[locale]/for-schools/page.tsx
npx biome check --write components/DynamicGoogleMap.tsx
npx biome check --write app/[locale]/layout.tsx
```

### Phase 3: Medium Priority (This Month)
```bash
# Fix code quality issues
npx biome check --write components/DynamicBokunWidget.tsx
npx biome check --write lib/use-bokun-language.ts
npx biome check --write components/ui/script-loader.tsx
npx biome check --write components/BokunWidget.tsx
```

### Phase 4: Low Priority (When Time Permits)
```bash
# Apply all safe fixes
npx biome check --write .

# Or target specific directories
npx biome check --write app/[locale]/
npx biome check --write components/
```

---

## 🔧 Quick Commands Reference

```bash
# Check current status
npx biome check .

# Apply only safe fixes
npx biome check --write .

# Apply unsafe fixes (use with caution)
npx biome check --write --unsafe .

# Check specific files
npx biome check --write app/[locale]/error.tsx

# Format only (no linting)
npx biome format --write .

# Lint only (no formatting)
npx biome lint --write .
```

---

## 📈 Progress Tracking

- [ ] **Phase 1 Complete**: All critical security and logic issues fixed
- [ ] **Phase 2 Complete**: All accessibility and performance issues fixed  
- [ ] **Phase 3 Complete**: All code quality issues fixed
- [ ] **Phase 4 Complete**: All style issues cleaned up

**Target**: Reduce from 451 issues to <50 issues within 2 weeks.
