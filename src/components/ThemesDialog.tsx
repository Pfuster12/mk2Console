import * as React from 'react'

interface ThemesDialogProps {
    themes: string[],
    onThemeClick: (theme:string) => void
}

/**
 * React entrypoint for the pseudo-console viewer to append on top of websites.
 */
export default function ThemesDialog(props: ThemesDialogProps) {

    function handleClick(event: React.SyntheticEvent) {
        const theme = (event.currentTarget as HTMLSpanElement).dataset.theme
        props.onThemeClick(theme)
    }

    return (
        <div className="mk2console-themes-dialog">
            {
                props.themes.map(theme => {
                    return <span data-theme={theme} onClick={handleClick} 
                        className="mk2console-theme mk2console-stream">{theme}</span>
                })
            }
        </div>
    )
}