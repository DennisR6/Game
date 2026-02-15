export function initPreview() {
    document.getElementById("btn-preview-popup").addEventListener("click", () => {
        const popup = window.open("", "previewPopup", "width=900,height=700");
        popup.document.write("<h1>Slipstrike Preview</h1>");
    });
}
