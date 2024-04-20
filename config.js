const Config = {
    localStorage: function () {
        return storages.create("5211314");
    },
    setLSConfig2UI: function () {
        log("LS->UI")

    },
    setUI2LSConfig: function () {
        log("UI->LS")

    },
    loadConfig: function () {

    }
}

module.exports = { Config }