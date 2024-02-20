function isPhishing(url) {
    // Define regular expressions for common phishing patterns
    var patterns = [
        /https?\/\/(?:www\.)?([^\s]+)\.([^\s/]{2,}|[a-z]{2,})(\/[^\s]*)?/,
        /\b(?:paypal|login|signin|bank|security)\b/i,  // Example: Check for specific keywords
        /\b(?:servicehelpdesk\.godaddysites\.com|accesswebform\.godaddysites\.com|online|servicedeskowa\.godaddysites\.com|wcomhost\.com|xyz|weebly\.com|windows\.net|googleusercontent\.com|azurewebsites\.net|emailnetwork\.uk|slfrc209\.com|fun|16mb\.com)\b/i,
        // Add more patterns or keywords as needed
    ];

    // Check each pattern
    for (var i = 0; i < patterns.length; i++) {
        if (url.match(patterns[i])) {
            return true;
        }
    }

    return false;
}

document.getElementById('checkButton').addEventListener('click', function () {
    var url = document.getElementById('urlInput').value;

    if (isPhishing(url)) {
        document.getElementById('result').innerHTML = `The URL '${url}' might be a phishing link.`;
    } else {
        document.getElementById('result').innerHTML = `The URL '${url}' is not flagged as a phishing link.`;
    }
});