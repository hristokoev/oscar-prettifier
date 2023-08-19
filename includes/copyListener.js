document.addEventListener('copy', function (event) {
    var text = window.getSelection().toString();
    event.preventDefault();
    copyToClipboard(text);
});

function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand("cut");
    } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
    } finally {
        document.body.removeChild(textarea);
    }
}