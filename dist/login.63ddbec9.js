function openInBrowser(url) {
    console.log(url);
    if (!url) return;
    if (url == "javascript:void(0)") return;
    console.log(url);
    try {
        console.log("clicked");
        window.Android.openInBrowser(url);
    } catch (err) {
        console.log(err);
        location.href = url;
    }
}
function showToast(msg) {
    console.log("Android");
    try {
        console.log("clicked openActivity");
        Android.showToast(msg);
    } catch (err) {
        console.log(err);
    }
}

//# sourceMappingURL=login.63ddbec9.js.map
