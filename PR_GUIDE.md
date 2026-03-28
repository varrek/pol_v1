# Creating Pull Request for QR Code Feature

All code changes are committed locally on the `feature/qr-code-poll-sharing` branch. Follow these steps to push and create a PR.

## Step 1: Push the Feature Branch

```bash
# Navigate to project directory
cd /home/i.kozlov/Projects/test

# Push the feature branch to remote
git push -u origin feature/qr-code-poll-sharing
```

**Note**: You may need to authenticate with GitHub. Use one of these methods:
- Personal Access Token (PAT)
- SSH key
- GitHub CLI (`gh auth login`)

## Step 2: Create Pull Request

### Option A: Using GitHub CLI (Recommended)

```bash
gh pr create \
  --title "Add QR Code Poll Sharing Feature" \
  --body-file - <<'EOF'
## 🎯 Feature: QR Code Poll Sharing

This PR implements QR code functionality to allow users to easily share and join polls by scanning QR codes.

### ✨ What's New

- **QR Code Generation**: Every poll now displays a shareable QR code
- **QR Code Scanner**: New "Scan QR" button to join polls via camera
- **Deep Linking**: Support for direct poll URLs with hash routing (`#poll/poll_id`)
- **Share Options**: Copy link and download QR code buttons

### 📋 Implementation Details

#### Added Features:
1. **QR Code Libraries**
   - QRCode.js for generation
   - html5-qrcode for scanning

2. **UI Components**
   - QR display section in poll details
   - Scanner view with camera access
   - Share buttons (Copy Link, Download QR)

3. **URL Handling**
   - Hash-based routing for polls
   - Deep link support
   - Browser history integration

4. **Error Handling**
   - Camera permission requests
   - Invalid QR code detection
   - Non-existent poll handling

### ✅ Testing

- [x] QR code generation works
- [x] QR codes encode correct URLs
- [x] Scanner detects and parses QR codes
- [x] Deep links navigate to correct polls
- [x] Copy link functionality works
- [x] Download QR code works
- [x] Error handling for invalid codes
- [ ] Mobile device testing (manual)

### 📊 OpenSpec Status

- **Change**: `add-qr-code-sharing`
- **Tasks**: 21/23 completed (91%)
- **Validation**: ✅ Passed strict checks

### 🔗 Related

- Depends on: #voting and #web-ui capabilities
- OpenSpec proposal: `openspec/changes/add-qr-code-sharing/`

### 📝 Files Changed

- `index.html`: Added QR generation, scanning, and deep linking
- `openspec/changes/add-qr-code-sharing/`: Complete proposal and spec
EOF
  --base main \
  --head feature/qr-code-poll-sharing
```

### Option B: Using GitHub Web Interface

1. Push the branch (Step 1 above)
2. Go to: https://github.com/varrek/pol_v1/pulls
3. Click "New pull request"
4. Set:
   - **base**: `main`
   - **compare**: `feature/qr-code-poll-sharing`
5. Fill in title: "Add QR Code Poll Sharing Feature"
6. Copy the PR description from the EOF block above
7. Click "Create pull request"

## Step 3: Request Copilot Review

Once the PR is created, request an automated review:

```bash
# Get the PR number from the output of Step 2, then:
gh pr view <PR_NUMBER> --web

# Or use GitHub CLI to request Copilot review:
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/varrek/pol_v1/pulls/<PR_NUMBER>/requested_reviewers \
  -f "reviewers[]=github-copilot[bot]"
```

Or in the web interface:
1. Open the PR
2. Click "Reviewers" → "Request" → Select "Copilot"

## Troubleshooting

### Authentication Issues

If `git push` fails with authentication error:

**Using Personal Access Token:**
```bash
git remote set-url origin https://<YOUR_TOKEN>@github.com/varrek/pol_v1.git
git push -u origin feature/qr-code-poll-sharing
```

**Using SSH:**
```bash
git remote set-url origin git@github.com:varrek/pol_v1.git
git push -u origin feature/qr-code-poll-sharing
```

**Using GitHub CLI:**
```bash
gh auth login
git push -u origin feature/qr-code-poll-sharing
```

### Branch Already Exists

If the remote branch exists but is out of sync:
```bash
git push --force-with-lease origin feature/qr-code-poll-sharing
```

## Summary of Changes

### Files Modified:
- **index.html** (1089 lines)
  - Added QR generation libraries (qrcode.js, html5-qrcode)
  - Implemented QR display in poll details
  - Added scanner view with camera access
  - Implemented URL hash routing
  - Added copy/download QR functionality

### Files Added:
- **openspec/changes/add-qr-code-sharing/proposal.md**
- **openspec/changes/add-qr-code-sharing/specs/qr-sharing/spec.md**
- **openspec/changes/add-qr-code-sharing/tasks.md**

### Commits:
1. Add QR code poll sharing feature (current HEAD on feature branch)

---

**Ready to proceed?** Start with Step 1 above to push your changes!


