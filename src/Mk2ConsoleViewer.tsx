import * as React from 'react'
import './styles.css'
import { useState } from 'react'
import { KeyCodes } from './KeyCodes'
import {Mk2Console} from './Mk2Console'
import { Mk2Commands } from './Mk2Commands'

/**
 * A pseudo console viewer to append on top of websites.
 */
export default function Mk2ConsoleViewer() {

    const [input, setInput] = useState('')

    /**
     * Flush stream of text.
     */
    function flush() {
        // flush stream text,
        const stream = document.querySelector('.mk2console-stream')
        stream.innerHTML = ''
        // focus on input
        const textarea = document.querySelector('.mk2console-input') as HTMLTextAreaElement
        textarea.focus()
    }

    /**
     * Handle input change.
     * @param event 
     */
    function onInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setInput(event.currentTarget.value)
    }

    function onKeyPress(event: React.KeyboardEvent) {
        const str = input.trim()
        
        if (event.keyCode == KeyCodes.KEY_ENTER) {
            event.preventDefault()
            switch (str) {
                case Mk2Commands.CLEAR:
                    flush()
                    break;
                default:
                    Mk2Console.log(str)
                    break;
            }
            // clear input
            setInput('')
            return
        }

        if (event.keyCode == KeyCodes.KEY_L && event.ctrlKey) {
            event.preventDefault()
            flush()
            return
        }
    }

    /**
     * Handle on close click.
     */
    function onClose(event: React.SyntheticEvent) {
        const console = document.querySelector('.mk2console')
        console.remove()
    }

    return (
        <div className="mk2console">
            <div className="mk2console-flex-row mk2console-pt-1 mk2console-items-center">
                <span className="mk2console-title">mk-II Console</span>
                <span className="mk2console-close flex-row items-center"onClick={onClose}>[x]</span>
            </div>
            <div className="mk2console-stream-container">
                <span className="mk2console-stream"></span>
                <span className="mk2console-input-block">>&nbsp;&nbsp;
                    <textarea value={input}
                        onChange={onInputChange}
                        onKeyDown={onKeyPress}
                        className="mk2console-input mk2console-stream"/>
                </span>
            </div>
        </div>
    )
}