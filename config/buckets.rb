require 'aws-sdk-lambda'  # v2: require 'aws-sdk'
require 'json'

def LambdaFunc (events)
  #This is an IAM user with permission to access only this one function.
  client = Aws::Lambda::Client.new(region: 'us-east-1', access_key_id: 'AKIA4Q4WC55IDIY37M6T', secret_access_key: '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')
  

  # Get the 10 most recent items
  req_payload = {:logEvents => events}
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
    # If the result is success, we got our items
    if resp_payload["body"]["result"] == "success"
      # Print out items
      puts resp_payload["body"]
    end
  end
end
