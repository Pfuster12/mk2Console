# Welcome to the Mark-II Console
![npm](https://img.shields.io/npm/v/mk2console) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<img src="https://github.com/Pfuster12/mk2Console/blob/master/github-assets/website-screen.PNG" width="860"/>

The Mark-II Console is a small console viewport that sits in the corner of your window. Print out your log messages during development with rich formatting and colour, so you don't need to open the hefty developer tools if all you need is to log some stuff out!

Close at any time, no questions asked.

## Install

Mk2Console is a [npm package](https://www.npmjs.com/package/mk2console).

```console
npm i mk2console
```

## How it works
Mk2Console consists of React component viewer and a simple object with helper functions. Import the component and the Helper function object in order to display and log messages in your code. The viewer works best when you place in your app's root view:

```jsx
import {Mk2ConsoleViewer, Mk2Console} from 'mk2console'

export default function App() {

    useEffect(() => {
        Mk2Console.log('Testing...')
    },
    [])

    return (
        <main>
            <div>
                <>
                {/* Your other components...*/}
                </>
            </div>
            <Mk2ConsoleViewer/>
        </main>
    )
}
```

> **NOTE** Mk2ConsoleViewer uses the new React Hooks.

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

### Highlight Color

`highlight` is a special keyword in the Mk2Console. Every theme will have a highlight color defined for your convenience that you can use to quickly format log messages to stand out.
If you pass `highlight` to the color property in the log method:

```
Mk2Console.log('This log is highlighted', 'highlight')
```

The message will understand and use the theme's `highlight` color.

## Supported Logger functions

- Info: Info message with the theme's 'info' color.
```info: (msg: string)```

- Debug: Debugs a message with the theme's 'debug' color.
```debug: (msg: string)```

- Warn: Warning message with the theme's 'warn' color.
```warn: (msg: string)```

- Error: Error message with the theme's 'error' color.
```error: (msg: string)```

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

| Prop              | Type           | description                       | default   | required  |
| ------------------|:--------------:| ---------------------------------:|----------:|----------:|
| **removeStartUp** | boolean        | Removes the startup log messages. | false     | false     |
| **theme**         | string         | Theme to use on startup           | 'default' | false     |

The interface used:

```typescript
interface Mk2ConsoleViewerProps {
    removeStartUp?: boolean,
    theme?: string
}
```

## Themes
The mk2Consoles duty is to bring you beautiful and rich theming for all your logging needs.

Keep it simple with the clean, classic default theme or choose from plugin themes. Or create your own! (TBA)

The package comes with a few pre-loaded themes:

Default
--------
![Default Theme](https://github.com/Pfuster12/mk2Console/blob/master/github-assets/default-theme-mk2console.PNG)

Light
--------
![Light Theme](https://github.com/Pfuster12/mk2Console/blob/master/github-assets/light-theme-mk2console.PNG)

Dracula
--------
![Dracula Theme](https://github.com/Pfuster12/mk2Console/blob/master/github-assets/dracula-theme-mk2console.PNG)

### How to change themes

Pass in the theme prop to make the console use the theme of your choice. The prop default to the 'default' theme:

```jsx
import {Mk2ConsoleViewer, Mk2Console} from 'mk2console'

export default function App() {

    return (
        <div>
            <Mk2ConsoleViewer theme="dracula"/>
        </div>
    )
}
```

Themes are instantly switchable in the Theme Dialog picker embedded in the Viewer window.
![Theme dialog](https://github.com/Pfuster12/mk2Console/blob/master/github-assets/theme-dialog-mk2console.PNG)

Built-in Themes
---------------

- `default`
- `light`
- `dracula`

## Development

Mk2Console uses React Hooks, make sure you are using a version of `16.8.0` or above.

### Version Control
Mk2Console is [Commitizen Friendly.](https://github.com/commitizen/cz-cli).
