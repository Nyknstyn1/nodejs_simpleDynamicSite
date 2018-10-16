function fooCluttering(){

    console.log("bar");
}

(function(){
    function foo(){

    console.log("bar");
};

foo();
}());

//or
//Use + o !
+function(){
    function foo(){

        console.log("bar");
    };

    foo();
}()

//import other globals to be used within the module but with the reference, locally within the module.
!function (underscore) {
    underscore.someawesomemethod = "yay!!!";
    console.log(underscore.VERSION);
}(_);


//Module export Pattern

var awesomeNewModule = (function(){

    var exports = {};
    exports.helloMars = function() {
        console.log("HelloMars");
    }

    exports.goodbye = function(){
        console.log("Goodbye!");
    }
    return exports;

}())

//Loose Augmentation
var awesomeNewModule2 = (function(exports){

    var exports = {};
    exports.helloMars = function() {
        console.log("HelloMars");
    }

    exports.goodbye = function(){
        console.log("Goodbye!");
    }
    return exports;

}(awesomeNewModule2 || {}))

//Sub Module Pattern

var awesomeNewModule3.sub = (function(exports){

    var exports = {};
    exports.helloMars = function() {
        console.log("HelloMars");
    }

    exports.goodbye = function(){
        console.log("Goodbye!");
    }
    return exports;

}(awesomeNewModule3.sub || {}))