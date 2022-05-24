def show(params)
  AzureAlertTrigger.invoke(
    name: params[:name],
    type: params[:alert_type]
  )
end


AzureAlertTrigger.all