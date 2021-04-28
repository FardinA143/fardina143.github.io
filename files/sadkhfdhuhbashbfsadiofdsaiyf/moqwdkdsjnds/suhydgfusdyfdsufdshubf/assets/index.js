/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

/* Pass the embed mode option here */
const viewerConfig = {
    embedMode: "LIGHT_BOX"
};

/* Wait for Adobe Document Services PDF Embed API to be ready and enable the View PDF button */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    document.getElementById("view-pdf-btn").disabled = false;
});

/* Function to render the file using PDF Embed API. */
function previewFile()
{
    /* Initialize the AdobeDC View object */
    var adobeDCpeso = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "5adb1885d7c348c6b5bac9dab763c8fe"
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCpeso.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "/RIP%20-%20Matemàtiques%201r%20Batxillerat%20Editorial%20Santillana%20-%207%233-P1N64-CR3W-protected.pdf/MT1BTXSNT.pdf",
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                header: [
                    {
                        key: "<HEADER_KEY>",
                        value: "<HEADER_VALUE>",
                    }
                ]
                */
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: "Matemàtiques 1r de Batxillerat Editorial Santillana"
        }
    }, viewerConfig);
	    var adobeDCseso = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "5adb1885d7c348c6b5bac9dab763c8fe"
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCseso.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "/RIP%20-%20Matemàtiques%201r%20Batxillerat%20Editorial%20Santillana%20-%207%233-P1N64-CR3W-protected.pdf/MT2BTXSNT.pdf",
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                header: [
                    {
                        key: "<HEADER_KEY>",
                        value: "<HEADER_VALUE>",
                    }
                ]
                */
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: "Matemàtiques 2n de Batxillerat Editorial Santillana"
        }
    }, viewerConfig);
};
