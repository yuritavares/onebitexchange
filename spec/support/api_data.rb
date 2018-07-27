RSpec.configure do |config|
  config.before(:each) do
    stub_request(:get, /free.currencyconverterapi.com/)
    .with(headers: {
      'Accept'=>'*/*'
    }).to_return(status: 200, body: '
      {
        "query": {
            "count": 1
        },
        "results": {
            "USD_PHP": {
                "id": "USD_PHP",
                "val": 53.299999,
                "to": "PHP",
                "fr": "USD"
            }
        }
    }', headers: {})
  end
end
