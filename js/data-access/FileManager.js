export default class QuestionRepo {

    //I don't know how to make this work with local resources. The browsers block it so this function is currently unused.
    // Works great for files in the file structure, though.
    importQuestions(file){
        const rawFile = new XMLHttpRequest();
        let allText = null;
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    allText = rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
        return allText;
    }

    exportQuestions(text){
        alert(text);
    }

    downloadToFile(content){
        const a = document.createElement('a');
        const file = new Blob([content], {type: 'application/json'});
        
        a.href= URL.createObjectURL(file);
        a.download = `Questions ${new Date()}.json`;
        a.click();
      
          URL.revokeObjectURL(a.href);
    };
}