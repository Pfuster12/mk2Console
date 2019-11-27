/**
 * Mk2 Console library.
 */
export const Mk2Console = {

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
        span.innerHTML = '> ' 
            + '<span class="mk2console-stream" style="color:' 
            + color 
            + ';font-weight:'
            + fontWeight
            + ';"'
            + '>'
            + msg 
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
