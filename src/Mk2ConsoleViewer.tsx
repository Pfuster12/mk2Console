import * as React from 'react'
import './styles.css'
import { useState, useEffect } from 'react'
import { KeyCodes } from './KeyCodes'
const Mk2Console = require('./Mk2Console')
import { Mk2Commands } from './Mk2Commands'

interface Mk2ConsoleViewerProps {
    removeStartUp?: boolean
}

/**
 * React entrypoint for the pseudo-console viewer to append on top of websites.
 */
export default function Mk2ConsoleViewer(props: Mk2ConsoleViewerProps = { removeStartUp: false }) {

    const [input, setInput] = useState('')
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [commandHistoryCounter, setCommandHistoryCounter] = useState(0)

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
        // reset counter,
        setCommandHistoryCounter(0)
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
            
             // save command to history,
             setCommandHistory(prevState => {
                prevState.unshift(str)
                return prevState
            })

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

        if (event.keyCode == KeyCodes.KEY_UP_ARROW) {
            event.preventDefault()
            if (commandHistoryCounter < commandHistory.length) {
                const command = commandHistory[commandHistoryCounter + 1]
                setInput(command)
                setCommandHistoryCounter(commandHistoryCounter + 1)    
            }
        }

        if (event.keyCode == KeyCodes.KEY_DOWN_ARROW) {
            event.preventDefault()
            if (commandHistoryCounter > 0) {
                const command = commandHistory[commandHistoryCounter - 1]
                setInput(command)
                setCommandHistoryCounter(commandHistoryCounter - 1)
            }
        }
    }

    /**
     * Handle on close click.
     */
    function onClose(event: React.SyntheticEvent) {
        const console = document.querySelector('.mk2console')
        console.remove()
    }

    useEffect(() => {
        if (!props.removeStartUp) {
            Mk2Console.log('Welcome to the Mk-II Console!', '#5cc7e2')
            Mk2Console.log('It\'s a trusty window console for all your logging needs!', 'yellow')
            Mk2Console.log('And it supports rich formatting.', '#3dda82', 'bold')
            Mk2Console.log('Go to github.com/Pfuster12/mk2Console for more...', 'yellow')
            Mk2Console.log('Check out its command input. Write anything to print out or write "clear" to clear all the messages. More command support to come!')
        }
    },
    [])

    return (
        <div className="mk2console">
            <div className="mk2console-flex-row mk2console-pt-1 mk2console-items-center">
                <span className="mk2console-title">Mk-II Console</span>
                <span className="mk2console-close flex-row items-center"onClick={onClose}>[x]</span>
            </div>
            <div className="mk2console-stream-container">
                <span className="mk2console-stream"></span>
                <span className="mk2console-input-block">>&nbsp;
                    <textarea value={input}
                        onChange={onInputChange}
                        onKeyDown={onKeyPress}
                        className="mk2console-input mk2console-stream"/>
                </span>
            </div>
        </div>
    )
}