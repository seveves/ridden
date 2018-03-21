import { h } from 'preact';
import { Link } from 'preact-router/match';

export const CarsList = ({ cars }) => (
	<div>
		{ cars !== null
			? ( 
					<ul class="list w-auto">
					{
						cars.map((car) => (
							<Link href={`/fleet-details/${car._id}`}>
								<li>
									<div>
										<div class="list-label">{car.name}</div>
										<div class="list-text toe">{car.description}</div>
									</div>
								</li>
							</Link>
						))
					}
					</ul>
				)
			: null }
		{ cars === null
			? <p>Loading ⏳</p>
			: (!cars.length)
				? <p>you have no cars in your fleet 🙁</p>
				: null }
	</div>
);
