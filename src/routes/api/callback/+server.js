import { text } from '@sveltejs/kit';

// Function to render the response body
function renderBody(status, content) {
  const html = `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;
  return html; // returning the script as HTML content
}

// Define the GET function
export async function GET({ request, params, url }) {
  // Get environment variables from SvelteKit
  const client_id = YOUR_GITHUB_CLIENT_ID; // using VITE_ prefix for public env vars
  const client_secret = YOUR_GITHUB_SECRET_KEY

  try {
    // Extract the code from the URL query parameters
    const code = url.searchParams.get('code');

    // Fetch the access token from GitHub
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'user-agent': 'sveltekit-github-oauth',
          'accept': 'application/json',
        },
        body: JSON.stringify({ client_id, client_secret, code }),
      }
    );

    const result = await response.json();

    if (result.error) {
      return text(renderBody('error', result), {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
        status: 401,
      });
    }

    // Successfully got the token
    const token = result.access_token;
    const provider = 'github';
    const responseBody = renderBody('success', {
      token,
      provider,
    });

    return text(responseBody, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      status: 200,
    });

  } catch (error) {
    console.error('Error in OAuth flow:', error);
    return text('Server Error', {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      status: 500,
    });
  }
}
