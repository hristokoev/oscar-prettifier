const getOffice = async (iataOfficeId, officeId, history) => {
	const response = await fetch(`https://oscar.airfrance-is.com/oscar/portalAmadeusTransaction.do?method=sendCrypticCommand&crypticRequest=PV%2F${iataOfficeId}&numEmulator=1&officeId=${officeId}`);
	const text = await response.text().then((data) => {
		const parser = new DOMParser();
		const xml = parser.parseFromString(data, "application/xml");
		const el = xml.querySelector('crypticResponse1').innerHTML;
		const result = el.match(/(?<=^NAM\*OFFICE\sNAME\s{6}\-\s)(.*)/gm);
		return result;
	})
	// Make a call to last command from the history
	await fetch(`https://oscar.airfrance-is.com/oscar/portalAmadeusTransaction.do?method=sendCrypticCommand&crypticRequest=${encodeURIComponent(history)}&numEmulator=1&officeId=${officeId}`);
	return text;
}

const readOffice = (office, officeEl, historyEl) => {
	const clone = office.cloneNode(true);
	const parent = office.parentNode;
	const container = document.createElement('div');
	clone.textContent = "Loading...";
	office.addEventListener('mouseover', async function () {
		clone.textContent = await getOffice(office.value, officeEl.value, historyEl.value);
	});
	clone.className = 'popup';
	parent.replaceChild(container, office);
	container.className = 'container';
	container.appendChild(office);
	container.appendChild(clone);
}