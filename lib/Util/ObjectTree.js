"use strict";

Object.getByString = function(obj, prop) {   
    prop = prop.replace(/\[(\w+)\]/g, '.$1');
    prop = prop.replace(/^\./, '');
    prop = prop.split('.');
    for(var i = 0, n = prop.length; i < n; ++i){
        var key = prop[i];
        if(key in obj){
            obj = obj[key];
        }else{
            return;
        }
    }
    return obj;
}

Object.setByString = function(obj, prop, value) {
    if(typeof prop === 'string'){
        console.log(prop);
        prop = prop.replace(/\[(\w+)\]/g, '.$1');
        prop = prop.replace(/^\./, '');
        prop = prop.split('.');
    }
    if(prop.length > 1) {
        var e = prop.shift();
        Object.setByString(obj[e] = Object.prototype.toString.call(obj[e]) === "[object Object]" ? obj[e] : {}, prop, value);
    }else{
        obj[prop[0]] = value;
    }
}


function ObjectTree(obj){
    
    var original = obj;
    
    function objectList(obj) {
        if(obj instanceof Function){
            var node = document.createElement("input");
            node.setAttribute("type", "hidden");
            node.value = obj;
            return node;
        }
        if(obj instanceof Array){
            var ol = document.createElement('ul');
            for(var child in obj){
                var li = document.createElement('li');
                li.setAttribute("data-property", child);
                li.appendChild(objectList(obj[child]));
                ol.appendChild(li);
            }
            ol.className = "array";
            return ol;
        }else if(obj instanceof Object && !(obj instanceof String)){
            var ul = document.createElement('ul');
            for (var child in obj){
                var li = document.createElement('li');
                li.appendChild(objectList(obj[child]));
                li.setAttribute("data-property", child);
                if(Array.isArray(obj[child])){
                    li.className = "array";
                    li.title = "array";
                }else{
                    li.className = typeof obj[child];
                    li.title = typeof obj[child];
                }
                ul.appendChild(li);
            }
            return ul;
        }
        else {
            var node = document.createElement("input");
            node.setAttribute("type", "text");
            node.value = obj;
            return node;
        }
    }
    
   if(typeof obj !== "object" && typeof obj !== "array"){
        console.log(typeof obj);
        throw TypeError("Argument must be an Object or Array");
    }

    var container = document.createElement("ul");
    container.className = "tree";
    var title = document.createElement("li");
    if(typeof obj.constructor !== 'undefined'){
        title.setAttribute("data-property", obj.constructor.name);
    }else{
        title.setAttribute("data-property", "Object");
    }
    var tree = objectList(obj);
    title.appendChild(tree);
    container.appendChild(title);
    return container;
}

if(typeof $ !== 'undefined'){
    $.fn.tree = function(obj){
        var obj = obj;
        var tree = ObjectTree(obj);
        $(tree).find('li:has(ul)')
            .click( function(event) {
                if(typeof $(event.target).data("property") === 'undefined'){
                    event.target = $(event.target).parent();
                }
                var path = $(event.target).data("property");
                $(event.target).parentsUntil("ul.tree > li:first-child").each(function(index, value){
                    if($(this).is("ul") || $(this).is("input")){
                        return true;
                    }
                    path = $(this).data("property") + "." + path;
                });
                if (this == event.target) {
                    $(this).toggleClass('expanded');
                    $(this).children('ul').toggle(100);
                }
                console.log(path);
                console.log(Object.getByString(obj, path));
                return false;
            })
            .addClass('collapsed')
            .children('ul').hide();
        $(tree).find('> li').show().toggleClass("expanded").children('ul').toggle(100);
        return tree;
    }
}