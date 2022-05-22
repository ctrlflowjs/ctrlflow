export default function MtrFormComponent() {
  return (
    <form>
      <FormField name="jobName"/>
      <FormField name="emailRecipients"/>
      <WorkflowEditor
        type="pg:TaskLogic"
        disabled={isLoading}
        metadata={metadata}
        value={value}
        onChange={onChange}
      />
    </form>
  )
}