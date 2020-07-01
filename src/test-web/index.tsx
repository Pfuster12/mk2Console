import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './styles.css'
import Mk2ConsoleViewer from '../Mk2ConsoleViewer'
import Mk2Console from '../Mk2Console'

export default function App() {

    React.useEffect(()=> {
        Mk2Console.info('this is a info log')
        Mk2Console.debug('this is a debug log')
        Mk2Console.warn('this is a warn log')
        Mk2Console.error('this is a error log')

        Mk2Console.log({
            test: 1,
            key: "hey",
            man: new Date()
        })

        Mk2Console.log({
            test: 1,
            key: "hey",
            man: new Date(),
            test2: {
                test: 1,
                key: "hey",
                man: new Date()
            }
        })
    },
    [])

    return (
        <main>
            Hello World!
            <Mk2ConsoleViewer theme="dracula"/>
        </main>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))

