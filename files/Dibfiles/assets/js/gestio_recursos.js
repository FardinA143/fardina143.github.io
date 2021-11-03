//Funció inicial per obrir en el #content el recurs o la seva previsualització

function openResource(codrecurs) {
	updateResourceStats(codrecurs);
    switch (recursos[codrecurs].tipus) {
        case 'audio':
            playAudio(recursos[codrecurs]);
            break;
        case 'video':
            playVideo(recursos[codrecurs]);
            break;
        case 'link':
            showLink(recursos[codrecurs]);
            break;
        case 'web':
            showWeb(recursos[codrecurs]);
            break;
        case 'imagen':
            showImage(recursos[codrecurs]);
            break;
        case 'galeria':
            showGaleria(recursos[codrecurs]);
            break;
        default: //documento, pdf, word
            showDocument(recursos[codrecurs]);
            break;
    }
}

// -- Funcions que recullen les variables necessaries per mostrar cada tipus de recurs

function playAudio(params) {
    var text = ' ';
    if ((params.credits != '') && (params.copyright != '')) {
        text = params.credits + "<br />" + params.copyright
    } else {
        if (params.credits != '') {
            text = params.credits;
        } else {
            if (params.copyright != '') {
                text = params.copyright;
            }
        }
    }

    if (params.es_pd == 1) {
        path = 'files_pd';
    } else {
        path = 'files';
    }
    showContentInit({
        preview: 'audio',
        titol: params.nom,
        titol_clicable: false,
        url: path + '/' + params.subcarpeta + '/' + params.fitxer,
        peu: text,
        autor: params.autor

    });
}

function playVideo(params) {
    var text = '';
    var path = '';
    var vtt = false;
    var vtt_label = '';
    var width = 0;
    var height = 0;

    if ((params.credits != '') && (params.copyright != '')) {
        text = "<p>" + params.credits + "<br />" + params.copyright + "</p>"
    } else {
        if (params.credits != '') {
            text = "<p>" + params.credits + "</p>";
        } else {
            if (params.copyright != '') {
                text = "<p>" + params.copyright + "</p>";
            }
        }
    }

    if (params.es_pd == 1) {
        path = 'files_pd';
    } else {
        path = 'files';
    }

    if (typeof params.vtt_label != 'undefined') {
        vtt = true;
        vtt_label = params.vtt_label;
    } else {
        vtt = false;
        vtt_label = "";
    }
    
    if( typeof params.width != 'undefined') {
    	width = params.width;
    }
    
    if( typeof params.height != 'undefined' ) {
    	height = params.height;
    }

    showContentInit({
        preview: 'video',
        titol: params.nom,
        titol_clicable: false,
        src: path + '/' + params.subcarpeta + '/' + params.fitxer,
        vtt: vtt,
        vtt_label: vtt_label,
        credits: text,
        width: width,
        height: height
    });
}

function showLink(params) {

    showContentInit({
        preview: 'link',
        titol: params.nom,
        titol_clicable: true,
        src: params.url,
        peu: fesclicktext['link'],
        peu_clicable: true
    });
}

function showWeb(params) {
    if (params.es_pd == 1) {
        var path = 'files_pd';
    } else {
        var path = 'files';
    }

    if (params.use_thumbnail) {
        var use_thumbnail = params.use_thumbnail;
    } else {
        var use_thumbnail = '';
    }

    showContentInit({
        preview: 'web',
        titol: params.nom,
        titol_clicable: true,
        src: path + '/' + params.subcarpeta + '/' + params.fitxer,
        peu: fesclicktext['web'],
        peu_clicable: true,
        thumbnail: use_thumbnail
    });
}

function showImage(params) {

    if (params.es_pd == 1) {
        var path = 'files_pd';
    } else {
        var path = 'files';
    }

    showContentInit({
        preview: 'image',
        codrecurs: params.codrecurs,
        titol: params.nom,
        titol_clicable: true,
        src: path + '/' + params.subcarpeta + '/' + params.fitxer,
        peu: fesclicktext['imagen'],
        peu_clicable: true
    });
}

function showGaleria(params) {

    if (params.es_pd == 1) {
        path = 'files_pd';
    } else {
        path = 'files';
    }

    showContentInit({
        preview: 'galeria',
        codrecurs: params.codrecurs,
        titol: params.nom,
        titol_clicable: true,
        src: path + '/' + params.subcarpeta + '/' + params.fitxer,
        peu: fesclicktext['galeria'],
        peu_clicable: true
    });
}

function showDocument(params) {

    if (params.es_pd == 1) {
        var path = 'files_pd';
    } else {
        var path = 'files';
    }

    showContentInit({
        preview: params.tipus,
        titol: params.nom,
        titol_clicable: true,
        src: path + '/' + params.subcarpeta + '/' + params.fitxer,
        peu: fesclicktext['documento'],
        peu_clicable: true
    });
}

// -- FI Funcions que recullen les variables necessaries per mostrar cada tipus de recurs

// -- Funció principal showContentInitMobile()

function showContentInitMobile(params) {

    $('.dvd-menu-professor').hide();
    $('#contentAlumnes').hide();
    $('#contentProfes').hide();
    $('.dvd-contingut-principal').show();
    $('#contentPortada').hide();
    $('#btn-show-menu').hide();
    $('#btn-back-button').show();

    //Neteja de classes específiques
    // if ($('.imatgeArxiu').hasClass('dinamicimg')) {
    //     $('.imatgeArxiu').removeClass('dinamicimg');
    // }

    $('#content').css({ 'background-color': 'white' });

    //Amaguem tots els continguts especials (video, audio...)
    hideVisorDeVideos();
    hideVisorDAudios();
    hideImatgeTipusRecurs();
    hideTextFesClick();

    //Mostrem el contingut que ens indiquem els parametres
    $('.imatgeArxiu img').attr('src', 'assets/img/documento_big.png');

    showTitol(params);

    switch (params.preview) {
        case 'audio':
            showContentAudio(params);
            break;
        case 'video':
            showContentVideo(params);
            break;
        case 'link':
            showContentLink(params);
            break;
        case 'web':
            showContentWeb(params);
            break;
        case 'image':
            showContentImage(params);
            break;
        case 'galeria':
            showContentGaleria(params);
            break;
        default:
            showContentDefault(params);
            break;
    }

    showContentPeu(params);
    $(document).scrollTop(0);
    $('#content').show();
}
// -- FI Funció principal showContentInitMobile()

// -- Funció principal showContentInit()

function showContentInit(params) {

    if ($(' .imatgeArxiu').hasClass('imatge')) {
        $(' .imatgeArxiu').removeClass('imatge')
    }

    if (window.matchMedia('(max-width: 576px)').matches) {
        params.mobile = '#content';
        showContentInitMobile(params);
    } else {
        $('.dvd-contingut-principal').show();
        params.mobile = '#content';

        //Fem el swap de portada i contingut
        $('#contentPortada').hide();

        $('#content').css({ 'background-color': 'white' });
        $('#content').css({ 'justify-content': 'center' });
        $('#content').show();

        //Amaguem tots els continguts especials (video, audio...)
        hideVisorDeVideos();
        hideVisorDAudios();
        hideImatgeTipusRecurs();
        hideTextFesClick();

        //Mostrem el contingut que ens indiquem els parametres
        $('.imatgeArxiu img').attr('src', 'assets/img/documento_big.png');

        showTitol(params);

        switch (params.preview) {
            case 'audio':
                showContentAudio(params);
                break;
            case 'video':
                showContentVideo(params);
                break;
            case 'link':
                showContentLink(params);
                break;
            case 'web':
                showContentWeb(params);
                break;
            case 'image':
                showContentImage(params);
                break;
            case 'galeria':
                showContentGaleria(params);
                break;
            default:
                showContentDefault(params);
                break;
        }
        showContentPeu(params);
        $(document).scrollTop(0);
    }
}

// -- FI Funció principal showContentInit()

// -- Funcions específiques per mostrar el contingut de cada tipus de recurs

function showContentAudio(params) {
    if (window.matchMedia('(min-width: 577px)').matches) {
        $('#content').css({ 'background-color': 'unset' });
    }
    $("#music-player").show();

    audioPlayer.setUpAudio({
        descripcio: "",
        url: params.url,
        copyright: params.peu,
        autor: params.autor
    });
}

function showContentVideo(params) {

    $(params.mobile + ' .imatgeArxiu').hide();
    $(params.mobile + ' .fesClick').hide();
    $(params.mobile + ' .text').hide();
    $(params.mobile + ' #playerSection').show();
    $(params.mobile + ' #videoRep').remove();
    $(params.mobile).css({ 'background-color': 'unset' });

    if (params.vtt_label) {
        var vtt_track = "<track label=\"" + params.vtt_label + "\" src=\"" + params.src + ".vtt\">";
    } else {
        var vtt_track = "";
    }
    
    $(params.mobile + ' #player').html("<video id=\"videoRep\" class=\"video-js vjs-bold vjs-big-play-centered\" controls controlsList=\"nodownload\" preload=\"auto\"><source src=\"" + params.src + "\" type='video/mp4'>" + vtt_track + "<p class=\"vjs-no-js\"></p></video>");
    var player = videojs(document.getElementsByClassName("vjs-bold")[0], { "controls": true, "autoplay": false, "preload": "auto", "techOrder": ["html5"], "language": idioma_dvd, "fluid": true }, function() {
        // Player (this) is initialized and ready.
    });
    
    if (params.credits != '') {
        $(params.mobile + ' #player').append('<div class="credits">' + params.credits + '</div>');
    }
    
    if(params.width && params.height) {
    	vjsResizeToVideoDimensions( params.width, params.height );
    } else {
    	player.on('loadeddata', function() {
    		setTimeout(function() { vjsResize(); }, 300);
    	});
	}

}

function showContentLink(params) {
    $(params.mobile + ' .imatgeArxiu').html('<a href="' + params.src + '" target="_blank"><img src="assets/img/link_big.png" class="defaultcontenticonsize"/></a>');
    $(params.mobile + ' .imatgeArxiu').show();
}

function showContentWeb(params) {
    if (params.thumbnail) {
        image = params.src.replace('index.html', 'thumbnail.' + params.thumbnail);
    } else {
        image = 'assets/img/web_big.png';
    }
    $(params.mobile + ' .imatgeArxiu').html('<a href="' + params.src + '" target="_blank"><img src="' + image + '" class="defaultcontenticonsize"/></a>');
    $(params.mobile + ' .imatgeArxiu').show();
}

function showContentImage(params) {
    if (window.matchMedia('(min-width: 577px)').matches) {
        $('#content').css({ 'justify-content': 'space-between' });
    }

    let json = params.images;
    for (let i in json) {

    }
    $(params.mobile + ' .imatgeArxiu').html('<img src="' + params.src + '" />');
    $(params.mobile + ' .imatgeArxiu').addClass('imatge');
    $(params.mobile + ' .imatgeArxiu').show();
}

function showContentGaleria(params) {
    if (window.matchMedia('(min-width: 577px)').matches) {
        $('#content').css({ 'justify-content': 'space-between' });
    }
    $('#content header').hide();
    $('#content').css({ 'background-color': 'unset' });
    openGaleria(params.codrecurs, params.src);

}

function showContentDefault(params) {
    $(params.mobile + ' .imatgeArxiu').html('<a href="' + params.src + '" target="_blank"><img src="assets/img/' + params.preview + '_big.png" class="defaultcontenticonsize"/></a>');
    $(params.mobile + ' .imatgeArxiu').show();
}

// -- FI Funcions específiques per mostrar el contingut de cada tipus de recurs

// -- Funcions auxiliars per gestionar el contingut (imatgeArxiu) de cada recurs

// div#content
// header
// div.imatgeArxiu
// a+img
// div.text --> usat com a titol
// div#playersection
// div.fesClickContenidor
//div.fesClick

function showTitol(params) {
    $('#mobileheader #mobileheadertext').html(params.titol);
    $('#content header').html("");
    $('#content header').css({ 'width': '100%' });
    $('#content div.text').html("");

    switch (params.preview) {
        case 'audio':
        case 'video':
        case 'image':
        case 'galeria':
            $('#content header').html(params.titol);
            break;
        default:
            if (params.titol_clicable) {
                $('#content div.text').html('<a href="' + params.src + '" target="_blank">' + params.titol + '</a>');
            } else {
                $('#content div.text').html(params.titol);
            }
            break;
    }

    if (window.matchMedia('(max-width: 576px)').matches) {
        // A mobile tots els titols van en el header
        $('#content header').hide();
        $('#content div.text').hide();
        $('#mobileheader').show();
    } else {
        $('#mobileheader').hide();
        $('#content header').hide();
        $('#content div.text').hide();
        switch (params.preview) {
            case 'audio':
            case 'video':
            case 'image':
            case 'galeria':
                $('#content header').show();
                break;
            default:
                if (params.titol_clicable) {
                    $('#content div.text').html('<a href="' + params.src + '" target="_blank">' + params.titol + '</a>');
                } else {
                    $('#content div.text').html(params.titol);
                }
                $('#content header').hide();
                $('#content div.text').show();
                break;
        }
    }
}

function showContentPeu(params) {
    $(params.mobile + ' .fesClick').html("");
    $(params.mobile + ' .fesClick').removeClass('d-block');
    $(params.mobile + ' .fesClick').removeClass('d-none');
    $(params.mobile + ' .fesClick').removeClass('d-sm-block');
    if (params.peu !== undefined) {
        if (params.peu_clicable) {
            $(params.mobile + ' .fesClick').html('<a href="' + params.src + '" target="_blank">' + params.peu + '</a>');
            $(params.mobile + ' .fesClick').addClass('clicable');
        } else {
            if ($(params.mobile + ' .fesClick').hasClass('clicable')) {
                $(params.mobile + ' .fesClick').removeClass('clicable');
            }
            $(params.mobile + ' .fesClick').html(params.peu);
        }
        switch (params.preview) {
            case 'image':
                $(params.mobile + ' .fesClick').addClass('d-none d-sm-block');
                break;
            case 'audio':
                $('.music-player-text').html(params.peu);
            case 'video':
            case 'galeria':
                $(params.mobile + ' .fesClick').addClass('d-none');
                break;
            default:
                $(params.mobile + ' .fesClick').addClass('d-block');
                break;
        }
    }
}

function hideVisorDeVideos() {
    if (videojs) {
        var players = videojs.getPlayers();
        for (var player in players) {
            if (!videojs(player).paused()) videojs(player).pause();
        }
    }

    hideLoadingDelReproductor();
}

function hideLoadingDelReproductor() {
    if (window.matchMedia('(max-width: 576px)').matches) {
        $("#content #playerSection").hide();
    } else {

        $("#content #playerSection").hide();
    }
}

function hideVisorDAudios() {
    $("#music-player").hide();
    if(audioPlayer) audioPlayer.cancelAudio();
    hideLoadingDelReproductor();
    if ($('#content .credits').length > 0) {
        $('#content .credits').remove();
    }
}

function hideImatgeTipusRecurs() {
    $('.imatgeArxiu').html('');
    // hack
    $('#images li').remove();
    $('.viewer-container').remove();



}

function hideTextFesClick() {
    $('.fesClick').hide();
}

// -- FI Funcions auxiliars per gestionar el contingut (imatgeArxiu) de cada recurs

// -- Funcions auxiliars per obrir els recursos

function openImage(src) {

    var lastgallery = document.getElementById('modal');
    if (lastgallery) {
        lastgallery.remove();
    }

    var content = '<li><img data-original="' + src + '" src="' + src + '" alt=""></li>';


    var gallery = document.createElement('ul');
    gallery.innerHTML = content;

    var viewer = new Viewer(gallery, {
        hidden: function() {
            viewer.destroy();
        },
    });

    viewer.show(true);
}

function openGaleria(codrecurs, src) {
    var params = recursos[codrecurs];
    var galeriaActiva = params.images;

    var content = '';
    $(galeriaActiva).each(function() {

        var imagealt = this.name;
        if (this.credits !== '') {
            imagealt += ' - ' + URLDecode(this.credits);
        }
        if (this.copyright !== '') {
            imagealt += ' - ' + URLDecode(this.copyright);
        }
        imagealt = decodeURIComponent(imagealt);
        imagealt = imagealt.replace("'", "&#39;");
        imagealt = imagealt.replace('"', "&#34;");


        //Convertim les rutes de les imatges
        var imatgeArxiu = document.getElementById('imatgeArxiuImg');
        var rutaImatgeArxiu = src;
        console.log(rutaImatgeArxiu);
        rutaImatgeArxiu = rutaImatgeArxiu.replace(rutaImatgeArxiu.split('/').pop(), '');

        var imagefilepath = rutaImatgeArxiu + '/' + this.filename.split('/').pop()
        content += '<li><img src="' + imagefilepath + '" alt="' + imagealt + '" galeria="soc la galeria"></li>';
    });

    $('#images').html(content);
    $('#images').hide();
    //debugger;

    var gallery = document.getElementById('docs-galley');

    var viewer = new Viewer(gallery, {
        inline: true,
        hidden: function() {
            viewer.destroy();
        },
        headertext: params.nom,
    });
    viewer.update();
    viewer.show(true);
    $('.viewer-container').show();
}

function isOnline() {
	return window.location.protocol == 'http:' || window.location.protocol == 'https:';
}

function updateResourceStats( codrecurs ) {
	if (isOnline()) {
		var ifme = document.createElement('iframe');
		ifme.src = 'https://www.ecasals.net/s/'+codrecurs+'/'+stats_origin;
		
		document.getElementsByTagName('body')[0].appendChild(ifme);
		ifme.style.display='none';
	}
}

/*
var lastgallery = document.getElementById('modal');
if (lastgallery) {
    lastgallery.remove();
}

var content = '';
$(galeriaActiva).each(function() {
    var imagealt = this.name;
    if (this.credits !== '') {
        imagealt += ' - ' + URLDecode(this.credits);
    }
    if (this.copyright !== '') {
        imagealt += ' - ' + URLDecode(this.copyright);
    }
    imagealt = decodeURIComponent(imagealt);
    imagealt = imagealt.replace("'", "&#39;");
    imagealt = imagealt.replace('"', "&#34;");


    //Convertim les rutes de les imatges
    var imatgeArxiu = document.getElementById('imatgeArxiuImg');
    var rutaImatgeArxiu = imatgeArxiu.src;
    rutaImatgeArxiu = rutaImatgeArxiu.replace(rutaImatgeArxiu.split('/').pop(), '');

    var imagefilepath = rutaImatgeArxiu + '/' + this.filename.split('/').pop();

    content += '<li><img data-original="' + imagefilepath + '" src="' + imagefilepath + '" alt="' + imagealt + '"></li>';
});

var gallery = document.createElement('ul');
gallery.innerHTML = content;

var viewer = new Viewer(gallery, {
    hidden: function() {
        viewer.destroy();
        console.log('destroy');
    },
});

viewer.show(true);*/

// -- FI Funcions auxiliars per obrir els recursos