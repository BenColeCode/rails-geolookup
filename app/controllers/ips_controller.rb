require 'aws-sdk-lambda'  # v2: require 'aws-sdk'
require 'json'

class IpsController < ApplicationController
  def LambdaFunc
    #This is an IAM user with permission to access only this one function.
    client = Aws::Lambda::Client.new(region: 'us-east-1', access_key_id: 'AKIA4Q4WC55IDIY37M6T', secret_access_key: '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')
    

    req_payload = request.parameters
    payload = JSON.generate(req_payload)
    resp = client.invoke({
      function_name: 'geolocateText',
      invocation_type: 'RequestResponse',
      log_type: 'None',
      payload: payload
    })

    resp_payload = JSON.parse(resp.payload.string) # , symbolize_names: true)

    # If the status code is 200, the call succeeded
    if resp_payload["statusCode"] == 200
      $ips = resp_payload["body"]
      render "ips/_lambda_func"
    end
  end
end
