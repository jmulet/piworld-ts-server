angular("ngApp").service("Session", function(){

    this.setRelatedActivity = function(list) {
        this.relatedActivity = list;
    };

    this.getRelatedActivity = function() {
        return this.relatedActivity;
    };
    
    this.setCurrentGroup = function(group) {
        this.currentGroup = group;
    };

    this.getCurrentGroup = function() {
        return this.currentGroup;
    };
    
    return this;
});