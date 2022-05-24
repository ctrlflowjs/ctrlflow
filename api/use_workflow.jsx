export default function MtrFormComponent() {
  return (
    <form>
      <FormField name="jobName"/>
      <FormField name="emailRecipients"/>
      <WorkflowEditor
        type="pg:TaskLogic"
        disabled={isLoading}
        value={value}
        onChange={onChange}
      />
    </form>
  )
}

// saving (have component talk through configured endpoint, or have user fetch value?)
// - what problem am I trying to solve?

// if i do it all automatically it may make it hard to submit naturally
// maybe i just need a readonly metadata endpoint? except i might want this to automate edits via the management UI