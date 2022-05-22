export default function MtrFormComponent() {
  return (
    <form>
      <FormField name="hey"/>
      <WorkflowEditor
        type="pg:TaskLogic"
        isLoading={isLoading}
        metadata={metadata}
        value={value}
        onChange={onChange}
      />
    </form>
  )
}