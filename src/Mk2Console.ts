/**
 * Mk2 Console library.
 */
const Mk2Console = {

    /**
     * Prints a message to the console text stream.
     * @param msg Message to print.
     * @param color Text color, defaults to CSS color code white.
     * @param fontWeight Font weight property, default to normal.
     */
    log: (msg: string, color: string = 'white', fontWeight: string = 'normal') => {
        const stream = document.querySelector('.mk2console-stream')
        const span = document.createElement('span')
        span.className = 'mk2console-stream'

        // find any http links,
        const httpLinks = parseHttpLinks(msg)

        var formattedMessage = msg

        if (httpLinks && httpLinks.length > 0) {
            // format message with link spans,
            httpLinks.forEach(link => {
                const linkString = '<a class="mk2console-stream mk2console-link"' +
                'href="http://'+ link.value + '"'
                + ' style="color:' 
                + color 
                + ';font-weight:'
                + fontWeight
                + ';"' 
                + '>' + link.value + '</a>'
                formattedMessage = msg.slice(0, link.startIndex) + linkString + msg.slice(link.startIndex + link.value.length, msg.length)
            });
        }

        span.innerHTML = '>&nbsp;' 
            + '<span class="mk2console-stream" style="color:' 
            + color 
            + ';font-weight:'
            + fontWeight
            + ';"'
            + '>'
            + formattedMessage 
            + '</span>'
            + '\n'

        // append new span line to stream.
        stream.appendChild(span)
    },

    /**
     * Flush text stream.
     */
    flush: () => {
        const stream = document.querySelector('.mk2console-stream')
        stream.innerHTML = ''
    }
}

/**
 * Returns start and end indices of HTTP links from a given text.
 */
function parseHttpLinks(text: string): {startIndex: number, value: string}[] {
    // Looks back at a whitespace, grabs any non whitespace character 
    // before http, www. or .com-like domains if there is and any after until a whitespace.
    const httpRegex = /((?<=\s)[\S]+)?(http|www\.|\.com|\.co.uk|\.io|\.org|\.edu).+?(?=\s)/gm

    var results = []
    var matches = []
    while ((matches = httpRegex.exec(text)) !== null) {
        results.push({
            startIndex: httpRegex.lastIndex - matches[0].length,
            value: matches[0]
        })
    }

    return results
}

export default Mk2Console