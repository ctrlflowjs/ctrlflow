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
        required: true,
        title: 'Name',
        description: 'This is what will display bla bla bla'
      }
    })

    def perform()
    end
  end
end
