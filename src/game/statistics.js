function Statistics(key) {
    this.key = key;
    this.manualDigCount = 0;
    this.manualGatherCount = 0;
    this.manualScavengeCount = 0;
    this.autoDigCount = 0;
    this.autoScavengeCount = 0;
    this.autoGatherCount = 0;
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
        localStorage[storageKey + 'autoDigCount'] = this.autoDigCount;
        localStorage[storageKey + 'manualDigCount'] = this.manualDigCount;
        localStorage[storageKey + 'autoGatherCount'] = this.autoGatherCount;
        localStorage[storageKey + 'manualGatherCount'] = this.manualGatherCount;
        localStorage[storageKey + 'autoScavengeCount'] = this.autoScavengeCount;
        localStorage[storageKey + 'manualScavengeCount'] = this.manualScavengeCount;
        localStorage[storageKey + 'autorefineCount'] = this.autorefineCount;

    };

    this.load = function() {
        var storageKey = this._getStorageKey();
        this.autoDigCount = utils.loadInt(storageKey + 'autoDigCount', 0);
        this.manualDigCount = utils.loadInt(storageKey + 'manualDigCount', 0);
        this.autoGatherCount = utils.loadInt(storageKey + 'autoGatherCount', 0);
        this.manualGatherCount = utils.loadInt(storageKey + 'manualGatherCount', 0);
        this.autoScavengeCount = utils.loadInt(storageKey + 'autoScavengeCount', 0);
        this.manualScavengeCount = utils.loadInt(storageKey + 'manualScavengeCount', 0);
        this.autorefineCount = utils.loadInt(storageKey + 'autorefineCount', 0);
    };

    this.reset = function(fullReset) {
        this.autoDigCount = 0;
        this.manualDigCount = 0;
        this.autoGatherCount = 0;
        this.manualGatherCount = 0;
        this.autoScavengeCount = 0;
        this.manualScavengeCount = 0;
        this.autorefineCount = 0;
    };
};
