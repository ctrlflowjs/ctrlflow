module Actions
  class ResetVirtualMachine < Lowrider::Action
    tags :recovery, :azure

    inputs ({
      name: {
        type: :string,
        required: true
      }
    })

    outputs ({
      name: {
        type: :string,
        required: true
      }
    })

    def perform()
    end
  end
end
