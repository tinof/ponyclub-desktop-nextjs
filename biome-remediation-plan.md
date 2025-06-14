# Biome Issues Remediation Plan

This document provides a systematic approach to fixing the 451 code quality issues found by Biome v2.0 beta, prioritized by impact and urgency.

## 🎯 Execution Strategy

**Goal**: Reduce from 451 issues to <50 issues in 2 weeks
**Approach**: Fix high-impact issues first, then batch-process style issues

---

## 🚨 Phase 1: Critical Security & Logic Issues (Day 1-2)

**Priority**: IMMEDIATE - These issues pose security risks or can cause runtime errors.

### Task 1.1: Fix XSS Vulnerabilities
**Issue**: `noDangerouslySetInnerHtml` in river-village page
**Risk**: Cross-site scripting attacks

```bash
# Check the specific issue
npx biome check app/[locale]/river-village/page.tsx

# Manual fix required - replace dangerouslySetInnerHTML with safe alternatives
# Example: Use a markdown parser or sanitize HTML content
```

**Manual Fix Example**:
```typescript
// Before (unsafe)
<div dangerouslySetInnerHTML={{ __html: content }} />

// After (safe)
<div>{content}</div>
// OR use a markdown parser like react-markdown
```

### Task 1.2: Fix Cookie Security
**Issue**: `noDocumentCookie` in sidebar component

```bash
npx biome check components/ui/sidebar.tsx
```

**Manual Fix**: Replace direct cookie assignment with Cookie Store API or a cookie library.

### Task 1.3: Fix Variable Shadowing
**Issue**: `noShadowRestrictedNames` in error page

```bash
npx biome check app/[locale]/error.tsx
```

**Manual Fix**: Rename the Error component to avoid shadowing global Error.

**Estimated Time**: 2-4 hours

---

## ⚠️ Phase 2: High-Impact Accessibility & Performance (Day 3-5)

### Task 2.1: Fix Accessibility Issues

```bash
# Fix missing button types
npx biome check --write app/[locale]/error.tsx

# Fix missing HTML lang attribute  
npx biome check --write app/global-error.tsx
```

**Manual Fixes Required**:
- Add `type="button"` to button elements
- Add `lang="en"` or `lang="el"` to HTML elements

### Task 2.2: Fix React Performance Issues

```bash
# Fix array index keys (manual fix required)
npx biome check app/[locale]/for-schools/page.tsx
```

**Manual Fix**: Replace array index keys with stable unique identifiers:
```typescript
// Before
items.map((item, index) => <div key={index}>...)

// After  
items.map((item, index) => <div key={`item-${item.id || index}`}>...)
```

### Task 2.3: Fix Type Safety Issues

```bash
# Fix non-null assertions
npx biome check --write components/DynamicGoogleMap.tsx

# Fix hardcoded IDs
npx biome check --write app/[locale]/layout.tsx
```

**Estimated Time**: 4-6 hours

---

## 📋 Phase 3: Code Quality Improvements (Week 2)

### Task 3.1: Fix React Hooks Issues

```bash
# Fix useEffect dependencies
npx biome check --write components/BokunWidget.tsx
```

### Task 3.2: Fix Code Style Issues

```bash
# Fix block statements
npx biome check --write components/DynamicBokunWidget.tsx
npx biome check --write lib/use-bokun-language.ts

# Fix unused parameters
npx biome check --write components/ui/script-loader.tsx
```

**Estimated Time**: 2-3 hours

---

## 🎨 Phase 4: Bulk Style Cleanup (Week 2, End)

### Task 4.1: Remove Useless Fragments

Most of the remaining ~300 issues are `noUselessFragments` which are low-priority style issues.

```bash
# Apply all safe automatic fixes
npx biome check --write .

# If some issues remain, target specific directories
npx biome check --write app/[locale]/
npx biome check --write components/
```

**Estimated Time**: 30 minutes

---

## 🛠️ Daily Execution Commands

### Day 1: Critical Issues
```bash
# Morning: Security audit
npx biome check app/[locale]/river-village/page.tsx
npx biome check components/ui/sidebar.tsx
npx biome check app/[locale]/error.tsx

# Afternoon: Manual fixes for security issues
# (See manual fix examples above)
```

### Day 2: Accessibility & Performance  
```bash
# Fix what can be auto-fixed
npx biome check --write app/[locale]/error.tsx
npx biome check --write app/global-error.tsx
npx biome check --write components/DynamicGoogleMap.tsx

# Manual fixes for array keys and IDs
```

### Day 3-5: Code Quality
```bash
# Batch fix code quality issues
npx biome check --write components/
npx biome check --write lib/
```

### Week 2: Final Cleanup
```bash
# Apply all remaining safe fixes
npx biome check --write .

# Verify final state
npx biome check .
```

---

## 📊 Progress Tracking

### Milestones

- [ ] **Day 1**: All critical security issues fixed (3 issues)
- [ ] **Day 2**: All accessibility issues fixed (2 issues)  
- [ ] **Day 3**: All performance issues fixed (5+ issues)
- [ ] **Day 5**: All code quality issues fixed (10+ issues)
- [ ] **Week 2**: All style issues cleaned up (300+ issues)

### Success Metrics

- **Start**: 451 total issues
- **After Phase 1**: <440 issues (critical fixes)
- **After Phase 2**: <420 issues (high-priority fixes)
- **After Phase 3**: <400 issues (quality fixes)
- **After Phase 4**: <50 issues (target achieved)

---

## 🔍 Verification Commands

```bash
# Check overall progress
npx biome check . | grep "Found.*errors"

# Check specific categories
npx biome check . | grep -E "(security|accessibility|performance)"

# Generate updated report
npx biome check --reporter=json . > biome-progress.json
```

---

## 🚀 Automation Opportunities

### CI/CD Integration
```yaml
# Add to GitHub Actions or similar
- name: Biome Quality Gate
  run: |
    npx biome check .
    # Fail if critical issues found
    npx biome check . | grep -E "(security|accessibility)" && exit 1 || exit 0
```

### Pre-commit Hooks
```bash
# Add to package.json scripts
"pre-commit": "npx biome check --write --staged"
```

### VS Code Integration
Ensure the Biome extension (prerelease) is installed for real-time feedback.

---

## 📞 Support & Resources

- **Biome Documentation**: https://next.biomejs.dev/
- **Rule Reference**: https://biomejs.dev/linter/rules/
- **VS Code Extension**: Search "Biome" (use prerelease version)
- **Project Documentation**: `docs/BIOME_USAGE.md`

**Remember**: Focus on high-impact issues first. The majority of issues are low-priority style improvements that can be batch-processed later.
