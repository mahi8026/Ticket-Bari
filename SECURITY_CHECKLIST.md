# Security Checklist for Ticket Bari

## 🔒 Critical Security Items

### ✅ Completed

- [x] Created comprehensive `.gitignore` file
- [x] Created `.env.example` template
- [x] Added environment variable protection

### ⚠️ URGENT - Do These Now!

#### 1. Check Git History for Exposed Secrets

If you've already committed `.env` or sensitive files, they're still in git history!

```bash
# Check if .env was ever committed
git log --all --full-history -- .env

# If found, you MUST remove it from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: This rewrites history!)
git push origin --force --all
```

#### 2. Rotate All Exposed API Keys

If your `.env` file was ever committed, assume all keys are compromised:

**Firebase:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Generate new keys
5. Update `.env` with new keys

**ImgBB:**

1. Go to [ImgBB API](https://api.imgbb.com/)
2. Generate new API key
3. Update `.env` with new key

**Stripe:**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Developers > API Keys
3. Roll keys (create new ones)
4. Update `.env` with new keys

#### 3. Verify .env is NOT in Repository

```bash
# This should return nothing
git ls-files | grep .env

# If it shows .env, remove it
git rm --cached .env
git commit -m "Remove .env from repository"
git push
```

---

## 🛡️ Security Best Practices

### Environment Variables

#### ✅ DO:

- Use `.env` for all sensitive data
- Keep `.env` in `.gitignore`
- Use `.env.example` for documentation
- Rotate keys regularly (every 3-6 months)
- Use different keys for dev/staging/production

#### ❌ DON'T:

- Never commit `.env` files
- Never hardcode API keys in code
- Never share `.env` files via email/chat
- Never use production keys in development
- Never log sensitive data

### Current Environment Variables

```env
# Firebase (Public - OK to expose in frontend)
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=

# ImgBB (PRIVATE - Keep secret!)
VITE_image_host=

# Stripe (PUBLIC KEY - OK to expose)
VITE_STRIPE_PK=
```

**Note:** Firebase config is safe to expose in frontend, but ImgBB API key should be kept private.

---

## 🔐 Additional Security Measures

### 1. Firebase Security Rules

Ensure your Firebase has proper security rules:

**Firestore Rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Tickets - public read, authenticated write
    match /tickets/{ticketId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        (resource.data.vendorEmail == request.auth.token.email ||
         request.auth.token.role == 'admin');
    }

    // Bookings - only owner can access
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null &&
        resource.data.userEmail == request.auth.token.email;
    }
  }
}
```

**Storage Rules:**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null &&
        request.resource.size < 5 * 1024 * 1024 && // 5MB limit
        request.resource.contentType.matches('image/.*');
    }
  }
}
```

### 2. API Security (Backend)

Ensure your backend has:

- CORS properly configured
- Rate limiting enabled
- Input validation
- SQL injection prevention
- XSS protection
- CSRF tokens

### 3. Stripe Security

- Never expose secret keys (only use publishable keys in frontend)
- Always validate payments on backend
- Use webhooks for payment confirmation
- Enable Stripe Radar for fraud detection

### 4. Authentication Security

- Enforce strong passwords
- Enable email verification
- Implement rate limiting on login
- Use secure session management
- Enable 2FA for admin accounts

---

## 📋 Security Audit Checklist

### Code Security

- [ ] No hardcoded credentials in code
- [ ] No sensitive data in console.logs
- [ ] No API keys in client-side code
- [ ] Input validation on all forms
- [ ] XSS protection implemented
- [ ] CSRF protection implemented

### Infrastructure Security

- [ ] HTTPS enabled (SSL certificate)
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] DDoS protection enabled

### Data Security

- [ ] Passwords hashed (bcrypt/argon2)
- [ ] Sensitive data encrypted at rest
- [ ] Secure data transmission (HTTPS)
- [ ] Regular database backups
- [ ] Access logs enabled

### Authentication & Authorization

- [ ] Strong password requirements
- [ ] Email verification enabled
- [ ] Role-based access control (RBAC)
- [ ] Session timeout configured
- [ ] Secure password reset flow

### Monitoring & Logging

- [ ] Error logging enabled
- [ ] Security event logging
- [ ] Failed login attempt monitoring
- [ ] Suspicious activity alerts
- [ ] Regular security audits

---

## 🚨 Incident Response Plan

### If API Keys are Compromised:

1. **Immediate Actions:**
   - Rotate all affected keys immediately
   - Review access logs for suspicious activity
   - Notify team members
   - Document the incident

2. **Investigation:**
   - Check git history for exposed secrets
   - Review recent commits
   - Check deployment logs
   - Identify scope of exposure

3. **Remediation:**
   - Update all affected systems with new keys
   - Force logout all users (if needed)
   - Review and update security policies
   - Implement additional monitoring

4. **Prevention:**
   - Add pre-commit hooks to prevent secret commits
   - Implement secret scanning tools
   - Conduct security training
   - Regular security audits

---

## 🔧 Security Tools

### Recommended Tools:

1. **Git Secrets Scanner:**

```bash
# Install git-secrets
npm install -g git-secrets

# Initialize in your repo
git secrets --install
git secrets --register-aws
```

2. **Pre-commit Hooks:**

```bash
# Install husky
npm install --save-dev husky

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
```

3. **Dependency Scanning:**

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

4. **Environment Variable Validation:**

```javascript
// Add to your app startup
const requiredEnvVars = [
  "VITE_apiKey",
  "VITE_authDomain",
  "VITE_projectId",
  "VITE_STRIPE_PK",
];

requiredEnvVars.forEach((varName) => {
  if (!import.meta.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});
```

---

## 📚 Security Resources

### Documentation:

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Stripe Security Best Practices](https://stripe.com/docs/security)
- [Web Security Basics](https://developer.mozilla.org/en-US/docs/Web/Security)

### Tools:

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [GitGuardian](https://www.gitguardian.com/)
- [Snyk](https://snyk.io/)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

## ✅ Quick Security Check

Run these commands to verify your security:

```bash
# 1. Check if .env is ignored
git check-ignore .env
# Should output: .env

# 2. Check if .env is tracked
git ls-files | grep .env
# Should output: nothing

# 3. Check for secrets in code
grep -r "apiKey\|password\|secret" src/ --exclude-dir=node_modules
# Review any matches

# 4. Check dependencies
npm audit
# Fix any high/critical vulnerabilities

# 5. Verify .env.example exists
ls -la | grep .env.example
# Should show .env.example
```

---

## 📞 Security Contacts

### Report Security Issues:

- **Email:** security@ticketbari.com (if available)
- **GitHub:** Create a private security advisory
- **Emergency:** Contact team lead immediately

### Regular Security Reviews:

- **Frequency:** Monthly
- **Responsible:** Development Team Lead
- **Documentation:** Update this checklist

---

**Last Updated:** February 2026
**Next Review:** March 2026
**Status:** 🟡 In Progress (Complete urgent items above!)
