function singleQuote(val){
    return "'" + val + "'";
}

function keyify(dirPath){
    dirPath = dirPath || '';
    if(dirPath.charAt(0) !== '/')
        dirPath = '/' + dirPath;

    if(dirPath.slice(-1) === '/')
        dirPath = dirPath.slice(0,-1);

    return dirPath
}

var google = {
    // turn path into array of paths
    // "/aa/bb" => ["/aa", "/aa/bb"]
    breakDownFolders: function(p){
        var ret = [];
        var pSplit = p.split('/');
        pSplit.forEach((x, index)=>{
            var key = pSplit.slice(0,index+1).join('/');
            if(!key || key === '/') return;
            ret.push(key);
        })
        return ret;
    },
    normalize: function(fileItem){
        fileItem.title = fileItem.name;
        fileItem.type = fileItem.mimeType == 'application/vnd.google-apps.folder' ? 'folder' : 'file';

        return fileItem;
    },
    transformQ: function(query){
        var queryStr = '';
        query = query || {};
        var keys = Object.keys(query);
        keys.forEach(function(key){
            if(queryStr)
                queryStr += ' AND ';

            var val = query[key];

            if(key === 'type'){
                key = 'mimeType';
                if(val === 'folder')
                    val = 'application/vnd.google-apps.folder'
            }

            if(key === 'title')
                key = 'name';


            if(Array.isArray(val)){
                var part = singleQuote(key) + " " + val[0] + " "+(val[0] === 'in'?val[1]:singleQuote(val[1]));
            }
            else {
                var part = key + "=" + singleQuote(val);
            }

            part = "(" + part + ")"
            queryStr += part;
        })

        return queryStr;
    }
}

module.exports = {
    google      : google,
    singleQuote : singleQuote,
    keyify      : keyify,
}
