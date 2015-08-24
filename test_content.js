




function createElement(tag, attributeList, content) {
    
    var createAttributes = function(attributes, element) {
        
        
        return attributes.length == 0 ?
            element :
            createAttributes();
    };
    
    return document.createElement(tag);
}