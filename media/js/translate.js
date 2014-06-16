ya = {
    langs:null,
    toSelect:'select[name=to]',
    fromSelect:'select[name=from]',
    fromText:'#srcText',
    toText:'#toText'
}

ya.init = function (d) {
    ya=$.extend(ya, d);
}

ya.getToLangs=function(lang){
    return eval("ya.langs.dirs."+lang);
}

ya.getLangName=function(lang){
    return eval('ya.langs.langs.'+lang)
}

ya.buildToselect=function(lang, toLang){
    var toLangs= ya.getToLangs(lang);
    var options='';
    var selected;
    for (var l in toLangs){
        if(toLang && toLang == toLangs[l])
            selected = 'selected';
        else
            selected= '';

            options+="<option "+ selected +" value='"+toLangs[l]+"'>"+ya.getLangName(toLangs[l])+"</option>";
    }

    $(ya.toSelect).html(options).trigger('refresh');
    return false;
}

ya.flipLangs=function(){
    var fromlang=$(ya.toSelect).val();
    var fromSelect =  $(ya.fromSelect).val();
    console.log(fromlang);
    $(ya.fromSelect).val(fromlang).trigger('refresh');
    ya.buildToselect(fromlang,fromSelect);
    return false;
}

ya.clear=function(){
    $(ya.fromText+', '+ya.toText).html('').val('');
}

ya.translate=function(){
    var lang=$(ya.fromSelect).val()+'-'+$(ya.toSelect).val();
    var text=$(ya.fromText).val();
    if(!text)
        return false;
    $.ajax({
        url:'/translate/translate',
        method:'POST',
        dataType:'json',
        data:{lang:lang,text:text},
        success:function(d){
           if(d.code==200){
               $(ya.toText).html(d.text[0]).val(d.text[0]);
           }else {
               alert(d.message);
           }
        }

    })
}
