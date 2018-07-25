require 'rest-client'
require 'json'

class ExchangeService
  def initialize(source_currency, target_currency, amount)
    @source_currency = source_currency
    @target_currency = target_currency
    @amount = amount.to_f
  end


  def perform
    begin
      exchange_api_url = Rails.application.credentials[Rails.env.to_sym][:currency_api_url]
      url = "#{exchange_api_url}convert?q=#{@source_currency}_#{@target_currency}"
      res = RestClient.get url
      value = JSON.parse(res.body)['results']["#{@source_currency}_#{@target_currency}"]['val'].to_f
      
      value * @amount
    rescue RestClient::ExceptionWithResponse => e
      e.response
    end
  end
end
