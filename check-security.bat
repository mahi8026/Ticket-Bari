@echo off
REM Security Check Script for Ticket Bari (Windows)
REM This script checks for common security issues

echo.
echo 🔒 Running Security Checks...
echo.

REM Check 1: Verify .env is in .gitignore
echo ✓ Check 1: Verifying .env is in .gitignore...
findstr /C:".env" .gitignore >nul 2>&1
if %errorlevel% equ 0 (
    echo   ✅ .env is in .gitignore
) else (
    echo   ❌ WARNING: .env is NOT in .gitignore!
)
echo.

REM Check 2: Verify .env is not tracked by git
echo ✓ Check 2: Verifying .env is not tracked...
git ls-files | findstr /C:".env" >nul 2>&1
if %errorlevel% equ 0 (
    echo   ❌ CRITICAL: .env is tracked by git!
    echo   Run: git rm --cached .env
) else (
    echo   ✅ .env is not tracked
)
echo.

REM Check 3: Check if .env was ever in git history
echo ✓ Check 3: Checking git history for .env...
git log --all --full-history -- .env 2>nul | findstr /C:"commit" >nul 2>&1
if %errorlevel% equ 0 (
    echo   ❌ CRITICAL: .env was found in git history!
    echo   You MUST remove it from history and rotate all API keys!
    echo   See SECURITY_CHECKLIST.md for instructions
) else (
    echo   ✅ .env not found in git history
)
echo.

REM Check 4: Verify .env.example exists
echo ✓ Check 4: Verifying .env.example exists...
if exist ".env.example" (
    echo   ✅ .env.example exists
) else (
    echo   ⚠️  WARNING: .env.example not found
)
echo.

REM Check 5: Check for vulnerable dependencies
echo ✓ Check 5: Checking for vulnerable dependencies...
where npm >nul 2>&1
if %errorlevel% equ 0 (
    npm audit --audit-level=high 2>&1 | findstr /C:"found 0 vulnerabilities" >nul 2>&1
    if %errorlevel% equ 0 (
        echo   ✅ No high/critical vulnerabilities found
    ) else (
        echo   ⚠️  WARNING: Vulnerabilities found. Run 'npm audit' for details
    )
) else (
    echo   ⚠️  npm not found, skipping dependency check
)
echo.

REM Check 6: Verify .firebaserc status
echo ✓ Check 6: Verifying .firebaserc status...
git ls-files | findstr /C:".firebaserc" >nul 2>&1
if %errorlevel% equ 0 (
    echo   ⚠️  WARNING: .firebaserc is tracked (contains project ID)
    echo   Consider adding to .gitignore if it contains sensitive info
) else (
    echo   ✅ .firebaserc is not tracked
)
echo.

REM Summary
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📊 Security Check Summary
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Next Steps:
echo 1. Review any warnings or critical issues above
echo 2. Read SECURITY_CHECKLIST.md for detailed instructions
echo 3. If .env was in git history, rotate ALL API keys
echo 4. Run 'npm audit fix' to fix vulnerabilities
echo.
echo For more information, see:
echo   - SECURITY_CHECKLIST.md
echo   - .env.example
echo.
pause
