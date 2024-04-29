import ReactDOM from 'react-dom/client';

import { CinemaPlayer } from './CinemaPlayer/CinemaPlayer';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<div className="container">
		<CinemaPlayer
			// url={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
			url={'/movie/86.mp4'}
		// url={"https://www.youtube.com/watch?v=5_4TKRgEr9U&list=RDMM5_4TKRgEr9U&start_radio=1"} // не доступно
		/>
	</div>
);
