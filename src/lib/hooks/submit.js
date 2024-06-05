const onUpdate  = async (value, url, id) => {

	let body = {
		id: id.toString(),
		value: value
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${url}/post`, {
		method: 'POST',
		timeout: 30,
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(body)
	})

	console.log(body, `${url}/post`)

	return res;
}

export default onUpdate;