#!/bin/bash

# Security Check Script for Ticket Bari
# This script checks for common security issues

echo "🔒 Running Security Checks..."
echo ""

# Check 1: Verify .env is in .gitignore
echo "✓ Check 1: Verifying .env is in .gitignore..."
if grep -q "^\.env$" .gitignore; then
    echo "  ✅ .env is in .gitignore"
else
    echo "  ❌ WARNING: .env is NOT in .gitignore!"
fi
echo ""

# Check 2: Verify .env is not tracked by git
echo "✓ Check 2: Verifying .env is not tracked..."
if git ls-files | grep -q "^\.env$"; then
    echo "  ❌ CRITICAL: .env is tracked by git!"
    echo "  Run: git rm --cached .env"
else
    echo "  ✅ .env is not tracked"
fi
echo ""

# Check 3: Check if .env was ever in git history
echo "✓ Check 3: Checking git history for .env..."
if git log --all --full-history -- .env 2>/dev/null | grep -q "commit"; then
    echo "  ❌ CRITICAL: .env was found in git history!"
    echo "  You MUST remove it from history and rotate all API keys!"
    echo "  See SECURITY_CHECKLIST.md for instructions"
else
    echo "  ✅ .env not found in git history"
fi
echo ""

# Check 4: Check for hardcoded secrets in code
echo "✓ Check 4: Scanning for potential hardcoded secrets..."
SECRETS_FOUND=0

# Check for common secret patterns
if grep -r "apiKey.*=.*['\"].*['\"]" src/ --exclude-dir=node_modules 2>/dev/null | grep -v "import.meta.env" | grep -q .; then
    echo "  ⚠️  WARNING: Potential hardcoded API keys found"
    SECRETS_FOUND=1
fi

if grep -r "password.*=.*['\"].*['\"]" src/ --exclude-dir=node_modules 2>/dev/null | grep -v "type=\"password\"" | grep -q .; then
    echo "  ⚠️  WARNING: Potential hardcoded passwords found"
    SECRETS_FOUND=1
fi

if grep -r "secret.*=.*['\"].*['\"]" src/ --exclude-dir=node_modules 2>/dev/null | grep -v "import.meta.env" | grep -q .; then
    echo "  ⚠️  WARNING: Potential hardcoded secrets found"
    SECRETS_FOUND=1
fi

if [ $SECRETS_FOUND -eq 0 ]; then
    echo "  ✅ No obvious hardcoded secrets found"
fi
echo ""

# Check 5: Verify .env.example exists
echo "✓ Check 5: Verifying .env.example exists..."
if [ -f ".env.example" ]; then
    echo "  ✅ .env.example exists"
else
    echo "  ⚠️  WARNING: .env.example not found"
fi
echo ""

# Check 6: Check for vulnerable dependencies
echo "✓ Check 6: Checking for vulnerable dependencies..."
if command -v npm &> /dev/null; then
    npm audit --audit-level=high 2>&1 | grep -q "found 0 vulnerabilities"
    if [ $? -eq 0 ]; then
        echo "  ✅ No high/critical vulnerabilities found"
    else
        echo "  ⚠️  WARNING: Vulnerabilities found. Run 'npm audit' for details"
    fi
else
    echo "  ⚠️  npm not found, skipping dependency check"
fi
echo ""

# Check 7: Verify Firebase config is not in .gitignore
echo "✓ Check 7: Verifying .firebaserc status..."
if git ls-files | grep -q "^\.firebaserc$"; then
    echo "  ⚠️  WARNING: .firebaserc is tracked (contains project ID)"
    echo "  Consider adding to .gitignore if it contains sensitive info"
else
    echo "  ✅ .firebaserc is not tracked"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Security Check Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next Steps:"
echo "1. Review any warnings or critical issues above"
echo "2. Read SECURITY_CHECKLIST.md for detailed instructions"
echo "3. If .env was in git history, rotate ALL API keys"
echo "4. Run 'npm audit fix' to fix vulnerabilities"
echo ""
echo "For more information, see:"
echo "  - SECURITY_CHECKLIST.md"
echo "  - .env.example"
echo ""
