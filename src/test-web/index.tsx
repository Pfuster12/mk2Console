import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './styles.css'
import Mk2ConsoleViewer from '../Mk2ConsoleViewer'

export default function App() {

    return (
        <main>
            Hello World!
            <Mk2ConsoleViewer/>
        </main>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))

