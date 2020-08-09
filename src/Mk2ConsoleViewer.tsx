import * as React from 'react'
import { useState, useEffect } from 'react'
import { KeyCodes } from './KeyCodes'
import Mk2Console from './Mk2Console'
import { Mk2Commands } from './Mk2Commands'
import ThemesDialog from './components/ThemesDialog'
import './styles/default-styles.css'
const libPackage = require('../package.json')

interface Mk2ConsoleViewerProps {
    theme?: string,
    minimised?: boolean
}

enum ViewState {
    MAXIMISED,
    MINIMISED
}

/**
 * React entrypoint for the pseudo-console viewer to append on top of websites.
 */
export default function Mk2ConsoleViewer(
    props: Mk2ConsoleViewerProps = { theme: 'default', minimised: true }
) {

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
     * Run effect on theme change to change the stylesheet.
     */
    useEffect(() => {
        try {
            const console = document.getElementById('mk2console')
            // Map the user-facing name to the theme attribute
            var themeName = "default"
    
            switch(theme) {
                case "light":
                    themeName = "mk2light"
                    break;
                case "dracula":
                    themeName = "mk2dracula"
                    break;
                default:
                    break;
            }
    
            console.setAttribute('data-theme', themeName);
        } catch (e) {
            console.log("Error changing theme.");
            
        }
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

    /**
     * Handle minimise/maximise viewport click.
     */
    function onViewStateChange() {
        try {
            const console = document.getElementById('mk2console')
            const state = console.dataset.viewstate
    
            var height = '280px'
            switch (parseInt(state)) {
                case ViewState.MAXIMISED:
                    height = '34px'
                    console.setAttribute('data-viewstate', ViewState.MINIMISED.toString());
                    break;
                case ViewState.MINIMISED:
                    height = '280px'
                    console.setAttribute('data-viewstate', ViewState.MAXIMISED.toString());
                    break;
    
            }
            console.style.height = height
        } catch (e) {
            console.log("Error changing view state.");
            
        }
    }

    /**
     * Handle on close click.
     */
    function onClose() {
        const console = document.getElementById('mk2console')
        console.remove()
    }

    return (
        
        <div id="mk2console" 
            data-viewstate={props.minimised ? ViewState.MINIMISED : ViewState.MAXIMISED} 
            data-theme="default">
            <div className="mk2console-flex-row mk2console-pt-1 mk2console-items-center">
                <span className="mk2console-title">Mk-II Console [{libPackage.version}]</span>
                <span onClick={handleThemeClick} 
                className="mk2console-theme-title">themes ▾</span>
                <span className="mk2console-close mk2console-flex-row mk2console-items-center"
                    onClick={onViewStateChange}>[-]</span>
                <span className="mk2console-close mk2console-flex-row mk2console-items-center"
                    onClick={onClose}>[x]</span>
            </div>
            <div className="mk2console-stream-container">
                <span className="mk2console-stream"></span>
                <span className="mk2console-stream mk2console-input-block">&gt;&nbsp;
                    <textarea value={input}
                        onChange={onInputChange}
                        onKeyUp={onKeyUp}
                        className="mk2console-input mk2console-stream"/>
                </span>
            </div>
            {
                showThemes
                &&
                <ThemesDialog 
                onThemeClick={onThemeClick} 
                themes={themes}/>
            }
        </div>
    )
}