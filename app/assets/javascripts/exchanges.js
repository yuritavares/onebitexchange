$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();

    if ($('form').attr('action') === '/convert') {
      $.ajax('/convert', {
        type: 'GET',
        dataType: 'json',
        data: {
          source_currency: $('#source_currency').val(),
          target_currency: $('#target_currency').val(),
          amount: $('#amount').val()
        },
        error: function(jqXHR, textStatus, errorThrown) {
          return alert(textStatus);
        },
        success: function(data, text, jqXHR) {
          return $('#result').val(data.value.toFixed(2))
        }
      });
    }
  });  

  // using lodash to make a delay and submit the form without button
  function api_call() {
    $('form').submit()
  }

 
  $('#amount').on('keydown', _.debounce(api_call, 260,{
    'leading': true,
    'trailing': true
  }));
  // end submit form without button
  
    //function dictionary
    function currencyFullName(currency) {
      var currencyDictionary = {
        'AUD': 'Dólar Australiano',
        'BGN': 'Lev Bulgaro',
        'BRL': 'Real',
        'CAD': 'Dólar Canadense',
        'CHF': 'Franco',
        'CNY': 'Yuan Renminbi',
        'CZK': 'Coroa Checa',
        'DKK': 'Coroa Dinamarqueza',
        'EUR': 'Euro',
        'GBP': 'Libra Esterlina',
        'HKD': 'Dólar de Hong Kong',
        'HRK': 'Kuna croata',
        'HUF': 'Florim húngaro',
        'IDR': 'Rupia indonésia',
        'ILS': 'Novo shekel israelense',
        'INR': 'Rupia indiana',
        'JPY': 'Iene',
        'KRW': 'Won sul-coreano',
        'MXN': 'Peso Mexicano',
        'MYR': 'Ringgit Malaio',
        'NOK': 'Coroa Norueguesa',
        'NZD': 'Dólar Neozelandês',
        'PHP': 'Piso Filipino',
        'PLN': 'zloty',
        'RON': 'Leu Romeno',
        'RUB': 'Rublos Russos',
        'SEK': 'Coroa sueca',
        'SGD': 'Dólar de Singapura',
        'THB': 'Dólar de Singapura',
        'TRY': 'Lira Turca',
        'USD': 'Dolar Americano',
        'ZAR': 'Rand da África do Sul',
        'BTC': 'Bitcoin'
      };
      if (currencyDictionary[currency] === undefined) {
        return ""
      } else {
        return currencyDictionary[currency];
      }
    };
    // end of function

    // default values
      $("div.de").html("<span>De:</span>" + " " + currencyFullName($('#source_currency').val()));
      $("div.para").html("<span>Para:</span>" + " " + currencyFullName($('#target_currency').val()));
    // end default values

    //when select change
    $("#source_currency").on("change", function() {
      var currency = $(this).val();
      $("div.de").html("<span>De:</span>" + " " + currencyFullName($('#source_currency').val()));
    });

    $("#target_currency").on("change", function() {
      var currency = $(this).val();
      $("div.para").html("<span>Para:</span>" + " " + currencyFullName($('#target_currency').val()));
    });
    // end when select change

    // button for change values
    $("#change-button").click(function() {
      var targetValue = $("#target_currency").val();
      var sourceValue = $("#source_currency").val();
      $("#source_currency").val(targetValue).trigger('change');
      $("#target_currency").val(sourceValue).trigger('change');
    })
    // end change values

    //rotate function
    $("#change-button").rotate({
      bind:
      {
        click: function(){
          $(this).rotate({ angle:0,animateTo:180,easing: $.easing.easeInOutExpo })
        }
      }
    });
    // end rotate function
  });
