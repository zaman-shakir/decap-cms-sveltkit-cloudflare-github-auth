# Decap CMS with SvelteKit and GitHub OAuth Integration

This repository contains a Decap CMS implementation with SvelteKit deployed into Cloudflare Pages, integrated with GitHub OAuth for authentication.

## Installation

1. **Create OAuth application at GitHub:**
   - Go to Settings -> Developer Settings and choose OAuth Apps.
   - Create a new OAuth App. Name it anything you like.
   - Set Homepage URL to your site’s URL.
   - Set Authorization callback URL to your homepage URL with `/api/callback` appended (e.g., `https://example.com/api/callback`).

2. **Generate GitHub Client Secret Key:**
   - Obtain the `CLIENT_SECRET_KEY` in GitHub.
   - Both `GITHUB_CLIENT_ID` and `CLIENT_SECRET_KEY` will be necessary for authentication.

3. **Add Required Files to Your Project:**
   - Include the following files from this repository into your project.
   - If Decap CMS files are not already included, ensure to add them as well.
   - Configure the `config.yml` file within Decap CMS to align with the settings in this repository.
