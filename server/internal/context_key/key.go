package context_key

type ContextKey string

const (
	NodeId      ContextKey = "id"
	NodePayload ContextKey = "node"
)

const (
	NodeIdOfTask ContextKey = "nodeId"
	TaskPayload  ContextKey = "task"
)
