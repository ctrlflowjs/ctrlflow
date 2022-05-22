module Triggers
  class AzureAlert < Lowrider::Trigger
    tags :recovery
    outputs
    # number of workflows that can be invoked with one trigger
    # rate limiting
  end
end
