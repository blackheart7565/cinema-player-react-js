import ReactDOM from 'react-dom/client'

import { CinemaPlayer } from './CinemaPlayer/CinemaPlayer'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<CinemaPlayer
		// url={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
		url={'/movie/86.mp4'}
	/>
)
