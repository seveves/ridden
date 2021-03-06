import { h } from 'preact';
import { Link } from 'preact-router/match';

export const CarsList = ({ cars }) => (
	<div>
		{ cars !== null
			? ( 
					<ul class="list">
					{
						cars.map((car) => (
							<li>
								<Link href={`/fleet-details/${car._id}`}>
									<div class="list-group">
										<div class="list-label toe">{car.name}</div>
										<div class="list-text toe">{car.description}</div>
									</div>
									<div class="list-group">
										<div class="list-label">{car.max}</div>
										<div class="list-text">seats</div>
									</div>
									<div class="list-group asc">
										<svg style="width:24px;height:24px" viewBox="0 0 24 24">
											<path fill="#666" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
										</svg>
									</div>
								</Link>
							</li>
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
