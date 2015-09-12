




function createElement(tagName, attributeList) {
    
    var createAttributes = function(element, attributeList) {
        
        var attribute = attributeList.pop();
        
        element.setAttribute(attribute.name, attribute.value);
        
        return attributeList.length == 0 ?
            element :
            createAttributes(element, attributeList);
    };
    
    return createAttributes(document.createElement(tagName), attributeList);
}

function appendAttributesToElement(element)
{
    return function (attributeList) {
        
        attributeList.reduce(function(previousValue, currentValue, index, array){
            //todo get this down to a single step of map & reduce.
        });
            
        
    };
}

