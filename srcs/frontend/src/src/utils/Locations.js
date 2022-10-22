export const getLocationData = async (setLocation, locationId) => {
	let response = await fetch("http://10.13.1.4:3000/location/" + locationId, {
		method: "GET",
	});

	if (response.status === 403 || response.status === 401) {
		navigator("/login");
		return;
	}

	let data = await response.json();

	setLocation(data);
};