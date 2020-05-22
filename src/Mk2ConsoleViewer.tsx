import * as React from 'react'
import { useState, useEffect } from 'react'
import { KeyCodes } from './KeyCodes'
import Mk2Console from './Mk2Console'
import { Mk2Commands } from './Mk2Commands'
import ThemesDialog from './components/ThemesDialog'
import './styles/default-styles.css'
const libPackage = require('../package.json')

interface Mk2ConsoleViewerProps {
    removeStartUp?: boolean,
    theme?: string
}

/**
 * React entrypoint for the pseudo-console viewer to append on top of websites.
 */
export default function Mk2ConsoleViewer(props: Mk2ConsoleViewerProps = { removeStartUp: false, theme: 'default' }) {

    const [input, setInput] = useState('')
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [commandHistoryCounter, setCommandHistoryCounter] = useState(-1)
    const [showThemes, setShowThemes] = useState(false)
    const [theme, setTheme] = useState(props.theme)
    const themes = ['default', 'light', 'dracula']

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

    /**
     * Handle on key press.
     */
    function onKeyUp(event: React.KeyboardEvent) {
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
            setCommandHistoryCounter(-1)
            return
        }

        if (event.keyCode == KeyCodes.KEY_L && event.ctrlKey) {
            event.preventDefault()
            flush()
            return
        }

        if (event.keyCode == KeyCodes.KEY_UP_ARROW) {
            event.preventDefault()
            var counter = commandHistoryCounter
            if (counter >= commandHistory.length - 1) {
                counter = commandHistory.length - 2
            }
 
            const command = commandHistory[counter + 1]
            
            setInput(command)
            setCommandHistoryCounter(counter + 1)    
        }

        if (event.keyCode == KeyCodes.KEY_DOWN_ARROW) {
            event.preventDefault()
            var counter = commandHistoryCounter
            if (commandHistoryCounter <= -1) {
                counter = -1
            }
            if (counter > 0) {
                const command = commandHistory[counter - 1]
                setInput(command)
                setCommandHistoryCounter(counter - 1)
            }
        }
    }

    /**
     * Handle on close click.
     */
    function onClose() {
        const console = document.querySelector('#mk2console')
        console.remove()
    }

    /**
     * Start up log message.
     */
    useEffect(() => {
        if (!props.removeStartUp) {
            Mk2Console.log('Welcome to the Mk-II Console!', '#5cc7e2')
            Mk2Console.log('It\'s a trusty window console for all your logging needs!', 'highlight')
            Mk2Console.log('And it supports rich formatting.', '#3dda82', 'bold')
            Mk2Console.log('Visit github.com/Pfuster12/mk2Console for more...', 'highlight')
            Mk2Console.log('Check out its command input. Write anything to print out or write "clear" to clear all the messages. More command support to come!')
        }
    },
    [])

    /**
     * Run effect on theme change to change the stylesheet.
     */
    useEffect(() => {
        const mainElement = document.getElementById('mk2console')
        mainElement.setAttribute('data-theme', theme);
    },
    [theme])

    /**
     * Handle theme click.
     */
    function handleThemeClick() {
        setShowThemes(!showThemes)
    }

    /**
     * Handle theme click.
     */
    function onThemeClick(theme: string) {
        setTheme(theme)
        setShowThemes(false)
    }

    return (
        <>
         <div id="mk2console" data-theme="default">
            <div className="mk2console-flex-row mk2console-pt-1 mk2console-items-center">
                <span className="mk2console-title">Mk-II Console ({libPackage.version})</span>
                <span onClick={handleThemeClick} className="mk2console-theme-title">themes ▾</span>
                <span className="mk2console-close flex-row items-center"onClick={onClose}>[x]</span>
            </div>
            <div className="mk2console-stream-container">
                <span className="mk2console-stream"></span>
                <span className="mk2console-stream mk2console-input-block">>&nbsp;
                    <textarea value={input}
                        onChange={onInputChange}
                        onKeyUp={onKeyUp}
                        className="mk2console-input mk2console-stream"/>
                </span>
            </div>
            {
                showThemes
                &&
                <ThemesDialog onThemeClick={onThemeClick} themes={themes}/>
            }
        </div>
        </>
    )
}