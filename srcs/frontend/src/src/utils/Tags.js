export const getTagsData = async ({ setTags }) => {
	let response = await fetch("http://10.13.1.4:3000/tag", {
		method: "GET",
		headers: {
			'Authorization': localStorage.getItem('token')
		},
	});

	if (response.status === 403 || response.status === 401) {
		navigator("/login");
		return;
	}

	let data = await response.json();

	setTags(data);
};

export const getTagData = async (setTag, tagId) => {
	let response = await fetch("http://10.13.1.4:3000/tag/" + tagId, {
		method: "GET",
	});

	if (response.status === 403 || response.status === 401) {
		navigator("/login");
		return;
	}

	let data = await response.json();

	setTag(data);
};

export const getTagColor = (tag) => {
	let letter = 0;

	for (let index = 0; index < tag.length; index++) {
		const element = tag[index];

		letter += element.charCodeAt(0);
	}

	return "#" + letter;
};