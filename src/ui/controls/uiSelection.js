UISelection.prototype = new UIComponent();
UISelection.prototype.$super = parent;
UISelection.prototype.constructor = UISelection;
 
function UISelection(id, parent) {
    this.id = id;
    this.parent = parent;
     
    this.values = undefined;
    this.callback = undefined;
    this.keys = undefined;
     
    this.min = 1;
    this.max = 1;
     
    this.selection = -1;
    this.selectionTextElement = undefined;
     
    // ---------------------------------------------------------------------------
    // overrides
    // ---------------------------------------------------------------------------
    this.baseInit = this.init;
    this.baseUpdate = this.update;
     
    // ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
    this.init = function() {
        this.baseInit();
         
        if(!this.values || !this.callback) {
            throw new Error("Values and callback must be set!");
        }
        
        this.keys = Object.keys(this.values);
        this.max = this.keys.length;
         
        this.selectionFirstElement = $('<img class="selectPrevious clickable" src="'+ sys.selectionArrowBackFast + '"/>');
        this.selectionFirstElement.click({self: this}, this.onSelectFirst);
         
        this.selectionPrevElement = $('<img class="selectPrevious clickable" src="'+ sys.selectionArrowBack + '"/>');
        this.selectionPrevElement.click({self: this}, this.onSelectPrevious);
         
        this.selectionTextElement = $('<div class="selectionText"></div>');
         
        this.selectionNextElement = $('<img class="selectNext clickable" src="'+ sys.selectionArrowForward +'"/>');
        this.selectionNextElement.click({self: this}, this.onSelectNext);
         
        this.selectionLastElement = $('<img class="selectNext clickable" src="'+ sys.selectionArrowForwardFast +'"/>');
        this.selectionLastElement.click({self: this}, this.onSelectLast);
         
        // have to add the right floating elements first
        this.mainDiv.append(this.selectionLastElement);
        this.mainDiv.append(this.selectionNextElement);
         
        this.mainDiv.append(this.selectionFirstElement);
        this.mainDiv.append(this.selectionPrevElement);
        this.mainDiv.append(this.selectionTextElement);
    };
     
    this.update = function(currentTime) {
        if(!this.baseUpdate(currentTime)) {
            return;
        };
        var key = this.keys[this.selection];
        this.selectionTextElement.text(this.values[key].toUpperCase());
    };
     
    this.setSelection = function(id) {
        if (!this.keys[id]) {
            utils.logError("setSelection called with invalid argument: " + id);
            return;
        }
        this.selection = id;
        this.invalidate();
    };
         
    this.selectPrevious = function() {
        if (this.selection <= this.min) {
            return;
        } else {
            this.selection--;
            this.invalidate();
            this.callback(this.selection);
        }
    };
     
    this.selectNext = function() {
        if (this.selection >= this.max - 1) {
            return;
        } else {
            this.selection++;
            this.invalidate();
            this.callback(this.selection);
        }
    };
     
    this.onSelectFirst = function(parameter) {
        var self = parameter.data.self;
        if (self.selection > self.min) {
            self.selection = self.min;
            self.invalidate();
            self.callback(this.selection);
        }
    };
     
    this.onSelectPrevious = function(parameter) {
        var self = parameter.data.self;
        self.selectPrevious();
    };
     
    this.onSelectNext = function(parameter) {
        var self = parameter.data.self;
        self.selectNext();
    };
     
    this.onSelectLast = function(parameter) {
        var self = parameter.data.self;
        if (self.max > self.selection) {
            self.selection = self.max;
            self.invalidate();
            self.callback(self.selection);
        };
    };
};