#!/bin/bash

# Biome Quality Check Script
# Provides structured reporting and quality gates for CI/CD and development

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CRITICAL_RULES="noDangerouslySetInnerHtml|noDocumentCookie|noShadowRestrictedNames|noGlobalEval"
HIGH_PRIORITY_RULES="useButtonType|useHtmlLang|noArrayIndexKey|noNonNullAssertion|useUniqueElementIds"
MAX_CRITICAL_ISSUES=0
MAX_HIGH_PRIORITY_ISSUES=5
MAX_TOTAL_ISSUES=100

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Biome Code Quality Report${NC}"
    echo -e "${BLUE}================================${NC}"
    echo ""
}

print_section() {
    echo -e "${YELLOW}$1${NC}"
    echo "----------------------------------------"
}

check_biome_installed() {
    if ! command -v npx biome &> /dev/null; then
        echo -e "${RED}Error: Biome is not installed${NC}"
        echo "Run: pnpm add --save-dev @biomejs/biome@beta"
        exit 1
    fi
}

run_biome_check() {
    local mode=$1
    local output_file="biome-report-$(date +%Y%m%d-%H%M%S).json"
    
    echo -e "${BLUE}Running Biome analysis...${NC}"
    
    if [ "$mode" = "ci" ]; then
        # CI mode - stricter, no fixes
        npx biome check --reporter=json . > "$output_file" 2>/dev/null || true
    else
        # Development mode - can apply fixes
        npx biome check --reporter=json . > "$output_file" 2>/dev/null || true
    fi
    
    echo "$output_file"
}

analyze_results() {
    local report_file=$1
    
    # Extract summary (handle the warning message)
    local summary=$(grep -o '"summary":{[^}]*}' "$report_file" | head -1)
    local errors=$(echo "$summary" | grep -o '"errors":[0-9]*' | cut -d':' -f2)
    local warnings=$(echo "$summary" | grep -o '"warnings":[0-9]*' | cut -d':' -f2)
    
    # Count critical issues
    local critical_count=$(grep -c -E "$CRITICAL_RULES" "$report_file" 2>/dev/null || echo "0")
    
    # Count high priority issues  
    local high_priority_count=$(grep -c -E "$HIGH_PRIORITY_RULES" "$report_file" 2>/dev/null || echo "0")
    
    local total_issues=$((errors + warnings))
    
    print_section "📊 Issue Summary"
    echo "Total Issues: $total_issues"
    echo "  - Errors: $errors"
    echo "  - Warnings: $warnings"
    echo ""
    echo "Priority Breakdown:"
    echo "  - Critical: $critical_count"
    echo "  - High Priority: $high_priority_count"
    echo "  - Other: $((total_issues - critical_count - high_priority_count))"
    echo ""
    
    # Quality gates
    local exit_code=0
    
    print_section "🚦 Quality Gates"
    
    if [ "$critical_count" -gt "$MAX_CRITICAL_ISSUES" ]; then
        echo -e "${RED}❌ CRITICAL: $critical_count critical issues found (max: $MAX_CRITICAL_ISSUES)${NC}"
        exit_code=1
    else
        echo -e "${GREEN}✅ CRITICAL: $critical_count critical issues (within limit)${NC}"
    fi
    
    if [ "$high_priority_count" -gt "$MAX_HIGH_PRIORITY_ISSUES" ]; then
        echo -e "${YELLOW}⚠️  HIGH: $high_priority_count high-priority issues found (max: $MAX_HIGH_PRIORITY_ISSUES)${NC}"
        if [ "$1" = "ci" ]; then
            exit_code=1
        fi
    else
        echo -e "${GREEN}✅ HIGH: $high_priority_count high-priority issues (within limit)${NC}"
    fi
    
    if [ "$total_issues" -gt "$MAX_TOTAL_ISSUES" ]; then
        echo -e "${YELLOW}⚠️  TOTAL: $total_issues total issues found (target: <$MAX_TOTAL_ISSUES)${NC}"
    else
        echo -e "${GREEN}✅ TOTAL: $total_issues total issues (within target)${NC}"
    fi
    
    echo ""
    
    return $exit_code
}

show_critical_issues() {
    local report_file=$1
    
    print_section "🚨 Critical Issues Details"
    
    if grep -q -E "$CRITICAL_RULES" "$report_file" 2>/dev/null; then
        echo "Critical security/logic issues found:"
        grep -E "$CRITICAL_RULES" "$report_file" | head -5 || true
        echo ""
        echo "Fix immediately with:"
        echo "  npx biome check --write <affected-files>"
    else
        echo -e "${GREEN}No critical issues found!${NC}"
    fi
    echo ""
}

show_recommendations() {
    local total_issues=$1
    local mode=$2
    
    print_section "💡 Recommendations"
    
    if [ "$total_issues" -gt 200 ]; then
        echo "High issue count detected. Recommended approach:"
        echo "1. Fix critical issues first: npx biome check --write <critical-files>"
        echo "2. Apply safe bulk fixes: npx biome check --write ."
        echo "3. Review remaining issues manually"
    elif [ "$total_issues" -gt 50 ]; then
        echo "Moderate issue count. Recommended approach:"
        echo "1. Apply safe fixes: npx biome check --write ."
        echo "2. Review and fix remaining issues"
    else
        echo "Low issue count. You're doing great!"
        echo "Run: npx biome check --write . to fix remaining issues"
    fi
    
    if [ "$mode" != "ci" ]; then
        echo ""
        echo "Development commands:"
        echo "  pnpm run check     # Run full check with fixes"
        echo "  pnpm run format    # Format only"
        echo "  pnpm run lint      # Lint only"
    fi
    
    echo ""
}

# Main execution
main() {
    local mode=${1:-"dev"}  # dev or ci
    
    print_header
    check_biome_installed
    
    local report_file=$(run_biome_check "$mode")
    
    if [ ! -f "$report_file" ] || [ ! -s "$report_file" ]; then
        echo -e "${RED}Error: Failed to generate Biome report${NC}"
        exit 1
    fi
    
    # Analyze results
    if analyze_results "$mode"; then
        local exit_code=$?
    else
        local exit_code=$?
    fi
    
    show_critical_issues "$report_file"
    
    # Extract total issues for recommendations
    local summary=$(grep -o '"summary":{[^}]*}' "$report_file" | head -1)
    local errors=$(echo "$summary" | grep -o '"errors":[0-9]*' | cut -d':' -f2)
    local warnings=$(echo "$summary" | grep -o '"warnings":[0-9]*' | cut -d':' -f2)
    local total_issues=$((errors + warnings))
    
    show_recommendations "$total_issues" "$mode"
    
    print_section "📁 Report Files"
    echo "Detailed report saved to: $report_file"
    echo "View with: cat $report_file | jq ."
    echo ""
    
    if [ "$mode" = "ci" ] && [ $exit_code -ne 0 ]; then
        echo -e "${RED}❌ Quality gate failed. Please fix critical issues before merging.${NC}"
    elif [ $exit_code -eq 0 ]; then
        echo -e "${GREEN}✅ Quality gate passed!${NC}"
    fi
    
    exit $exit_code
}

# Help function
show_help() {
    echo "Biome Quality Check Script"
    echo ""
    echo "Usage: $0 [mode]"
    echo ""
    echo "Modes:"
    echo "  dev (default) - Development mode with recommendations"
    echo "  ci            - CI mode with strict quality gates"
    echo "  help          - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0              # Run in development mode"
    echo "  $0 ci           # Run in CI mode"
    echo "  $0 help         # Show help"
}

# Parse arguments
case "${1:-dev}" in
    "help"|"-h"|"--help")
        show_help
        exit 0
        ;;
    "ci"|"dev")
        main "$1"
        ;;
    *)
        echo "Unknown mode: $1"
        show_help
        exit 1
        ;;
esac
