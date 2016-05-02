function ObjectTree(obj){
    if((!obj instanceof JSGameComponent)){
        throw TypeError("Object not an instance of JSGameComponent");
    }
    
    function objectList(obj) {
        if(obj instanceof Array){
            var ol = document.createElement('ol');
            for(var child in obj){
                var li = document.createElement('li');
                li.appendChild(objToHtmlList(obj[child]));
                ol.appendChild(li);
            }
            return ol;
        }
        else if(obj instanceof Object && !(obj instanceof String)){
            var ul = document.createElement('ul');
            for (var child in obj){
                var li = document.createElement('li');
                li.appendChild(objToHtmlList(obj[child]));
                li.setAttribute("data-property", child);
                ul.appendChild(li);
            }
            return ul;
        }
        else {
            var node = document.createElement("input");
            node.setAttribute("type", "text");
            switch(typeof obj){
                case "string":
                    node.setAttribute("value", obj);
                break;
                case "number":
                    node.setAttribute("value", obj);
                break;
                case "boolean":
                    node.setAttribute("type", "checkbox");
                    node.checked = obj;
                break;
                default:
                    node = document.createElement("span");
                    node.innerHTML = obj;
                    node.setAttribute("data-type", typeof obj);
            }
            return node;
        }
    }
    
    var tree = objectList(JSON.parse(obj.toString()));
    tree.setAttribute("data-root", obj.constructor.name);
    return tree;
}