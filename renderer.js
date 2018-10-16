var fs = require("fs");

function view(templateName, values, response) {

    //Read from the template file
        // fs.readFile(`./views/${templateName}.html`, function (error, fileContents) {
        //     if(error) throw error;
        //
        //     response.write(fileContents);
        //
        // });

    var fileContents = fs.readFileSync(`./views/${templateName}.html`, {encoding:"utf8"}); //This is the blocking version of readFile. Non Blocking dont work properly as it writes after end.
    fileContents = mergeValues(values, fileContents);
    response.write(fileContents);
    //encoding utf8 is added to return in string format else it returns in buffer. check doc for this api

    //Insert values in to the content

    //Write out to the response

}


function mergeValues(values, content){
    //Cycle over the keys
        //Replace all {{key}} with the value from the values object

    for(var key in values){
        content = content.replace(`{{${key}}}`, values[key]);
    }
    return content;
}

module.exports.view = view;