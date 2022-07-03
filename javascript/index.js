document.getElementById("import").onchange = function(event) {
    event.preventDefault();

	// If there's no file, do nothing
	if (!file.value.length) return;

	// Create a new FileReader() object
	let reader = new FileReader();

	// Setup the callback event to run when the file is read
	reader.onload = logFile;

	// Read the file
	reader.readAsText(file.files[0]);
};

function logFile (event) {
	let str = event.target.result;
	let json = JSON.parse(str);
    for (const [key, value] of Object.entries(json)) {
        localStorage.key = value;
    }
}

const download = () => (
    Object.assign(document.createElement("a"), {
      href: `data:application/JSON, ${encodeURIComponent(
        JSON.stringify(
          Object.keys(localStorage).reduce(
            (obj, k) => ({ ...obj, [k]: JSON.parse(localStorage.getItem(k)) }),
            {}
          ),
          null,
          2
        )
      )}`,
      download: "GymerExport",
    }).click()
  )

