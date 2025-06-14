#!/usr/bin/env python3
"""
Biome Issue Analyzer and Prioritizer
Analyzes Biome diagnostics JSON output and creates prioritized reports
"""

import json
import sys
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Any

# Priority categories with their rules
PRIORITY_RULES = {
    "CRITICAL": {
        "security": [
            "noDangerouslySetInnerHtml",
            "noDocumentCookie",
            "noGlobalEval",
            "noInnerDeclarations",
        ],
        "logic_errors": [
            "noShadowRestrictedNames",
            "noUndeclaredVariables",
            "noUnreachable",
            "noUnusedLabels",
            "useValidForDirection",
        ],
    },
    "HIGH": {
        "accessibility": [
            "useButtonType",
            "useHtmlLang",
            "useValidAnchor",
            "useValidAriaProps",
            "useKeyWithClickEvents",
            "useAltText",
        ],
        "performance": [
            "noArrayIndexKey",
            "useExhaustiveDependencies",
            "noFloatingPromises",
        ],
        "type_safety": [
            "noNonNullAssertion",
            "noExplicitAny",
            "useUniqueElementIds",
        ],
    },
    "MEDIUM": {
        "code_quality": [
            "useBlockStatements",
            "noUnusedFunctionParameters",
            "noImportCycles",
            "noPrivateImports",
        ],
        "maintainability": [
            "useImportExtensions",
            "noConsoleLog",
            "useConsistentObjectDefinition",
        ],
    },
    "LOW": {
        "style": [
            "noUselessFragments",
            "useShorthandArrayType",
            "useSingleVarDeclarator",
            "useNumberNamespace",
            "noInferrableTypes",
        ],
    },
}

def get_rule_priority(rule_name: str) -> tuple[str, str]:
    """Get priority level and category for a rule"""
    for priority, categories in PRIORITY_RULES.items():
        for category, rules in categories.items():
            if rule_name in rules:
                return priority, category
    return "UNKNOWN", "unknown"

def analyze_diagnostics(json_file: Path) -> Dict[str, Any]:
    """Analyze Biome diagnostics JSON file"""
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    summary = data.get('summary', {})
    diagnostics = data.get('diagnostics', [])
    
    # Group issues by priority and category
    issues_by_priority = defaultdict(lambda: defaultdict(list))
    file_issues = defaultdict(list)
    rule_counts = defaultdict(int)
    
    for diagnostic in diagnostics:
        rule_name = diagnostic.get('category', '').split('/')[-1]
        file_path = diagnostic.get('location', {}).get('path', {}).get('file', 'unknown')
        severity = diagnostic.get('severity', 'info')
        
        priority, category = get_rule_priority(rule_name)
        
        issue = {
            'rule': rule_name,
            'file': file_path,
            'severity': severity,
            'description': diagnostic.get('description', ''),
            'category_full': diagnostic.get('category', ''),
            'priority': priority,
            'category': category,
        }
        
        issues_by_priority[priority][category].append(issue)
        file_issues[file_path].append(issue)
        rule_counts[rule_name] += 1
    
    return {
        'summary': summary,
        'issues_by_priority': dict(issues_by_priority),
        'file_issues': dict(file_issues),
        'rule_counts': dict(rule_counts),
        'total_issues': len(diagnostics),
    }

def generate_markdown_report(analysis: Dict[str, Any], output_file: Path):
    """Generate a markdown report from the analysis"""
    with open(output_file, 'w') as f:
        f.write("# Biome Code Quality Report\n\n")
        
        # Summary
        summary = analysis['summary']
        f.write("## Summary\n\n")
        f.write(f"- **Total Issues**: {analysis['total_issues']}\n")
        f.write(f"- **Errors**: {summary.get('errors', 0)}\n")
        f.write(f"- **Warnings**: {summary.get('warnings', 0)}\n")
        f.write(f"- **Files Scanned**: {summary.get('unchanged', 0)}\n")
        f.write(f"- **Scan Duration**: {summary.get('duration', {}).get('secs', 0)}s\n\n")
        
        # Priority breakdown
        f.write("## Issues by Priority\n\n")
        priority_order = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN"]
        
        for priority in priority_order:
            if priority not in analysis['issues_by_priority']:
                continue
                
            categories = analysis['issues_by_priority'][priority]
            total_priority_issues = sum(len(issues) for issues in categories.values())
            
            f.write(f"### {priority} Priority ({total_priority_issues} issues)\n\n")
            
            for category, issues in categories.items():
                f.write(f"#### {category.title()} ({len(issues)} issues)\n\n")
                
                # Group by rule for better readability
                rules_in_category = defaultdict(list)
                for issue in issues:
                    rules_in_category[issue['rule']].append(issue)
                
                for rule, rule_issues in rules_in_category.items():
                    f.write(f"**{rule}** ({len(rule_issues)} occurrences)\n")
                    f.write(f"- Description: {rule_issues[0]['description']}\n")
                    f.write(f"- Severity: {rule_issues[0]['severity']}\n")
                    
                    # Show first few files
                    files = list(set(issue['file'] for issue in rule_issues))
                    if len(files) <= 3:
                        f.write(f"- Files: {', '.join(files)}\n")
                    else:
                        f.write(f"- Files: {', '.join(files[:3])} and {len(files) - 3} more\n")
                    f.write("\n")
                
                f.write("\n")
        
        # Top problematic files
        f.write("## Most Problematic Files\n\n")
        file_issue_counts = [(file, len(issues)) for file, issues in analysis['file_issues'].items()]
        file_issue_counts.sort(key=lambda x: x[1], reverse=True)
        
        for file, count in file_issue_counts[:10]:
            f.write(f"- **{file}**: {count} issues\n")
        
        f.write("\n")
        
        # Rule frequency
        f.write("## Most Common Rules\n\n")
        rule_counts = list(analysis['rule_counts'].items())
        rule_counts.sort(key=lambda x: x[1], reverse=True)
        
        for rule, count in rule_counts[:15]:
            priority, category = get_rule_priority(rule)
            f.write(f"- **{rule}**: {count} occurrences ({priority} priority, {category})\n")

def generate_action_plan(analysis: Dict[str, Any], output_file: Path):
    """Generate an actionable remediation plan"""
    with open(output_file, 'w') as f:
        f.write("# Biome Issues Remediation Plan\n\n")
        
        f.write("## Recommended Action Sequence\n\n")
        f.write("Address issues in this order for maximum impact:\n\n")
        
        priority_order = ["CRITICAL", "HIGH", "MEDIUM", "LOW"]
        
        for i, priority in enumerate(priority_order, 1):
            if priority not in analysis['issues_by_priority']:
                continue
                
            categories = analysis['issues_by_priority'][priority]
            total_issues = sum(len(issues) for issues in categories.values())
            
            f.write(f"### Phase {i}: {priority} Priority Issues ({total_issues} issues)\n\n")
            
            for category, issues in categories.items():
                f.write(f"#### {category.title()} Issues\n\n")
                
                # Group by rule and provide specific commands
                rules_in_category = defaultdict(list)
                for issue in issues:
                    rules_in_category[issue['rule']].append(issue)
                
                for rule, rule_issues in rules_in_category.items():
                    f.write(f"**Fix {rule}** ({len(rule_issues)} occurrences)\n\n")
                    
                    # Provide specific fix commands
                    files = list(set(issue['file'] for issue in rule_issues))
                    if len(files) <= 5:
                        file_list = ' '.join(files)
                        f.write(f"```bash\n")
                        f.write(f"# Check specific files\n")
                        f.write(f"npx biome check --write {file_list}\n")
                        f.write(f"```\n\n")
                    else:
                        f.write(f"```bash\n")
                        f.write(f"# Too many files, check by directory\n")
                        f.write(f"npx biome check --write app/ components/ lib/\n")
                        f.write(f"```\n\n")
                    
                    f.write(f"Description: {rule_issues[0]['description']}\n\n")
                
                f.write("\n")
        
        f.write("## Quick Commands\n\n")
        f.write("```bash\n")
        f.write("# Apply all safe fixes\n")
        f.write("npx biome check --write .\n\n")
        f.write("# Apply unsafe fixes (use with caution)\n")
        f.write("npx biome check --write --unsafe .\n\n")
        f.write("# Check specific rule category\n")
        f.write("npx biome lint --write .\n\n")
        f.write("# Format only\n")
        f.write("npx biome format --write .\n")
        f.write("```\n")

def main():
    """Main function"""
    json_file = Path("biome-diagnostics.json")
    
    if not json_file.exists():
        print(f"Error: {json_file} not found. Run Biome diagnostics first.")
        sys.exit(1)
    
    print("Analyzing Biome diagnostics...")
    analysis = analyze_diagnostics(json_file)
    
    # Generate reports
    markdown_report = Path("biome-issues-report.md")
    action_plan = Path("biome-remediation-plan.md")
    
    print(f"Generating markdown report: {markdown_report}")
    generate_markdown_report(analysis, markdown_report)
    
    print(f"Generating action plan: {action_plan}")
    generate_action_plan(analysis, action_plan)
    
    print("\nAnalysis complete!")
    print(f"Total issues: {analysis['total_issues']}")
    
    # Print priority summary
    for priority in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:
        if priority in analysis['issues_by_priority']:
            count = sum(len(issues) for issues in analysis['issues_by_priority'][priority].values())
            print(f"{priority}: {count} issues")

if __name__ == "__main__":
    main()
