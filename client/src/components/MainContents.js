import React from 'react';
import SliderData1 from '../data/SliderData1';
import ImageSlider from './ImageSlider';
import MainImageSlider from './MainImageSlider';

export default function MainContents() {
	return (
		<div className="main font-sans text-gray-900 bg-white">
			{/* Hero Slider */}
			<MainImageSlider slides={SliderData1} />

			{/* Featured Collection */}
			<div className="Collabo-item non-scroll my-12">
			</div>
			<div className="long-picture relative bg-white text-gray-900 py-20 px-8 overflow-hidden rounded-xl shadow-md border border-gray-200">
				<div className="item-info max-w-3xl mx-auto text-center">
					<h2 className="text-5xl font-extrabold mb-4 tracking-tight text-gray-900">
						Step Into the Season
					</h2>
					<div className="ditail-button-a">
						<a
							href="/collection"
							className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium text-lg shadow hover:bg-gray-800 transition duration-300 ease-in-out"
						>
							Shop the Collection
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
