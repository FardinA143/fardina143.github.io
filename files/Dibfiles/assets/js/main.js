var breakpoint = 576;
var ampladainicial = window.innerWidth;

var midainicial = 'desktop';
if (ampladainicial <= breakpoint) {
    midainicial = 'mobile';
}

function isDVDMobile() {
    return  window.matchMedia('(max-width: '+breakpoint+'px)').matches;
}

$(document).ready(function() {

    // Gestionem els canvis de mida de la pantalla
    window.onresize = function(event) {
        resetResizeStartup();
    };

    // En versió mobile sempre ensenyem la portada de l'alumne al accedir
    if (isDVDMobile()) {
        showPortada(true, 'alumnes');
    }

    if ($('#maincontainer').hasClass('maincontainerprofe')) {
        // Si accedim a la vista del profe via mobile, no mostrem d'entrada el menú
        if (isDVDMobile()) {
            $('.dvd-menu-professor').hide();
        }

        // Donem funcionalitat al menú lateral del professor:
        // Accés al contingut de l'alumne
        // Accés a la proposta didàctica
        // Accés a aprèn el més bàsic
        // Accés a les programacions
        // Accés a les rúbriques
        $('.dvd-menu-opcio-professor').on('click', function() {

            // Tenim 3 estils d'opció de menú seleccionada, hem d'anar fent toggle per anar-les canviant
            $('.dvd-menu-opcio-professor-seleccionat').each(function(i, element) {
                $(element).removeClass('dvd-menu-opcio-professor-seleccionat');
                $(element).addClass('dvd-menu-opcio-professor');
            });

            $('.dvd-menu-opcio-professor-seleccionat-tancat').each(function(i, element) {
                $(element).removeClass('dvd-menu-opcio-professor-seleccionat-tancat');
                $(element).addClass('dvd-menu-opcio-professor');
            });

            $(this).toggleClass('dvd-menu-opcio-professor dvd-menu-opcio-professor-seleccionat');

            if (isDVDMobile()) {
                // Funcionament del menú del profe quan estem en MOBILE
                $('#contentAlumnes').hide();
                $('#contentProfes').hide();
                $('#contentProgramacions').hide();
                $('#contentBasic').hide();
                $('#contentRubriques').hide();
                $('#contentPortada').hide();
                $('#content').hide();
                $('#btn-tancar').hide();

                $('#btn-show-menu').show();

                switch ($(this).data('content')) {
                    case 'alumne':
                        reiniciaFiltres('contentAlumnes');
                        $('#contentAlumnes').show();
                        showPortada(true, 'alumnes');
                        break;
                    case 'profe':
                        reiniciaFiltres('contentProfes');
                        $('#contentProfes').show();
                        showPortada(true, 'PD');
                        break;
                    case 'basic':
                        $('#contentBasic').show();
                        break;
                    case 'programacions':
                        $('#contentProgramacions').show();
                        break;
                    case 'rubriques':
                        $('#contentRubriques').show();
                        break;
                }
                $('.dvd-menu-professor').hide();

            } else {
                // Funcionament del menú del profe quan estem en DESKTOP

                $('#contentAlumnes').hide();
                $('#contentProfes').hide();
                $('#contentBasic').hide();
                $('#contentProgramacions').hide();
                $('#contentRubriques').hide();
                $('.dvd-menu-obrir').hide();
                $('#content').hide();

                $('.dvd-contingut-principal').show();

                switch ($(this).data('content')) {
                    case 'alumne':
                        reiniciaFiltres('contentAlumnes');
                        $('#contentAlumnes').show();
                        showPortada(true, 'alumnes');
                        break;
                    case 'profe':
                        reiniciaFiltres('contentProfes');
                        $('#contentProfes').show();
                        showPortada(true, 'PD');
                        break;
                    case 'basic':
                        $('#contentBasic').show();
                        showPortada(false);
                        break;
                    case 'programacions':
                        $('#contentProgramacions').show();
                        showPortada(false);
                        break;
                    case 'rubriques':
                        $('#contentRubriques').show();
                        showPortada(false);
                        break;
                }
            }
            window.scrollTo(0, 0);
        });
    } else if ($('#maincontainer').hasClass('maincontaineralumne')) {
        // Si accedim a la vista de l'alumne via mobile, no mostrem d'entrada el menú de l'alumne
        if (isDVDMobile()) {
            $('.dvd-menu-llibrealumne').hide();
        }
    }

    // -- Cal canviar la icona de plegable - desplegat del acordions
    $('.collapse').on('show.bs.collapse', function(event) {
        $(this).closest('.card').find('.estructura:first').css('transform', 'rotate(90deg)');
        event.stopPropagation();
    });

    $('.collapse').on('hide.bs.collapse', function(event) {
        $(this).closest('.card').find('.estructura:first').css('transform', 'rotate(-90deg)');
        event.stopPropagation();
    });
    // -- FI Cal canviar la icona de plegable - desplegat del acordions

    // -- Gestió dels filtres: per poder-los tancar
    $('.tancar-filtre').on('click', function() {
        var parent = $(this).closest('nav');
        parent.hide();
        $('.dvd-menu-opcio-filtre-rounded').removeClass('selected');
        $('ul.list_type li.selected').each(function(i, element) {
            $(element).removeClass('selected');
        })
    });
    // -- FI Gestió dels filtres: per poder-los tancar
    // -- Gestió dels filtres: per deixar marcat el que cliquen
    $('.dvd-menu-opcio-filtre-rounded').on('click', function() {
        $('.dvd-menu-opcio-filtre-rounded').removeClass('selected');
        if (!$(this).hasClass('selected')) {
            $(this).addClass('selected');
        }
    });
    // -- FI Gestió dels filtres: per deixar marcat el que cliquen

    //-- Treballem l'estil de les icones dels filtres. Si tenim com a màxim 4, no les justifiquem
    $('.dvd-menu-opcions-filtratge').each(function() {
        if ($(this).find('.dvd-menu-opcio-filtre-rounded').length <= 4) {
            $(this).addClass('dvd-filtre-rounded-no-justify');
        }
    })
});

// -- En versió DESKTOP permeten plegar i desplegar el menú de l'alumne 
function desktopOpenAlumneMenu() {
    $('#dvd-menu-opcio-professor-llibrealumne').removeClass('dvd-menu-opcio-professor-seleccionat-tancat');
    $('#dvd-menu-opcio-professor-llibrealumne').addClass('dvd-menu-opcio-professor-seleccionat');
    $('.dvd-menu-llibrealumne-obrir').hide();
    $('#contentAlumnes').show();
}

function desktopHideAlumneMenu() {
    $('#contentAlumnes').hide();
    $('#dvd-menu-opcio-professor-llibrealumne').removeClass('dvd-menu-opcio-professor-seleccionat');
    $('#dvd-menu-opcio-professor-llibrealumne').addClass('dvd-menu-opcio-professor-seleccionat-tancat');
    $('.dvd-menu-llibrealumne-obrir').show();
    $('.dvd-menu-proposta-obrir').hide();
}

// -- En versió DESKTOP permeten plegar i desplegar el menú de la proposta didàctica 
function desktopOpenPropostaMenu() {
    $('#contentProfes').show();
    $('.dvd-menu-llibrealumne-obrir').hide();
    $('.dvd-menu-proposta-obrir').hide();
    $('#dvd-menu-opcio-professor-proposta').removeClass('dvd-menu-opcio-professor-seleccionat-tancat');
    $('#dvd-menu-opcio-professor-proposta').addClass('dvd-menu-opcio-professor-seleccionat');
    actualitzaPortada('PD');
}

function desktopHidePropostaContent() {
    $('#contentProfes').hide();
    $('#dvd-menu-opcio-professor-proposta').removeClass('dvd-menu-opcio-professor-seleccionat');
    $('#dvd-menu-opcio-professor-proposta').addClass('dvd-menu-opcio-professor-seleccionat-tancat');
    $('.dvd-menu-llibrealumne-obrir').hide();
    $('.dvd-menu-proposta-obrir').show();
}

// -- Funcions per a les icones dels menús en versió MOBILE
function openMenuMobile() {
    $('#btn-show-menu').hide();
    $('#btn-back-button').hide();
    $('#btn-tancar').show();
    $('.dvd-menu-professor').show();
}

function tancarMenuMobile() {
    $('#btn-back-button').hide();
    $('#btn-tancar').hide();
    $('.dvd-menu-professor').hide();
    $('#btn-show-menu').show();
}

function openMenuMobileAlumne() {
    $('#contentAlumnes').show();
    $('#btn-show-menu').hide();
}

function backToMenuAlumnes() {
    hideVisorDAudios();
    hideVisorDeVideos();
    hideImatgeTipusRecurs();
    $('#mobileheader').hide();
    $('#btn-show-menu').hide();
    $('#content').hide();
    $('#contentAlumnes').show();
}

function backToMenuProfes() {
    hideVisorDAudios();
    hideVisorDeVideos();
    hideImatgeTipusRecurs();
    $('#content').hide();
    $('.dvd-menu-professor').hide();
    $('#mobileheader').hide();

    if ($('.dvd-menu-opcio-professor-seleccionat').length > 0) {
        var opcio = $('.dvd-menu-opcio-professor-seleccionat').data('content');
        $('#contentAlumnes').hide();
        $('#contentProfes').hide();
        $('#contentProgramacions').hide();
        $('#contentBasic').hide();
        $('#contentRubriques').hide();

        $('#btn-tancar').hide();
        $('#btn-back-button').hide();
        $('#btn-show-menu').show();
        switch (opcio) {
            case 'alumne':
                $('#contentAlumnes').show();
                break;
            case 'profe':
                $('#contentProfes').show();
                break;
            case 'basic':
                $('#contentBasic').show();
                break;
            case 'programacions':
                $('#contentProgramacions').show();
                break;
            case 'rubriques':
                $('#contentRubriques').show();
                break;
        }

    } else {
        $('.dvd-menu-professor').show();
    }

}

// -- Funcions específiques per quan modifiquem l'amplada de la pantalla
function resetResizeStartup() {
    var newWidth = window.innerWidth;
    var punttrencament = false;
    // Hem de saber quan traspassem el breakpoint
    if (newWidth > breakpoint && midainicial == 'mobile') {
        punttrencament = true;
        midainicial = 'desktop';
    } else if (newWidth <= breakpoint && midainicial == 'desktop') {
        punttrencament = true;
        midainicial = 'mobile';
    }

    console.log('Resize to Width:'+newWidth+'px, Heihgt: '+window.innerHeight+'px');
    if (newWidth <= breakpoint && punttrencament) {
        $('.dvd-menu-obrir').hide();
        tancarMenuMobile();
        $('#content').css({ 'justify-content': 'center' });
        if ($('#content .fesClick').hasClass('visible-sm')) {
            $('#content .fesClick').hide();
        }
        if ($('#maincontainer').hasClass('maincontaineralumne')) {
            if ($('.dvd-menu-llibrealumne-obrir').is(':visible')) {
                $('.dvd-menu-llibrealumne-obrir').hide();
            }
            if (!$('#content').is(':visible')) {
                $('#btn-show-menu').show();
            }
            $('#contentAlumnes').hide();
        } else {
            // si algun menú estava seleccionat i desplegat l'hem d'ocultar
            $('.dvd-menu-opcio-professor-seleccionat').each(function(i, element) {
                switch ($(element).data('content')) {
                    case 'alumne':
                        $('#contentAlumnes').hide();
                        break;
                    case 'profe':
                        $('#contentProfes').hide();
                        break;
                        // Estem parlant de menús, però de moment no tenim els següents
                        // Si ho ocultem, en realitat ocultem el contingut de la secció en si mateixa
                        // case 'basic':
                        //     $('#contentBasic').hide();
                        //     break;
                        // case 'programacions':
                        //     $('#contentProgramacions').hide();
                        //     break;
                        // case 'rubriques':
                        //     $('#contentRubriques').hide();
                        //     break;
                }
            });

            // si algun menú estava seleccionat però plegat,l'hem d'ocultar
            $('.dvd-menu-opcio-professor-seleccionat-tancat').each(function(i, element) {
                switch ($(element).data('content')) {
                    case 'alumne':
                        $('#contentAlumnes').hide();
                        break;
                    case 'profe':
                        $('#contentProfes').hide();
                        break;
                        // Estem parlant de menús, però de moment no tenim els següents
                        // Si ho ocultem, en realitat ocultem el contingut de la secció en si mateixa
                        // case 'basic':
                        //     $('#contentBasic').hide();
                        //     break;
                        // case 'programacions':
                        //     $('#contentProgramacions').hide();
                        //     break;
                        // case 'rubriques':
                        //     $('#contentRubriques').hide();
                        //     break;
                }
            });
        }

        // A mobile tots els titols van en el header
        if ($('#content').is(':visible')) {
            $('#content header').hide();
            $('#content div.text').hide();
            $('#mobileheader').show();
        }

    } else if (newWidth > breakpoint && punttrencament) {
        // Fem la pantalla més gran
        if ($('#maincontainer').hasClass('maincontaineralumne')) {
            if (!$('.dvd-menu-llibrealumne-obrir').is(':visible')) {
                $('#contentAlumnes').show();
            }
        } else {
            if ($('#maincontainer').hasClass('maincontaineralumne')) {} else {
                // si algun menú estava seleccionat i desplegat l'hem d'obrir
                $('.dvd-menu-opcio-professor-seleccionat').each(function(i, element) {
                    switch ($(element).data('content')) {
                        case 'alumne':
                            $('.dvd-menu-llibrealumne-obrir').hide();
                            $('.dvd-menu-llibrealumne-tancar').show();
                            $('#contentAlumnes').show();
                            break;
                        case 'profe':
                            $('.dvd-menu-proposta-obrir').hide();
                            $('.dvd-menu-proposta-tancar').show();
                            $('#contentProfes').show();
                            break;
                        case 'basic':
                            $('#contentBasic').show();
                            break;
                        case 'programacions':
                            $('#contentProgramacions').show();
                            break;
                        case 'rubriques':
                            $('#contentRubriques').show();
                            break;
                    }
                });

                // si algun menú estava seleccionat però plegat, hem de mostrar la icona per desplegarlo
                $('.dvd-menu-opcio-professor-seleccionat-tancat').each(function(i, element) {
                    switch ($(element).data('content')) {
                        case 'alumne':
                            $('.dvd-menu-llibrealumne-tancar').hide();
                            $('.dvd-menu-llibrealumne-obrir').show();
                            break;
                        case 'profe':
                            $('.dvd-menu-proposta-tancar').hide();
                            $('.dvd-menu-proposta-obrir').show();
                            break;
                        case 'basic':
                            break;
                        case 'programacions':
                            break;
                        case 'rubriques':
                            break;
                    }
                });
            }

        }
        $('#mobileheader').hide();
        if ($('#content header').html() != '') {
            $('#content header').show();
            if ($('#music-player').is(':hidden')) {
                $('#content').css({ 'justify-content': 'space-between' });
            }
            if ($('#playerSection').is(':visible')) {
                $('#content').css({ 'justify-content': 'center' });
            }

        } else if ($('#content .text').html() != '') {
            $('#content .text').show();
        }
        if ($('#content .fesClick').html() != '') {
            if ($('#content .fesClick').hasClass('visible-sm')) {
                $('#content .fesClick').show();
            }
        }
        if ($('ul.list_type li.selected').length > 0) {
            $('#contentPortada').hide();
            $('#content').show();
        } else if ($('#content').is(':hidden') && $('#contentPortada').is(':hidden')) {
            $('#contentPortada').show();
        }
        $('#btn-show-menu').hide();

    }
    if ($('#videoRep_html5_api').length > 0 && $('#videoRep_html5_api').is(':visible')) {
        vjsResize();
    }
}

/*  
 * Adapta la mida del vídeo segons la pantalla
 */
function vjsResizeToVideoDimensions( videoWidth, videoHeight ) {
	//debugConsole?
	var debugConsole = false;
	
	//Mida del títol
	var titleHeight = $('#content header').height();
	if(titleHeight<0) titleHeight = 0;
	
	//Mida dels crèdits
    var creditsHeight = 0;
    if ($('#content .credits').length > 0) {
        var creditsHeight = $('#content .credits').height();
        if(creditsHeight<0) creditsHeight = 0;
    }

    //Mida del contenidor global
    var contenidorHeight = $('.dvd-contingut-principal').height();
    var contenidorWidth = $('.dvd-contingut-principal').width();
    
    if( contenidorHeight > $(window).height ) {
    	contenidorHeight = $(window).height;
    }
    if( contenidorWidth > $(window).width ) {
    	contenidorWidth = $(window).width;
    }
    
    var minVideoWidth  = 100;
    var minVideoHeight = 100;

    
    //L'alçada limitadora és la del widget
    //L'amplada limitadora és la del vídeo   
    var newVideoHeight = videoHeight;
    var newVideoWidth = videoWidth;
    
    var isFullScreen = document.fullscreenElement && document.fullscreenElement.id == 'videoRep';
    
    if( isFullScreen ) {
    	//Estem en mode pantalla completa
    	if(debugConsole) console.log('Pantalla completa');
    	//Obtenim les mides de la pantalla completa
    	newVideoHeight = $('#videoRep').height()-40;
    	newVideoWidth = $('#videoRep').width();
    } else {
    	var paddingDelContenidor = 20;
    	if( contenidorWidth < contenidorHeight )  { //Pantalla vertical
    		newVideoWidth  = (0.8*contenidorWidth)-paddingDelContenidor;
    		if( newVideoWidth < minVideoWidth ) newVideoWidth = minVideoWidth;
    		newVideoHeight = videoHeight * (newVideoWidth / videoWidth); 
    	} else { //pantalla horitzontal
    		newVideoHeight = (0.8*contenidorHeight)-paddingDelContenidor;
    		if( newVideoHeight < minVideoHeight ) newVideoHeight = minVideoHeight;    		
    		newVideoWidth = videoWidth * (newVideoHeight/ videoHeight);
    	}
    }

    // Desborda el seu contenidor per ample o alt
    console.log('Video Size: height: '+ newVideoHeight + 'px, width: ' + newVideoWidth + 'px');
    $('#videoRep_html5_api').css({ 'height': newVideoHeight + 'px', 'width': newVideoWidth + 'px' });
        
    $('#videoRep').removeClass('vjs-fluid');
    $('#videoRep').css({
     					 'height': newVideoHeight+'px',
       					 'width': newVideoWidth+'px',
       					 'margin': '0 auto'
       					});
    
    if (!$('#videoRep').hasClass('vjs-fluid')) {
        $('#videoRep').addClass('vjs-fluid');
        $('.videoRep-dimensions.vjs-fluid').css({ 'padding': '0px' });
    }

    if (!isDVDMobile()) {
        $('#content header').css({ 'width': $('#videoRep_html5_api').width() });
    } else {
        $('#content header').css({ 'width': '85%' });
    }

    if ($('#content .credits').length > 0) {
        $('#content .credits').css({ 'width': $('#videoRep_html5_api').width() });
    }
    
    if( isFullScreen ) {
    	//la barra de control en fullscreen no pot quedar per sota de l'àrea visible
    	$('.vjs-bold .vjs-control-bar').css( {'bottom':'0'});
    } else {
    	$('.vjs-bold .vjs-control-bar').css( {'bottom':'-42px'});
    }	
}

function vjsResize() {
    //Mida del video com a tal
    var videoHeight = videojs.players.videoRep.videoHeight();
    var videoWidth = videojs.players.videoRep.videoWidth();
    
    vjsResizeToVideoDimensions(videoWidth,videoHeight);
}

// -- FI Funcions específiques per quan modifiquem l'amplada de la pantalla


// -- Funcions dels FILTRES

function selectThis(liElem) {
    $('ul.list_type li').removeClass('selected');
    $(liElem).addClass('selected');
}

function reiniciaFiltres(container) {
    $('#' + container + ' .contentFiltrat').hide();
    $('#' + container + ' #filtertots').show();
    $('#' + container + ' .collapse').collapse('hide');
    $('.dvd-menu-opcio-filtre-rounded').removeClass('selected');

    $('#' + container + ' ul.list_type li.selected').each(function(i, element) {
        $(element).removeClass('selected');
    });
}

function showFiltre(container, nomFiltre, titolFiltre) {
    //Fem el swap de portada i contingut
    if (nomFiltre == "tancar") {
        $('#' + container).find('#filtertots').show();
    } else {
        $('#' + container).find('.tancarFiltre').show();
        // Agafem qualsevol altre filtre i l'ocultem
        $('#' + container).find('.contentFiltrat').hide();
        $('#' + container).find('#filtertots').hide();
        $('#' + container + ' #filter' + nomFiltre).show();
    }
}

// -- FI Funcions dels FILTRES

// -- Funcions auxiliars

function resetStartup() {
    $('.dvd-menu-opcio-professor-seleccionat').toggleClass('dvd-menu-opcio-professor-seleccionat dvd-menu-opcio-professor');
    $('.dvd-menu-opcio-professor-seleccionat-tancat').toggleClass('dvd-menu-opcio-professor-seleccionat-tancat dvd-menu-opcio-professor');
    $('.dvd-menu-obrir').hide();

    vjsResize();

    $('.dvd-menu-professor').hide();
    if ($('#maincontainer').hasClass('maincontaineralumne')) {
        showPortada(true, 'alumnes');
        if (isDVDMobile()) {
            $('#contentAlumnes').hide();
        } else {
            $('#contentAlumnes').show();

        }
    } else {
        showPortada(true, 'alumnes');
        $('#contentAlumnes').hide();

    }
    $('#contentProfes').hide();
    $('#contentProgramacions').hide();
    $('#contentBasic').hide();
    $('#contentRubriques').hide();
    if (isDVDMobile()) {
        $('.dvd-contingut-principal').show();
        $('#btn-back-button').hide();
        $('#btn-tancar').hide();
        if ($('#btn-back-button-alumno').length > 0) {
            $('#btn-back-button-alumno').hide();
        }
        $('#btn-show-menu').show();
    }
    // cap element seleccionat
    $('ul.list_type li.selected').each(function() {
        $(this).removeClass('selected');
    });

    reiniciaFiltres('contentAlumnes');
    reiniciaFiltres('contentProfes');
    //Fem el swap de portada i contingut
    $('#contentPortada').show();
    $('#content').hide();
    $('.accordion ul').hide();
    $('.accordion .active').removeClass('active');
    $('.accordion .selected').removeClass('selected');

    showFiltre('contentAlumnes', 'tots', '');
    $('#contentAlumnes .filtres a img').removeClass('selected');
    $("#content").hide();

}

function actualitzaPortada(tipus) {
    $(".portada").hide();
    $(".portada_" + tipus).show();
}

function showPortada(show = true, tipus = '') {
    if (show == true) {
        actualitzaPortada(tipus);
        $('#contentPortada').show();
    } else {
        $('#contentPortada').hide();
    }
}

// -- Funcions auxilizar de control de navegadors //@TODO: revisar
function checklocalAndIE() {
    var prefix = top.location.href.substring(0, 7);
    //prefix=prefix;
    var isMSIE = /*@cc_on!@*/ 0;

    if (isMSIE && prefix == "file://") {
        return true;
    } else {
        return false;
    }
}

function badBrowser() {
    // CRis fer que aixo funcioni
    return false;
    /*if($.browser.msie && parseInt($.browser.version) <= 7){
        if(navigator.userAgent.indexOf("Trident/")>-1) {
            return false;
        } else {
            return true;
        }
    }
    if($.browser.mozilla && parseInt($.browser.version) < 3){ return true;}
    return false;*/
}

function getBadBrowser(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function setBadBrowser(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

if (badBrowser() && getBadBrowser('browserWarning') != 'seen') {
    /*$(function() {
        $('#browserWarning').show();
        $('#warningClose').click(function() {
            setBadBrowser('browserWarning', 'seen', 7);
            $('#browserWarning').slideUp('slow');
            return false;
        });
    });*/
}

$(function() {
    var musicPlayerSlider = $('#music-player-slider').slider({
        min: 1,
        max: 100,
        //slide: audioPlayer.onMoveAudioPosition,
        //change: audioPlayer.moveAudioPosition,
        start: audioPlayer.onBlockAudioPosition,
        stop: audioPlayer.onMoveAudioPosition,
        slide: audioPlayer.onSlide,
    });

    $('#music-player-slider').slider('value', 1);

    $('#music-player .music-player-close').click(function() {
        $('#musical-note-icon').removeClass('active');
        audioPlayer.cancelAudio();
    });

    $('#music-player .music-player-v').click(function() {
        $('#musical-note-icon').removeClass('active');
    });

    $('#music-player .music-player-close-mobile').click(function() {
        $('#musical-note-icon').removeClass('active');
        if(audioPlayer) audioPlayer.cancelAudio();
    });

    $('#music-player .music-player-v-mobile').click(function() {
        $('#musical-note-icon').removeClass('active');
    });
    
    $('#music-player-play').click(function() {
        if (audioPlayer.audio) {
            $(this).hide();
            $('#music-player-stop').show();
            audioPlayer.playAudio();
        }
    });
	

    $('#music-player-stop').click(function() {
        if (audioPlayer.audio) {
        	audioPlayer.pauseAudio();
            $(this).hide();            
            $('#music-player-play').show();            
        } else {
            console.log('audioplayer null');
        }
    });

    audioPlayer.offline = true;
    audioPlayer.cancelAudio();
    
    if (!isOnline()) {
    	$("#dvDownloadOffline").removeClass('d-sm-block');
    }

});