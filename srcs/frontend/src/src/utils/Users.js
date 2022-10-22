export const getUserData = async (setUser, userId) => {
	let response = await fetch("http://10.13.1.4:3000/user/" + userId, {
		method: "GET",
	});

	if (response.status === 403 || response.status === 401) {
		navigator("/login");
		return;
	}

	let data = await response.json();

	setUser(data);
};