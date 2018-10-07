/**
 * Created by jmoro on 02/05/17.
 */
(function() {
    /** @namespace **/
    Namespace = Namespace || {};

    /**
     *
     * @public
     * @class
     * @param {jQuery} $ - jquery
     * @param {Company.Config} config - instance
     * @param {Object} options - Opciones de la clase HomeMiclub
     * @return {Company.HomeMiclub}
     * @requires {jQuery} - 1.8.3
     * @requires {Company.Config}
     * @version 1.0.0
     */
    function HomeMiclub($, config, options) {
        /** @type {Company.HomeMiclub} self - Instancia singleton de HomeMiclub **/
        var self = this;

        /** @type {Object} priv - Variables privadas de HomeMiclub **/
        var priv = {
            medio: null,
            startVigentes: 4,
            startFinalizados: 4,
            startVentajas: 4,
            nMasProductos: 3,
            option: {},
        };

        function jQCargarVigentes() {
            priv.startVigentes = priv.startVigentes + priv.nMasProductos;
            $.ajax({
                url: priv.option.pathApiMiclub,
                type: 'POST',
                dataType: 'json',
                data: {
                    token: priv.option.token,
                    timestamp: priv.option.timestamp,
                    medio: priv.medio,
                    offset: priv.nMasProductos,
                    start: priv.startVigentes,
                    tipo: 'vigentes',
                },
                success: function(response) {
                    var ventajas = '';
                    if (response.status === 200) {
                        for (i = 0; i < response.data.length; i++) {
                            ventajas += newRowVentaja(response.data[i]);
                        }
                        $('#capa_boton_mas_vigentes').remove();
                        $('#capa_vigentes').append(ventajas);

                        if (response.data.length >= 3) {
                            var boton =
                                '<div id="capa_boton_mas_vigentes" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding--left no-padding--right text-center bottom-24">';
                            boton +=
                                '<button id="mas_vigentes" onclick="homeMiclub.cargarVigentes();" class="btn secundario secundario-gris">Ver más</button>';
                            boton += '</div>';

                            $('#capa_vigentes').append(boton);
                        }
                    } else {
                    }
                },
                error: function() {},
            });
        }

        function jQCargarFinalizados() {
            priv.startFinalizados = priv.startFinalizados + priv.nMasProductos;
            $.ajax({
                url: priv.option.pathApiMiclub,
                type: 'POST',
                dataType: 'json',
                data: {
                    token: priv.option.token,
                    timestamp: priv.option.timestamp,
                    medio: priv.medio,
                    offset: priv.nMasProductos,
                    start: priv.startFinalizados,
                    tipo: 'finalizados',
                },
                success: function(response) {
                    var ventajas = '';
                    if (response.status === 200) {
                        for (i = 0; i < response.data.length; i++) {
                            ventajas += newRowVentaja(response.data[i]);
                        }
                        $('#capa_boton_mas_finalizados').remove();
                        $('#capa_finalizados').append(ventajas);

                        if (response.data.length >= 3) {
                            var boton =
                                '<div id="capa_boton_mas_finalizados" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding--left no-padding--right text-center bottom-24">';
                            boton +=
                                '<button id="mas_finalizados" onclick="homeMiclub.cargarFinalizados();" class="btn secundario secundario-gris">Ver más</button>';
                            boton += '</div>';

                            $('#capa_finalizados').append(boton);
                        }
                    } else {
                    }
                },
                error: function() {},
            });
        }

        function jQCargarVentajas() {
            priv.startVentajas = priv.startVentajas + priv.nMasProductos;
            $.ajax({
                url: priv.option.pathApiMiclub,
                type: 'POST',
                dataType: 'json',
                data: {
                    token: priv.option.token,
                    timestamp: priv.option.timestamp,
                    medio: priv.medio,
                    offset: priv.nMasProductos,
                    start: priv.startVentajas,
                    tipo: 'ventajas',
                },
                success: function(response) {
                    var ventajas = '';
                    if (response.status === 200) {
                        for (i = 0; i < response.data.length; i++) {
                            ventajas += newRowVentaja(response.data[i]);
                        }
                        $('#capa_boton_mas_ventajas').remove();
                        $('#capa_ventajas').append(ventajas);

                        if (response.data.length >= 3) {
                            var boton =
                                '<div id="capa_boton_mas_ventajas" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding--left no-padding--right text-center bottom-24">';
                            boton +=
                                '<button id="mas_ventajas" onclick="homeMiclub.cargarVentajas();" class="btn secundario secundario-gris">Ver más</button>';
                            boton += '</div>';
                            $('#capa_ventajas').append(boton);
                        }
                    } else {
                    }
                },
                error: function() {},
            });
        }

        function getTarjetaTrial() {
            $('#solicitaTarjetaTrial').show();
            $('#ap-modal-bg').show();
        }

        function getTarjetaSuscriptor() {
            $('#solicitaTarjetaSuscriptor').show();
            $('#ap-modal-bg').show();
        }

        function getWalletCard() {
            $('#loading').show();

            try{
                priv.UID = gigyaUX.vocUserGetData('uid');
                priv.uidSignature = gigyaUX.vocUserGetData('uidSignature');
                priv.signatureTimestamp = gigyaUX.vocUserGetData('signatureTimestamp');
            }catch (e) {
                log(e);
            }

            $.ajax({
                url: priv.option.pathApiTarjetaWallet,
                type: 'POST',
                dataType: 'json',
                data: {
                    signature: priv.uidSignature,
                    timestamp: priv.signatureTimestamp,
                    medio: priv.medio,
                    usuario: priv.UID,
                },
                success: function(response) {
                    $('#loading').hide();
                    if(response.data) {
                        try {
                            var downloadLink = document.createElement("a");
                            var blob = b64toBlob(response.data, 'application/vnd.apple.pkpass');
                            var url = window.URL.createObjectURL(blob);
                            downloadLink.href = url;
                            downloadLink.download = "onplusCard.pkpass";

                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                        }catch (e) {
                            console.log(e.responseText)
                        }
                    }
                },
                error: function(err) {
                    console.log(err.responseText)
                }
            });
        }

        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        }

        function truncateWordwrap(str, size) {
            size -= 3;
            var ultimo_espacio = str.indexOf(' ', size);
            var newStr = str.substr(0, ultimo_espacio);
            if (str.length > size){
                newStr += '...';
                return newStr;
            }
            return str;
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        /**
         * Formatea una fecha en formato dd/mm/yyyy
         * @param date_str
         * @returns {string}
         */
        function formatDate(date_str) {
            var fecha = new Date(date_str);
            var month = '' + (fecha.getMonth() + 1),
                day = '' + fecha.getDate(),
                year = fecha.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [day, month, year].join('/');
        }
       
        function bindFormEvents() {
            $('.micuenta-imgtarjeta a').on('click', function() {
                var codPostal = $(priv.option.codPostalSel).val();
                if (codPostal) {
                    checkPostalCode(codPostal);
                }
            });

            $(priv.option.provinciaSel).on('change', function() {
                var provincia = $(this).val();
                $('#tarjetaclub_provincia')
                    .siblings('.ap-selectcustom-optionfalse')
                    .text(
                        $('#tarjetaclub_provincia')
                            .find('option:selected')
                            .text()
                            .toUpperCase()
                    );
                changeProvincia(provincia);
            });

            $(priv.option.localidadSel).on('change', function() {
                $(priv.option.localidadText).val(this.value);
                $('#tarjetaclub_localidad_sel')
                    .siblings('.ap-selectcustom-optionfalse')
                    .text(
                        $('#tarjetaclub_localidad_sel')
                            .find('option:selected')
                            .text()
                            .toUpperCase()
                    );
            });

            $('#tarjetaclub_codPostal')
                .on('change', function() {
                    changePostalCode(this.value);
                })
                .on('click', function() {
                    checkPostalCode(this.value);
                })
                .on('keypress', function(ev) {
                    if (ev.keyCode === 13) {
                        changePostalCode(this.value);
                    }
                });

            $(priv.option.formSel + ' input,select').keypress(function(event) {
                return event.keyCode != 13;
            });

            $('#button_solicitar_tarjeta').on('click', solicitaClubHandler);



            $('#solicitaclub-ko .ap-modal-ico-cerrar').on('click', function() {
                $('#solicitaclub-ko').hide();
            });

            $('#solicitaclub-ok .ap-modal-ico-cerrar').on('click', function() {
                $('#solicitaclub-ok').hide();
            });
        }
      
        function changeProvincia(provincia) {
            var codPostal = $(priv.option.codPostalSel).val();

            jQRellenoLocalidad(codPostal, provincia);
        }
        
        function jQRellenoLocalidad(cp, id_provincia) {
            var url =
                'https://postalcodes.vocento.com/pcodes/v1/get?filters=ge_codpostal:' +
                cp +
                ',ge_id_provincia:' +
                id_provincia +
                '&output=ge_localidad&showids=1';

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    if (response.results.length > 0) {
                        var localidadJq = $(priv.option.localidadSel);
                        localidadJq.empty();
                        $(priv.option.localidadText).val('');
                        $.each(response.results, function(i, item) {
                            localidadJq.append(
                                new Option(item.localidad, item.localidad)
                            );
                        });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    log('Facturacion::postalcodes error: ' + errorThrown);
                },
            });
        }

        /**
         * Logger del navegador.
         */
        function log() {
            if (Company && Company.log) {
                Company.log.apply(Company, arguments);
            } else if (console && console.log) {
                console.log.apply(console, arguments);
            }
        }
        
        
        function documentReadyHandler() {

            try{
                setUnderlineMenuItem('/servicios/mi-club.html');
            } catch (ex) {
                log(ex);
            }

            if (priv.option.userType === 'suscriptor' && priv.option.tjtaDisponible) {
                if (priv.option.tjtaContactar) {
                } else {
                    bindFormEvents();

                    $('.micuenta-imgtarjeta a').on('click', function() {
                        $('#solicitaClub').show();
                    });
                    $('#solicitaClub header a').on('click', function() {
                        $('#solicitaClub').hide();
                        $('#solicitaPlasticoTarjeta').hide();
                    });
                }
            }

            // Evento para solicitar tarjeta Trial
            if (priv.option.userType === 'trial') {
                $('button.descargaclub-trial').on('click', function () {
                    homeMiclub.getTarjetaClubTrial();
                });
            }

            // Evento para solicitar plastico tarjetaclub
            if (priv.option.userType === 'suscriptor') {
                $('button.solicitaclub-suscriptor').on('click', function() {
                    $('#solicitaPlasticoTarjeta').show();
                    $('#ap-modal-bg').show(); // opacidad
                    $('.modal-dialog').show();

                    // Llamada Evento DAX
                    try {
                        changePostalCode(document.getElementById('tarjetaclub_codPostal').value);
                        ns_onclick(this, '', 'name=miclub.solicita-carnet', 'hidden');
                    } catch (err) {}
                });
            }

            // Evento para descargar el walletCard
            if (priv.option.userType === 'suscriptor') {
                $('button.solicitaclub-wallet').on('click', function () {
                    homeMiclub.getTarjetaWallet();
                });
            }

            // Evento para descargar trajeta club suscriptor
            if (priv.option.userType === 'suscriptor') {
                $('button.descargaclub-suscriptor').on('click', function () {
                    homeMiclub.getTarjetaClubSuscriptor();
                });
            }

            // Abrir una modal desde UI:
            // Boton debe tener la clase js-abrirmodal y atributo data-opemodal con el valor del id de la modal que se quiera abrir
            $('.js-abrirmodal').each(function() {
                $(this).on('click', function(e) {
                    var puntero = $(this).data('openmodal');
                    selectorModal = '#' + puntero;

                    e.preventDefault();
                    e.stopPropagation();
                    $('#ap-modal-bg').show(); // opacidad
                    $(selectorModal).show();

                    // Llamada Evento DAX
                    try {
                        ns_onclick(this, '', 'name=miclub.solicita-carnet', 'hidden');
                    } catch (err) {}
                });
            });

            //Cerrar modal
            $('.js-cerrarmodal, .ap-modal-ico-cerrar').on('click', function(e) {
                e.preventDefault();
                $(this).parents('.modalbox').hide();
                $('#solicitaTarjetaTrial').hide();
                $('#solicitaTarjetaSuscriptor').hide();
                $('#solicitaPlasticoTarjeta').hide();
                $('#ap-modal-bg').hide(); // opacity
            });
        }

        /**
         * Constructor de la clase
         * @param options Opciones de inicialización
         */
        function constructor(options) {
            var defaults = {
                localidadText: '#tarjetaclub_localidad',
                localidadSel: '#tarjetaclub_localidad_sel',
                provinciaSel: '#tarjetaclub_provincia',
                codPostalSel: '#tarjetaclub_codPostal',
                pathApiMiclub: '/servicios/api/v1/miclub/getProducts',
                pathApiTarjetaTrial: '/servicios/api/v1/tarjetaTrial/tarjeta-on-trial',
                pathApiTarjetaWallet: '/servicios/api/v1/walletCard/getWalletCard',
                tjtaDisponible: false,
                tjtaContactar: false,
                formId: 'tarjetaclub',
                userType: null,
                inputs: [
                    { name: 'nombre', id: 'tarjetaclub_nombre' },
                    { name: 'apellidos', id: 'tarjetaclub_apellidos' },
                    { name: 'direccion', id: 'tarjetaclub_direccion' },
                    { name: 'codPostal', id: 'tarjetaclub_codPostal' },
                    { name: 'localidad', id: 'tarjetaclub_localidad' },
                    { name: 'provincia', id: 'tarjetaclub_provincia' },
                    { name: '_token', id: 'tarjetaclub__token' },
                ],
            };
            priv.option = $.extend(defaults, options);
            priv.medio = config.getMedia();
        }

        constructor(options);

        return {
            cargarVigentes: jQCargarVigentes,
            cargarFinalizados: jQCargarFinalizados,
            cargarVentajas: jQCargarVentajas,
            getTarjetaClubTrial: getTarjetaTrial,
            getTarjetaClubSuscriptor: getTarjetaSuscriptor,
            getTarjetaWallet: getWalletCard,
            documentReadyHandler: documentReadyHandler,
        };
    }

    // exports
    Company.HomeMiclub = HomeMiclub;
})();
