const logging = (req, res) => {
    const loggingOptions = document.querySelector("#logging");
    console.log("ok");
    if (req.session.user !== undefined) {
        loggingOptions.innerHTML = `Logged in as ${req.session.user.displayName}`;
        loggingOptions.innerHTML += "<li><a href='/api-docs' target='_blank' id=''>API Docs</a></li>";
        loggingOptions.innerHTML += "<li><a href='/logout' target='_blank' id=''>Log out</a></li>";
    } else {
        loggingOptions.innerHTML += "<li><a href='/login' target='_blank' id=''>Login</a></li>";
    }
}

module.exports = {
    logging
}