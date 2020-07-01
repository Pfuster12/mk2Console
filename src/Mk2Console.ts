import { isObject } from "util"

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
    log: (msg: any, color: string = '', fontWeight: string = 'normal') => {
        log(msg, color, fontWeight)
    },

    /**
     * Info message format.
     */
    info: (msg: any) => {
       log(msg, 'var(--info)')
    },

    /**
     * Debug message format.
     */
    debug: (msg: any) => {
        log(msg, 'var(--debug)')
    },

    /**
     * Warn message format.
     */
    warn: (msg: any) => {
        log(msg, 'var(--warn)')
    },

    /**
     * Error message format.
     */
    error: (msg: any) => {
       log(msg, 'var(--error)')
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
 * Log a message.
 * Supports Objects.
 * @param msg 
 * @param color 
 * @param fontWeight 
 */
function log(msg: any, color: string = '', fontWeight: string = 'normal') {
    const stream = document.querySelector('.mk2console-stream')
        const span = document.createElement('span')
        span.className = 'mk2console-stream'

        var data: string
        var isAnObject = false

        if (isObject(msg)) {
            isAnObject = true
            data = JSON.stringify(msg, null, 2)
        } else {
            data = msg.toString()
        }

        // find any http links,
        const httpLinks = parseHttpLinks(data)

        // Format message with theme colors...
        var formattedMessage = data

        // format message with link spans,
        if (httpLinks && httpLinks.length > 0) {
            httpLinks.forEach(link => {
                const linkString = '<a class="mk2console-stream mk2console-link"' 
                + 'target="_blank" '
                + 'href="http://'+ link.value + '"'
                + ' style="color:' 
                + (color === 'highlight' ? 'var(--highlight)' : 'var(--link)')
                + ';font-weight:'
                + fontWeight
                + ';"' 
                + '>' + link.value + '</a>'

                formattedMessage = data.slice(0, link.startIndex) 
                    + linkString 
                    + data.slice(link.startIndex + link.value.length, data.length)
            });
        }

        const date = new Date()
        span.innerHTML = (isAnObject ? '' : '>&nbsp;') 
            + '<span class="mk2console-stream mk2console-timestamp">' 
            + `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
            + '</span>'
            + '&nbsp;'
            + (isAnObject ? '\n' : '') 
            + '<span class="mk2console-stream" style="color:' 
            + (color === 'highlight' ? 'var(--highlight)' : color)
            + ';font-weight:'
            + fontWeight
            + ';'
            + (isAnObject ? 'font-size:12px;color:var(--object-color);' : "")
            + '"'
            + '>'
            + formattedMessage 
            + '</span>'
            + '\n'

        // append new span line to stream.
        stream.appendChild(span)
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