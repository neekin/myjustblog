/*var fs = require('fs'),
 fileList = [];
var filetype = 'jpg,png,gif,ico,bmp';



function walk(path) {
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item) {
    	var tmplist = item.split('.');
    	var _filetype = tmplist[tmplist.length - 1];
        if (fs.statSync(path + '/' + item).isDirectory()) {
            walk(path + '/' + item);
        } else {
          if(filetype.indexOf(_filetype.toLowerCase()) >= 0){
           	 fileList.push(path + '/' + item);}
           }
           
        }
    );
}

walk('images');

console.log(fileList);*/


function test()
{
   var list = [];
   test1(list);
   console.log(list);
}

function test1(list)
{
     for(var i=0;i<10;i++)
     {
     	list.push(i);
     	test2(list);
     }
	
}

function test2(list)
{

	list.push("这是test2添加的");
}
test();

