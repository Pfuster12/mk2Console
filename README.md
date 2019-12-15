# Welcome to the Mark-II Console
![npm](https://img.shields.io/npm/v/mk2console) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

The Mark-II Console is a small console viewport that sits in the corner of your window. Print out your log messages during development with rich formatting and colour, so you don't need to open the hefty developer tools if all you need is to log some stuff out!

Close at any time, no questions asked.

## Install

Mk2Console is a [npm package](https://www.npmjs.com/package/mk2console).

```console
npm i mk2console
```

## How it works
Mk2Console consists of React component viewer and a simple object with helper functions. Import the component and the Helper function object in order to display and log messages in your code.

```jsx
import {Mk2ConsoleViewer, Mk2Console} from 'mk2console'

export default function App() {

    useEffect(() => {
        Mk2Console.log('Testing...')
    },
    [])

    return (
        <div>
            <Mk2ConsoleViewer/>
        </div>
    )
}
```

> NOTE Mk2Console uses the new React Hooks.

The helper object contains the log function:

```typescript
log: (msg: string, color: string = 'white', fontWeight: string = 'normal') => {}
```

This is where the console is able to format its messages. The color and fontWeight can be set to any valid CSS value for these properties in string format, e.g. `'#FAFAFA'`, `'blue'`, `'bold'`, `'700'`.

So if we modify our initial call with some CSS properties:

```jsx
import {Mk2ConsoleViewer, Mk2Console} from 'mk2console'

export default function App() {

    useEffect(() => {
        Mk2Console.log('And it supports rich formatting.', '#3dda82', 'bold')
    },
    [])

    return (
        <div>
            <Mk2ConsoleViewer/>
        </div>
    )
}
```

We get the start up log message:

![Default Theme](https://github.com/Pfuster12/mk2Console/blob/master/github-assets/default-theme-mk2console.PNG)

## Startup

The `Mk2ConsoleViewer` comes packaged with a startup log message. If you wish to remove them simply pass true to the `removeStartUp` prop:

```jsx
import {Mk2ConsoleViewer, Mk2Console} from 'mk2console'

export default function App() {

    return (
        <div>
            <Mk2ConsoleViewer removeStartUp={true}/>
        </div>
    )
}
```

## Supported Props


| Prop              | Type           | required  |
| ------------------|:-------------:| ---------:|
| **removeStartUp** | boolean       | false     |

The interface used:

```typescript
interface Mk2ConsoleViewerProps {
    removeStartUp?: boolean
}
```

## Themes
The mk2Consoles duty is to bring you beautiful and rich theming for all your logging needs.

Keep it simple with the clean, classic default theme or choose from plugin themes. Or create your own!

![Default Theme](https://github.com/Pfuster12/mk2Console/blob/master/github-assets/default-theme-mk2console.PNG)

## Development

Mk2Console uses React Hooks, make sure you are using a version of `16.8.0` or above.

### Version Control
Mk2Console is [Commitizen Friendly.](https://github.com/commitizen/cz-cli).
