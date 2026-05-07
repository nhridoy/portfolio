---
title: Adding Verified Tag to GitHub Commits using SSH Keys
date: '2026-05-07'
tags: ['GitHub', 'Version Control', 'Development']
description: Learn how to add a verified tag to your GitHub commits for enhanced credibility.
enableComment: true
---

# Adding Verified Tag to GitHub Commits

Adding a verified tag to your GitHub commits enhances credibility and helps users trust the authenticity of your contributions.

## What is a Verified Commit?

A verified commit is a commit that has been signed with a GPG key or an SSH key, indicating that the commit was made by a trusted source. This is particularly important in open-source projects where multiple contributors are involved.

## Methods:
1. **Using GPG Keys**: This method involves generating a GPG key and configuring Git to use it for signing commits. It provides a high level of security and is widely supported.

2. **Using SSH Keys**: This method allows you to sign commits using your SSH key, which is often more convenient for developers who already use SSH for authentication with GitHub.

### Using SSH Keys to Sign Commits
In this post, we will focus on how to use SSH keys to sign your commits.

#### Step 1: Generate an SSH Key (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
This command will generate a new SSH key pair. Follow the prompts to save the key and set a passphrase if desired. You can also modify the file name and type of key if you prefer a different configuration.

#### Step 2: Add Your SSH Key to GitHub
1. Copy the contents of your public SSH key (usually found at `~/.ssh/id_ed25519.pub`).
   * For Linux/Mac:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
    * For Windows (using Git Bash):
    ```bash
    cat ~/.ssh/id_ed25519.pub
    ```
    * For Windows (using PowerShell):
    ```powershell
    Get-Content -Path $env:USERPROFILE\.ssh\id_ed25519.pub
    ```
    * For Windows (using Command Prompt):
    ```cmd
    type %USERPROFILE%\.ssh\id_ed25519.pub
    ```
2. Go to GitHub > Profile Icon > Settings > SSH and GPG keys > New SSH key.
3. In the "Title" field, add a descriptive name for the key (e.g., "My Laptop SSH Key").
4. For the "Key Type", select "Signing Key".
5. Paste the contents of your public SSH key into the "Key" field.
6. Click "Add SSH key".

#### Step 3: Configure Git to Use Your SSH Key for Signing
1. Tell Git that you want to use SSH keys for signing commits:
```bash
git config --global gpg.format ssh
```
2. Set your SSH key as the default signing key:
```bash
git config --global user.signingkey ~/.ssh/id_ed25519
```
3. Enable commit signing by default:
```bash
git config --global commit.gpgsign true
```

#### Step 4: Make a Signed Commit
```bash
git commit -S -m "Your commit message"
```

#### Step 5: Verify the Commit on GitHub
After pushing your commit to GitHub, you should see a "Verified" badge next to your commit in the repository's commit history.

## Conclusion
Adding a verified tag to your GitHub commits using SSH keys is a straightforward process that enhances the credibility of your contributions. By following the steps outlined above, you can ensure that your commits are trusted and recognized as authentic by the GitHub community.