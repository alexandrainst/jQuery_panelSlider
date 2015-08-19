$.widget( "alexandra.panelSlider", {
    options: {
        currentView: null, // The panel currently in focus
        panels:[] // All panels added to the navigation system
    },
    
    //The constructor of the panelSLide widget
    _create: function() {
        this.element.addClass("panelSlider");
        this.options.currentView=this.options.panels[0];
        
        $.each(this.options.panels, function(i, val){
            $("#"+val).hide();
        });
        
        $("#"+this.options.currentView).show();
    },
 
    //It's possible to add a panel in runtime
    addPanel: function(panel) {
        this.options.panels.push(panel);
        $("#"+panel).hide();
    },
    
    //A panel can be removed runtime
    removePanel: function(panel){
        for(var i=0;i<this.options.panels.length;i++){
            if(this.options.panels[i]==panel){
                if(panel==this.options.currentView){
                    $("#"+panel).hide();
                    this.options.currentView= i-1<0 ? this.options.panels[1] : this.options.panels[i-1];
                    $("#"+this.options.currentView).show();
                }
                    
                this.options.panels.splice(i, 1);
                break;
            }
        }
    },
    
    //The function that actually does all the sliding
    //If the goingBack variable is true the sliding will happen from left to right, and vice versa
    slide: function(panelToShow, goingBack){
    
        /*
        Making sure that only registered objects can act as panels.
        Might be a little to rough to make such a hard return statement.
        */
        if($.inArray(panelToShow,this.options.panels)<0)
            return "Not a registered panel";
        
        var tempThis=this;
        var tempCurrentView=this.options.currentView;
        
        /*
        Temporary absolute positioned div for doing sliding of dfferent panels on same line.
        This is the wrapper for the panel to slide off the screen
        */
        var currentPanel=$("<div/>",{
            css:{
                "position":"absolute",
                "top":0,
                "left":0,
                "width":"100%"
            }
        });
        
        //Needed for keeping padding and margin while transition happens
        var innerWrapper=$("<div/>");
        
        this.element.append(currentPanel);
        currentPanel.append(innerWrapper);
        innerWrapper.append($("#"+this.options.currentView));
        
        innerWrapper.hide("slide",{direction: goingBack ? "right" : "left"}, function(){
            $("#"+tempCurrentView).hide();
            tempThis.element.append($("#"+tempCurrentView));
            currentPanel.remove();
        });
        
        
        /*
        Temporary absolute positioned div for doing sliding of dfferent panels on same line.
        This is the wrapper for the panel to slide onto the screen
        */
        var newPanel=$("<div/>",{
            css:{
                "position":"absolute",
                "top":0,
                "left":0,
                "width":"100%"
            }
        });
        
        //Needed for keeping padding and margin while transition happens
        var innerWrapper2=$("<div/>");
        innerWrapper2.hide();
        
        this.element.append(newPanel);
        newPanel.append(innerWrapper2);
        innerWrapper2.append($("#"+panelToShow));
        $("#"+panelToShow).show();
        
        innerWrapper2.show("slide",{direction: goingBack ? "left" : "right"},function(){
            tempThis.element.append($("#"+panelToShow));
            newPanel.remove();
        });
        
        this.options.currentView=panelToShow;
    }
});