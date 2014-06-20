function Statistics(key) {
    this.id = key;
    this.manualDigCount = 0;
    this.manualGatherCount = 0;
    this.manualScavengeCount = 0;
    this.autoDigCount = 0;
    this.autoscavengeCount = 0;
    this.autogatherCount = 0;
    this.autorefineCount = 0;

    // ---------------------------------------------------------------------------
    // general
    // ---------------------------------------------------------------------------
    this.initialize = function() {};

    // ---------------------------------------------------------------------------
    // internal
    // ---------------------------------------------------------------------------
    this._getStorageKey = function() {
        return 'stat_' + this.id + '_';
    };

    // ---------------------------------------------------------------------------
    // loading / saving / reset
    // ---------------------------------------------------------------------------
    this.save = function() {
        var storageKey = this._getStorageKey();
        localStorage[storageKey + 'manualDigCount'] = this.manualDigCount;
        localStorage[storageKey + 'manualGatherCount'] = this.manualGatherCount;
        localStorage[storageKey + 'manualScavengeCount'] = this.manualScavengeCount;
        localStorage[storageKey + 'autoDigCount'] = this.autoDigCount;
        localStorage[storageKey + 'autogatherCount'] = this.autogatherCount;
        localStorage[storageKey + 'autoscavengeCount'] = this.autoscavengeCount;
        localStorage[storageKey + 'autorefineCount'] = this.autorefineCount;

    };

    this.load = function() {
        var storageKey = this._getStorageKey();
        this.manualDigCount = utils.loadInt(storageKey + 'manualDigCount', 0);
        this.manualGatherCount = utils.loadInt(storageKey + 'manualGatherCount', 0);
        this.manualScavengeCount = utils.loadInt(storageKey + 'manualScavengeCount', 0);
        this.autoDigCount = utils.loadInt(storageKey + 'autoDigCount', 0);
        this.autogatherCount = utils.loadInt(storageKey + 'autogatherCount', 0);
        this.autoscavengeCount = utils.loadInt(storageKey + 'autoscavengeCount', 0);
        this.autorefineCount = utils.loadInt(storageKey + 'autorefineCount', 0);
    };

    this.reset = function(fullReset) {
        sessionStorage.clear();
        this.manualDigCount = 0;
        this.manualGatherCount = 0;
        this.manualScavengeCount = 0;
        this.autoDigCount = 0;
        this.autogatherCount = 0;
        this.autoscavengeCount = 0;
        this.autorefineCount = 0;
    };
};
