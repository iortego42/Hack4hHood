export const getOffers = async ({ setOffers }) => {
	let response = await fetch("http://10.13.1.4:3000/offer", {
		method: "GET",
	});

	if (response.status === 403 || response.status === 401) {
		navigator("/login");
		return;
	}

	let data = await response.json();

	setOffers(data);
};

export const createOffer = async (title, description, tag_id, user_id, location_id) => {
	let response = await fetch("http://10.13.1.4:3000/offer", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		},
		body: JSON.stringify({
			title: title,
			description: description,
			tag_id: tag_id,
			user_id: user_id,
			location_id: location_id
		}),
	});

	if (response.status == 403 || response.status == 401) {
		return "Error creating post.";
	}

	return response.status;
};