// Utility functions for safe iframe handling

// List of trusted domains for iframe embedding
const TRUSTED_DOMAINS = [
    // Social Media
    'twitter.com',
    'x.com',
    'instagram.com',
    'facebook.com',
    'linkedin.com',
    'tiktok.com',

    // Video Platforms
    'youtube.com',
    'youtube-nocookie.com',
    'vimeo.com',
    'dailymotion.com',
    'twitch.tv',

    // Code Platforms
    'codepen.io',
    'jsfiddle.net',
    'codesandbox.io',
    'stackblitz.com',
    'github.com',
    'gist.github.com',

    // Maps
    'google.com',
    'maps.google.com',
    'openstreetmap.org',

    // Forms & Documents
    'docs.google.com',
    'forms.gle',
    'typeform.com',
    'airtable.com',

    // Other Popular Services
    'spotify.com',
    'soundcloud.com',
    'figma.com',
    'canva.com',
    'slideshare.net'
]

/**
 * Extract the src URL from iframe HTML code
 * @param {string} iframeHtml - The iframe HTML string
 * @returns {string|null} - The extracted URL or null if invalid
 */
export const extractIframeUrl = (iframeHtml) => {
    if (!iframeHtml || typeof iframeHtml !== 'string') {
        return null
    }

    // Create a temporary div to parse the HTML safely
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = iframeHtml.trim()

    // Find the iframe element
    const iframe = tempDiv.querySelector('iframe')
    if (!iframe) {
        return null
    }

    const src = iframe.getAttribute('src')
    if (!src) {
        return null
    }

    try {
        const url = new URL(src)
        return url.href
    } catch (error) {
        console.error('Invalid URL in iframe:', src)
        return null
    }
}

/**
 * Check if a URL is from a trusted domain
 * @param {string} url - The URL to check
 * @returns {boolean} - True if the domain is trusted
 */
export const isTrustedDomain = (url) => {
    if (!url) return false

    try {
        const urlObj = new URL(url)
        const hostname = urlObj.hostname.toLowerCase()

        return TRUSTED_DOMAINS.some(domain =>
            hostname === domain || hostname.endsWith('.' + domain)
        )
    } catch (error) {
        return false
    }
}

/**
 * Create a safe iframe HTML from a URL
 * @param {string} url - The URL to embed
 * @param {object} options - Iframe options (width, height, etc.)
 * @returns {string} - Safe iframe HTML
 */
export const createSafeIframe = (url, options = {}) => {
    if (!url || !isTrustedDomain(url)) {
        return null
    }

    const {
        width = '100%',
        height = '400',
        allowfullscreen = true,
        frameborder = '0',
        title = 'Embedded content'
    } = options

    const allowAttributes = [
        'accelerometer',
        'autoplay',
        'clipboard-write',
        'encrypted-media',
        'gyroscope',
        'picture-in-picture',
        'web-share'
    ].join('; ')

    return `<iframe 
    src="${encodeURI(url)}" 
    width="${width}" 
    height="${height}" 
    frameborder="${frameborder}"
    ${allowfullscreen ? 'allowfullscreen' : ''}
    allow="${allowAttributes}"
    title="${title}"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade">
  </iframe>`
}

/**
 * Validate and process iframe input
 * @param {string} iframeInput - Raw iframe HTML or URL
 * @returns {object} - Validation result with url and errors
 */
export const validateIframeInput = (iframeInput) => {
    if (!iframeInput || typeof iframeInput !== 'string') {
        return { url: null, error: 'Please provide iframe code or URL' }
    }

    const trimmedInput = iframeInput.trim()

    // Check if input is a direct URL
    try {
        const directUrl = new URL(trimmedInput)
        if (isTrustedDomain(directUrl.href)) {
            return { url: directUrl.href, error: null }
        } else {
            return { url: null, error: 'This domain is not in our trusted domains list for security reasons' }
        }
    } catch (error) {
        // Not a direct URL, try to extract from iframe
    }

    // Extract URL from iframe HTML
    const extractedUrl = extractIframeUrl(trimmedInput)
    if (!extractedUrl) {
        return { url: null, error: 'Could not find a valid URL in the iframe code' }
    }

    if (!isTrustedDomain(extractedUrl)) {
        return { url: null, error: 'This domain is not in our trusted domains list for security reasons' }
    }

    return { url: extractedUrl, error: null }
}