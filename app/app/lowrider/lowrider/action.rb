module Lowrider
  class Action
    def self.tags(*args)
      definition[:tags] = args
    end

    def self.inputs(schema)
      definition[:input_schema] = schema
    end

    def self.outputs(schema)
      definition[:output_schema] = schema
    end

    private

    def self.definition
      @definition ||= {}
    end
  end
end
